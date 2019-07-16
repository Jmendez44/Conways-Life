import React, { Component } from "react";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.continueAnimation = true;
  }


  /**
   * After the component has mounted
   */
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    for (var x = 0.5; x < 501; x += 10) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 500);
    }

    for (var y = 0.5; y < 501; y += 10) {
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

    ctx.beginPath();

    ctx.fillStyle = "black";
    ctx.fillRect(250, 250, 10, 10);
    
    ctx.fillRect(230, 260, 10, 10)
    ctx.stroke();
  }

  /**
   * When the component is about to unmount
   */
  // componentWillUnmount() {
  //   // Stop animating
  //   this.continueAnimation = false;
  // }

  // onAnimFrame(timestamp) {

  //   if (this.continueAnimation) {
  //     requestAnimationFrame(timestamp => {
  //       this.onAnimFrame(timestamp);
  //     });
  //   }

  //   // TODO animate stuff

  // }
  render() {
    return <canvas ref="canvas" width={500} height={500} />;
  }
}

export default MainComponent;
