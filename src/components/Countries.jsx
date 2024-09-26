import { useEffect, useState } from "react";
import Country from "./Country";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [isSearchEmpty, setIsSearchEmpty] = useState(false); // To track empty search results

  // Fetch Countries Data Load ===========================
  useEffect(() => {
    const fetchCountries = async () => {
      const fetchData = await fetch("https://restcountries.com/v3.1/all");
      const data = await fetchData.json();

      // Filter out Americas, India, Israel, and Europe
      const filteredCountries = data.filter(
        (country) =>
          country?.region !== "Americas" && // Exclude Americas
          country?.name?.common !== "India" && // Exclude India
          country?.name?.common !== "Israel" && // Exclude Israel
          country?.region !== "Europe" // Exclude Europe
      );

      // Sort countries by population (descending order)
      const sortedCountries = filteredCountries.sort(
        (a, b) => b.population - a.population
      );

      setCountries(sortedCountries);
    };
    fetchCountries();
  }, []);

  // Country details button handler ============================
  const [country, setCountry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countryDetailsHandler = (countryDetails) => {
    const countryCurrencies = Object.entries(
      countryDetails?.currencies || {}
    ).map(([code, { name, symbol }]) => ({
      code,
      name,
      symbol,
    }));

    const countryLanguages = Object.entries(
      countryDetails?.languages || {}
    ).map(([code, name]) => ({
      code,
      name,
    }));

    setCountry({
      ...countryDetails,
      flag: countryDetails?.flags?.svg,
      population: countryDetails?.population,
      currencies: countryCurrencies,
      languages: countryLanguages,
    });
    setIsModalOpen(true);
  };

  const closeModalBtn = () => {
    setIsModalOpen(false);
  };

  const closeModalOutsideClick = (e) => {
    if (e.target.id === "modalBackdrop") {
      setIsModalOpen(false);
    }
  };

  // Filtered countries based on search term ====================
  const filteredCountries = countries.filter((country) =>
    country?.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Track if search results are empty
  useEffect(() => {
    setIsSearchEmpty(filteredCountries.length === 0);
  }, [filteredCountries]);

  return (
    <>
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center gap-10">
        <h1 className="text-3xl text-green-800 font-bold">Country List</h1>
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 bg-gray-600 bg-opacity-90 flex justify-center items-center z-50 "
          onClick={closeModalOutsideClick}
        >
          <div
            className="bg-gray-300 p-5 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center gap-5 ">
              <h2 className="text-2xl font-bold">{country?.name?.common}</h2>
              <button
                className="text-gray-100 hover:text-red-500 bg-red-500 hover:bg-green-950 font-bold w-10 h-10 rounded-full"
                onClick={closeModalBtn}
              >
                ⨉
              </button>
            </div>
            <div>
              <img
                className="h-36 rounded-lg my-4"
                src={country?.flags?.svg}
                alt={country?.flags?.svg}
              />
              <p>
                <strong>Capital:</strong> {country?.capital}
              </p>
              <p>
                <strong>Region:</strong> {country?.region}
              </p>
              <p>
                <strong>Subregion:</strong> {country?.subregion}
              </p>
              <p>
                <strong>Timezones:</strong> {country?.timezones}
              </p>
              <p>
                <strong>Population:</strong> {country?.population}
              </p>
              <p>
                <strong>Start Of Week:</strong> {country?.startOfWeek}
              </p>
              <ul>
                {country?.currencies?.length > 0 ? (
                  country?.currencies?.map(({ code, name, symbol }) => (
                    <li key={code}>
                      <strong>Currencies: </strong>
                      {name} ({symbol}) - {code}
                    </li>
                  ))
                ) : (
                  <p>Currencies not available</p>
                )}
              </ul>
              <ul>
                {country?.languages?.length > 0 ? (
                  country?.languages?.map(({ code, name }) => (
                    <li key={code}>
                      <strong>Languages: </strong>
                      {name}
                    </li>
                  ))
                ) : (
                  <p>Languages not available</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Display countries or "Country not found" */}
      {isSearchEmpty ? (
        <p className="text-red-500 text-xl font-bold">Country not found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {filteredCountries.map((country) => (
            <Country
              key={country.ccn3}
              countryInfo={country}
              countryDetailsHandler={countryDetailsHandler}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Countries;
