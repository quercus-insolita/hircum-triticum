package parsing

import (
	"github.com/PuerkitoBio/goquery"
	log "github.com/sirupsen/logrus"
	"net/http"
	"time"
)

func NewFozzyParser() Parser {
	return &fozzyParser{&helper{&http.Client{Timeout: time.Second * 10}}}
}

type fozzyParser struct {
	helper *helper
}

func (p *fozzyParser) ParseBuckwheats() ([]Buckwheat, error) {
	document, err := p.helper.readDocument("https://fozzyshop.ua/300143-krupa-grechnevaya")
	if err != nil {
		return nil, err
	}
	buckwheats := make([]Buckwheat, 0)
	selection := document.Find("div.js-product-miniature-wrapper:not(.product_grey)")
	for i := range selection.Nodes {
		if buckwheat, err := p.parseBuckwheat(selection.Eq(i)); err != nil {
			log.WithField("url", buckwheat.URL).Error(err)
		} else {
			buckwheats = append(buckwheats, buckwheat)
		}
	}
	return buckwheats, nil
}

func (p *fozzyParser) parseBuckwheat(selection *goquery.Selection) (Buckwheat, error) {
	return Buckwheat{}, nil
}
