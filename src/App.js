import "./App.css";
import React, { Component, Fragment } from "react";
import { Table } from "react-bootstrap";
import Header from "./header";

import axios from "axios";

class GamesList extends Component {
  constructor() {
    super();
    this.state = {
      socapi: [],
      socname: []
    };
  }

  componentDidMount() {
    let x = 1;
    axios.get(`http://localhost:8000/socname/`).then(response => {
      console.log(response.data);
      console.log("items", response.data.results[x].socapis);
      this.setState({
        socname: response.data.results,
        details: response.data.results[x].socapis
      });
    });
    axios.get(`http://localhost:8000/socapi/`).then(response => {
      console.log(response.data);
      this.setState({
        socapi: response.data.results
      });
    });
  }

  render() {
    //const { socapi } = this.state;
    const { socname } = this.state;
    // const won =

    return (
      <Fragment>
        <Header />

        <ul>
          {socname.map((k, v) => (
            <Table responsive striped bordered hover key={k.id}>
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
              {k.socapis.map(sub => {
                if (sub.outcome === sub.prediction) {
                  return (
                    <tbody key={k.id}>
                      <tr>
                        <td></td>
                        <td>{sub.home_team}</td>
                        <td>{sub.away_team}</td>
                        <td>{sub.country}</td>
                        <td>{sub.prediction}</td>
                        <td class="p-2 mb-1 bg-success text-dark">
                          {sub.outcome}
                        </td>
                      </tr>
                    </tbody>
                  );
                } else if (sub.outcome === null) {
                  return (
                    <tbody key={k.id}>
                      <tr>
                        <td></td>
                        <td>{sub.home_team}</td>
                        <td>{sub.away_team}</td>
                        <td>{sub.country}</td>
                        <td>{sub.prediction}</td>
                        <td class="p-2 mb-1 bg-danger text-dark">Running...</td>
                      </tr>
                    </tbody>
                  );
                } else {
                  return (
                    <tbody key={k.id}>
                      <tr>
                        <td></td>
                        <td>{sub.home_team}</td>
                        <td>{sub.away_team}</td>
                        <td>{sub.country}</td>
                        <td>{sub.prediction}</td>
                        <td class="p-2 mb-1 bg-warning text-dark">
                          {sub.outcome}
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
            </Table>
          ))}
        </ul>
      </Fragment>
    );
  }
}
export default GamesList;
