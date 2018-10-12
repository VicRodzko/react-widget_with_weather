import React, {Component} from "react";
import axios from 'axios';

import { getTemperature } from "./services";
import { getCloudIcon } from "./services";
import { getWindDeg } from "./services";
import { getListOneDay } from "./services";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: "",
      cloudIcon: "",
      countryName: "",
      windSpeed: "",
      windDeg: "",

      curTime: "",

      listOneDay: []
    }
  }

  componentDidMount(){
    setInterval( () => {
      this.setState({
        curTime: new Date().toLocaleTimeString()
      })
    }, 1000 );

    let apiUrlOneDay = "https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247";
    axios.get(apiUrlOneDay).then( res => {
      this.setState( { temperature: getTemperature(res.data),
                       cloudIcon: getCloudIcon(res.data),
                       countryName: res.data.name,
                       windSpeed: res.data.wind.speed + " m/s",
                       windDeg: getWindDeg(res.data.wind.deg),
                      });
    });

    let apiUrlMoreDay = "https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247";
    axios.get(apiUrlMoreDay).then( res => {
      this.setState( { listOneDay: getListOneDay(res.data) } );
    });
  }  
  
  render() {
    return (
      <div>
        <div className="container">
          <div className="temp">
            {this.state.temperature}° C
          </div>
          <div className="time">
            {this.state.curTime}
          </div>
          <div className="cloud">
            <img src={this.state.cloudIcon} />
          </div>
          <div className="country">
            {this.state.countryName}
          </div>
          <div className="windSpeed">
            {this.state.windSpeed}
          </div>
          <div className="windDeg">
            {this.state.windDeg}
          </div>
        </div>
        <ul className="backContainer">
          {this.state.listOneDay.map((item, index) => {
            return (
              <li key={index} className="containerNew">
                {item.dt_txt}
                <img src={getCloudIcon(item)} />
                {getTemperature(item)}° C
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
