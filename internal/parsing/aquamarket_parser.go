package parsing

import (
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/html"
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
	for _, node := range document.Find("div.product:not(.product-not-available)").Nodes {
		if buckwheat, err := p.parseBuckwheat(node); err != nil {
			log.WithField("url", buckwheat.URL).Error(err)
		} else {
			buckwheats = append(buckwheats, buckwheat)
		}
	}
	return buckwheats, nil
}

func (p *aquamarketParser) parseBuckwheat(node *html.Node) (Buckwheat, error) {
	return Buckwheat{}, nil
}
