package main

import (
	"log"
	"os"
	"strings"
)

func findCommonLetter(text string) string {
	part1 := text[:len(text)/2]
	part2 := text[len(text)/2:]

	for x := 0; x < len(part1); x++ {
		for y := 0; y < len(part2); y++ {

			// fmt.Println(string(part1[x]), string(part2[y]))
			if part1[x] == part2[y] {
				return string(part1[x])
			}
		}
	}

	log.Fatal("invalid ", text)
	return ""
}

func calcPriority(text string) int {
	asc := int(text[0])
	if asc < 96 {
		return asc - 38
	}
	return asc - 96
}

func part1(filename string) int {
	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	sum := 0
	for _, line := range lines {
		commonLetter := findCommonLetter(line)
		sum += calcPriority(commonLetter)
	}
	return sum
}
