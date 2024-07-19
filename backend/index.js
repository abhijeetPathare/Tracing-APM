// APM setup should be the very first import
import apm from "./aapm.js";

// Using nodemon so that you do not need to type node index.js every time new code is saved

// Import express - is for building the Rest APIs
import express from "express";

// Import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// Import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

// Import routes
import router from "./routes/routes.js";

// Import winston logger
import logger from "./logger.js";

// Init express
const app = express();

// APM error handling
process.on('unhandledRejection', (reason, promise) => {
    apm.captureError(reason);
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on('uncaughtException', (error) => {
    apm.captureError(error);
    logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
});

// Use express json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors
app.use(cors());

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Use router
app.use(router);

// Test route to generate an error for APM
app.get('/error', function(req, res) {
    throw new Error('Test error!');
});

// Test route to capture a transaction
app.get('/test-transaction', function (req, res) {
    const transaction = apm.startTransaction('test-transaction', 'custom');
    setTimeout(() => {
        transaction.end();
        res.send('Transaction captured!');
    }, 1000);
});

// Add at the end of all routes
app.use((err, req, res, next) => {
    apm.captureError(err);
    logger.error(`Error: ${err.message}`, { stack: err.stack });
    res.status(500).send('Something broke!');
});

app.get('/', function(req, res){
    res.json({ message: 'Welcome to restaurant api' });
});

// PORT
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
});
