const express = require('express');
const app = express();
const PORT = 5000;

app.use( express.json() );

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
    
)

app.get('/lttstock', (req, res) => {
    res.status(200).send({
        hasStock: false,
        url: 'lttstore.com'
    })
});

app.post('/lttstock/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name){
        res.status(418).send({ message: 'We need a name !' })
    }

    res.send({
       lttstock: `The product ${name} with an ID of ${id}` 
    })
})