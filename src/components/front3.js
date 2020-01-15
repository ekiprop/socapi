import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Header from "./header";

const CountryList = () => {
  const [socapi, setSocapi] = useState({ data: null, games: null });
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const socapiMain = await axios(`http://localhost:8000/socname/`);
      const socapiDet = await axios(`http://localhost:8000/socapi/`);

      setSocapi({ data: socapiMain.data, games: socapiDet.data });
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
      axios
        .get("http://localhost:8000/socname/")
        .then(res => {
          console.log(res.data);
          setSocapi(res.data.results);
          setLoad(true);
        })
        .catch(err => {
          setError(err.message);

          setLoad(true);
        });
    };
    fetchData();
  }, []);

  if (load) {
    return (
      <div>
        {" "}
        <Header />
        <ul>
          {error ? (
            <li>{error.message}</li>
          ) : (
            socapi.map((soc, i) => (
              <Table responsive striped bordered hover>
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Home Team</th>
                    <th>Away Teaam</th>
                    <th>Prediction</th>
                    <th>Country</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={i}>
                    <td></td>
                    <td>{soc.home_team}</td>
                    <td>{soc.away_team}</td>
                    <td>{soc.prediction}</td>
                    <td>{soc.country}</td>
                    <td>{soc.outcome}</td>
                  </tr>
                </tbody>
              </Table>
            ))
          )}
        </ul>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CountryList;
