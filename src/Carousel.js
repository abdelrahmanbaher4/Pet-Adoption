/* eslint-disable jsx-a11y/alt-text */
import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // eslint-disable-next-line react/no-typos
  static defaultprops = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      //to convert the string to a number
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} atl="animal"></img>
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              key={photo}
              src={photo}
              //html thing
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
