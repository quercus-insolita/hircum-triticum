package main

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func main() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetReportCaller(true)
	if err := http.ListenAndServe(":9427", http.HandlerFunc(handle)); err != nil {
		log.Fatalf("main: failed to start server, %v", err)
	}
}

func handle(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	if _, err := fmt.Fprint(writer, `{"message": "Hello from parser!"}`); err != nil {
		log.Errorf("main: failed to handle, %v", err)
	}
}
