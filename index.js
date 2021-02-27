const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.enable("trust proxy");
app.use(morgan('short', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
    
)

let productStockStatus = false;
let productName = 'no information';
let productUrl = 'no information';


app.get('/lttstock', async (req, res) => {
    res.status(200).send({
        hasStock: productStockStatus,
        name: productName,
        url: productUrl,
    })
});

app.put('/lttstock/', async (req, res) => {
    const product = req.body;
    if ((typeof product.stockStatus !== 'undefined') && product.name && product.url) {
        productStockStatus = product.stockStatus;
        productName = product.name;
        productUrl = product.url;

        res.status(200).send({message: 'Status updated'})
    } else {
        res.status(422).send({message: 'Wrong data input'})
    }
})