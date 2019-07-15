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
    // Request initial animation frame
    requestAnimationFrame(timestamp => {
      this.onAnimFrame(timestamp);
    });
  }

  /**
   * When the component is about to unmount
   */
  componentWillUnmount() {
    // Stop animating
    this.continueAnimation = false;
  }

  /**
   * Called every frame of animation
   */
  onAnimFrame(timestamp) {
    // If desired, request another anim frame for later
    if (this.continueAnimation) {
      requestAnimationFrame(timestamp => {
        this.onAnimFrame(timestamp);
      });
    }

    // TODO animate stuff
    
  }
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default MainComponent;
