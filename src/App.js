import "./App.css";
import DesignCanvas from "./components/DesignCanvas";
import React from "react";
import { fabric } from "fabric";

function App() {
  const circleNumber = React.useRef(1);
  const rectNumber = React.useRef(circleNumber.current + 10);
  const imageRef = React.useRef();
  const [canvasElements, setCanvasElements] = React.useState([]);
  const [selectedShape, setSelectedShape] = React.useState(null);
  const [file, setFile] = React.useState("");

  React.useEffect(() => {
    // console.log("selected shape inside of useEffect: ", selectedShape);
    // console.log("active object remove: ", window.canvas.remove(window.canvas.getActiveObject()))
    console.log("canvas elements: ", canvasElements)
  }, [canvasElements]);

  const handleShapeSelection = (canvasElement) => {
    setSelectedShape(canvasElement);
  };

  const addCircle = () => {
    const id = circleNumber.current;
    const circleEl = new fabric.Circle({ radius: 30, fill: "purple" });
    const newCanvasElement = { id, name: `Circle-${id}`, canvas: circleEl };
    circleEl.onSelect = () => handleShapeSelection(newCanvasElement);

    setCanvasElements((prevCanvasElements) => [
      ...prevCanvasElements,
      newCanvasElement,
    ]);

    setSelectedShape(circleEl);
    window.canvas.add(circleEl);
    circleNumber.current += 1;
  };

  const addRectangle = () => {
    const id = rectNumber.current;
    const rectangleEl = new fabric.Rect({
      width: 300,
      height: 200,
      fill: "lightblue",
    });
    const newCanvasElement = {
      id,
      name: `Rectangle-${id - 10}`,
      canvas: rectangleEl,
    };
    rectangleEl.onSelect = () => handleShapeSelection(newCanvasElement);

    setCanvasElements((prevCanvasElements) => [
      ...prevCanvasElements,
      newCanvasElement,
    ]);

    setSelectedShape(rectangleEl);
    window.canvas.add(rectangleEl);
    rectNumber.current += 1;
  };

  const changeShapeColor = (e) => {
    selectedShape.canvas.set("fill", e.target.value);
    window.canvas.renderAll();
  };

  const changeShapeWidth = (e) => {
    selectedShape.canvas.set({ width: +e.target.value });
    window.canvas.renderAll();
  };

  const changeShapeHeight = (e) => {
    selectedShape.canvas.set({ height: +e.target.value });
    window.canvas.renderAll();
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };

  const uploadImage = () => {
    console.log("file in upload image: ", file);

    const imageEl = new fabric.Image(imageRef.current, {
      left: 100,
      top: 100,
      originY: "center",
      originX: "center",
      borderColor: "red",
      cornerColor: "green",
      cornerSize: 10,
      cornerStyle: "rectangle",
      transparentCorners: true,
      lockUniScaling: true,
    });

    console.log(imageEl);
    window.canvas.add(imageEl);
  };

  const removeElement = (id) => {
    const canvasElIndex = canvasElements.findIndex((el) => el.id === id);
    const canvasElement = canvasElements[canvasElIndex];
    const updatedCanvasElements = canvasElements.filter(
      (element) => element.id !== id
    );
    setCanvasElements(updatedCanvasElements);
    window.canvas.remove(canvasElement.canvas);
  };

  return (
    <div className="App">
      <DesignCanvas width={800} height={800}></DesignCanvas>
      <div className="tools">
        <button onClick={() => addCircle()} className="tool-element">
          Add Circle
        </button>
        <button onClick={() => addRectangle()} className="tool-element">
          Add Rectangle
        </button>
        <input
          id="colorPicker"
          type="color"
          onChange={(e) => changeShapeColor(e)}
          className="tool-element"
        />

        <input
          type="file"
          alt="file-input"
          className="tool-element"
          onChange={(e) => addImage(e)}
        />
        <img
          src={file}
          alt="file"
          id="image-element"
          ref={imageRef}
          width={100}
          height={100}
        />

        <button onClick={() => uploadImage()} className="tool-element">
          Upload Image
        </button>

        {/* {selectedShape && (
          <div className="sizes">
            Sizes
            <div className="size-elements">
              Width:{" "}
              <input
                type="text"
                onChange={(e) => changeShapeWidth(e)}
                value={selectedShape.canvas.get("width")}
              />
            </div>
            <div className="size-elements">
              Height:{" "}
              <input
                type="text"
                onChange={(e) => changeShapeHeight(e)}
                value={selectedShape.canvas.get("height")}
              />
            </div>
          </div>
        )} */}
      </div>

      <div className="elements">
        Elements
        {canvasElements.map((el) => (
          <p key={el.id}>
            {el.name}{" "}
            <span
              className="delete-element"
              onClick={() => removeElement(el.id)}
            >
              X
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
