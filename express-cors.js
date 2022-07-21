import express from 'express'
import cors from 'cors'
import * as webscrap from './webscrap.js'

const app = express();
const port = 4000;

app.use(cors());

app.get('/', async (req, res) => {
    let result = await webscrap.loopTickers(['itsa4', 'abev3', 'sapr4', 'cmin3'])    
    res.json(result)
})


app.listen(port, () => {
    console.log('Porta: ' + port)
})