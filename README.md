### An implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

# [Visit live site with examples and docs](https://aabbabar.github.io/game-of-life/)

The heart of the project lies in the Game and Cell objects, found in '/app'. These contain all the logic for running the Game of Life. Seed data is stored as JSON files in '/seeds'.


![website screenshot](https://i.imgur.com/XrD3m1j.png)


The website allows a user to play the Game of Life with various well-known seeds (thanks to the incredible project that is [LifeWiki](https://www.conwaylife.com/wiki/Main_Page) for the seed data). The visualisations have been created using the [p5.js](https://p5js.org/) library, with all the related sketch data in '/sketches'. These sketches are embedded within the page, running the program in real-time on the browser.

The site also contains full documentation for the Game of Life code, with detailed descriptions of all the functionality and data structures, and with discussion around design choices and optimisations. 

The website itself was built using the [Bulma](https://bulma.io/) framework.



![CLI screenshot](https://i.imgur.com/rkkGv10.png)

Additionally there is a Command Line Interface tool. This also allows users to play the game, but importantly includes test scenarios which describe the rules of the game. Using a CLI tool allows for closer inspection and interaction with the data, allowing the exact data to be seen at every iteration.

The CLI tool is built on Node, using the ['prompts'](https://www.npmjs.com/package/prompts) package to build the user interface. Full instructions for installation are included on the CLI section of the website.


This has been an incredibly fascinating and fun project to work on so far, and I plan to continue developing it. A few ideas have been listed in the Issues section of this repository,
