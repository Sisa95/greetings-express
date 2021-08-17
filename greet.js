var greetButton = document.querySelector(".btn");
var greeetCounter = document.querySelector(".counter");
var clearText = document.querySelector(".text");
var errorMsg = document.querySelector(".errorMsg");
let greetedNames = document.getElementById("myList2");
var newObject = {};
var count = 0;

if(localStorage['name']){
    var objStore = JSON.parse(localStorage.getItem('name'));
}
var greetInstance = greetings(objStore);

   greeetCounter.innerHTML = greetInstance.Counter();   
   var nameArr = objStore;
function greets(){

    var textArea = document.querySelector(".text").value;
     
    let list = document.getElementById("myList");
    
    var checkedRadioBtn = document.querySelector("input[name='language']:checked");
    var language = checkedRadioBtn;

    if(checkedRadioBtn === null && textArea === ""){
        errorMsg.style.color = "red";
        document.querySelector(".text").style.border = "2px solid red"
        errorMsg.innerHTML = greetInstance.errorMessages(language, textArea)
    
        setTimeout(function(){ 
            document.querySelector(".text").style.border = ""
            errorMsg.innerHTML = ""
        }, 3000);
        return
    } else if (checkedRadioBtn === null){
    
    errorMsg.style.color = "red";
    document.querySelector(".text").style.border = "2px solid red"
    errorMsg.innerHTML = "Please Select Language"
    
        setTimeout(function(){ 
            errorMsg.style.border = "";
            errorMsg.style.fontSize = "";
            errorMsg.innerHTML = "";
            document.querySelector(".text").style.border = ""
        }, 1000);
        return;
    } 
    
    if(textArea === ""){
        
        errorMsg.style.color = "red";
        document.querySelector(".text").style.border = "2px solid red"
        errorMsg.innerHTML = "Please Enter Name"
    
            setTimeout(function(){ 
                
                errorMsg.style.border = "";
                errorMsg.style.fontSize = "";
                errorMsg.innerHTML = "";
                document.querySelector(".text").style.border = ""
            }, 2500);
            return;
        }
    
    if(checkedRadioBtn){
        var regex = /^[A-Za-z ]+$/;
        var isValid = regex.test(textArea);
        if(!isValid){
            errorMsg.style.color = "red";
            errorMsg.innerHTML = greetInstance.greet(language, textArea)
            
            setTimeout(function(){ 
                errorMsg.innerHTML = "";
            }, 2500);
            document.querySelector(".text").value = ""
            return
        }
        
        list.style.background = "white"
        list.style.width = "55%"
        list.style.margin= "auto"
        list.style.fontSize = "1.3rem";
        list.innerHTML = greetInstance.greet(language.value, textArea );
        
        greeetCounter.innerHTML = greetInstance.pushNames(textArea);
        localStorage.setItem("name", JSON.stringify(greetInstance.dataList()));

        for( count; count < greetInstance.Counter(); count++){  
            
        let li = document.createElement("li");
        li.innerText = nameArr[count];
        greetedNames.appendChild(li);
        }

        greeetCounter.innerHTML = greetInstance.Counter();   
    } 
    document.querySelector(".text").value = ""
    checkedRadioBtn.checked = false;
  
}

greetButton.addEventListener("click", greets)
clear_ = document.querySelector(".btnClear").addEventListener("click", function(){
    let list = document.getElementById("myList");
    newObject = {};
    data = [];
    greeetCounter.innerHTML = 0;
    list.innerHTML  = "";
    localStorage.clear()
    location.reload()
})