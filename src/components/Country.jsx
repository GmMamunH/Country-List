/* eslint-disable react/prop-types */

const Country = ({ countryInfo, countryDetailsHandler }) => {
  return (
    <>
      <div className="shadow-lg border border-gray-200 rounded-lg">
        <div className="px-2 pt-1 pb-3">
          <img
            className="h-24 w-full rounded-lg "
            src={countryInfo?.flags.svg}
            alt={countryInfo?.flags?.alt}
          />
          <h1 className="text-center  line-clamp-1 p-1 font-bold">
            {/* // eslint-disable-next-line react/prop-types */}
            {countryInfo?.name?.common}
          </h1>
          {/* ======================================== */}
          <div className="px-4">
            <small className="line-clamp-1">
              {" "}
              <strong>Capital: </strong>
              {countryInfo?.capital}
            </small>
            <small className="line-clamp-1">
              {" "}
              <strong> Region: </strong>
              {countryInfo?.region}
            </small>
            <small className="line-clamp-1">
              {" "}
              <strong> Population: </strong>
              {countryInfo?.population}
            </small>

           
          </div>
          {/* =========================== */}
          <div className="p-2 flex items-center justify-center">
            <button
              className="py-2 px-4 bg-teal-900 text-white rounded-lg"
              onClick={() => countryDetailsHandler(countryInfo)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
