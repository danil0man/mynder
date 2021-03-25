
const express = require('express');
const app = express();
const path = require('path');



const PORT = process.env.PORT || 4001;
app.use(express.static('public'));
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/static', express.static(path.join(__dirname, 'public')));
app.listen(PORT);
