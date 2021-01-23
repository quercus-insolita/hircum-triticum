package parsing

import (
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
	return []Buckwheat{}, nil
}
