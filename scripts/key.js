export class Key {
  constructor(
    label,
    subLabel,
    legend,
    code,
    color,
    sound = "regular",
    soundUp = "regular-up",
    width = 1
  ) {
    this.label = label;
    this.subLabel = subLabel;
    this.legend = legend;
    this.code = code;
    this.color = color;
    this.width = width;
    this.pressed = false;
    this.foregroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    this.backgroundColor = `rgb(${color.r * 0.9}, ${color.g * 0.9}, ${color.b * 0.9})`;
    this.borderColor = `rgb(${color.r * 0.8}, ${color.g * 0.8}, ${color.b * 0.8})`;
    this.sound = new Audio(`audio/${sound}.mp3`);
    this.soundUp = new Audio(`audio/${soundUp}.mp3`);
  }

  // Can only have 1 constructor in JS
  static from(json) {
    return new Key(
      json.label,
      json.subLabel,
      json.legend,
      json.code,
      json.color,
      json.sound,
      json.soundUp,
      json.width
    );
  }

  press() {
    this.pressed = true;
    // console.log(`${this.label} pressed`);
    if (this.keyInnerDiv) {
      this.keyInnerDiv.style.backgroundColor = this.backgroundColor;
      this.keyButton.style.transform = "translateY(2px)";
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }

  release() {
    this.pressed = false;
    // console.log(`${this.label} released`);
    if (this.keyInnerDiv) {
      this.keyInnerDiv.style.backgroundColor = this.foregroundColor;
      this.keyButton.style.transform = "translateY(0)";
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
    span.style.color = this.getTextColor(this.color);
    span.style.fontWeight = "500";
    keyButton.appendChild(keyInnerDiv);

    if (this.subLabel !== "") {
      const subLabelSpan = document.createElement("span");
      subLabelSpan.textContent = this.subLabel.toUpperCase();
      subLabelSpan.style.color = this.getTextColor(this.color);
      keyInnerDiv.appendChild(subLabelSpan);
    }

    keyInnerDiv.appendChild(span);

    if (this.legend !== "") {
      const legendSpan = document.createElement("span");
      legendSpan.textContent = this.legend.toUpperCase();
      legendSpan.style.color = this.getTextColor(this.color);
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
