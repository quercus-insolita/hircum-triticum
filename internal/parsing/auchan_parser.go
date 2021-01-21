package parsing

import (
	log "github.com/sirupsen/logrus"
	"net/http"
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
	panic("implement me")
}
