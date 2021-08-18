import "./App.css";
import DesignCanvas from "./components/DesignCanvas";
import React from "react";
import { fabric } from "fabric";

function App() {
  const number = React.useRef(1);
  const [canvasElements, setCanvasElements] = React.useState([]);
  const [selectedCircle, setSelectedCircle] = React.useState(null);

  const handleSelect = (id) => {
    console.log(id);
  };

  const addCircle = () => {
    const id = number.current;
    const circleEl = new fabric.Circle({ radius: 30, fill: "purple" });
    circleEl.onSelect = () => handleSelect(id);

    const newCanvasElement = { id, name: `Circle-${id}`, canvas: circleEl };
    setCanvasElements((prevCanvasElements) => [
      ...prevCanvasElements,
      newCanvasElement,
    ]);

    console.log("canvas elements: ", canvasElements);

    setSelectedCircle(circleEl);
    window.canvas.add(circleEl);
    number.current += 1;
  };

  const changeCircle = (e) => {
    selectedCircle.set("fill", e.target.value);
    window.canvas.renderAll();
  };

  return (
    <div className="App">
      <DesignCanvas width={800} height={800}></DesignCanvas>
      <div className="tools">
        <button onClick={() => addCircle()} className="tool-element">
          Add Circle
        </button>
        <input
          id="colorPicker"
          type="color"
          onChange={(e) => changeCircle(e)}
          className="tool-element"
        />
      </div>

      <div className="elements">
        Elements
        {canvasElements.map((el) => (
          <p key={el.id}>{el.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
