let ball;
let gameContainer;
let interval;
let hurdleContainer;
let limit = 7200;
let period = 100;

//logs
let score;

window.onload = () => {
    gameContainer = document.getElementById("game-container");
    ball = document.getElementById("ball");
    hurdleContainer = document.getElementById("hurdles");
    score = document.getElementById("score");

    setDimensions();
    createHurdles();

    interval = setInterval(frame, period);

    window.onkeydown = (e) => {
        if (e.keyCode == 32) {
            moveUp();
        }
    }
}

const moveUp = () => {
    let currentTop =  ball.style.top = Number(ball.style.top.substr(0, ball.style.top.length - 2));
    if (currentTop >= 30)
        ball.style.top = currentTop - 30;
} 

const setDimensions = () => {
    ball.style.height = 60;
    ball.style.width = 60;
    
    ball.style.top = 40;
    ball.style.left = 50;

    gameContainer.style.height = 480;
    gameContainer.style.width = 720;

    hurdleContainer.style.left = 0;
}

const frame = () => {
    gravity();
    logs();

    if (animateHurdle()) {
        clearInterval(interval);
        alert("You won...!");
    }

    if(collisionDetection()) {
        clearInterval(interval);
        alert("You are out ..!");
    }

}

const logs = () => {
    score.innerHTML = Number(score.innerHTML) + 1000/period;
}

const createHurdles = () => {
    let x = 0;
    let height;

    while (x < limit) {
        x += Math.random() * 280;
        height = Math.random() * 100 + 80;

        let hurdle = document.createElement("div");
        hurdle.setAttribute("class", "hurdle");
        hurdle.style.height = height;
        hurdle.style.left = x;

        x += 100;

        hurdleContainer.innerHTML += hurdle.outerHTML;

    }
}

const animateHurdle = () => {
    hurdleContainer.style.left = getNumber(hurdleContainer.style.left) - 10;
    if (getNumber(hurdleContainer.style.left) < -1 * limit - 700) {
        return true;
    }
}

const gravity = () => {
    ball.style.top = Number(ball.style.top.substr(0, ball.style.top.length - 2)) + 10;
}

const collisionDetection = () =>  {
    //use or
    return (collisionWithFloor() || collisionWithCeil());
}

const collisionWithFloor = () => {
    if (getNumber(ball.style.height) + getNumber(ball.style.top) > getNumber(gameContainer.style.height))
        return true;
}

const collisionWithCeil = () => {
    if (getNumber(ball.style.top) < 30)
        return true;
}

//helping functioms
const getNumber = (property) => {
    return Number(property.substr(0, property.length - 2))
} 