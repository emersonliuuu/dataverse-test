import React from "react";
import logo from "./logo.svg";
import { RuntimeConnector, Extension } from "@dataverse/runtime-connector";
import "./App.css";
import Post from "./components/post";
import ConnectWallet from "./components/connectWallet";

const runtimeConnector = new RuntimeConnector(Extension);

function App() {
  return (
    <div className="App">
      <ConnectWallet runtimeConnector={runtimeConnector} />
      <Post runtimeConnector={runtimeConnector} />
    </div>
  );
}

export default App;
