package parsing

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/html"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func NewAuchanHandler(logger log.FieldLogger) Parser {
	return &auchanParser{&http.Client{Timeout: time.Second * 10}, logger}
}

type auchanParser struct {
	client *http.Client
	logger log.FieldLogger
}

func (p *auchanParser) ParseBuckwheats() ([]Buckwheat, error) {
	request, err := http.NewRequest(
		http.MethodGet,
		"https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/",
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("parsing: parser failed to make a request, %v", err)
	}
	response, err := p.client.Do(request)
	if err != nil {
		return nil, fmt.Errorf("parsing: parser failed to send a request, %v", err)
	}
	if response.StatusCode != http.StatusOK {
		_ = response.Body.Close()
		return nil, fmt.Errorf("parsing: parser failed with status %s", response.Status)
	}
	document, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		_ = response.Body.Close()
		return nil, fmt.Errorf("parsing: parser failed to read a document, %v", err)
	}
	if err := response.Body.Close(); err != nil {
		return nil, fmt.Errorf("parsing: parser failed to close a response body, %v", err)
	}
	buckwheats := make([]Buckwheat, 0)
	for _, node := range document.Find("a.product-tile").Nodes {
		if buckwheat, err := p.parseBuckwheat(node); err != nil {
			p.logger.WithField("url", buckwheat.URL).Error(err)
		} else {
			buckwheats = append(buckwheats, buckwheat)
		}
	}
	return buckwheats, nil
}

func (p *auchanParser) parseBuckwheat(node *html.Node) (Buckwheat, error) {
	var (
		buckwheat Buckwheat
		err       error
	)
	for _, attribute := range node.Attr {
		if attribute.Key == "href" {
			buckwheat.URL = attribute.Val
		} else if attribute.Key == "title" {
			buckwheat.Title = attribute.Val
		}
	}
	if buckwheat.URL == "" {
		return buckwheat, fmt.Errorf("parsing: parser found no url")
	}
	buckwheat.URL = "https://auchan.zakaz.ua" + buckwheat.URL
	if buckwheat.Title == "" {
		return buckwheat, fmt.Errorf("parsing: parser found no title")
	}
	document := goquery.NewDocumentFromNode(node)
	buckwheat.Price, err = strconv.ParseFloat(
		document.Find("span.Price__value_caption").Text(),
		64,
	)
	if err != nil {
		return buckwheat, fmt.Errorf("parsing: parser failed to parse price, %v", err)
	}
	if buckwheat.Price <= 0 {
		return buckwheat, fmt.Errorf("parsing: parser found non-positive price")
	}
	words := strings.Split(document.Find("div.product-tile__weight").Text(), " ")
	if len(words) < 2 || len(words) > 3 {
		return buckwheat, fmt.Errorf("parsing: parser failed to split price literal")
	}
	buckwheat.Mass, err = strconv.ParseFloat(words[len(words)-2], 64)
	if err != nil {
		return buckwheat, fmt.Errorf("parsing: parser failed to parse mass, %v", err)
	}
	if buckwheat.Mass <= 0 {
		return buckwheat, fmt.Errorf("parsing: parser found non-positive mass")
	}
	switch words[len(words)-1] {
	case "кг":
		return buckwheat, nil
	case "г":
		buckwheat.Mass /= 1000
		return buckwheat, nil
	default:
		return buckwheat, fmt.Errorf("parsing: parser found unknown mass unit")
	}
}
