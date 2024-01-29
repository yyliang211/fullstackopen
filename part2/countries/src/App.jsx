/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

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
  console.log(countries);

  const handleCountryChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const filteredCount = filteredCountries.length;
  const tooMany = filter !== "" && filteredCount > 10;

  return (
    <div>
      find countries
      <input type="text" value={filter} onChange={handleCountryChange} />
      {tooMany && <p>Too many matches, specify another filter</p>}
      {filteredCount > 1 &&
        filteredCount <= 10 &&
        filteredCountries.map((c) => (
          <p key={c.name.common}>{c.name.common}</p>
        ))}
      {filteredCount === 1 && <Country country={filteredCountries[0]} />}
    </div>
  );
}

export default App;
