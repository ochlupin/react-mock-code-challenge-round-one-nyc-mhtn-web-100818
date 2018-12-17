import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// As a student I will be awesome at
// flow (data goes down, actions go down, actions calls go at the same level or up)
// props are rad only state and be updated
// use a functional component unless you need state or life cycle methods
// fetching (get, post, patch, delete, *all)
// setState(1st params can be an obj or fn, second param to run after set state is complete)
// how to update (but not modify. Create a new version) and object inside a collection
// use a cb to send a piece of data that is currently in scope `()=>cb(data in scope)` and not `cb(data in scope)`
// where to add event handlers
// where to add the `key` prop
// not afraid to look things up
// how to set initial state and what to use
// how to insure your app can render without data
// how to test props, state updates and event handlers
// where to place data. Data goes on the top most component that requires the data or one level up if we have siblings
// JSX quirks + how to exit JSX + tenery statements for conditional rending

// Endpoint!
const API = "http://localhost:3000/sushis";
const numberOfSushiPiecesToDisplay = 4;

class App extends Component {
  state = {
    sushi: [],
    startIndex: 0,
    budget: 100
  };

  componentDidMount() {
    fetch(API)
      .then(r => r.json())
      .then(sushiApiData => {
        const sushi = sushiApiData.map(s => ({ ...s, eaten: false }));
        this.setState({ sushi: sushi }, () => {
          console.log("Set state after fetch. The state is now: ", this.state);
        });
      });
  }

  chargeForSushi = (id, price) => {
    // there are many ways to solve this problem
    const sushi = this.state.sushi.map(s => {
      if (s.id === id) {
        return { ...s, eaten: true };
      } else {
        console.log("nothing to change");
        return s;
      }
    });
    this.setState({ sushi: sushi, budget: this.state.budget - price });
  };

  canEat = ({ eaten, price }) => !eaten && this.state.budget >= price;

  handleEatSushi = sushi => {
    if (this.canEat(sushi)) {
      this.chargeForSushi(sushi.id, sushi.price);
    } else {
      console.log("Not enough $");
    }
  };

  handleNext = () => {
    //debugger;
    // this.setState(state => ({
    //   startIndex: state.startIndex + numberOfSushiPiecesToDisplay
    // }));
    if (
      this.state.startIndex + numberOfSushiPiecesToDisplay >=
      this.state.sushi.length
    ) {
      this.setState({
        startIndex: 0
      });
    } else {
      this.setState({
        startIndex: this.state.startIndex + numberOfSushiPiecesToDisplay
      });
    }
  };

  sushiToDisplay = () => {
    const startIndex = this.state.startIndex;
    const endIndex = this.state.startIndex + numberOfSushiPiecesToDisplay;
    return this.state.sushi.slice(startIndex, endIndex);
  };

  render() {
    console.log("I should only see 4 pieces: ", this.sushiToDisplay());
    return (
      <div className="app">
        <SushiContainer
          sushi={this.sushiToDisplay()}
          handleNext={this.handleNext}
          handleEatSushi={this.handleEatSushi}
        />
        <Table
          budget={this.state.budget}
          eatenSushi={this.state.sushi.filter(s => s.eaten)}
        />
      </div>
    );
  }
}

export default App;
