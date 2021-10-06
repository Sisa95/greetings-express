const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greeting = require('./greetingsFactory'); 

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
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

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

 // initialise session middleware - flash-express depends on it
 app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());
  

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/',async function(req,res){
    let greeting = await greetings.greetFunction();
    console.log(greeting)
   
    res.render('index', {
        
        
        counter: await greetings.Counter(),
        message : greeting
    });

   // console.log("number of database rows " + greetings.Counter())
});

app.post('/', async (req, res) => {

    let {textArea, language} = req.body;
  
    if(textArea === ''){
        req.flash('info', 'Please enter name and select language');
    } else if(language === undefined){
        req.flash('info', "Please select language" );
    }
    else {
        
        await greetings.greet(language, textArea);
        await greetings.pushNames(textArea)
    }

    res.redirect("/")
});

app.get("/greeted_names",async (req, res) =>{
   
    res.render("greeted_names", {list: await greetings.dataList()})
    console.log(await greetings.dataList())
})

// app.get("/counter/:textArea",async (req, res) =>{
//  let namesGreet = req.params.textArea;
//  let namesCountered = await greetings.timesUserGreeted(namesGreet)
 
//  console.log(namesCountered)

//     res.render("count_x_greeted", {
//         textArea: namesGreet,
//         counter: namesCountered[namesGreet]
//     })
// })

app.post("/reset", async (req, res) =>{
    req.flash("info", "Database has been successfully reset");
    await greetings.resetDatabase();
    res.redirect("/");
})

const PORT = process.env.PORT || 3012;

app.listen(PORT, function(){
    console.log("App started at:", PORT)
});