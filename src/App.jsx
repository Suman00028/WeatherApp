import { useEffect, useState } from "react"


function App() {
  const BASE_URL = 'https://api.weatherapi.com/v1/';
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);


  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(`${BASE_URL}current.json?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('An error happened', error);
    }

    setSearchQuery('');
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-white p-4">
      <div className="w-full max-w-[90%] md:max-w-[500px] bg-blue-300 h-auto p-6 md:p-10 text-lg md:text-2xl rounded-lg">

        {/* Input section */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
          <input
            className="border-2 border-gray-700 focus:outline-none focus:scale-105 transition-transform duration-200 text-black rounded-md p-2 mb-3 md:mb-0 md:mr-3 w-full md:w-auto"
            type="text"
            placeholder="Search location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="bg-red-400 p-2.5 rounded-md cursor-pointer hover:bg-red-500 duration-200 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Info section */}
        <div className="flex flex-col h-full justify-baseline gap-5 mt-7">
          {weatherData && (
            <div className="flex flex-col gap-5 items-center">
              <h1 className="text-3xl md:text-5xl">{weatherData.location?.country}</h1>

              {/* Weather condition */}
              <div className="w-24 h-24 md:w-36 md:h-36 text-center mb-6 md:mb-10">
                {weatherData.current?.condition.icon && (
                  <>
                    <img className="w-32 md:w-40" src={weatherData.current?.condition.icon} />
                    <h1 className="text-2xl md:text-4xl text-white">{weatherData.current?.condition.text}</h1>
                  </>
                )}
              </div>

              {/* Weather information */}
              <div className="mt-6 md:mt-10 text-center">
                <h1 className="text-xl md:text-3xl text-black">
                  Temperature: <span className="text-red-700 font-bold">{weatherData.current?.temp_c}°C</span>
                </h1>
                <h1 className="text-xl md:text-3xl text-black">
                  Humidity: <span className="text-red-700 font-bold">{weatherData.current?.humidity}%</span>
                </h1>
                <h1 className="text-xl md:text-3xl text-black">
                  Wind Speed: <span className="text-red-700 font-bold">{weatherData.current?.wind_kph} km/h</span>
                </h1>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App
