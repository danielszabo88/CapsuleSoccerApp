let justPressed = false;

//Event listeners for the arrow keys
function userInput(obj){
    canvas.addEventListener('keydown', function(e){
        if(e.code === "ArrowLeft"){
            if(obj.left === false){
                justPressed = true;
            }
            obj.left = true;
        }
        if(e.code === "ArrowUp"){
            if(obj.up === false){
                justPressed = true;
            }
            obj.up = true;
        }
        if(e.code === "ArrowRight"){
            if(obj.right === false){
                justPressed = true;
            }
            obj.right = true;
        }
        if(e.code === "ArrowDown"){
            if(obj.down === false){
                justPressed = true;
            }
            obj.down = true;
        }
        if(e.code === "Space"){
            if(obj.action === false){
                justPressed = true;
            }
            obj.action = true;
        }
        if (justPressed === true){
            emitUserCommands(obj);
            justPressed = false;
        }
    });
    
    canvas.addEventListener('keyup', function(e){
        if(e.code === "ArrowLeft"){
            obj.left = false;
        }
        if(e.code === "ArrowUp"){
            obj.up = false;
        }
        if(e.code === "ArrowRight"){
            obj.right = false;
        }
        if(e.code === "ArrowDown"){
            obj.down = false;
        }
        if(e.code === "Space"){
            obj.action = false;
        }
        emitUserCommands(obj);
    });    
}

function emitUserCommands(obj){
    if(countDownSec === 0){
        let userCommands = {
            left: obj.left,
            up: obj.up,
            right: obj.right,
            down: obj.down,
            action: obj.action
        }
        socket.emit('userCommands', userCommands);
    } 
}
