import { Key } from "./key.js";

export class Keyboard {
  constructor() {
    this.keys = [];
  }

  createKeyboard(layout) {
    // Reset keyboard
    this.keys = [];
    const keyboardContainer = document.createElement("div");
    keyboardContainer.id = "keyboard";

    // Apply changes

    // For row in keyboard
    for (let i = 0; i < layout.length; i++) {
      const row = [];
      const keyboardRow = document.createElement("div");
      keyboardRow.classList.add("keyboard-row");
      // For key in row
      for (let j = 0; j < layout[i].length; j++) {
        const keyObject = layout[i][j];
        console.log(keyObject);
        const key = Key.from(keyObject);
        const keyDiv = key.render();
        keyboardRow.appendChild(keyDiv);
        row.push(key);
      }
      keyboardContainer.appendChild(keyboardRow);
      this.keys.push(row);
    }

    document.body.appendChild(keyboardContainer);
  }
}
