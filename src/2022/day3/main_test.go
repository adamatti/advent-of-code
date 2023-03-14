package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Day3_Part1_findCommonLetter(t *testing.T) {
	assert.Equal(t, "p", findCommonLetter("vJrwpWtwJgWrhcsFMMfFFhFp"))
	assert.Equal(t, "L", findCommonLetter("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"))
	assert.Equal(t, "P", findCommonLetter("PmmdzqPrVvPwwTWBwg"))
	assert.Equal(t, "v", findCommonLetter("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn"))
	assert.Equal(t, "t", findCommonLetter("ttgJtRGJQctTZtZT"))
	assert.Equal(t, "s", findCommonLetter("CrZsJsPPZsGzwwsLwLmpwMDw"))
}

func Test_Day3_Part1_sample(t *testing.T) {
	assert.Equal(t, 157, part1("sample.txt"))
}

func Test_Day3_Part1_input(t *testing.T) {
	assert.Equal(t, 7691, part1("input.txt"))
}

func Test_Day3_Part2_sample(t *testing.T) {
	assert.Equal(t, 70, part2("sample.txt"))
}

func Test_Day3_Part2_input(t *testing.T) {
	assert.Equal(t, 2508, part2("input.txt"))
}
