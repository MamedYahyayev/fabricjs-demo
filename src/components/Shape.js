import { forwardRef, useImperativeHandle } from "react";

const Shape = forwardRef((props, ref) => {
  console.log("ref in shape component: ", ref);
  useImperativeHandle(ref, () => ({
    add() {
      console.log("ref in shape add function: ", ref);
      console.log(props)
      props.addShape();
    },
  }));

  return null;
});

export default Shape;
