let assert = require("assert")
let greetings = require("../greetingsFactory")
//let greeting = greetings()
describe('Greetings', function(){
    it("Should greet the person with their name", function(){
        let greeting = greetings();
        
        assert.equal("Hello, Sisa",greeting.greet("english","sisa"));
    });

    it("Should change input case, only the first character should in upper case", function(){
        let greeting = greetings();
        
        assert.equal("Mhoro, Sisa",greeting.greet("shona","sIsA"));
    });

    it("Should display invalid name error when the entered name has special characters or numbers", function(){
        let greeting = greetings();
        
        assert.equal("Invalid name",greeting.greet("shona","s!$@"));
    });

    it("Should not count a name that has as already been greeted", function(){
        let greeting = greetings();

        greeting.pushNames("Sisa");
        greeting.pushNames("Sisa");
        greeting.pushNames("Ponye");
        
        assert.equal(2, greeting.Counter());
    });

    it("Should display 0 when there are no people greeted", function(){
        let greeting = greetings();

        greeting.dataList();
        
        assert.equal(0 , greeting.dataList());
    });

    it("Should return an error message \"Please Enter Name\"", function(){
        let greeting = greetings();
        
        assert.equal("Please Enter Name",greeting.errorMessages("english", ""));
    });

    it("Should return an error message \"Please Select Language\"", function(){
        let greeting = greetings();
        
        assert.equal("Please Select Language",greeting.errorMessages(null, "Sisa"));
    });

    it("Should return an error message \"Please Enter Name and Select Language\"", function(){
        let greeting = greetings();
        
        assert.equal("Please Select Language And Enter Name", greeting.errorMessages(null, ""));
    });
});