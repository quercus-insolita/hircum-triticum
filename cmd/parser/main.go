package main

import (
	"encoding/json"
	"flag"
	"github.com/quercus-insolita/hircum-triticum/internal/parsing"
	log "github.com/sirupsen/logrus"
	"net/http"
	"os"
	"strconv"
)

func main() {
	port := flag.Int("port", 9427, "Application's HTTP server port")
	flag.Parse()
	log.SetFormatter(&log.JSONFormatter{})
	log.SetReportCaller(true)
	file, err := os.OpenFile("logs/parser-auchan.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		log.Fatalf("main: failed to open a log file, %v", err)
	}
	defer func() {
		_ = file.Close()
	}()
	log.SetOutput(file)
	entry := log.WithField("parser", "auchan")
	err = http.ListenAndServe(
		":"+strconv.Itoa(*port),
		handle(parsing.NewAuchanHandler(entry), entry),
	)
	if err != nil {
		log.Fatalf("main: failed to start server, %v", err)
	}
}

func handle(parser parsing.Parser, logger log.FieldLogger) http.Handler {
	return http.HandlerFunc(
		func(writer http.ResponseWriter, _ *http.Request) {
			writer.Header().Set("Content-Type", "application/json")
			buckwheats, err := parser.ParseBuckwheats()
			if err != nil {
				buckwheats = make([]parsing.Buckwheat, 0)
				logger.Error(err)
			}
			if err := json.NewEncoder(writer).Encode(buckwheats); err != nil {
				logger.Errorf("main: failed to handle, %v", err)
			}
		},
	)
}
