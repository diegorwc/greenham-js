import axios from 'axios'
import * as cheerio from 'cheerio'

// valores de seletores CSS
const ticker = '.main-breadcrumb > li:nth-child(3) > a:nth-child(1) > span:nth-child(1)'
const current_value = '.special > div:nth-child(1) > div:nth-child(1) > strong:nth-child(3)'
const dividend_yield = '.has-special > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > strong:nth-child(2)'
const lpa = '.indicator-today-container > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(11) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)'
const vpa = '.indicator-today-container > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)'
const ev = '.indicator-today-container > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)'
const roic = '.indicator-today-container > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)'
const roe = '.indicator-today-container > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)'
const pl = '.indicator-today-container > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)'
// url base
const request_url = 'https://statusinvest.com.br/acoes/'
// tickers que serao consultados
const tickers = ['itsa4', 'sapr4', 'cmin3', ]
// filtros que serao aplicados
let filters = {
    ticker,
    current_value,
    dividend_yield,
    ev, 
    pl
}
let objArray = []

async function get_data(url, filter) {    
    try {
        const response = await axios.get(url);    
        const $ = cheerio.load(response.data);        
        let obj = {}                      
        for(let item in filter) {            
            obj[item] = $(filter[item]).text()
        }        
        objArray.push(obj)                              
    } catch(err) {
        console.error(err)
    }    
}


async function loopTickers(tickers) {
    for(let ticker of tickers) {
        console.log(request_url + ticker)
        await get_data(request_url + ticker, filters)
    }
    console.log(objArray)    
}

loopTickers(tickers)