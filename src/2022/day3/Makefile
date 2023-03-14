init:
	go mod init adamatti.github.io/advent-of-code/2023
	go mod tidy

fmt:
	@go fmt

test: fmt
	@go test

lint:
	@golangci-lint run ./...