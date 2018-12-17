import React from "react";

const MoreButton = props => {
  console.log("In MoreButton. Props are ", props);
  return <button onClick={props.handleNext}>More sushi!</button>;
};

export default MoreButton;
