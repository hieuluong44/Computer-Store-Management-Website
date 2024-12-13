var RegForm =document.getElementById("RegForm");
var LoginForm  =document.getElementById("LoginForm");
var Indicator = document.getElementById("Indicator");
            
function register(){
    RegForm.style.transform ="translateX(0px)";
    LoginForm.style.transform ="translateX(0px)";  
    Indicator.style.transform ="translateX(100px)";
}
function login(){
    RegForm.style.transform ="translateX(500px)";
    LoginForm.style.transform ="translateX(500px)";   
    Indicator.style.transform ="translateX(0px)";
}