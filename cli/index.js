import { readFile } from 'fs/promises';
import prompts from 'prompts';
import Play from './Play.js';
import Test from './Test.js';
import menu from './menu.js';

async function main() {
  const route = await prompts(menu);
  console.log('\n');
  if (route.choice === 0) return await play();
  if (route.choice === 1) return await test();
  if (route.choice === 2) return;
}

async function play() {
  const play = new Play();
  let playAgain;

  do {
    const category = await play.selectSeedCategory();
    const seedName = await play.selectSeed(category);
    const seed = await getSeedFromJSON(`../seeds/${seedName}.json`);
    playAgain = await play.playGame(seed);
  } while (playAgain);

  return main();
}

async function test() {
  const test = new Test();
  const testSeeds = await getSeedFromJSON(`../seeds/tests.json`);
  let testAgain;

  do {
    const selection = await test.select();
    let continueTest = await test.describe(selection);
    if (continueTest) continueTest = await test.printInput(selection, testSeeds);
    if (continueTest) testAgain = await test.printOutput(selection, testSeeds);
  } while (testAgain);

  return main();
}

async function getSeedFromJSON(path) {
  try {
    const data = JSON.parse(await readFile(new URL(path, import.meta.url)));
    return data;
  } catch (err) {
    return new Error(err);
  }
}

main();
