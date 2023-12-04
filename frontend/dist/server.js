var path = require('path');        
const express = require('express');
const port = process.env.PORT || 4200;   
const app = express();

//Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, './frontend')));

//Any routes will be redirected to the angular app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './frontend/index.html'));
});

//Starting server on port 8081
app.listen(port, () => {
    console.log('Server started!');
    console.log(port);
});