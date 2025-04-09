import React, { Component } from "react";
import Form from "../src/components/loginForm";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Form />
      </div>
    );
  }
}

export default App;
