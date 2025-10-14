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
        key.legend = "";
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
        this.keys[i][j].sound.src = "";
        this.keys[i][j].soundUp.src = "";
        const soundPath = soundParts[soundParts.length - 1]; // "regular.mp3"
        const soundPathParts = soundPath.split("."); // ["regular", "mp3"]
        soundPathParts[0] += "-up"; // ["regular-up", "mp3"]
        const soundUpPath = soundPathParts.join("."); //

        console.log(soundParts);
        this.keys[i][j].sound.src = `audio/${switchPath}/${soundPath}`;
        this.keys[i][j].soundUp.src = `audio/${switchPath}/${soundUpPath}`;
        console.log(this.keys[i][j]);
      }
    }
  }

  updateVolume(amount) {
    for (let i = 0; i < this.keys.length; i++) {
      for (let j = 0; j < this.keys[i].length; j++) {
        this.keys[i][j].sound.volume = amount;
        this.keys[i][j].soundUp.volume = amount;
      }
    }
  }

  mute(shouldMute) {
    this.updateVolume(shouldMute ? 0 : 1);
  }
}
