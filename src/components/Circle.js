import React, { forwardRef, useImperativeHandle } from "react";
import { fabric } from "fabric";

const Circle = forwardRef((props, ref) => {
  const canvas = window.canvas;

  React.useEffect(() => {
    const circle = new fabric.Circle(props);
    canvas.add(circle);
    canvas.selection = true;
    canvas.renderAll();
    canvas.calcOffset();
    console.log("hey i am in use effect")
  }, [canvas, props]);

  /* useImperativeHandle(ref, () => ({
    addCircle(props) {
      const circle = new fabric.Circle(props);
      canvas.add(circle);
      canvas.selection = true;
      canvas.renderAll();
      canvas.calcOffset();
    },
  })); */

  return null;
});

export default Circle;
