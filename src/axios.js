import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

const GamesList = () => {
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
          socapi.map(soc => (
            <Table striped bordered hover>
              <thead class="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Home Team</th>
                  <th>Away Teaam</th>
                  <th>Prediction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{soc.home_team}</td>
                  <td>{soc.away_team}</td>
                  <td>{soc.prediction}</td>
                </tr>
              </tbody>
            </Table>
          ))
        )}
      </ul>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default GamesList;
