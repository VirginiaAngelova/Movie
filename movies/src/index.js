
import './styles/main.scss';

import './login.js'
import './signup.js'
import './movies.js'


function getContent(fragmentId,callback){

 let request = new XMLHttpRequest();
 
 request.onload = function(){
    callback(request.responseText);
 };
 request.open("GET",fragmentId + ".html");
 request.send(null);
}

function navigate(){
    let fragmentId;
    let ContentDiv = document.getElementById('output');
    if (!location.hash) {
        fragmentId = "login";
    } else {
        fragmentId = location.hash.substr(1);
    }
    
    getContent(fragmentId,function(output){
        ContentDiv.innerHTML = output
    });
   
}

window.addEventListener("hashchange",navigate);
navigate();




//import {bro} from './bro'
//document.querySelector('h1').textContent = bro(`How's it going`)

/*
let url = 'http://localhost:63347'

fetch('index.html')
.then(function(response){
    return response.text();
    let parser = new DOMParcel(html,"text/html");
})
.catch(function (err) {
	console.log('Something is wrong.', err);
});
*/