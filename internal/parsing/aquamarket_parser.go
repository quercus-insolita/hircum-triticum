package parsing

import (
	log "github.com/sirupsen/logrus"
	"net/http"
	"time"
)

func MewAquamarketParser(logger log.FieldLogger) Parser {
	return &aquamarketParser{&http.Client{Timeout: time.Second * 10}, logger}
}

type aquamarketParser struct {
	client *http.Client
	logger log.FieldLogger
}

func (p *aquamarketParser) ParseBuckwheats() ([]Buckwheat, error) {
	return make([]Buckwheat, 0), nil
}
