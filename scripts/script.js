const keyboardContainer = document.querySelector(".keyboard");
const white = { r: 255, g: 255, b: 255 };
const grey = { r: 235, g: 234, b: 231 };
const charcoal = { r: 64, g: 62, b: 62 };

class Key {
  constructor(
    label,
    subLabel,
    legend,
    code,
    keyColor,
    sound = "regular",
    soundUp = "regular-up",
    width = 1
  ) {
    this.label = label;
    this.subLabel = subLabel;
    this.legend = legend;
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
    span.style.fontWeight = "500";
    keyButton.appendChild(keyInnerDiv);

    if (this.subLabel !== "") {
      const subLabelSpan = document.createElement("span");
      subLabelSpan.textContent = this.subLabel.toUpperCase();
      subLabelSpan.style.color = this.getTextColor(this.keyColor);
      keyInnerDiv.appendChild(subLabelSpan);
    }

    keyInnerDiv.appendChild(span);

    if (this.legend !== "") {
      const legendSpan = document.createElement("span");
      legendSpan.textContent = this.legend.toUpperCase();
      legendSpan.style.color = this.getTextColor(this.keyColor);
      legendSpan.classList.add("legend");
      keyInnerDiv.appendChild(legendSpan);
    }

    // Store reference to button element
    this.keyButton = keyButton;
    this.keyInnerDiv = keyInnerDiv;

    // Make this into subclass and override
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
  new Key("", "esc", "", "Escape", grey),
  new Key("1", "!", "ぬ", "Digit1", white),
  new Key("2", "@", "ふ", "Digit2", white),
  new Key("3", "#", "あ", "Digit3", white),
  new Key("4", "$", "う", "Digit4", white),
  new Key("5", "%", "え", "Digit5", white),
  new Key("6", "^", "お", "Digit6", white),
  new Key("7", "&", "や", "Digit7", white),
  new Key("8", "*", "ゆ", "Digit8", white),
  new Key("9", "(", "よ", "Digit9", white),
  new Key("0", ")", "わ", "Digit0", white),
  new Key("-", "_", "ほ", "Minus", white),
  new Key("=", "+", "へ", "Equal", white),
  new Key(
    "backspace",
    "",
    "",
    "Backspace",
    grey,
    "backspace",
    "backspace-up",
    2
  ),
  new Key("pause", "", "", "Pause", grey),
];

const row2 = [
  new Key("tab", "", "", "Tab", grey, "tab", "tab-up", 1.5),
  new Key("q", "", "た", "KeyQ", white),
  new Key("w", "", "て", "KeyW", white),
  new Key("e", "", "い", "KeyE", white),
  new Key("r", "", "す", "KeyR", white),
  new Key("t", "", "か", "KeyT", white),
  new Key("y", "", "ん", "KeyY", white),
  new Key("u", "", "な", "KeyU", white),
  new Key("i", "", "に", "KeyI", white),
  new Key("o", "", "ら", "KeyO", white),
  new Key("p", "", "せ", "KeyP", white),
  new Key("[", "{", "゛", "BracketLeft", white),
  new Key("]", "}", "゜", "BracketRight", white),
  new Key(
    "\\",
    "|",
    "む",
    "Backslash",
    white,
    "backslash",
    "backslash-up",
    1.5
  ),
  new Key("del", "", "", "Delete", grey),
];

const row3 = [
  new Key("capslock", "", "", "CapsLock", grey, "capslock", "capslock-up", 1.7),
  new Key("a", "", "ち", "KeyA", white),
  new Key("s", "", "と", "KeyS", white),
  new Key("d", "", "し", "KeyD", white),
  new Key("f", "", "は", "KeyF", white),
  new Key("g", "", "き", "KeyG", white),
  new Key("h", "", "く", "KeyH", white),
  new Key("j", "", "ま", "KeyJ", white),
  new Key("k", "", "の", "KeyK", white),
  new Key("l", "", "り", "KeyL", white),
  new Key(";", ":", "れ", "Semicolon", white),
  new Key("'", '"', "け", "Quote", white),
  new Key("enter ツ", "", "", "Enter", charcoal, "enter", "enter-up", 2.3),
  new Key("pgup", "", "", "PageUp", grey),
];

const row4 = [
  new Key("shift", "", "", "ShiftLeft", grey, "shiftleft", "shiftleft-up", 2),
  new Key("z", "", "つ", "KeyZ", white),
  new Key("x", "", "さ", "KeyX", white),
  new Key("c", "", "そ", "KeyC", white),
  new Key("v", "", "ひ", "KeyV", white),
  new Key("b", "", "こ", "KeyB", white),
  new Key("n", "", "み", "KeyN", white),
  new Key("m", "", "も", "KeyM", white),
  new Key(",", "<", "ね", "Comma", white),
  new Key(".", ">", "る", "Period", white),
  new Key("/", "?", "め", "Slash", white),
  new Key(
    "shift",
    "",
    "",
    "ShiftRight",
    grey,
    "shiftright",
    "shiftright-up",
    2
  ),
  new Key("↑", "", "", "ArrowUp", charcoal),
  new Key("pgdn", "", "", "PageDown", grey),
];

const row5 = [
  new Key("ctrl", "", "", "ControlLeft", grey),
  new Key("win", "", "", "MetaLeft", grey),
  new Key("alt", "", "", "AltLeft", grey),
  new Key("", "", " ", "Space", charcoal, "space", "space-up", 7),
  new Key("alt", "", "", "AltRight", grey),
  new Key("func", "", "", "Fn", grey),
  new Key("ctrl", "", "", "ControlRight", grey),
  new Key("←", "", "", "ArrowLeft", charcoal),
  new Key("↓", "", "", "ArrowDown", charcoal),
  new Key("→", "", "", "ArrowRight", charcoal),
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
