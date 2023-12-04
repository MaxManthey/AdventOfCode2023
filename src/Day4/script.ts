import { getInput } from '../util';

type ScratchCard = {
  id: number
  winning: number[]
  own: number[]
  amount: number
}

const cards: ScratchCard[] = getInput("Day4", "\n")
  .map(line => line.split(":"))
  .map (line => {
    let [id, nums] = line
    id = id.slice(5, 15)
    const [winning, own] = nums.split(" | ")
    return {
      id: parseInt(id),
      winning: winning.split(" ").filter(el => el.length > 0).map(el => parseInt(el)),
      own: own.split(" ").filter(el => el.length > 0).map(el => parseInt(el)),
      amount: 1
    }
  })

function part1() {
  let score = 0
  cards.forEach(card => {
    let cardScore = 0
    card.winning.forEach(num => {
      if(card.own.includes(num)) cardScore = cardScore === 0 ? 1 : cardScore << 1
    })
    score += cardScore
  })
  return score
}

function part2() {
  cards.forEach(card => {
    let cardScore = 0
    card.winning.forEach(num => {
      if(card.own.includes(num)) cardScore += 1
    })
    let index = cards.findIndex(el => el.id === card.id)
    for(cardScore; cardScore > 0; --cardScore) {
      cards[++index].amount += card.amount
    }
  })
  return cards.reduce((acc, curr) => acc + curr.amount, 0)
}


console.log(part1())
console.log(part2())