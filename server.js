const express = require('express')
const app = express();
const PORT = 8000;
const db = require('./db')
const auth = require('./config')


var twilio = require('twilio');
var client = new twilio(auth.accountSid, auth.authToken);


// app.get('/claim', (req, res) => {

const claim = (name, callback) => {
    client.messages.create({
        body: `Your donation got claimed by ${name}`,
        to: '+15106882673',  // Text this number
        from: '+18188146526' // From a valid Twilio number
    })
        .then((message) => callback(null, message.sid))
        .catch((err) => {
            callback(err, null)
        })
}

app.get('/claim', (req, res) => {
    const name = req.query.name
    claim(name, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})


app.get('/', (req, res) => {
    db((err, results) => {
        if (err) {
            res.send(err)
        } else {
            const result = [];
            for (var i = 0; i < results.length; i++) {
                let { id, userName, product, location, email, phone, url } = results[i];
                result.push({ id, userName, product, location, email, phone, url })

            }
            res.send(result)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})