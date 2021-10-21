module.exports = function (greetingsInstance) {
    async function homeRoute(req, res) {
        let greeting = await greetingsInstance.greetFunction();

        // if(greeting =="Invalid name"){
        //     console.log("Invalid name")
        //     req.flash('info', "Invalid name");
        // }
       

        res.render('index', {


            counter: await greetingsInstance.counter(),
            message: greeting
        });
    }

    async function homePostRoute(req, res) {
        let { textArea, language } = req.body;

        if (textArea === '' && language === undefined) {
            req.flash('info', 'Please Select Language And Enter Name');

        } else if (textArea === '') {
            req.flash('info', 'Please enter name');
        } else if (language === undefined) {
            req.flash('info', "Please select language");
        }
        
        else {

            await greetingsInstance.greet(language, textArea);
            await greetingsInstance.pushNames(textArea)
        }
        res.redirect("/")
    }
    async function getGreetedNamesRoute(req, res) {

        res.render("greeted_names", { list: await greetingsInstance.dataList() })
        console.log(await greetingsInstance.dataList())
    }

    async function getTimesGreetedRoute(req,res){
        try {
            let namesGreet = req.params.textArea;
            let namesCountered = await greetingsInstance.userCounter(namesGreet)
    
            console.log("users ", namesCountered)
    
            res.render("count_x_greeted", {
                name: namesGreet,
                user: namesCountered[0]
            })
    
        } catch (err) {
            console.log(err)
        }
    }

    async function postResetDBRoute(req,res){
        req.flash("info", "Database has been successfully reset");
        await greetingsInstance.resetDatabase();
        res.redirect("/");
    }

    return {
        homeRoute,
        homePostRoute,
        getGreetedNamesRoute,
        getTimesGreetedRoute,
        postResetDBRoute

    }
}