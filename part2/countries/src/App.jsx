/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;

function Weather({ country }) {
  const lat = country.latlng[0];
  const long = country.latlng[1];
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(weatherURL).then((response) => {
      setWeather(response.data);
    });
  }, [weatherURL]);

  if (weather == null) {
    return null;
  }

  const iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <h2>Weather in {country.capital[0]}</h2>
      <img src={iconURL} alt="weather icon" />
      <p>temperature {weather.main.temp} Celcius</p>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
}

function Country({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" width="100" />
      <Weather country={country} />
    </div>
  );
}

function CountryList({ countries, handleShowClick }) {
  return (
    <div>
      {countries.map((c) => (
        <div key={c.name.common}>
          {c.name.common}
          <button onClick={() => handleShowClick(c)}>Show</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);
  if (countries == null) {
    return null;
  }

  const handleCountryChange = (event) => {
    setFilter(event.target.value);
  };
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const filteredCount = filteredCountries.length;
  const tooMany = filter !== "" && filteredCount > 10;

  const handleShowClick = (country) => {
    setFilter(country.name.common);
  };

  return (
    <div>
      find countries
      <input type="text" value={filter} onChange={handleCountryChange} />
      {tooMany && <p>Too many matches, specify another filter</p>}
      {filteredCount > 1 && filteredCount <= 10 && (
        <CountryList
          countries={filteredCountries}
          handleShowClick={handleShowClick}
        />
      )}
      {filteredCount === 1 && <Country country={filteredCountries[0]} />}
    </div>
  );
}

export default App;
