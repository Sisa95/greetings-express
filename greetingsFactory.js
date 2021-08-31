module.exports = function greetings(pool) {

    let data = [];
    var message = "";

    //create map
    var namesList = {};

    async function greet(language, textArea) {

        try {
            var lowerCase = escape(textArea).toLowerCase();
            var index = escape(textArea).charAt(0).toUpperCase(); //Changing case format of the 1st character.
            var del = escape(lowerCase).slice(1) //removing 1st character the name input

            textArea = index + del;
            var regex = /^[A-Za-z ]+$/;
            var isValid = regex.test(textArea);

            if (!isValid) {
                return "Invalid name";
            }

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
        catch (err) {
            console.error('Error at greet', err);
            throw err;
        }
    }


    function greetFunction() {
        return message;
    }

    function pushNames(textArea) {

        var lowerCase = escape(textArea).toLowerCase();
        var index = escape(textArea).charAt(0).toUpperCase(); //Changing case format of the 1st character.
        var del = escape(lowerCase).slice(1) //removing 1st character the name input

        textArea = index + del;

        var regex = /^[A-Za-z ]+$/;
        var isValid = regex.test(textArea);

        if (!isValid) {
            return "Invalid name";
        }

        if (namesList[textArea] === undefined) {
            namesList[textArea] = 1
        } else {
            namesList[textArea]++;
        }

    }

    function clearTextInput(textArea) {
        textArea = ""
        alert(textArea)
        return textArea
    }

    function Counter() {
        var storedNames = Object.keys(namesList);
        return storedNames.length
    }

    function dataList() {
        return namesList;
    }

    function errorMessages(language, textArea) {
        if (language === null && textArea === "") {
            return "Please Select Language And Enter Name";
        } else if (language === null) {
            return "Please Select Language";

        } else if (textArea === "") {
            return "Please Enter Name";
        }
    }

    return {
        greet,
        dataList,
        clearTextInput,
        pushNames,
        Counter,
        errorMessages,
        greetFunction
    }
}