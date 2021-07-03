const menu = {
  type    : 'select',
  name    : 'choice',
  message : 'Welcome to the Game of Life CLI!',
  choices : [
    { title: 'Play', description: `Let's go!`, value: 0 },
    { title: 'Test', description: `Step through test cases`, value: 1 },
    { title: 'Quit', value: 2 },
  ],
  initial : 0
};

export default menu;