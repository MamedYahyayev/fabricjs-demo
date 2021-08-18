import React, { forwardRef } from "react";
import { fabric } from "fabric";
import Shape from "./Shape";

const Rectangle = forwardRef((props, ref) => {
  const canvas = window.canvas;
  console.log("ref in rectangle: ", ref)

  React.useEffect(() => {
    const rect = new fabric.Rect(props);
    canvas.add(rect);
  }, [canvas, props]);

  const addRectangle = () => {
    const rect = new fabric.Rect(props);
    canvas.add(rect);
    canvas.selection = true;
    canvas.renderAll();
    canvas.calcOffset();
  };

  return <Shape ref={ref} addShape={() => addRectangle()} />;
});

export default Rectangle;
