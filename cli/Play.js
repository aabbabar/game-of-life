import prompts from 'prompts';
import Game from '../app/Game.js';

class Play {
  constructor() {
    this.questions = {
      whichCategory      : {
        type    : 'select',
        name    : 'choice',
        message :
          'To play the game, you must first choose a seed.\n\nPlease choose from the following categories:\n',
        choices : [
          {
            title       : 'Still Life',
            description : 'seeds that remain static',
            value       : 'whichStillLife'
          },
          {
            title       : 'Oscillator',
            description : 'seeds that cycle between states',
            value       : 'whichOscillator'
          },
          {
            title       : 'Spaceship',
            description : 'seeds that travel across the grid',
            value       : 'whichSpaceship'
          }
        ],
        initial : 0
      },
      whichStillLife     : {
        type    : 'select',
        name    : 'choice',
        message : 'Choose a still life:',
        choices : [
          { title: 'Block', value: 'block' },
          { title: 'Loaf', value: 'loaf' }
        ],
        initial : 0
      },
      whichOscillator    : {
        type    : 'select',
        name    : 'choice',
        message : 'Choose an oscillator:',
        choices : [
          { title: 'Beacon', value: 'beacon' },
          { title: 'Penta-decathalon', value: 'pentadecathalon' }
        ],
        initial : 0
      },
      whichSpaceship     : {
        type    : 'select',
        name    : 'choice',
        message : 'Choose a spaceship:',
        choices : [
          { title: 'Glider', value: 'glider' },
          { title: 'Lightweight Spaceship', value: 'lwss' }
        ],
        initial : 0
      },
      howManyGenerations : {
        type    : 'number',
        name    : 'choice',
        min     : 0,
        max     : 512,
        message : 'Play for how many generations?'
      },
      playAgain          : {
        type    : 'select',
        name    : 'choice',
        message : 'Game Over!',
        choices : [ { title: 'Play again!', value: 1 }, { title: 'Quit', value: 0 } ],
        initial : 0
      }
    };
  }

  async selectSeedCategory() {
    const category = await prompts(this.questions.whichCategory);
    console.log('\n');
    return category.choice;
  }

  async selectSeed(category) {
    const seed = await prompts(this.questions[category]);
    console.log('\n');
    return seed.choice;
  }

  async playGame(seed) {
    const generations = await prompts(this.questions.howManyGenerations);

    let game = new Game(seed.grid);
    for (let i = 0; i < generations.choice; i++) {
      game.print();
      game = game.evolve();
    }

    const playAgain = await prompts(this.questions.playAgain);
    return playAgain.choice;
  }
}

export default Play;
