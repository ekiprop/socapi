import "./App.css";
import React, { Component } from "react";
import { Table } from "react-bootstrap";

import axios from "axios";

class GamesList extends Component {
  constructor() {
    super();
    this.state = {
      socapi: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/socapi/`).then(response => {
      console.log(response.data);
      this.setState({
        socapi: response.data.results
      });
    });
  }

  render() {
    const { socapi } = this.state;

    return (
      <div>
        <ul>
          {socapi.map(soc => (
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
                <tr>
                  <td></td>
                  <td>{soc.home_team}</td>
                  <td>{soc.away_team}</td>
                  <td>{soc.prediction}</td>
                  <td>{soc.country}</td>
                  <td>{soc.outcome}</td>
                </tr>
              </tbody>
            </Table>
          ))}
        </ul>
      </div>
    );
  }
}
export default GamesList;
