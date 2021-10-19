let assert = require("assert")
let greetings = require("../greetingsFactory")
const pg = require("pg")
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:codex123@localhost:5432/greetingsDB';

const pool = new Pool({
    connectionString
});

beforeEach(async function () {
    await pool.query("DELETE FROM greet");
});

//let greeting = greetings()
describe('Greetings', async () => {
    it("Should be able to greet people in different languages", async () => {

        beforeEach(async function () {
            let greeting = greetings(pool);

            await greeting.greet("shona", "sisa")

            let grtMsg = await greeting.greetFunction();

            assert.equal("Mhoro, Sisa", grtMsg);
        });
    });

    it("Should be able to reset database", async () => {
        let greeting = greetings(pool);

        await greeting.greet("shona", "Sisa");
        await greeting.greet("shona", "Musa");

        var reset = await greeting.resetDatabase();

        assert.equal(0, reset.rows.length);
    });

    it("Should not count a name that has as already been greeted", async () => {
        let greeting = greetings(pool);

        await greeting.greet("shona", "Sisa");
        await greeting.greet("english", "Sisa");
        await greeting.greet("shona", "Musa");

        var count = await greeting.counter();

        assert.equal(2, count);
    });

    it("Should be able to display a 'Please Select Language' ", async () => {
        let greeting = greetings(pool);

        await greeting.greet(undefined, "Sula");

        assert.equal("Please Select Language",await greeting.errorMessages());
    });

    // it("Should be able to display a '' ", async () => {
    //     let greeting = greetings(pool);

    //     await greeting.greet(undefined, ); 
    //     assert.equal("Please Enter Name",await greeting.errorMessages());
    // });
   
     // await greeting.greet(undefined, ""); 
        // assert.equal("Please Select Language And Enter Name",await greeting.errorMessages());
        // await greeting.greet("shona", ""); 
        // assert.equal("Please Enter Name",await greeting.errorMessages());
    

    it("Should display 0 when there are no people greeted", async() => {
        let greeting = greetings(pool);

        await greeting.dataList();

        assert.equal(0, await greeting.userCounter());
    });

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