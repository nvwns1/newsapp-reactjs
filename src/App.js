import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <>
        <Router>
          <Navbar />

          <Routes>
            <Route exact
              path="/"
              element={<News apikey={this.apikey} key="general" pageSize="5" country="us" category="general" />}
            />
            <Route exact
              path="/sports"
              element={<News apikey={this.apikey} key="sports" pageSize="5" country="us" category="sports" />}
            />
            <Route exact
              path="/business"
              element={<News apikey={this.apikey} key="business" pageSize="5" country="us" category="business" />}
            />
            <Route exact
              path="/entertainment"
              element={
                <News apikey={this.apikey} key="entertainment" pageSize="5" country="us" category="entertainment" />
              }
            />
            <Route exact
              path="/health"
              element={<News apikey={this.apikey} key="health" pageSize="5" country="us" category="health" />}
            />
            <Route exact
              path="/science"
              element={<News apikey={this.apikey} key="science" pageSize="5" country="us" category="science" />}
            />
            <Route exact
              path="/sports"
              element={<News apikey={this.apikey} key="sports" pageSize="5" country="us" category="sports" />}
            />
            <Route exact
              path="/technology"
              element={<News apikey={this.apikey} key="technology" pageSize="5" country="us" category="technology" />}
            />
          </Routes>
        </Router>
      </>
    );
  }
}
