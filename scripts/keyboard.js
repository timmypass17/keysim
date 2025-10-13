import { Key } from "./key.js";

export class Keyboard {
  constructor() {
    this.keys = [];
  }

  updateLayout(layout) {
    // Reset keyboard
    this.keys = [];
    const keyboardContainer = document.getElementById("keyboard");
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
        const key = Key.from(keyObject);
        const keyDiv = key.render();
        keyboardRow.appendChild(keyDiv);
        row.push(key);
      }
      keyboardContainer.appendChild(keyboardRow);
      this.keys.push(row);
    }
  }

  updateSwitch(switchPath) {
    for (let i = 0; i < this.keys.length; i++) {
      for (let j = 0; j < this.keys[i].length; j++) {
        const soundParts = this.keys[i][j].sound.src.split("/");
        const soundPath = soundParts[soundParts.length - 1];
        this.keys[i][j].sound.src = `audio/${switchPath}/${soundPath}`;
      }
    }
  }
}
