"use strict";

let synth;
// notes array.
let notes = ["F3", "G3", "F3", "C3", "C3", "F3", "Eb3", "C3"];
let currentNote = 0;

function setup() {
  createCanvas(600, 600);

  synth = new p5.PolySynth();

  // Smooths in audio.
  userStartAudio();
}

function draw() {
  background(0);
}

function keyPressed() {
  // Ghost player. Every x ms, it's going to play a note.
  setInterval(playRandomNote, 200);
}

function playRandomNote() {
  let note = notes[currentNote];
  synth.play(note, 1, 0, 0.1);

  currentNote = currentNote + 1;
  if (currentNote === notes.length) {
    currentNote = 0;
  }
}
