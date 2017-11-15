const path = require('path');
const express = require('express');

const app = express();

const port =process.env.PORT||3000;
const publicPath = path.join(__dirname, './../public');

//middleware registration to server html
app.use(express.static(publicPath));

//listening at port 3000
app.listen(port, () => {
    console.log(`App started at ${port}`)
});