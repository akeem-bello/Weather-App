import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [city, setcity] = useState('')
  const [weather, setweather] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d8cc56a5f045bebc79ba5dfb0e7bbf8`
    
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth(); 
  let year = currentDate.getFullYear();
  let weekDay = days[currentDate.getDay()];
  currentDate = day + '/' + month + '/' + year;

  let celcius = weather.temp - 273.15
  let secondCelcius = weather.feels - 273.15 

  let containerStyle = {
    padding: '6% 10%',
    
  }

  let divStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80)',
    backgroundSize: '100%',
    marginTop: '-50px',
    paddingBottom: '185px'
  }

  let tempStyle = {
    fontSize: '55px',
    marginTop: '100px'
  }

  let nameStyle = {
    fontSize: '20px',
    marginBottom: '10px'
  }
  
  const weatherDetails = ()=>{
      axios.get(url).then((res)=>{
          console.log(res.data)
          setweather({
            name: res.data.name,
            temp: res.data.main.temp,
            country: res.data.sys.country,
            feels: res.data.main.feels_like,
            pressure: res.data.main.pressure,
            wind: res.data.wind.speed,
            humidity: res.data.main.humidity,
            cloudiness: res.data.clouds.all
          })
      }).catch((err)=>{
        console.log(err)
    })

    
  }
  return (
    <>
    <div style={divStyle}>
    <div className="container mt-5" style={containerStyle}>
      <div className="row">
        <div className="col-7 mt-5">
          <div className="row mt-5">
            <div className="col-7" style={nameStyle}>
              {weekDay}
            </div>
            <div className="col-7" style={nameStyle}>
              <div>{currentDate}</div>
            </div>
            <div className="col-7">
            <div style={nameStyle}>
              <i className="fa-solid fa-location-dot"></i> {weather.name}, {weather.country}
              </div>
            </div>
          </div>

          <div>
            <p style={tempStyle}>{celcius.toFixed(1)}&deg;</p>
          </div>
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col-10">
              <input type="text" className='form form-control' placeholder='Search city' value={city} onChange={(e)=>setcity(e.target.value)}/>
            </div>
          
            <div className="col-2">
              <button onClick={weatherDetails} className=" btn btn-dark"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
          <hr /> 
          <div className='mt-5'>
          <h3>Weather Details</h3> <br />

          <div className="row">
            <div className="col-6"><p className="deets">Feels Like</p></div>
            <div className="col-6"> {secondCelcius.toFixed(1)}&deg;C</div>
          </div>
          <div className="row">
            <div className="col-6"><p>Cloudiness</p></div>
            <div className="col-6">{weather.cloudiness}%</div>
          </div>
          <div className="row">
            <div className="col-6"><p>Humidity</p></div>
            <div className="col-6">{weather.humidity}%</div>
          </div>
          <div className="row">
            <div className="col-6"><p>Wind</p></div>
            <div className="col-6">{weather.wind}m/s</div>
          </div>
          <div className="row">
            <div className="col-6"><p>Pressure</p></div>
            <div className="col-6">{weather.pressure}hPa</div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App