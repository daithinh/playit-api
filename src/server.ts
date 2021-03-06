import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as Debug from 'debug';
import * as cors from 'cors';
import * as config from './config';
import * as passportConfig from './config/passport';
import { router } from './routes';
import * as database from './config/db';
import * as express from 'express';
import * as CroneJobs from './job';

database.init();
const app = express();
const debug = Debug('PL:App');

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

passport.use(passportConfig.passport);

passport.serializeUser((user, callback) => {
    return callback(undefined, user);
});

passport.deserializeUser((user, callback) => {
    return callback(undefined, user);
});

app.use(config.trimParams);

app.get('/', (req, res) => {
    return res.json({ message: 'API is running!' });
});

app.get('/favicon.ico', (req, res) => {
    return res.json({ message: 'API is running!' });
});

/**
 *  This is our route middleware
 */
app.use('/api/v1', router);

/**
 *  Error handling
 */
app.use(config.handleError);

/**
 *  Handle response
 */
app.use(config.handleSuccess);

/**
 *  Handle 404 Requests
 */
app.use(config.handle404);

/**
 *  Server process
 */
app.set('PORT', process.env.PORT || 3007);
app.listen(app.get('PORT'), (err: any) => {
    if (err) {
        return console.log(err);
    }
    CroneJobs.initAllJobs();
    debug(' Server has been started on PORT: %o', app.get('PORT'));
    return console.log(`***************************** Server has been started on PORT ${app.get('PORT')}`);
});

process.on('uncaughtException', (err) => {
    console.log('CRITICAL ERROR : Inside uncaughtException, it prevents server to get crashed.');
    console.log(err);
});

export { app };