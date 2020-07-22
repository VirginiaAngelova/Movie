import './styles/login-signup.scss'


window.addEventListener('load', () =>{

    if(document.getElementById('btnSubmitLogin')) {
        document.getElementById('email').addEventListener('blur', validateEmail)
        document.getElementById('password').addEventListener('blur',validPassword)
        document.getElementById('btnSubmitLogin').addEventListener('click', validateLogIn)
    }


});



var email;
function validateEmail(event) {
    email = event.target;
    let regxEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    let textEmail = document.getElementById("textEmail");

    if (email.value != '') {

        if (email.value.length >= 3) {

            if (email.value.match(regxEmail)) {
                textEmail.textContent = 'Valid email.';
                textEmail.style.color = "green";

            } else {
                textEmail.textContent = 'Your email has to include only letters, numbers, special symbols and @ symbol.';
                textEmail.style.color = "red";
                formIsValid = false;
            }
        } else {
            textEmail.textContent = 'your email is less than 3 chracters';
            textEmail.style.color = "red";
            formIsValid = false;
        }
    } else {
        textEmail.textContent = 'Please, fill the field !';
        textEmail.style.color = "red";
        formIsValid = false;
    }
}

var inputPass;
  function validPassword(event) {

    inputPass = event.target
    let regxPass = /^(?=.*\.)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let textPassword = document.getElementById("textPassword");

    if (inputPass.value != '') {

        if (inputPass.value.length >= 8) {

            if (inputPass.value.match(regxPass)) {
                textPassword.textContent = 'Valid password.';
                textPassword.style.color = "green";

            } else {
                textPassword.textContent = 'Your password has to include Uppercase letters: A-Z, Lowercase letters: a-z. Numbers: 0-9 and special symbols.'
                textPassword.style.color = "red";
                formIsValid = false;
            }
        } else {
            textPassword.textContent = 'Your password is less than 8 chracters';
            textPassword.style.color = "red";
            formIsValid = false;
        }
    } else {
        textPassword.textContent = 'Please, fill the field !';
        textPassword.style.color = "red";
        formIsValid = false;
    }
}
var formIsValid = true;
var formvalid;

function validateLogIn(event){

     formvalid = formIsValid;

    formvalid = event.target;
    formvalid = formIsValid

    if(formIsValid != true){
        event.preventDefault();
    }else{
        document.getElementById('btnSubmitLogin').removeEventListener('click',validateLogIn)
        document.forms["myFormLogin"].submit();
        location.reload();
    }
    }
 
    console.log("LOGIN")