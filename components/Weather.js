import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowTemp from "./ShowTemp";
import moment from "moment";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(moment().format("hh:mm:ss A"));
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM Do, YYYY")
  );
  const [currentDay, setCurrentDay] = useState(moment().format("dddd"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("hh:mm:ss A"));
      setCurrentDate(moment().format("MMMM Do"));
      setCurrentDay(moment().format("dddd"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0d7abbd048fdcd72db7bb4391cd89945`
      );

      if (response.data) {
        setWeatherData(response.data);
      } else {
        setWeatherData({ error: "No Data Found" });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData({ error: "No Data Found" });
    }
  };

  return (
    <div className="bg_image">
      <div className="bg_overlay">
        <div className="container section text-center">
          <div className="row">
            {/* form section=============================================== */}
            <div className="col-md-6">
              <div className="form_cont">
                <h2 className="search_title">Get Weather Here</h2>
                <form className="weather_form">
                  <input
                    type="text"
                    className="wht_fcontrol"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <button
                    className="weather_btn"
                    type="submit"
                    onClick={handleClick}
                  >
                    Search City
                  </button>
                </form>
                <div className="timeZone">
                  {weatherData && !weatherData.error ? (
                    <div>
                      <h1 className="liveClock">{currentTime}</h1>
                      <h2 className="liveDate">{currentDate}|{currentDay}</h2>
                    </div>
                  ) : (
              
                    <div>
                      <h1 className="liveClock">00:00:00</h1>
                      <h2 className="liveDate">No Date to Show</h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Weather Data Section============================================== */}
            <div className="col-md-6">
              <div className="weather_card">
                {weatherData && !weatherData.error ? (
                  <ShowTemp text={weatherData} />
                ) : (
                  <p className="err_log">No Data Found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
