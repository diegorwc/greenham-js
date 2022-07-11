import './App.css';
import { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "" 
    };
}

  callAPI() {
    fetch("http://localhost:4000/")
      .then(res => res.text())
      .then(res => this.setState({ 
        apiResponse: res 
      }))
      .then(console.log("AHOOO"))
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />| */}
          <h1 className="App-title">Greenham js</h1>                    
        </header>       
        <p className="App-intro">{this.state.apiResponse}</p> 
      </div>
    )
  }
}

export default App;
