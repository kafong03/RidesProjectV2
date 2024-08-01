/*const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

const accountSid = 'ACab5162316709bc16c5a5681a2af88344';
const authToken = '769721ca947a516a609644f5e3d73cc5';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is a test message! If you are not the intended recipient, please ignore and block this number! Sorry for the inconvenience!',
        from: '+18557750590',
        to: '+19163857559'
    })
    .then(message => console.log(message.sid))
    .done();*/

const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  'ACab5162316709bc16c5a5681a2af88344',
  '769721ca947a516a609644f5e3d73cc5'
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: '+18557750590',
      to: '+18777804236',
      body: req
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});