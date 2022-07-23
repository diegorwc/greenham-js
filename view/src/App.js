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
    this.deleta = this.deleta.bind(this);
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
  deleta(ticker) {
    console.log(ticker)    
    fetch("http://localhost:4000/api/deleta/" + ticker, {method: 'DELETE'})
      .then((result) => {
        console.log(result)
        document.getElementById(ticker).remove();        
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    )
  } 

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
        <form action="http://localhost:4000/api/add" method="post">
          <div className="input-group mb-3">
            <input type="text" name="ticker" className="form-control"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Add</button>
            </div>
          </div>
        </form>
        {/* https://www.w3schools.com/howto/howto_js_curtain_menu.asp */}
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Valor Atual
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('current_value')}></i>
                </button> 
              </th>
              <th>
                DY
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('dividend_yield')}></i>
                </button>                
              </th>
              <th>EV / EBIT
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('ev')}></i>
                </button> 
              </th>
              <th>
                ROIC
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('roic')}></i>
                </button> 
              </th>
              <th>ROE
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('roe')}></i>
                </button> 
              </th>
              <th>PL</th>
              <th>Graham</th>
              <th>Margem 
                <button className="btn">
                  <i className="bi bi-arrow-down-up" onClick={(param) => this.sorter('margem')}></i>
                </button>
              </th>
              <th>
                Remover
              </th>
            </tr>
          </thead>
          <tbody>                 
            { this.state.apiResponse.map((item, key) => {
                console.log(key)
                return (                  
                  <tr key={item.ticker} id={item.ticker}>
                    <td>{item.ticker}</td>
                    <td>R$ {item.current_value}</td>
                    <td>{item.dividend_yield}%</td>
                    <td>{item.ev}</td>
                    <td>{item.roic}%</td>
                    <td>{item.roe}%</td>
                    <td>{item.pl}</td>
                    <td>R$ {item.graham}</td>
                    <td>{item.margem}%</td>
                    <td>
                      <button className="btn" onClick={() => {this.deleta(item.ticker)}}>
                        <i className="bi bi-x-square-fill"></i>
                      </button>                    
                    </td>
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
