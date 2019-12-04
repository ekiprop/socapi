import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Header from "./header";

const CountryList = () => {
  const [socapi, setSocapi] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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
            socapi.map(soc => (
              <Table responsive striped bordered hover>
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Home Team</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>{soc.slip_name}</td>
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
