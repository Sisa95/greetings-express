const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greeting = require('./greetingsFactory');
const greetingRoute = require("./routes");


const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:codex123@localhost:5432/greetingsDB';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const app = express();

const greetings = Greeting(pool);
const route = greetingRoute(greetings);

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', route.homeRoute)

app.post('/', route.homePostRoute);

app.get("/greeted_names", route.getGreetedNamesRoute)

app.get("/count_x_greeted/:textArea", route.getTimesGreetedRoute)

app.post("/reset", route.postResetDBRoute)

const PORT = process.env.PORT || 3018;

app.listen(PORT, function () {
    console.log("App started at:", PORT)
});