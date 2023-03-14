package main

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"log"
	"os"
	"strconv"
	"strings"
	"testing"
)

type Shift struct {
	starts int
	ends   int
}

func getLines(filename string) []string {
	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}

func parseShift(shift string) *Shift {
	arr := strings.Split(shift, "-")

	starts, err := strconv.Atoi(arr[0])
	if err != nil {
		log.Fatal("Error during conversion")
		return nil
	}
	ends, err := strconv.Atoi(arr[1])
	if err != nil {
		log.Fatal("Error during conversion")
		return nil
	}

	return &Shift{starts: starts, ends: ends}
}

func hasFullOverlap(text string) bool {
	arr := strings.Split(text, ",")
	shift1 := parseShift(arr[0])
	shift2 := parseShift(arr[1])

	return (shift1.starts >= shift2.starts && shift1.ends <= shift2.ends) ||
		(shift2.starts >= shift1.starts && shift2.ends <= shift1.ends)
}

func part1(filename string) int {
	lines := getLines(filename)

	sum := 0
	for _, line := range lines {
		if hasFullOverlap(line) {
			sum += 1
		}
	}
	return sum
}

func hasSomeOverlap(text string) bool {
	arr := strings.Split(text, ",")
	shift1 := parseShift(arr[0])
	shift2 := parseShift(arr[1])

	return (shift2.starts >= shift1.starts && shift2.starts <= shift1.ends) ||
		(shift2.ends >= shift1.starts && shift2.ends <= shift1.ends) ||
		(shift1.starts >= shift2.starts && shift1.starts <= shift2.ends) ||
		(shift1.ends >= shift2.starts && shift1.ends <= shift2.ends)
}

func part2(filename string) int {
	lines := getLines(filename)

	sum := 0
	for _, line := range lines {
		result := hasSomeOverlap(line)
		// fmt.Println(line, " => ", result)
		if result {
			sum += 1
		}
	}
	return sum
}

func Test_Part1_sample(t *testing.T) {
	assert.Equal(t, 2, part1("sample.txt"))
}

func Test_Part1_input(t *testing.T) {
	assert.Equal(t, 556, part1("input.txt"))
}

func Test_Part2_sample(t *testing.T) {
	assert.Equal(t, 4, part2("sample.txt"))
}

func Test_Part2_input(t *testing.T) {
	assert.Equal(t, 876, part2("input.txt"))
}
