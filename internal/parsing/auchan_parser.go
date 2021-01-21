package parsing

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strings"
	"time"
)

func NewAuchanHandler(logger log.FieldLogger) Parser {
	return &auchanParser{&http.Client{Timeout: time.Second * 5}, logger}
}

type auchanParser struct {
	client *http.Client
	logger log.FieldLogger
}

func (p *auchanParser) ParseBuckwheats() ([]Buckwheat, error) {
	_, err := goquery.NewDocumentFromReader(strings.NewReader("<html></html>"))
	if err != nil {
		return nil, fmt.Errorf("parsing: parser failed to read a document, %v", err)
	}
	return make([]Buckwheat, 0), nil
}
