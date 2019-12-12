import React from 'react';
import { Route } from "react-router";
import './App.css';
import Layout from "./components/Layout";
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Note from './components/Note';

const App: React.FC = () => {
  return (
    <div className="App">
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/TakeNote/:id" component={Note} />
        </Layout>
    </div>
  );
}

export default App;
