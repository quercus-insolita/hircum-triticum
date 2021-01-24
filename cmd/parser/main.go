package main

import (
	"encoding/json"
	"flag"
	"github.com/quercus-insolita/hircum-triticum/internal/parsing"
	log "github.com/sirupsen/logrus"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func main() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetReportCaller(true)
	parsers := map[string]parsing.Parser{
		"auchan":     parsing.NewAuchanParser(),
		"aquamarket": parsing.MewAquamarketParser(),
		"fozzy":      parsing.NewFozzyParser(),
	}
	names := make([]string, 0, len(parsers))
	for name := range parsers {
		names = append(names, name)
	}
	name := flag.String(
		"parser",
		names[0],
		"Underlying data source, one of \""+strings.Join(names, "\", \"")+"\"",
	)
	port := flag.Int("port", 9427, "Application's HTTP server port")
	isLog := flag.Bool("log", false, "Should the app output logs to a file")
	flag.Parse()
	parser, ok := parsers[*name]
	if !ok {
		log.Fatalf("main: failed to find parser %s among %v", *name, names)
	}
	if *isLog {
		file, err := os.OpenFile(
			"logs/parser-"+*name+".log",
			os.O_WRONLY|os.O_CREATE|os.O_APPEND,
			0644,
		)
		if err != nil {
			log.Fatalf("main: failed to open a log file, %v", err)
		}
		defer func() {
			_ = file.Close()
		}()
		log.SetOutput(file)
	}
	if err := http.ListenAndServe(":"+strconv.Itoa(*port), handle(parser)); err != nil {
		log.Fatalf("main: failed to start server, %v", err)
	}
}

func handle(parser parsing.Parser) http.Handler {
	return http.HandlerFunc(
		func(writer http.ResponseWriter, _ *http.Request) {
			writer.Header().Set("Content-Type", "application/json")
			buckwheats, err := parser.ParseBuckwheats()
			if err != nil {
				buckwheats = make([]parsing.Buckwheat, 0)
				log.Error(err)
			}
			if err := json.NewEncoder(writer).Encode(buckwheats); err != nil {
				log.Errorf("main: failed to handle, %v", err)
			}
		},
	)
}
