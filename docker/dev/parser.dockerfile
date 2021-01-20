FROM golang:1.15.3-alpine

WORKDIR /go/src/app

ENV GOOS "linux"
ENV GOARCH "amd64"
ENV CGO_ENABLED 0

COPY go.mod .
COPY go.sum .
COPY cmd cmd

RUN apk add --no-cache git && go get ./...

ENTRYPOINT ["go", "run", "github.com/quercus-insolita/hircum-triticum/cmd/parser"]
