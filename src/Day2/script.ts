import { getInput } from "../util";

type GameResult = { red: number; green: number; blue: number }
type GameType = {
  gameId: number;
  gameContent: GameResult[]
}

function getGame(): GameType[] {
  return getInput("Day2", "\n").map(line => line.split(": ")).map((line) => {
    const gameNumber = parseInt(line[0].replace(/Game /g, ''))
    
    const gameParts = line[1].split("; ").map(subset => {
      const cubes: GameResult = {red: 0, green: 0, blue: 0}
      for(const parts of subset.split(", ")) {
        const [num, key] = parts.split(" ")
        cubes[key as keyof GameResult] = parseInt(num)
      }
      return cubes
    })
    return {
      gameId: gameNumber,
      gameContent: gameParts
    }
  })
}

function part1() {
  let score = 0
  const RED = 12, GREEN = 13, BLUE = 14
  
  games.forEach(game => {
    let isImpossible = false
    game.gameContent.forEach(draws => {
      if(draws.red > RED) isImpossible = true
      if(draws.green > GREEN) isImpossible = true
      if(draws.blue > BLUE) isImpossible = true
    })
    if(!isImpossible) score += game.gameId
  })

  return score
}

function part2() {
  let score = 0
  
  games.forEach(game => {
    const highestCubes: GameResult = {red: 0, green: 0, blue: 0}
    game.gameContent.forEach(draws => {
      if(draws.red > highestCubes.red ) highestCubes.red = draws.red
      if(draws.green > highestCubes.green) highestCubes.green = draws.green
      if(draws.blue > highestCubes.blue) highestCubes.blue = draws.blue
    })
    score += highestCubes.red * highestCubes.green * highestCubes.blue
  })
  
  return score
}

const games = getGame()
console.log(part1())
console.log(part2())