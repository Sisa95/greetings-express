module.exports = function greetingsInstance(pool) {

    var message = "";
    async function greet(language, textArea) {

        try {
            var lowerCase = escape(textArea).toLowerCase();
            var index = escape(textArea).charAt(0).toUpperCase(); //Changing case format of the 1st character.
            var del = escape(lowerCase).slice(1) //removing 1st character the name input

            textArea = index + del;
            var regex = /^[A-Za-z ]+$/;
            var isValid = regex.test(textArea);

            if (isValid) {
                var namesFromDB = await pool.query(`SELECT name FROM greet WHERE name = $1`, [textArea]);

                if (namesFromDB.rowCount === 0) {
                    await pool.query(`INSERT INTO greet (name, counter) VALUES ($1,$2)`, [textArea, 1])
                }
                else {
                    await pool.query(`UPDATE greet SET counter = counter +1 WHERE name = $1`, [textArea])
                }
               
                if (language === "english") {
                    message = "Hello, " + textArea;
                } else if (language === "shona") {
                    message = "Mhoro, " + textArea;   
                } else if (language === "zulu") {
                    message = "Sawubona, " + textArea;
                }
            }

        }
        catch (err) {
            return errorMessages(language, textArea);
        }
        if (!isValid) {
            message = "Invalid name"
        }
    }

    function greetFunction() {
        return message;
    }

    async function counter() {
        try {
            var storedNames = await pool.query("SELECT name FROM greet");

            return storedNames.rowCount;
        } catch (err) {
            console.log("error message : ", err);
            throw (err);
        }
    }

    async function dataList() {
        var greetedNameList = {}
        greetedNameList = await pool.query(`SELECT name, counter FROM greet`)
        return greetedNameList.rows
    }

    async function userCounter(name) {
        let allUsers = await dataList()
        let filteredUser = allUsers.filter(user => {
            return user.name === name;
        })

        return filteredUser;
    }

    async function resetDatabase() {
        return await pool.query("DELETE FROM greet WHERE user_id > 0");
    }

    async function timesUserGreeted(name) {
        var selectedName = await pool.query("SELECT * FROM greet WHERE name = $1", [name]).rows
        console.log("select names ", selectedName)
        return selectedName.name
    }

    function errorMessages(language, textArea) { 
        if (!language && !textArea) {
            return "Please Select Language And Enter Name";
        } else if (!language) {
            return "Please Select Language";
        } else if (!textArea || textArea == undefined) {
            return "Please Enter Name";
        } else{
            return "Invalid Name"
        }
    }

    return {
        greet,
        dataList,
        resetDatabase,
        counter,
        errorMessages,
        greetFunction,
        timesUserGreeted,
        userCounter
    }
}