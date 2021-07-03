import prompts from 'prompts';
import Game from '../app/Game.js';

class Test {
  constructor() {
    this.questions = {
      whichScenario : {
        type    : 'select',
        name    : 'choice',
        message : 'Please select a test scenario:',
        choices : [
          { title: 'Scenario 0', description: 'No interactions', value: 0 },
          { title: 'Scenario 1', description: 'Underpopulation', value: 1 },
          { title: 'Scenario 2', description: 'Overcrowding', value: 2 },
          { title: 'Scenario 3', description: 'Survival', value: 3 },
          { title: 'Scenario 4', description: 'Creation of Life', value: 4 },
          { title: 'Scenario 5', description: 'Grid with no live cells', value: 5 },
          { title: 'Scenario 6', description: 'Expected game outcome for seeded grid', value: 6 }
        ],
        initial : 0
      },
      0 : {
        type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life\nWhen there are no live cells\nThen on the next step there are still no live cells\n\nRun test scenario?',
        initial : true
      },
      1 : {
        type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life\nWhen a live cell has fewer than two neighbours\nThen this cell dies\n\nRun test scenario?',
        initial : true
      },
      2 : {
        type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life\nWhen a live cell has more than three neighbours\nThen this cell dies\n\nRun test scenario?',
        initial : true
      },
      3 : {
        type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life\nWhen a live cell has two or three neighbours\nThen this cell stays alive\n\nRun test scenario?',
        initial : true
      },
      4 : {
      type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life\nWhen an empty position has exactly three neighbouring cells\nThen a cell is created in this position\n\nRun test scenario?',
        initial : true
      },
      5 : {
        type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life with the initial state containing no live cells\nWhen the game evolves one turn\nThen the next state also contains no live cells\n\nRun test scenario?',
        initial : true
      },
      6 : {
        type    : 'confirm',
        name    : 'choice',
        message :
          'Given a game of life with the initial state...\n\n[ [ . . . ]\n  [ # # # ]\n  [ . . . ] ]\n\nWhen the game evolves one turn\nThen the next state is...\n\n[ [ . # . ]\n  [ . # . ]\n  [ . # . ] ]\n\nWhen the game evolves another turn\nThen the next state is...\n\n[ [ . . . ]\n  [ # # # ]\n  [ . . . ] ]\n\nRun test scenario?',
        initial : true
      },
      viewEvolution : {
        type    : 'confirm',
        name    : 'choice',
        message : 'Evolve seed and view the next generation?',
        initial : true
      },
      whatNext      : {
        type    : 'select',
        name    : 'choice',
        message : 'Test complete.',
        choices : [
          { title: 'View another test', value: 1 },
          { title: 'Back to main menu', value: 0 }
        ],
        initial : 0
      }
    };
  }

  async select() {
    const scenario = await prompts(this.questions.whichScenario);
    console.log('\n');
    return scenario.choice;
  }

  async describe(scenario) {
    const continueTest = await prompts(this.questions[scenario]);
    return continueTest.choice;
  }

  async printInput(scenario, seeds) {
    if (scenario > 0 && scenario < 5) console.log('\nConsider the cell [1, 1], in the centre of the grid...\n');
    let game = new Game(seeds[scenario].grid);
    this.print(game);
    const continueTest = await prompts(this.questions.viewEvolution);
    return continueTest.choice;
  }

  async printOutput(scenario, seeds) {
    console.log('\nAfter one generation of evolution...');
    let game = new Game(seeds[scenario].grid);
    this.print(game.evolve());

    if (scenario === 6) {
      const continueTest = await prompts(this.questions.viewEvolution);
      if (continueTest.choice) {
        this.print(game.evolve().evolve());
      }
    }
    
    const testAgain = await prompts(this.questions.whatNext);
    return testAgain.choice;
  }

  print(game) {
    console.log('\nGrid visualisation:');
    game.print();
    console.log('Represented as the object:');
    console.log(game);
  }
}

export default Test;
