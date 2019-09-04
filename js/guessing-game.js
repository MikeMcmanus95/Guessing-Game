/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  const min = Math.ceil(1);
  const max = Math.floor(101);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(arr) {
  let m = arr.length, temp, i;

  // While arr has a length
  while(m) {
    // Pick a random number from the array, which is decreasing in length
    i = Math.floor(Math.random() * m--);
    // Set temp equal to last element
    temp = arr[m];
    // Swap out last element with random element
    arr[m] = arr[i];
    // Set random element to last element, because value at last element is still in play
    arr[i] = temp;
  }
  return arr;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    let difference = this.playersGuess - this.winningNumber;
    if (Math.sign(difference) === -1) {
      return difference * -1;
    }
    return difference;
  }

  isLower() {
    return (this.playersGuess < this.winningNumber);
  }

  playersGuessSubmission(num) {
    if (num > 100 || num < 1 || isNaN(num)) {
      throw 'That is an invalid guess.';
    } else {
      this.playersGuess = num;
      return this.checkGuess();
    }
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return 'You Win!';
    }
    else if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    }
    else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        return 'You Lose.';
      }
    }
    if (this.difference() < 10) {
      return 'You\'re burning up!';
    }
    else if (this.difference() < 25) {
      return 'You\'re lukewarm.';
    }
    else if (this.difference() < 50) {
      return 'You\'re a bit chilly.';
    }
    else {
      return 'You\'re ice cold!';
    }
  }

  provideHint() {
    let hintArray = [generateWinningNumber(), this.winningNumber, generateWinningNumber()];

    return shuffle(hintArray);
  }
}

function newGame() {
  return new Game();
}
