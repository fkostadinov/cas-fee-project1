import express from 'express';
const app = express();
const router = express.Router();

function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}

function notFound(req, res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.status(404).send("Unable to find the requested page! ")
}

function myDummyLogger(options) {
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next) {
        console.log(req.method + ":" + req.url);
        next();
    }
}

app.use(myDummyLogger());
app.use(router);
app.use(express.static('./public'));
app.use(notFound);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });