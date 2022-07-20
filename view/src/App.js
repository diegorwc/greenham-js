import './App.css';
import { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      isLoaded: false,
      error: null
    };
}

  callAPI() {
    fetch("http://localhost:4000/")
      .then(res => res.json())
      // .then(res => this.setState({         
      //   apiResponse: res
      // }))
      .then((result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          apiResponse: result
        })
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  } 

  // componentWillMount() {
    // this.callAPI();
  // }


  componentDidMount() {
    this.callAPI();        
  }

  sortArray(a, b) {
    return a.margem - b.margem;
  }

  render() {
    if(!this.state.isLoaded) {
     return <div>Loading...</div>   
    } else if(this.state.error) {
      return <div>Error! {this.state.error.message}</div>
    }
    return(      
      <div className="App">
        <header>          
          <h1 className="App-title">Greenham js</h1>                    
        </header>       
        <p className="App-intro"></p>
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Valor Atual</th>
              <th>DY</th>
              <th>EV</th>
              <th>PL</th>
              <th>Graham</th>
              <th>Margem <button className="btn btn-light"><i className="bi bi-arrow-down-up"></i></button></th>
            </tr>
          </thead>
          <tbody>                 
            {this.state.apiResponse.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.ticker}</td>
                  <td>{item.current_value}</td>
                  <td>{item.dividend_yield}</td>
                  <td>{item.ev}</td>
                  <td>{item.pl}</td>
                  <td>{item.graham}</td>
                  <td>{item.margem}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
