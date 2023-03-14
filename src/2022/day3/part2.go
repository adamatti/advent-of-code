package main

import (
	"log"
	"math"
	"os"
	"strings"
)

func findCommons(text1 string, text2 string, text3 string) string {
	for x := 0; x < len(text1); x++ {
		for y := 0; y < len(text2); y++ {
			for z := 0; z < len(text3); z++ {
				if text1[x] == text2[y] && text2[y] == text3[z] {
					return string(text1[x])
				}
			}
		}
	}
	log.Fatal("invalid ", text1, text2, text3)
	return ""
}

func part2(filename string) int {
	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	sum := 0
	for index, _ := range lines {
		if math.Mod(float64(index), 3) == 0 {
			common := findCommons(lines[index], lines[index+1], lines[index+2])
			sum += calcPriority(common)
		}
	}
	return sum
}
