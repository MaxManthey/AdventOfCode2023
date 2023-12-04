import { getInput } from '../util';

const input = getInput("Day3", "\n").map(line => line.split(""))

function testAreaSymbol(line: number, start: number, end: number) {
  for(let i = start; i <= end; ++i) {
    if(Number.isNaN(parseInt(input[line][i])) && input[line][i] !== ".") return true
  }
  return false
}

function testAdjacentSymbol(line: number, startNumber: number, endNumber: number): boolean {
  const start = startNumber === 0 ? startNumber : startNumber - 1
  const end = endNumber === input[line].length - 1 ? endNumber : endNumber + 1
  if(line != 0 && testAreaSymbol(line-1, start, end)) return true
  if(testAreaSymbol(line, start, end)) return true
  if(line != input.length - 1 && testAreaSymbol(line + 1, start, end)) return true
  return false
}

function part1() {
  let score = 0
  for(let line = 0; line < input.length; ++line) {
    let num = ""
    let startNum = -1
    for(let el = 0; el < input[line].length; ++el) {
      const currentEl = input[line][el]
      if(!Number.isNaN(parseInt(currentEl))) {
        num += currentEl.toString()
        if(startNum === -1) startNum = el
      } else if(startNum != -1) {
        if(testAdjacentSymbol(line, startNum, el - 1)) score += parseInt(num)
        num = ""
        startNum = -1
      }
      if(el === input[line].length - 1 && startNum != -1 && testAdjacentSymbol(line, startNum, el - 1)) score += parseInt(num)
    }
  }
  return score
}

function testAreaSymbol2(num: number, line: number, start: number, end: number) {
  for(let i = start; i <= end; ++i) {
    if(input[line][i] === "*") gearScore.push({part: num, placement: [line, i]})
  }
}

function testAdjacentSymbol2(num: number, line: number, startNumber: number, endNumber: number) {
  const start = startNumber === 0 ? startNumber : startNumber - 1
  const end = endNumber === input[line].length - 1 ? endNumber : endNumber + 1
  if(line != 0)testAreaSymbol2(num, line-1, start, end)
  testAreaSymbol2(num, line, start, end)
  if(line != input.length - 1) testAreaSymbol2(num, line + 1, start, end)
}

type GearPlacement = {
  part: number
  placement: number[]
}
const gearScore: GearPlacement[] = []

function part2() {
  for(let line = 0; line < input.length; ++line) {
    let num = ""
    let startNum = -1
    for(let el = 0; el < input[line].length; ++el) {
      const currentEl = input[line][el]
      if(!Number.isNaN(parseInt(currentEl))) {
        num += currentEl.toString()
        if(startNum === -1) startNum = el
      } else if(startNum != -1) {
        testAdjacentSymbol2(parseInt(num), line, startNum, el-1)
        num = ""
        startNum = -1
      }
      if(el === input[line].length - 1 && startNum != -1) testAdjacentSymbol2(parseInt(num), line, startNum, el - 1)
    }
  }

  const unique = new Set(gearScore.map(el => el.placement.join(" ")))

  let score = 0
  unique.forEach(el => {
    const arr = el.split(" ").map(parts => parseInt(parts))
    const occ = gearScore.filter(gears => gears.placement[0] === arr[0] && gears.placement[1] === arr[1])
    if(occ.length === 2) {
      score += occ[0].part*occ[1].part
    }
  })
  
  return score
}

console.log(part1())
console.log(part2())
