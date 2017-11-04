import React from "react";

const PLACES = [
  { name: "Paris", zip: "75003,fr" },
  { name: "Marseille", zip: "13001,fr" },
  { name: "Saint-Maurice", zip: "94410,fr" }
];

class WeatherDisplay extends React.Component {
  state = {
    weatherData: null
  };
  render() {
    if (this.state.weatherData === null) {
      return <p>Loading</p>;
    }

    const iconUrl =
      "http://openweathermap.org/img/w/" +
      this.state.weatherData.weather[0].icon +
      ".png";

    return (
      <div>
        <h1>{this.props.name}</h1>
        <img src={iconUrl} />
        <p>Temperature : {this.state.weatherData.main.temp}°</p>
      </div>
    );
  }
  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.props
        .zip}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      });
  }
}

class App extends React.Component {
  state = {
    activePlace: 0
  };

  render() {
    return (
      <div>
        {PLACES.map((place, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                this.setState({ activePlace: index });
              }}
            >
              {place.name}
            </button>
          );
        })}
        <WeatherDisplay
          key={this.state.activePlace}
          name={PLACES[this.state.activePlace].name}
          zip={PLACES[this.state.activePlace].zip}
        />
      </div>
    );
  }
}

export default App;
