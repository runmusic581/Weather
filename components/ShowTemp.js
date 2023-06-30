import {FiCloud, FiRain, FiCloudDrizzle } from "react-icons/fi";
import { BsFillSunFill,BsFillCloudsFill } from "react-icons/bs";
function ShowTemp({ text }) {
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
        return <BsFillSunFill className="iconsun" />;
      case "02d":
        return <BsFillCloudsFill />;
      case "03d":
      case "04d":
        return <BsFillCloudsFill />;
      case "09d":
        return <FiCloudDrizzle />;
      case "10d":
        return <FiRain />;
      default:
        return <BsFillSunFill className="iconsun" />;
    }
  };

  return (
    <div>
      <div className="data_head">
        <div className="weather_icon">
          {getWeatherIcon(text.weather[0].icon)}
        </div>
        <div className="info_center">
          <h1>{text.name}</h1>
          <h5>{text.weather[0].description}</h5>
          <h1>Temp-{text.main.temp}°C</h1>
          <h3>Min-{text.main.temp_min}°C | Max-{text.main.temp_max}°C</h3>
        </div>
      </div>
    </div>
  );
}

export default ShowTemp;
