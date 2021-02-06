const socket = io.connect('http://localhost:5500');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ctx2 = canvas.getContext('2d')

const form = document.getElementById('userForm');
const gameAreaDiv = document.getElementById('gameArea');

buildStadium();
let football;
let clientBalls = {};
let selfID, p1ID, p2ID
let countDownSec = 0

socket.on('gameSetup', data => {
    selfID = socket.id
    p1ID = data.p1ID
    p2ID = data.p2ID
    //ctx.clearRect(0, 80, canvas.clientWidth, canvas.clientHeight);
    clientBalls[data.p1ID] = new Capsule(data.p1X+35, data.p1Y, data.p1X-35, data.p1Y, 25, 10);
    clientBalls[data.p1ID].no = 1;
    clientBalls[data.p1ID].color = "lightblue";
    clientBalls[data.p1ID].score = data.p1score
    clientBalls[data.p1ID].point = data.p1point
    clientBalls[data.p2ID] = new Capsule(data.p2X+35, data.p2Y, data.p2X-35, data.p2Y, 25, 10);
    clientBalls[data.p2ID].no = 2;
    clientBalls[data.p2ID].color = "lightgreen";
    clientBalls[data.p2ID].score = data.p2score
    clientBalls[data.p2ID].point = data.p2point
    football = new Ball(data.ballX, data.ballY, 20, 10);
    football.color = "red";
    userInput(clientBalls[selfID]);
})

socket.on('deletePlayer', playerID => {
    if(clientBalls[playerID]){
        clientBalls[playerID].remove();
        delete clientBalls[playerID];
        football.remove();
        delete football;
    }
})

socket.on('playerName', data => {
    clientBalls[data.id].name = data.name;
})

socket.on('updateFootball', footballPos => {
        football.setPosition(footballPos.x, footballPos.y);
})

socket.on('positionUpdate', playerPos => {
    for(let id in clientBalls){
        if(clientBalls[id] !== undefined && id === playerPos.id){
            clientBalls[id].setPosition(playerPos.x, playerPos.y, playerPos.angle);
        }
    }
})

socket.on('updateScore', newScore => {
    if(newScore.roundWin === 1){
        document.body.style.backgroundColor = "lightskyblue";
    }
    if(newScore.roundWin === 2){
        document.body.style.backgroundColor = "limegreen";
    }
    if(newScore.gameWin !== 0){
        document.body.style.backgroundColor = "white";
    }
    if(newScore.roundWin !== 0){
        countDown()
    }
    clientBalls[p1ID].score = newScore.p1score
    clientBalls[p1ID].point = newScore.p1point
    clientBalls[p2ID].score = newScore.p2score
    clientBalls[p2ID].point = newScore.p2point
})

requestAnimationFrame(renderOnly);

function userInterface(){
    ctx.font = "30px Arial";
    for (let id in clientBalls){
        if(clientBalls[id].no === 1){
            ctx.fillStyle = "blue";
            ctx.textAlign = "left";
            ctx.fillText(`${clientBalls[p1ID].point}`, 30, 30);
            if(clientBalls[id].name){
                ctx.fillText(clientBalls[id].name, 30, 70);
            } else {
                ctx.fillStyle = "black";
                ctx.fillText("....", 30, 70);
            }
            //displaying scores
            ctx.font = "60px Arial";
            switch(clientBalls[p1ID].score){
                case 0: 
                    ctx.fillStyle = "silver"
                    ctx.fillText("*", 100, 50)
                    ctx.fillText("*", 130, 50)
                    ctx.fillText("*", 160, 50)
                    break
                case 1: 
                    ctx.fillText("*", 100, 50)
                    ctx.fillStyle = "silver"
                    ctx.fillText("*", 130, 50)
                    ctx.fillText("*", 160, 50)
                    break
                case 2: 
                    ctx.fillText("*", 100, 50)
                    ctx.fillText("*", 130, 50)
                    ctx.fillStyle = "silver"
                    ctx.fillText("*", 160, 50)
                    break
            }
            ctx.font = "30px Arial";
        } else if(clientBalls[id].no === 2){
            ctx.fillStyle = "green";
            ctx.textAlign = "right";
            ctx.fillText(`${clientBalls[p2ID].point}`, 600, 30);
            if(clientBalls[id].name){
                ctx.fillText(clientBalls[id].name, 600, 70);
            } else {
                ctx.fillStyle = "black";
                ctx.fillText("....", 600, 70);
            }
            ctx.font = "60px Arial";
            switch(clientBalls[p2ID].score){
                case 0: 
                    ctx.fillStyle = "silver"
                    ctx.fillText("*", 530, 50)
                    ctx.fillText("*", 500, 50)
                    ctx.fillText("*", 470, 50)
                    break
                case 1: 
                    ctx.fillText("*", 530, 50)
                    ctx.fillStyle = "silver"
                    ctx.fillText("*", 500, 50)
                    ctx.fillText("*", 470, 50)
                    break
                case 2: 
                    ctx.fillText("*", 530, 50)
                    ctx.fillText("*", 500, 50)
                    ctx.fillStyle = "silver"
                    ctx.fillText("*", 470, 50)
                    break
            }
        }
    }
    if (countDownSec > 0) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(`START IN ${countDownSec}...`, 320, 200);
    }
}

function buildStadium(){
    new Wall(60, 80, 580, 80)
    new Wall(60, 480, 580, 480)
    new Wall(0, 370, 0, 190)
    new Wall(640, 370, 640, 190)

    new Box(0, 80, 60, 80, 110, 0)
    new Box(580, 80, 640, 80, 110, 0)
    new Box(0, 370, 60, 370, 110, 0)
    new Box(580, 370, 640, 370, 110, 0)
}

const countDown = () => {
    countDownSec = 3
    let count = setInterval(() => {
        countDownSec--
    }, 1000)
    setTimeout(() => {
        clearInterval(count)
    }, 3000)
}

form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    canvas.focus();
    console.log("self: ",selfID)
    clientBalls[selfID].name = document.getElementById('userName').value;
    socket.emit('clientName', clientBalls[selfID].name);
    return false;
}