document.getElementById("signUser").style.left = (window.innerWidth/2 - 180) + "px"
document.getElementById("signPass").style.left = (window.innerWidth/2 - 180) + "px"
document.getElementById("logUser").style.left = (window.innerWidth/2 + 20) + "px"
document.getElementById("logPass").style.left = (window.innerWidth/2 + 20) + "px"

document.getElementById("signUser").style.top = (window.innerHeight/2 - 40) + "px"
document.getElementById("signPass").style.top = (window.innerHeight/2 + 20) + "px"
document.getElementById("logUser").style.top = (window.innerHeight/2 - 40) + "px"
document.getElementById("logPass").style.top = (window.innerHeight/2 + 20) + "px"

document.getElementById("LogInHeading").style.top = (window.innerHeight/2 - 120) + "px"
document.getElementById("LogInHeading").style.left = (window.innerWidth/2 + 40) + "px"
document.getElementById("signUpHeading").style.top = (window.innerHeight/2 - 120) + "px"
document.getElementById("signUpHeading").style.left = (window.innerWidth/2 - 160) + "px"

document.getElementById("logIn").style.top = (window.innerHeight/2 + 60) + "px"
document.getElementById("logIn").style.left = (window.innerWidth/2 - 8) + "px"
document.getElementById("signUp").style.top = (window.innerHeight/2 + 60) + "px"
document.getElementById("signUp").style.left = (window.innerWidth/2 - 208) + "px"

addEventListener("keydown", (e) => {
    if(e.key === "Enter") {

    }
})

function logIn() {
    let user = document.getElementById("logUser").value
    let pass = document.getElementById("logPass").value
    console.info("Log In Here. User: " + user + " Pass: " + pass)
}
function signIn() {
    let user = document.getElementById("signUser").value
    let pass = document.getElementById("signPass").value
    console.info("Sign In Here. User: " + user + " Pass: " + pass)
}