import { getInput } from '../util';

const input = getInput("Day1", "\n")

function part1(document: string[]) {
  let result = 0
  document.forEach(line => {
    const nums: string[] = line.split('').filter(el => !Number.isNaN(parseInt(el)))
    result += parseInt(nums[0] + nums[nums.length-1])
  })
  return result
}

function part2(document: string[]) {
  const digis = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  const newDocument: string[] = []

  document.forEach(line => {
    digis.forEach((word, index) => {
      const regex = new RegExp(word, 'g');
      line = line.replace(regex, digis[index].charAt(0)+(index + 1).toString()+digis[index].charAt(digis[index].length-1))
    });
    newDocument.push(line)
  })

  return part1(newDocument)
}

console.log(part1(input))
console.log(part2(input))
