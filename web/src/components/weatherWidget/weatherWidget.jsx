import './weatherWidget.css'

const WeatherCard = ({weatherData}) => {

    return(
   
    <div className='weather-card'>

    CountryName: {weatherData?.sys?.country}
    <br />
    CityName: {weatherData?.name}
    <br />
   {/* Temperature:{weatherData?.main?.temp} */}
   <div className='temp'>{weatherData?.main?.temp}°C</div>
    <br />
    Humidity: {weatherData?.main?.humidity}
    <br />
    WindSpeed: {weatherData?.wind?.speed}
    <br />
   Weather: {weatherData?.weather[0]?.description}
   <br />
    Pressure: {weatherData?.main?.pressure}

    </div>

    );
    
    
}

export default WeatherCard


