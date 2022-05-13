document.getElementById("logIn").style.top = (window.innerHeight/2 + 60) + "px"
document.getElementById("logIn").style.left = (window.innerWidth/2 - 8) + "px"
document.getElementById("logUser").style.left = (window.innerWidth/2 + 20) + "px"
document.getElementById("logPass").style.left = (window.innerWidth/2 + 20) + "px"
document.getElementById("LogInHeading").style.top = (window.innerHeight/2 - 120) + "px"
document.getElementById("LogInHeading").style.left = (window.innerWidth/2 + 40) + "px"


const socket = io("https://idle-knight.herokuapp.com")

addEventListener("keydown", (e) => {
    if(e.key === "Enter") {

    } else if (e.key == "Space") {
        e.preventDefault();
    }
})


function logIn() {
    let user = document.getElementById("logUser").value
    let pass = document.getElementById("logPass").value
    console.info("Log In Here. User: " + user + " Pass: " + pass)
}
