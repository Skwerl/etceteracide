const express = require('express');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;

const email = "nunyabiz";
const thingy = "nunyabiz";

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    secret = authenticator.generateSecret();
    QRCode.toDataURL(authenticator.keyuri(email, thingy, secret), (err, url) => {
        if (err) throw err;
        res.send(`<img src='${url}'/>`);
    })
})

app.listen(port, () => {
    console.log(`2FA Node app listening at http://localhost:${port}`)
});