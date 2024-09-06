import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";


 


function App() {

  const val = useRef();

  const [weatherData , setWeatherData] = useState([])
  const [city , setCity] = useState("");

  const submitBtn = (e) => {

    e.preventDefault()

    setCity(val.current.value)
 }


  useEffect(() => {

     const apiCall = async () => {

      await axios(`https://api.weatherapi.com/v1/current.json?key=2feb46cda2064407bb560452240509&q=${city}&aqi=no`)

     .then((resp) => {
      weatherData.unshift(resp.data)
      setWeatherData([...weatherData])
      val.current.value=""
      } )
     
     .catch((err) => {
      console.log(err.message)
    })
  }
    apiCall()

  } , [city])


  return (
  <>
  <h1>Weather App</h1>
   <form onSubmit={submitBtn}>
  <label
    htmlFor="default-search">
    Search
  </label>
    <input
      type="search"
      id="default-search" ref={val} placeholder="Search weather..." required=""/>
    <button
      type="submit">
      Search
    </button>
    </form>


{weatherData.map((item , index) => {



    return(

 

 


  <div key={index}>

  <div id="weather-card">
        <h3 id="city-name">{item.location.name}, {item.location.region} , {item.location.country}</h3>
        <div className="weather-icon" id="weather-icon">
          <img className="center size" src={item.current.condition.icon} alt="icon"/></div>
        <div className="temperature" id="temperature">{item.current.temp_c}°C</div>
        <div className="description" id="description">Wind Speed: {item.current.wind_kph} Kph</div>
    </div>
    </div>
    )
    })}
    </>
  )
}


export default App