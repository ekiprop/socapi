import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CountryList = () => {
  const [socapi, setSocapi] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/socapi/")
      .then(res => {
        console.log(res.data);
        setSocapi(res.data.results);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true);
      });
  }, []);

  if (load) {
    return (
      <ul>
        {error ? (
          <li>{error.message}</li>
        ) : (
          socapi.map((soc, index) => (
            <li key={index}>
              {soc.home_team},{soc.country}
            </li>
          ))
        )}
      </ul>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CountryList;
