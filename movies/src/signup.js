import './styles/login-signup.scss'
console.log('SIGNUP')
window.addEventListener('load', () =>{


    if(document.getElementById('btnSubmit')){
        document.getElementById('emailSignup').addEventListener('blur', validateEmailSignup)
        document.getElementById('passwordSignup').addEventListener('blur',validPasswordSignup)
        document.getElementById('confirmPasswordSignup').addEventListener('blur', validConfirmPasswordSignup)
        document.getElementById('btnSubmit').addEventListener('click', validate)
    }
})
var email;
function validateEmailSignup(event) {
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
function validPasswordSignup(event) {

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
var confirmPass;
function validConfirmPasswordSignup(event){
    confirmPass  = event.target;
    if ( confirmPass .value != '') {
        if ( confirmPass .value != inputPass.value) {
            document.getElementById('textConfirmPassword').innerHTML = 'Not matching,please try again.';
            document.getElementById('textConfirmPassword').style = "color: red";
            formIsValid = false;
        } else {
            document.getElementById('textConfirmPassword').innerHTML = 'Matching';
            document.getElementById('textConfirmPassword').style = 'color:green';
        }
    } else {
      document.getElementById('textConfirmPassword').innerHTML = 'Please, fill the field';
      document.getElementById('textConfirmPassword').style ="color: red";
      formIsValid = false;
    }
}



var formIsValid = true;
var formvalid;

function validate(event){
     formvalid = formIsValid;

    formvalid = event.target;
    formvalid = formIsValid

    if(formIsValid != true){
        
        event.preventDefault();
    }else{
        document.getElementById('btnSubmit').removeEventListener('click',validate)
        document.forms["myForm"].submit();
        location.reload();
    }
    }


