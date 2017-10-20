const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use(express.static(`${__dirname}/public/build`));

let apiarray = [];

app.get('/api/endpoint', (req, res, next) => {
  // axios.get(web/api/endpoint).then(response => {
    // res.json(response.data);
  })
})






app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});