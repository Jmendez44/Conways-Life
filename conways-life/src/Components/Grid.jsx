import React, { Component } from "react";
let gridWidth = 500;
let gridHeight = 500;

let createArray = rows => {
  //creates a 2 dimensional array of required height
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
};

// let fillRandom = () => {
//   let arr = createArray(gridWidth);
//   //fill the grid randomly

//   for (let j = 0; j < gridHeight; j++) {
//     //iterate through rows

//     for (let k = 0; k < gridWidth; k++) {
//       //iterate through columns

//       let rawRandom = Math.random(); //get a raw random number

//       let improvedNum = rawRandom * 2; //convert it to an int

//       let randomBinary = Math.floor(improvedNum);

//       if (randomBinary === 1) {
//         arr[j][k] = 1;
//       } else {
//         arr[j][k] = 0;
//       }
//     }
//   }
//   return arr;
// };

let fillIn = () => {
  let arr = createArray(gridWidth);
  //fill the grid randomly

  for (let j = 0; j < gridHeight; j++) {
    //iterate through rows

    for (let k = 0; k < gridWidth; k++) {

      if (j%20 === 0 && k%20 === 0){
        arr[j][k] = 1;
      } else {
        arr[j][k] = null;
      }


      //iterate through columns
      
    }
    
  }

  // arr[21][1] = 1;
  // arr[20][20] = 1;
  // arr[480][480] = 1;
  return arr;
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: fillIn()
    };

    this.continueAnimation = true;
  }

  drawCell = () => {
    //draw the contents of the grid onto a canvas

    const canvas = this.refs.canvas;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 500); //this should clear the canvas ahead of each redraw

    for (var j = 1; j < gridHeight; j++) {
      //iterate through rows

      for (var k = 1; k < gridWidth; k++) {
        //iterate through columns

        if (this.state.arr[j][k] === 1) {
          ctx.fillStyle = "black";

          ctx.fillRect(j, k, 15, 15);
        } 
      }
    }
  };



  componentDidMount() {
    this.drawCell();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    for (var x = 0.5; x < 501; x += 20) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 500);
    }

    for (var y = 0.5; y < 501; y += 20) {
      ctx.moveTo(0, y);
      ctx.lineTo(500, y);
    }

    ctx.moveTo(0, 0);

    ctx.strokeStyle = "black";
    ctx.stroke();

    // Request initial animation frame
    // requestAnimationFrame(timestamp => {
    //   this.onAnimFrame(timestamp);
    // });

    console.log(this.state.arr);
  }

  handleClick = (e) => {
    e.preventDefault();
    
  }
 
  getMousePos = (canvas, evt) => {
    
    let rect = canvas.getBoundingClientRect();
    
    return {
      x: evt.clientX - rect.left ,
      y: evt.clientY - rect.top 
    };
  };

  render() {
    return (
      <>
        <canvas ref="canvas" width={500} height={500} onClick={this.handleClick = (evt) => {
          const canvas = this.refs.canvas;
          let mousePos = this.getMousePos(canvas, evt);
          console.log(mousePos.x + ',' + mousePos.y)
        }} />
      </>
    );
  }
}

export default Grid;
