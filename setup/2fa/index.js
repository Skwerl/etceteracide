const express = require('express');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;

const email = "nunyabiz";
const site = "nunyabiz";

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let secret = authenticator.generateSecret();
    QRCode.toDataURL(authenticator.keyuri(email, site, secret), (err, url) => {
        if (err) throw err;
        res.send(`<div><img src='${url}'/></div><div>${secret}</div>`);
    })
})

app.listen(port, () => {
    console.log(`2FA Node app listening at http://localhost:${port}`)
});