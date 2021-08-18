import { fabric } from "fabric";

// initialize canvas
// create a function and use that functuin inside of app component to initialize
window.canvas = new fabric.Canvas("canvas", {
  backgroundColor: "rgb(100,100,200)",
  selectionColor: "blue",
  selectionLineWidth: 2,
});

export function useCanvas() {
  return window.canvas;
}

// isdifadeci cixiarsa eger applikasiyadan canvasi local storage e save et qayidanda ise ordan qaytar
