package main

import (
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func processFile_part1(filename string) int {
	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	curCalories := 0
	maxCalories := 0

	for _, line := range lines {
		if line != "" {
			number, err := strconv.Atoi(line)
			if err != nil {
				log.Fatal(err)
			}
			curCalories += number
		}

		if line == "" {
			if curCalories > maxCalories {
				maxCalories = curCalories
			}
			curCalories = 0
		}
	}
	if curCalories > maxCalories {
		maxCalories = curCalories
	}
	return maxCalories
}

func processFile_part2(filename string) []int {
	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	listOfElves := make([]int, 0)
	curCalories := 0

	for _, line := range lines {
		if line != "" {
			number, err := strconv.Atoi(line)
			if err != nil {
				log.Fatal(err)
			}
			curCalories += number
		}

		if line == "" {
			listOfElves = append(listOfElves, curCalories)
			curCalories = 0
		}
	}
	if curCalories > 0 {
		listOfElves = append(listOfElves, curCalories)
	}

	sort.Sort(sort.Reverse(sort.IntSlice(listOfElves)))
	return listOfElves
}

func Test_Day1_Part1_Sample(t *testing.T) {
	assert.Equal(t, 24000, processFile_part1("sample.txt"))
}

func Test_Day1_Part1_Input(t *testing.T) {
	assert.Equal(t, 69795, processFile_part1("input.txt"))
}

func Test_Day1_Part2_Sample(t *testing.T) {
	elves := processFile_part2("sample.txt")
	assert.Equal(t, 45000, elves[0]+elves[1]+elves[2])
}

func Test_Day1_Part2_Input(t *testing.T) {
	elves := processFile_part2("input.txt")
	assert.Equal(t, 208437, elves[0]+elves[1]+elves[2])
}
