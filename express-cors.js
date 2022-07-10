import express from 'express'
import cors from 'cors'
import * as webscrap from './webscrap.js'

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (req, res) => {
    let result = await webscrap.loopTickers(['itsa4', 'abev3', 'sapr4', 'cmin3'])
    console.log(result)
    res.sendFile('/home/diego/Programacao/greenham-js/data.json')
})


app.listen(port, () => {
    console.log('Porta: 3000')
})