export class Prompt {
  constructor(text) {
    this.words = text.match(/\S+\s*/g);
    this.wordIndex = 0;
    this.letterIndex = 0;
    this.incorrectIndex = { wordIndex: null, letterIndex: null };
    this.promptDiv = null;
    this.caretDiv = null;
  }

  setup() {
    this.promptDiv = document.getElementById("prompt");

    for (let i = 0; i < this.words.length; i++) {
      // Create word div
      const wordDiv = document.createElement("div");
      wordDiv.classList.add("word");

      // Loop through letters
      for (let j = 0; j < this.words[i].length; j++) {
        // Create letter div
        const letterDiv = document.createElement("div");
        letterDiv.textContent = this.words[i][j];
        letterDiv.classList.add("letter");
        wordDiv.appendChild(letterDiv);

        if (i === 0 && this.words[i][j] !== " ") {
          letterDiv.classList.add("activeLetter");
        }
      }

      this.promptDiv.appendChild(wordDiv);
    }

    this.caretDiv = document.createElement("div");
    this.caretDiv.id = "caret";
    this.promptDiv.appendChild(this.caretDiv);
    this.updateCaret();
  }

  handleKeyPress(letter) {
    if (letter === "Shift" || letter === "CapsLock") {
      return;
    }

    if (letter === "Backspace") {
      this.handleBackspace();
      return;
    }

    if (
      this.incorrectIndex.wordIndex === null &&
      this.getCurrentLetter() === letter
    ) {
      this.handleMatchedLetter();
    } else {
      this.handleMismatchedLetter();
    }
  }

  handleBackspace() {
    // If first character and there is not error streak, do nothing, cant go back further
    if (this.incorrectIndex.wordIndex === null && this.isFirstCharacter()) {
      return;
    }

    this.updateLetterIndex(-1);

    // If we reached the starting point of our incorrect streak, clear it
    if (
      this.wordIndex === this.incorrectIndex.wordIndex &&
      this.letterIndex === this.incorrectIndex.letterIndex
    ) {
      this.incorrectIndex.wordIndex = null;
      this.incorrectIndex.letterIndex = null;
    }

    const letterDiv = this.getCurrentLetterDiv();
    letterDiv.classList.remove("correct");
    if (letterDiv.classList.contains("incorrect")) {
      letterDiv.classList.remove("incorrect");
    }

    this.updateCaret();
  }

  handleMismatchedLetter() {
    if (this.incorrectIndex.wordIndex === null) {
      this.incorrectIndex = {
        wordIndex: this.wordIndex,
        letterIndex: this.letterIndex,
      };
    }
    // Still move cursor forward
    const letterDiv = this.getCurrentLetterDiv();
    letterDiv.classList.add("incorrect");
    this.updateLetterIndex(1);
    this.updateCaret();
  }

  handleMatchedLetter() {
    // Update current letter div
    const letterDiv = this.getCurrentLetterDiv();
    letterDiv.classList.add("correct");
    this.updateLetterIndex(1);
    this.updateCaret();
  }

  updateLetterIndex(amount) {
    this.letterIndex += amount;
    // If letter index is beyond word, move to next word (if it exists) and rest letter index
    if (this.letterIndex > this.words[this.wordIndex].length - 1) {
      this.wordIndex += 1;
      this.letterIndex = 0;

      if (this.incorrectIndex.wordIndex === null) {
        // Clear current active of previous word
        let letterDivs = document.querySelectorAll(".activeLetter");
        for (let i = 0; i < letterDivs.length; i++) {
          letterDivs[i].classList.remove("activeLetter");
        }
        // Set current active to this word
        const wordDiv = this.getCurrentWordDiv();
        if (wordDiv) {
          const letterDivs = wordDiv.children;
          for (let i = 0; i < letterDivs.length - 1; i++) {
            letterDivs[i].classList.add("activeLetter");
          }
        }
      }
    }
    // Else if letter index is negative, move to previous woird, and move letter index to last word's character (if it exists)
    else if (this.letterIndex < 0 && this.wordIndex > 0) {
      this.wordIndex -= 1;
      this.letterIndex = this.words[this.wordIndex].length - 1;
    }
  }

  getCurrentLetter() {
    return this.words[this.wordIndex][this.letterIndex];
  }

  getCurrentWord() {
    return this.words[this.wordIndex];
  }

  // Letter index is at last character
  isLastCharacter() {
    return this.letterIndex === this.getCurrentWord().length - 1;
  }

  isFirstCharacter() {
    return this.letterIndex === 0;
  }

  // Letter index is directly after last character
  isEndOfWord() {
    return this.letterIndex === this.words[this.wordIndex].length;
  }

  getCurrentWordDiv() {
    const wordDiv = document.querySelector(
      `.word:nth-child(${this.wordIndex + 1})`
    );
    return wordDiv;
  }

  getCurrentLetterDiv() {
    // Offset by 2 cause carret is also in div
    const letterDiv = document.querySelector(
      `.word:nth-child(${this.wordIndex + 1}) .letter:nth-child(${this.letterIndex + 1})`
    );
    return letterDiv;
  }

  // Update caret at current letter index
  updateCaret() {
    const letterDiv = this.getCurrentLetterDiv();
    if (letterDiv) {
      const rect = letterDiv.getBoundingClientRect();
      const containerRect = this.promptDiv.getBoundingClientRect();
      this.caretDiv.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top - 2}px)`;
    } else {
      // Edge case: Last letter of entire prompt
      const words = document.querySelectorAll(".word");
      const lastWord = words[words.length - 1];
      const letters = lastWord.querySelectorAll(".letter");
      const lastLetter = letters[letters.length - 1];
      const rect = lastLetter.getBoundingClientRect();
      const containerRect = this.promptDiv.getBoundingClientRect();
      this.caretDiv.style.transform = `translate(${rect.right - containerRect.left}px, ${rect.top - containerRect.top - 2}px)`;
    }
  }
}
