package parsing

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	log "github.com/sirupsen/logrus"
	"net/http"
	"time"
)

func MewAquamarketParser() Parser {
	return &aquamarketParser{&helper{&http.Client{Timeout: time.Second * 10}}}
}

type aquamarketParser struct {
	helper *helper
}

func (p *aquamarketParser) ParseBuckwheats() ([]Buckwheat, error) {
	document, err := p.helper.readDocument("https://aquamarket.ua/uk/1099-grechka")
	if err != nil {
		return nil, err
	}
	buckwheats := make([]Buckwheat, 0)
	selection := document.Find("div.product:not(.product-not-available)")
	for i := range selection.Nodes {
		if buckwheat, err := p.parseBuckwheat(selection.Eq(i)); err != nil {
			log.WithField("url", buckwheat.URL).Error(err)
		} else {
			buckwheats = append(buckwheats, buckwheat)
		}
	}
	return buckwheats, nil
}

func (p *aquamarketParser) parseBuckwheat(selection *goquery.Selection) (Buckwheat, error) {
	var (
		buckwheat Buckwheat
		err       error
	)
	nodes := selection.Find("a.product-name").Nodes
	if len(nodes) != 1 {
		return buckwheat, fmt.Errorf("parsing: parser found no url node")
	}
	for _, attribute := range nodes[0].Attr {
		if attribute.Key == "href" {
			buckwheat.URL = attribute.Val
		} else if attribute.Key == "title" {
			buckwheat.Title = attribute.Val
		}
	}
	if buckwheat.URL == "" {
		return buckwheat, fmt.Errorf("parsing: parser found no url")
	}
	buckwheat.URL = "https://aquamarket.ua" + buckwheat.URL
	if buckwheat.Title == "" {
		return buckwheat, fmt.Errorf("parsing: parser found no title")
	}
	return buckwheat, nil
}
