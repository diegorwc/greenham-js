import './App.css';
import { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      isLoaded: false,
      error: null,
      sortFlag: false
    };
    this.handleMargemClick = this.handleMargemClick.bind(this);
    this.sortByDividendYield = this.sorter.bind(this);
    // this.sortCrescent = this.sortCrescent.bind(this);
    // this.sortDecrescent = this.sortDecrescent.bind(this);
    this.crescent = this.crescent.bind(this);
    this.decrescent = this.decrescent.bind(this);

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

  // sortCrescent(a, b) {
  //   return a.margem - b.margem;
  // }

  // sortDecrescent(a, b) {
  //   return b.margem - a.margem;
  // }

  crescent(classificador) {
    return this.state.apiResponse.sort((a, b) => {
      return a[classificador] - b[classificador]
    })
  }

  decrescent(classificador) {
    return this.state.apiResponse.sort((a, b) => {
      return b[classificador] - a[classificador]
    })
  }

  handleMargemClick() {
    let sortedArray = [];
    let classificador = 'margem';
    if(this.state.sortFlag) {
      // sortedArray = this.state.apiResponse.sort(this.sortCrescent)
      sortedArray = this.crescent(classificador)
      // console.log("sort crescent")
    } else {
      // sortedArray = this.state.apiResponse.sort(this.sortDecrescent)
      sortedArray = this.decrescent(classificador)
      // console.log("sort decrescent")
    }
    const changeFlag = !this.state.sortFlag
    this.setState({
      apiResponse: sortedArray,
      sortFlag: changeFlag
    })
  }

  sorter(classificador) {
    console.log(classificador)
    let sortedArray = [];    
    if(this.state.sortFlag) {
      // sortedArray = this.state.apiResponse.sort(this.sortCrescent)
      sortedArray = this.crescent(classificador)
      // console.log("sort crescent")
    } else {
      // sortedArray = this.state.apiResponse.sort(this.sortDecrescent)
      sortedArray = this.decrescent(classificador)
      // console.log("sort decrescent")
    }
    const changeFlag = !this.state.sortFlag
    this.setState({
      apiResponse: sortedArray,
      sortFlag: changeFlag
    })
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
              <th>
                DY
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('dividend_yield')}></i>
                </button>                
              </th>
              <th>EV</th>
              <th>PL</th>
              <th>Graham</th>
              <th>Margem 
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('margem')}></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>                 
            { this.state.apiResponse.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.ticker}</td>
                    <td>R$ {item.current_value}</td>
                    <td>{item.dividend_yield}%</td>
                    <td>{item.ev}</td>
                    <td>{item.pl}</td>
                    <td>{item.graham}</td>
                    <td>{item.margem}%</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
