import { readFileSync } from 'fs';

export function getInput(location: string, split: string) {
  return readFileSync(`./src/${location}/input.txt`, 'utf-8').split(split)
}
