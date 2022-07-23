import axios from 'axios'
import * as cheerio from 'cheerio'
import { error } from 'console'
import fs from 'fs'
import { STATUS_CODES } from 'http'

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
let tickersArray = [] // para uso e testes de formulario
let objArray = [] //tentativa de melhorar performance
// tickers que serao consultados
// const tickers = ['itsa4', 'sapr4', 'cmin3', ]
// filtros que serao aplicados
let filters = {
    ticker,
    current_value,
    dividend_yield,
    ev,
    roic,
    roe,
    pl,
    lpa,
    vpa,    
}

async function get_data(url, filter) {    
    try {
        const response = await axios.get(url);        
        const $ = cheerio.load(response.data);
        console.log(typeof $)
        let obj = {}                      
        for(let item in filter) {            
            obj[item] = $(filter[item]).text().replace(",",".")            
        }        
        console.log(obj.lpa, obj.vpa)
        obj.graham = Math.sqrt(22.5 * Number(obj.lpa) * Number(obj.vpa)).toFixed(2)
        obj.margem = (100 * ((obj.graham / obj.current_value) - 1)).toFixed(2)        
        obj.roic = obj.roic.replace("%", "");
        if(obj.roic == "-") obj.roic = 0;
        obj.roe = obj.roe.replace("%","");
        console.log(obj)
        // console.log(obj.graham) 
        return obj                              
    } catch(err) {
        console.error("erro get_data")
        return {"erro": "ticker invalido"}
    }    
}

export function removeItemFromObject(item) {
    let index = objArray.findIndex(object => {
        return object.ticker == item
    })
    objArray.splice(index, 1);
    console.log(objArray)
}

export async function getTickerData(ticker) { //tentativa de evitar percorer todos os tickers sempre que um novo é adicionado
    let obj = await get_data(`${request_url}${ticker}`, filters);
    objArray.push(obj)
    return
}

export function getObjArray() {
    return objArray;
}

export function addTicker(ticker) {
    tickersArray.push(ticker)
    console.log(tickersArray)
}

export async function loopTickers() {
    let objArray = []
    let tickers = tickersArray;
    for(let ticker of tickers) {
        // console.log(`${request_url}${ticker}`)
        objArray.push(await get_data(`${request_url}${ticker}`, filters))
    }
    // console.log(JSON.stringify(objArray, null, 2))
    writeJson(JSON.stringify(objArray, null, 2))
    return objArray 
}

function writeJson(data) {
    fs.writeFileSync('./data.json', data, err => {
        if(err) console.log(err)
        console.log('Arquivo criado')
    });
}


// loopTickers(tickers)