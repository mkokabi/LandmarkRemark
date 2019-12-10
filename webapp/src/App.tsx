import React from 'react';
import { Route } from "react-router";
import './App.css';
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <div className="App">
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          {/* <Route path="/Client" component={Job} /> */}
        </Layout>
    </div>
  );
}

export default App;
