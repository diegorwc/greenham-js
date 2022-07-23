import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import * as webscrap from './webscrap.js'

const app = express();
const port = 4000;

app.use('/', bodyParser.urlencoded({extended: false}))
app.use(cors());

app.get('/', async (req, res) => {
    let result = await webscrap.loopTickers(['itsa4', 'abev3', 'sapr4', 'cmin3'])   
    // let result = await webscrap.loopTickers(['wizs3', 'eter3', 'mrfg3', 'pssa3', 'rani3', 'romi3', 'engi4', 'neoe3', 'trpl4', 'taee4', 'sanb3', 'abcb4', 'EUCA4', 'DXCO3', 'JHSF3', 'SAPR4', 'ENAT3', 'enbr3']) 
    res.json(result)
})

app.post('/api/add', (req, res) => {
    console.log(req.body)
    webscrap.addTicker(req.body.ticker)
    res.redirect('http://localhost:3000')
})


app.listen(port, () => {
    console.log('Porta: ' + port)
})