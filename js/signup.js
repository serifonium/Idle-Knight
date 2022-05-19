console.log("test")
document.getElementById("signUser").style.left = (window.innerWidth/2) + "px"
document.getElementById("signPass").style.left = (window.innerWidth/2) + "px"


document.getElementById("signUser").style.top = (window.innerHeight/2) + "px"
document.getElementById("signPass").style.top = (window.innerHeight/2) + "px"

document.getElementById("signUpHeading").style.top = (window.innerHeight/2) + "px"
document.getElementById("signUpHeading").style.left = (window.innerWidth/2) + "px"

document.getElementById("signUp").style.top = (window.innerHeight/2) + "px"
document.getElementById("signUp").style.left = (window.innerWidth/2) + "px"

const socket = io("https://idle-knight.herokuapp.com")

addEventListener("keydown", (e) => {
    if(e.key === "Enter") {

    } else if (e.key == "Space") {
        e.preventDefault();
    }
})

function signUp() {
    let user = document.getElementById("signUser").value
    let pass = document.getElementById("signPass").value
    if ((pass != undefined || " ") && (user != undefined || " ")) {
        console.log("Yeah")
        socket.emit("sendData", {type: "signup", username: user, password: pass})
    }
    console.info("Sign In Here. User: " + user + " Pass: " + pass)
}

socket.on('usernameTaken', async() => {
    alert("username taken please try a diff one")
    })