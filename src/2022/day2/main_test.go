package main

import (
	"github.com/stretchr/testify/assert"
	"log"
	"os"
	"strings"
	"testing"
)

type GameOption struct {
	name  string
	value int
	wins  string
	loses string
}

func processFile_part1(filename string) int {
	rock := &GameOption{name: "rock", value: 1, wins: "scissors", loses: "paper"}
	paper := &GameOption{name: "paper", value: 2, wins: "rock", loses: "scissors"}
	scissors := &GameOption{name: "scissors", value: 3, wins: "paper", loses: "rock"}

	dict := map[string]*GameOption{
		"A": rock,
		"X": rock,
		"B": paper,
		"Y": paper,
		"C": scissors,
		"Z": scissors,
	}

	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	points := 0
	for _, line := range lines {
		arr := strings.Split(line, " ")
		player1 := dict[arr[0]]
		player2 := dict[arr[1]]

		if player1 == nil || player2 == nil {
			log.Fatal("invalid input")
		}

		points += player2.value
		if player2.wins == player1.name {
			points += 6
		} else if player1.name == player2.name {
			points += 3
		}
	}

	return points
}

func processFile_part2(filename string) int {
	rock := &GameOption{name: "rock", value: 1, wins: "scissors", loses: "paper"}
	paper := &GameOption{name: "paper", value: 2, wins: "rock", loses: "scissors"}
	scissors := &GameOption{name: "scissors", value: 3, wins: "paper", loses: "rock"}

	dict := map[string]*GameOption{
		"A":        rock,
		"rock":     rock,
		"B":        paper,
		"paper":    paper,
		"C":        scissors,
		"scissors": scissors,
	}

	content, err := os.ReadFile(filename)

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	points := 0
	for _, line := range lines {
		arr := strings.Split(line, " ")
		player1 := dict[arr[0]]

		if player1 == nil {
			log.Fatal("invalid input")
		}

		// My move
		var player2 *GameOption
		if arr[1] == "X" {
			player2 = dict[player1.wins]
		} else if arr[1] == "Y" {
			player2 = player1
		} else {
			player2 = dict[player1.loses]
		}

		points += player2.value
		if player2.wins == player1.name {
			points += 6
		} else if player1.name == player2.name {
			points += 3
		}
	}

	return points
}

func Test_Day2_Part1_Sample(t *testing.T) {
	assert.Equal(t, 15, processFile_part1("sample.txt"))
}

func Test_Day2_Part1_Input(t *testing.T) {
	assert.Equal(t, 11150, processFile_part1("input.txt"))
}

func Test_Day2_Part2_Sample(t *testing.T) {
	assert.Equal(t, 12, processFile_part2("sample.txt"))
}

func Test_Day2_Part2_Input(t *testing.T) {
	assert.Equal(t, 8295, processFile_part2("input.txt"))
}
