const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config')


// function respond(req, res, next) {
//   res.send('hello ' + req.params.name);
//   next();
// }

var server = restify.createServer();
// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
//   console.log('%s listening at %s', server.name, server.url);
mongoose.connect(config.MONGODB_URI,{useNewUrlParser:true});
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => {
    require('./routes/customers')(server);
    console.log(`server started at http://localhost:${config.PORT}`);
});