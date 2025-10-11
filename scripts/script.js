const keyboardContainer = document.querySelector(".keyboard");
const white = { r: 255, g: 255, b: 255 };
const grey = { r: 235, g: 234, b: 231 };
const charcoal = { r: 64, g: 62, b: 62 };

class Key {
  constructor(
    label,
    code,
    keyColor,
    sound = "regular",
    soundUp = "regular-up",
    width = 1
  ) {
    this.label = label;
    this.code = code;
    this.keyColor = keyColor;
    this.width = width;
    this.pressed = false;
    this.foregroundColor = `rgb(${keyColor.r}, ${keyColor.g}, ${keyColor.b})`;
    this.backgroundColor = `rgb(${keyColor.r * 0.9}, ${keyColor.g * 0.9}, ${keyColor.b * 0.9})`;
    this.borderColor = `rgb(${keyColor.r * 0.8}, ${keyColor.g * 0.8}, ${keyColor.b * 0.8})`;
    this.sound = new Audio(`audio/${sound}.mp3`);
    this.soundUp = new Audio(`audio/${soundUp}.mp3`);
  }

  press() {
    this.pressed = true;
    console.log(`${this.label} pressed`);
    if (this.keyInnerDiv) {
      this.keyInnerDiv.style.backgroundColor = this.backgroundColor;
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }

  release() {
    this.pressed = false;
    console.log(`${this.label} released`);
    if (this.keyInnerDiv) {
      this.keyInnerDiv.style.backgroundColor = this.foregroundColor;
      this.soundUp.currentTime = 0;
      this.soundUp.play();
    }
  }

  render() {
    // Key button
    const keyButton = document.createElement("button");
    keyButton.classList.add("key-btn");
    keyButton.style.flex = this.width;
    keyButton.style.backgroundColor = this.backgroundColor;
    // Key inner
    const keyInnerDiv = document.createElement("div");
    keyInnerDiv.classList.add("key-inner");
    keyInnerDiv.style.backgroundColor = this.foregroundColor;
    keyInnerDiv.style.border = `1px solid ${this.borderColor}`;
    // Span
    const span = document.createElement("span");
    span.textContent = this.label.toUpperCase();
    span.style.color = this.getTextColor(this.keyColor);

    keyButton.appendChild(keyInnerDiv);
    keyInnerDiv.appendChild(span);

    // Store reference to button element
    this.keyButton = keyButton;
    this.keyInnerDiv = keyInnerDiv;

    if (this.label === "") {
      // Space bar has slightly different modifier
      keyInnerDiv.classList.add("spacebar");
    }

    return keyButton;
  }

  getTextColor({ r, g, b }) {
    // Calculate brightness (using standard luminance formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    // If bright, return black text; if dark, return white text
    return brightness > 128 ? "black" : "white";
  }
}

// Key = 55px, row = 55 * 16 = 880px, 16 keys
const row1 = [
  new Key("esc", "Escape", grey),
  new Key("1", "Digit1", white),
  new Key("2", "Digit2", white),
  new Key("3", "Digit3", white),
  new Key("4", "Digit4", white),
  new Key("5", "Digit5", white),
  new Key("6", "Digit6", white),
  new Key("7", "Digit7", white),
  new Key("8", "Digit8", white),
  new Key("9", "Digit9", white),
  new Key("0", "Digit0", white),
  new Key("-", "Minus", white),
  new Key("+", "Equal", white),
  new Key("backspace", "Backspace", grey, "backspace", "backspace-up", 2),
  new Key("pause", "Pause", grey),
];

const row2 = [
  new Key("tab", "Tab", grey, "tab", "tab-up", 1.5),
  new Key("q", "KeyQ", white),
  new Key("w", "KeyW", white),
  new Key("e", "KeyE", white),
  new Key("r", "KeyR", white),
  new Key("t", "KeyT", white),
  new Key("y", "KeyY", white),
  new Key("u", "KeyU", white),
  new Key("i", "KeyI", white),
  new Key("o", "KeyO", white),
  new Key("p", "KeyP", white),
  new Key("[", "BracketLeft", white),
  new Key("]", "BracketRight", white),
  new Key("\\", "Backslash", white, "backslash", "backslash-up", 1.5),
  new Key("del", "Delete", grey),
];

const row3 = [
  new Key("capslock", "CapsLock", grey, "capslock", "capslock-up", 1.7),
  new Key("a", "KeyA", white),
  new Key("s", "KeyS", white),
  new Key("d", "KeyD", white),
  new Key("f", "KeyF", white),
  new Key("g", "KeyG", white),
  new Key("h", "KeyH", white),
  new Key("j", "KeyJ", white),
  new Key("k", "KeyK", white),
  new Key("l", "KeyL", white),
  new Key(":", "Semicolon", white),
  new Key("'", "Quote", white),
  new Key("enter ツ", "Enter", charcoal, "enter", "enter-up", 2.3),
  new Key("pgup", "PageUp", grey),
];

const row4 = [
  new Key("shift", "ShiftLeft", grey, "shiftleft", "shiftleft-up", 2),
  new Key("z", "KeyZ", white),
  new Key("x", "KeyX", white),
  new Key("c", "KeyC", white),
  new Key("v", "KeyV", white),
  new Key("b", "KeyB", white),
  new Key("n", "KeyN", white),
  new Key("m", "KeyM", white),
  new Key(",", "Comma", white),
  new Key(".", "Period", white),
  new Key("/", "Slash", white),
  new Key("shift", "ShiftRight", grey, "shiftright", "shiftright-up", 2),
  new Key("↑", "ArrowUp", charcoal),
  new Key("pgdn", "PageDown", grey),
];

const row5 = [
  new Key("ctrl", "ControlLeft", grey),
  new Key("win", "MetaLeft", grey),
  new Key("alt", "AltLeft", grey),
  new Key("", "Space", charcoal, "space", "space-up", 7),
  new Key("alt", "AltRight", grey),
  new Key("func", "Fn", grey),
  new Key("ctrl", "ControlRight", grey),
  new Key("←", "ArrowLeft", charcoal),
  new Key("↓", "ArrowDown", charcoal),
  new Key("→", "ArrowRight", charcoal),
];

const keyboard = [row1, row2, row3, row4, row5];

function createKeyboard() {
  // For row in keyboard
  for (let i = 0; i < keyboard.length; i++) {
    const keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");
    // For key in row
    for (let j = 0; j < keyboard[i].length; j++) {
      const key = keyboard[i][j].render();
      keyboardRow.appendChild(key);
    }
    keyboardContainer.appendChild(keyboardRow);
  }

  // Listenr for key taps for entire document
  document.addEventListener("keydown", (event) => {
    if (event.repeat) return; // Ignore repeated events (holding key causes function to call multiple time)

    if (event.code === "AltLeft" || event.code === "AltRight") {
      event.preventDefault(); // prevents some default behaviors
    }

    const key = keyboard.flat().find((k) => k.code === event.code);
    if (key) {
      key.press();
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = keyboard.flat().find((k) => k.code === event.code);
    if (key) {
      key.release();
    }
  });
}

createKeyboard();
