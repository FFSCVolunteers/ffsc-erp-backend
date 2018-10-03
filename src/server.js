require('dotenv').config();
const express = require('express');
const BodyParser = require('body-parser');

let app = express();
app.use(BodyParser.json());

require('./routes')(app);
//app.post('/auth/login', require('./controllers').auth.login);

app.get('/ping', (req, res) => {
  res.send("ok");
})

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
