const keyboardContainer = document.querySelector(".keyboard");

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
      this.keyInnerDiv.style.backgroundColor = "";
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

    // Span
    const span = document.createElement("span");
    span.textContent = this.label.toUpperCase();

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
}

// Key = 55px, row = 55 * 16 = 880px, 16 keys
const row1 = [
  new Key("esc", "Escape", { r: 255, g: 255, b: 255 }),
  new Key("1", "Digit1", { r: 255, g: 255, b: 255 }),
  new Key("2", "Digit2", { r: 255, g: 255, b: 255 }),
  new Key("3", "Digit3", { r: 255, g: 255, b: 255 }),
  new Key("4", "Digit4", { r: 255, g: 255, b: 255 }),
  new Key("5", "Digit5", { r: 255, g: 255, b: 255 }),
  new Key("6", "Digit6", { r: 255, g: 255, b: 255 }),
  new Key("7", "Digit7", { r: 255, g: 255, b: 255 }),
  new Key("8", "Digit8", { r: 255, g: 255, b: 255 }),
  new Key("9", "Digit9", { r: 255, g: 255, b: 255 }),
  new Key("0", "Digit0", { r: 255, g: 255, b: 255 }),
  new Key("-", "Minus", { r: 255, g: 255, b: 255 }),
  new Key("+", "Equal", { r: 255, g: 255, b: 255 }),
  new Key(
    "backspace",
    "Backspace",
    { r: 255, g: 255, b: 255 },
    "backspace",
    "backspace-up",
    2
  ),
  new Key("pause", "Pause", { r: 255, g: 255, b: 255 }),
];

const row2 = [
  new Key("tab", "Tab", { r: 255, g: 255, b: 255 }, "tab", "tab-up", 1.5),
  new Key("q", "KeyQ", { r: 255, g: 255, b: 255 }),
  new Key("w", "KeyW", { r: 255, g: 255, b: 255 }),
  new Key("e", "KeyE", { r: 255, g: 255, b: 255 }),
  new Key("r", "KeyR", { r: 255, g: 255, b: 255 }),
  new Key("t", "KeyT", { r: 255, g: 255, b: 255 }),
  new Key("y", "KeyY", { r: 255, g: 255, b: 255 }),
  new Key("u", "KeyU", { r: 255, g: 255, b: 255 }),
  new Key("i", "KeyI", { r: 255, g: 255, b: 255 }),
  new Key("o", "KeyO", { r: 255, g: 255, b: 255 }),
  new Key("p", "KeyP", { r: 255, g: 255, b: 255 }),
  new Key("[", "BracketLeft", { r: 255, g: 255, b: 255 }),
  new Key("]", "BracketRight", { r: 255, g: 255, b: 255 }),
  new Key(
    "\\",
    "Backslash",
    { r: 255, g: 255, b: 255 },
    "backslash",
    "backslash-up",
    1.5
  ),
  new Key("del", "Delete", { r: 255, g: 255, b: 255 }),
];

const row3 = [
  new Key(
    "capslock",
    "CapsLock",
    { r: 255, g: 255, b: 255 },
    "capslock",
    "capslock-up",
    1.7
  ),
  new Key("a", "KeyA", { r: 255, g: 255, b: 255 }),
  new Key("s", "KeyS", { r: 255, g: 255, b: 255 }),
  new Key("d", "KeyD", { r: 255, g: 255, b: 255 }),
  new Key("f", "KeyF", { r: 255, g: 255, b: 255 }),
  new Key("g", "KeyG", { r: 255, g: 255, b: 255 }),
  new Key("h", "KeyH", { r: 255, g: 255, b: 255 }),
  new Key("j", "KeyJ", { r: 255, g: 255, b: 255 }),
  new Key("k", "KeyK", { r: 255, g: 255, b: 255 }),
  new Key("l", "KeyL", { r: 255, g: 255, b: 255 }),
  new Key(":", "Semicolon", { r: 255, g: 255, b: 255 }),
  new Key("'", "Quote", { r: 255, g: 255, b: 255 }),
  new Key(
    "enter",
    "Enter",
    { r: 255, g: 255, b: 255 },
    "enter",
    "enter-up",
    2.3
  ),
  new Key("pgup", "PageUp", { r: 255, g: 255, b: 255 }),
];

const row4 = [
  new Key(
    "shift",
    "ShiftLeft",
    { r: 255, g: 255, b: 255 },
    "shiftleft",
    "shiftleft-up",
    2
  ),
  new Key("z", "KeyZ", { r: 255, g: 255, b: 255 }),
  new Key("x", "KeyX", { r: 255, g: 255, b: 255 }),
  new Key("c", "KeyC", { r: 255, g: 255, b: 255 }),
  new Key("v", "KeyV", { r: 255, g: 255, b: 255 }),
  new Key("b", "KeyB", { r: 255, g: 255, b: 255 }),
  new Key("n", "KeyN", { r: 255, g: 255, b: 255 }),
  new Key("m", "KeyM", { r: 255, g: 255, b: 255 }),
  new Key(",", "Commaa", { r: 255, g: 255, b: 255 }),
  new Key(".", "Period", { r: 255, g: 255, b: 255 }),
  new Key("/", "Slash", { r: 255, g: 255, b: 255 }),
  new Key(
    "shift",
    "ShiftRight",
    { r: 255, g: 255, b: 255 },
    "shiftright",
    "shiftright-up",
    2
  ),
  new Key("↑", "ArrowUp", { r: 255, g: 255, b: 255 }),
  new Key("pgdn", "PageDown", { r: 255, g: 255, b: 255 }),
];

const row5 = [
  new Key("ctrl", "ControlLeft", { r: 255, g: 255, b: 255 }),
  new Key("win", "MetaLeft", { r: 255, g: 255, b: 255 }),
  new Key("alt", "AltLeft", { r: 255, g: 255, b: 255 }),
  new Key("", "Space", { r: 255, g: 255, b: 255 }, "space", "space-up", 7),
  new Key("alt", "AltRight", { r: 255, g: 255, b: 255 }),
  new Key("func", "Fn", { r: 255, g: 255, b: 255 }),
  new Key("ctrl", "ControlRight", { r: 255, g: 255, b: 255 }),
  new Key("←", "ArrowLeft", { r: 255, g: 255, b: 255 }),
  new Key("↓", "ArrowDown", { r: 255, g: 255, b: 255 }),
  new Key("→", "ArrowRight", { r: 255, g: 255, b: 255 }),
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
