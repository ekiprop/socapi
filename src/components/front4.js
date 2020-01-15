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
    axios.get(`http://localhost:8000/socname/`).then(response => {
      console.log(response.data);
      this.setState({
        socname: response.data.results
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
    const { socapi } = this.state;
    const { socname } = this.state;

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
              {socapi.map((soc, i) => (
                <tbody key={soc.id}>
                  <tr>
                    <td></td>
                    <td>{soc.home_team}</td>
                    <td>{soc.away_team}</td>
                    <td>{soc.prediction}</td>
                    <td>{soc.country}</td>
                    <td>{soc.outcome}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ))}
        </ul>
      </Fragment>
    );
  }
}
export default GamesList;
