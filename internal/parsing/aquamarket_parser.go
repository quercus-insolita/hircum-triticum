package parsing

import (
	"net/http"
	"time"
)

func MewAquamarketParser() Parser {
	return &aquamarketParser{&http.Client{Timeout: time.Second * 10}}
}

type aquamarketParser struct {
	client *http.Client
}

func (p *aquamarketParser) ParseBuckwheats() ([]Buckwheat, error) {
	return make([]Buckwheat, 0), nil
}
