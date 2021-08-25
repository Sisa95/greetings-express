const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greeting = require('./greetingsFactory');

const app = express();

const greetings = Greeting();

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

app.get('/', function(req,res){
    let greeting = greetings.greetFunction();
    //console.log(greeting)
   
    res.render('index', {
        
        counter: greetings.Counter(),
        message : greeting
    });
});

app.post('/', function(req, res){

    let {textArea, language} = req.body;
  
    if(textArea === ''){
        req.flash('info', 'Please enter name and select language');
    } else if(textArea === "Invalid name"){
        req.flash('info', "Invalid name" );
    }
    else {
        greetings.greet(language, textArea);
        greetings.pushNames(textArea)
    }

    res.redirect("/")
});

app.get("/greeted_names",function(req, res){

    res.render("greeted_names", {list: greetings.dataList()})
})

app.get("/counter/:textArea",function(req, res){
 let namesGreet = req.params.textArea;
 let namesCountered = greetings.dataList()
 console.log(namesCountered)

    res.render("count_x_greeted", {
        textArea: namesGreet,
        counter: namesCountered[namesGreet]
    })
})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App started at:", PORT)
});