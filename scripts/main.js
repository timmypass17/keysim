import { Key } from "./key.js";
import { Prompt } from "./prompt.js";
import { Keyboard } from "./keyboard.js";
import { layout65 } from "./layout-65.js";

var wordInput = document.getElementById("wordInput");
var switchSelect = document.getElementById("switch-select");

switchSelect.onchange = (event) => {
  var switchText = event.target.value;
  keyboard.updateSwitch(switchText);
};

const defaultSwitchOption = switchSelect.children[0].children[0].value;

let keyboard = new Keyboard();
keyboard.updateLayout(layout65);
keyboard.updateSwitch(defaultSwitchOption);
keyboard.updateVolume(1);

const text =
  "Second year high school student Reo Mikage wants nothing more than to escape his illustrious family's shadow by becoming a soccer star and winning the World Cup. The only thing that's missing is a talented diamond in the rough who can help him achieve his dream.";
const prompt = new Prompt(text);
prompt.setup();

// Listenr for key taps for entire document
document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    prompt.handleKeyPress(event.key);
    return; // Ignore repeated events (holding key causes function to call multiple time)
  }

  if (event.code === "AltLeft" || event.code === "AltRight") {
    event.preventDefault(); // prevents some default behaviors
  }

  // Find associated key
  const key = keyboard.keys.flat().find((k) => k.code === event.code);
  key.press();

  if (key && document.activeElement === wordInput && isVisibleTextKey(event)) {
    prompt.handleKeyPress(event.key);
  }
});

function isVisibleTextKey(event) {
  const key = event.key;

  // Allow single visible characters (letters, numbers, punctuation, symbols)
  if (key.length === 1 && key.match(/\S/)) return true; // non-whitespace visible char

  // Allow space
  if (key === " ") return true;

  // Allow backspace and delete for editing
  if (key === "Backspace" || key === "Delete") return true;

  return false;
}

document.addEventListener("keyup", (event) => {
  const key = keyboard.keys.flat().find((k) => k.code === event.code);
  if (key) {
    key.release();
  }
});

window.addEventListener("resize", () => {
  prompt.updateCaret();
});

// document.getElementById("soundbutton").addEventListener("click", function () {
//   const shouldMute = this.textContent === "🔈" ? true : false;
//   this.textContent = shouldMute ? "🔇" : "🔈"; // change this to image.src if you have one
//   keyboard.mute(shouldMute);
// });

const volumeControl = document.getElementById("volume-control");

volumeControl.addEventListener("change", (event) => {
  console.log(event.target.value / 100);
  keyboard.updateVolume(event.target.value / 100);
});
