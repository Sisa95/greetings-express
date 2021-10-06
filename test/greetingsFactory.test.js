let assert = require("assert")
let greetings = require("../greetingsFactory")
const pg = require("pg")
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:codex123@localhost:5432/greetingsDB';

const pool = new Pool({
    connectionString
});

//let greeting = greetings()
describe('Greetings', async() => {
    it("Should greet the person with their name", async() => {
        let greeting = greetings(pool);
        await greeting.greet("english","Sisa")

        let greet =  await greeting.greetFunction()

        assert.equal("Hello, Sisa",greet);
    });

    // it("Should change input case, only the first character should in upper case", function(){
    //     let greeting = greetings();
        
    //     assert.equal("Mhoro, Sisa",greeting.greetFunction());
    // });

    // it("Should display invalid name error when the entered name has special characters or numbers", async() => {
    //     let greeting = greetings();
        
    //     assert.equal("Invalid name",greeting.greet("shona","s!$@"));
    // });

    // it("Should not count a name that has as already been greeted", async() => {
    //     let greeting = greetings();

    //     greeting.pushNames("Sisa");
    //     greeting.pushNames("Sisa");
    //     greeting.pushNames("Ponye");
        
    //     assert.equal(2, greeting.counter());
    // });

    // it("Should display 0 when there are no people greeted", async() => {
    //     let greeting = greetings();

    //     greeting.dataList();
        
    //     assert.equal(0, greeting.counter());
    // });

    // it("Should return an error message \"Please Enter Name\"", async() => {
    //     let greeting = greetings();
        
    //     assert.equal("Please Enter Name",greeting.errorMessages("english", ""));
    // });

    // it("Should return an error message \"Please Select Language\"", function(){
    //     let greeting = greetings();
        
    //     assert.equal("Please Select Language",greeting.errorMessages(null, "Sisa"));
    // });

    // it("Should return an error message \"Please Enter Name and Select Language\"", function(){
    //     let greeting = greetings();
        
    //     assert.equal("Please Select Language And Enter Name", greeting.errorMessages(null, ""));
    // });
});