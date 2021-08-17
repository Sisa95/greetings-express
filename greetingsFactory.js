module.exports = function greetings(names){
    
    let data = names || [];

    function greet(language, textArea){

        var lowerCase = textArea.toLowerCase();
        var index = textArea.charAt(0).toUpperCase(); //Changing case format of the 1st character.
        var del = lowerCase.slice(1) //removing 1st character the name input

        textArea = index + del;

        var regex = /^[A-Za-z ]+$/;
        var isValid = regex.test(textArea);

        if(!isValid){
            return "Invalid name"; 
        }

        if(language === "english"){
            return "Hello, " + textArea;
        } else if(language === "shona"){
            return "Mhoro, " + textArea;
            
        } else if(language === "zulu"){
            return "Sawubona, " + textArea;
        }
    }

    function pushNames(textArea){

        var lowerCase = textArea.toLowerCase();
        var index = textArea.charAt(0).toUpperCase(); //Changing case format of the 1st character.
        var del = lowerCase.slice(1) //removing 1st character the name input

        textArea = index + del;

        if(!data.includes(textArea)){

        data.push(textArea)
        }
    }

    function clearTextInput(textArea){
        textArea = ""
        alert(textArea)
        return textArea
    }

    function Counter(){
        return data.length;
    }

    function dataList(){
        return data;
    }

    function errorMessages(language, textArea){
        if(language === null && textArea === ""){
            return "Please Select Language And Enter Name";
        } else if (language === null){
            return "Please Select Language";
        
        } else if(textArea === ""){
            return"Please Enter Name";
        }
    }

    return{
        greet,
        dataList,
        clearTextInput,
        pushNames,
        Counter,
        errorMessages,
    }
}