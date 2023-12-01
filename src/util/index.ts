import { readFileSync } from 'fs';

export function getInput(location: string, split: string) {
  return readFileSync(location, 'utf-8').split(split)
}