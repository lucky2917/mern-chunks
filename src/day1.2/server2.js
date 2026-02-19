const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/transform', (req,res)=>{
    const receivedText = req.body.text;
    const upper = receivedText.toUpperCase();
    const reversed = receivedText.split('').reverse().join('');
    const len = receivedText.length;

    res.json({
        original: receivedText,
        transformed: upper,
        reversed: reversed,
        length: len
    });
});

app.listen(3000);