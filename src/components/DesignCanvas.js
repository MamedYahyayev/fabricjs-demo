import React from "react";
import { useCanvas } from "./useCanvas";
import { fabric } from "fabric";

const DesignCanvas = ({ children, width = 600, height = 600 }) => {
  const canvas = useCanvas();

  React.useEffect(() => {
    window.canvas = new fabric.Canvas("canvas", {
      backgroundColor: "rgb(100,100,200)",
      selectionColor: "blue",
      selectionLineWidth: 2,
    });
  }, []);

  return (
    <>
      <canvas id="canvas" width={width} height={height}/>
      {canvas && children}
    </>
  );
};

export default DesignCanvas;
