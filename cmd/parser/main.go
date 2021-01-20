package main

import (
	"flag"
	"fmt"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strconv"
)

func main() {
	port := flag.Int("port", 9427, "Application's HTTP server port")
	flag.Parse()
	log.SetFormatter(&log.JSONFormatter{})
	log.SetReportCaller(true)
	err := http.ListenAndServe(":"+strconv.Itoa(*port), http.HandlerFunc(handle))
	if err != nil {
		log.Fatalf("main: failed to start server, %v", err)
	}
}

func handle(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	if _, err := fmt.Fprint(writer, `{"message": "Hello from parser!"}`); err != nil {
		log.Errorf("main: failed to handle, %v", err)
	}
}
