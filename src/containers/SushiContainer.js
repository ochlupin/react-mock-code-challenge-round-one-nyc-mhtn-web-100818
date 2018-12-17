import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = props => {
  console.log("In SushiContainer. Props are: ", props);
  //props.sushi.forEach(s => console.log("Doing stuff to sushi"));
  return (
    <Fragment>
      <div className="belt">
        {props.sushi.map(s => (
          <Sushi key={s.id} sushi={s} handleEatSushi={props.handleEatSushi} />
        ))}
        <MoreButton handleNext={props.handleNext} />
      </div>
    </Fragment>
  );
};

export default SushiContainer;
