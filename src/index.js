import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import Calender from "./components/mainComponent";


const App = () => {
  return <section>
    <h1>Hello, React!</h1>
    <Calender />
  </section>;
};

ReactDOM.render(<App />, document.getElementById("root"));