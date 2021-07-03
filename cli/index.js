import { readFile } from 'fs/promises';
import Play from './Play.js';

async function play() {
  const play = new Play();
  let playAgain;

  do {
    const category = await play.selectSeedCategory();
    const seedName = await play.selectSeed(category);
    const seed = await getSeedFromJSON(`../seeds/${seedName}.json`);
    playAgain = await play.playGame(seed);
  } while (playAgain);
}

async function getSeedFromJSON(path) {
  try {
    const data = JSON.parse(await readFile(new URL(path, import.meta.url)));
    return data;
  } catch (err) {
    return new Error(err);
  }
}

play();
