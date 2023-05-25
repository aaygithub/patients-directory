import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPatients } from "./service/patient";
import { IPatient } from "./common/interfaces";

function App() {
  useEffect(() => {
    getPatients().then((response: IPatient[]) => {
      console.log(response); // test mock-api response
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
