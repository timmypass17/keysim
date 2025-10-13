import { Key } from "./key.js";
import { Prompt } from "./prompt.js";
import { Keyboard } from "./keyboard.js";
import { layout65 } from "./layout-65.js";

let keyboard = new Keyboard();
keyboard.createKeyboard(layout65);

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
  if (key) {
    key.press();
    prompt.handleKeyPress(event.key);
  }
});

document.addEventListener("keyup", (event) => {
  const key = keyboard.keys.flat().find((k) => k.code === event.code);
  if (key) {
    key.release();
  }
});

window.addEventListener("resize", () => {
  prompt.updateCaret();
});
