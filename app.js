require('dotenv').config();
const conf = require('./config/app');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsValidator = require('./middlewares/handleErrors');
const cors = require('./middlewares/cors');
const rateLimitMiddleware = require('./middlewares/rateLimiter');

const appRouter = require('./routes/index');

const app = express();

app.use(cors); // подключаем проверку CORS как мидлвэр

app.use(rateLimitMiddleware);

app.use(express.json()); // подключаем парсер json как мидлвэр

app.use(helmet());

mongoose.connect(conf.MONGOOSE_CONNECT);

app.use(requestLogger);

app.use(appRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorsValidator);

app.listen(conf.PORT3000, () => {});
