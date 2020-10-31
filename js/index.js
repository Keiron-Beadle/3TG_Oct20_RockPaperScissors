function onLoad() {
    var canvas, context, wereWolf, originMatrix;
    var werewolfImage, frameSizeX, frameSizeY;
    var lastTime;

    function initialiseContext() {
        canvas = document.getElementById('gameCanvas');

        if(!canvas) {
            alert ("I can not find the canvas element!");
            return;
        }
        context = canvas.getContext('2d');
        if (!context) {
            alert('Error: failed to get context!');
            return;
        }

        //lastTime = Date.now();

        werewolfImage = new Image();
        werewolfImage.src = 'SpriteSheets/Beehive-Idle.png';

        //werewolfImage.src = 'SpriteSheets/Werewolf_walk.png';
        //werewolfImage.src = 'SpriteSheets/Werewolf_walk.gif';
        //frameSizeX = werewolfImage.width();
        //frameSizeY = werewolfImage.height();
        //wereWolf = new werewolf(new Vector(0, 0, 1), context, werewolfImage, frameSizeX, frameSizeY);
        wereWolf = new AnimatedSpriteSheet(context, new Vector(0, 0, 1), 0, 1,
        werewolfImage, 3, 20, 40);
    }

    function setCanvasOrigin(){
        var origin = new Vector(canvas.width /2, canvas.height /2, 1);
        var originMatrix = Matrix.createTranslation(origin);
        originMatrix.setTransform(context);
        return originMatrix;
    }

    function animationLoop() {
        var thisTime, deltaTime;

        thisTime = Date.now();
        deltaTime = thisTime - lastTime;

        wereWolf.update(deltaTime);
        wereWolf.draw(originMatrix);

        lastTime = thisTime;
        requestAnimationFrame(animationLoop);
    }

    function draw() {
        originMatrix = setCanvasOrigin();
        animationLoop();
        drawRect();
        context.drawImage(werewolfImage, 20, 60);
    }

    function drawRect() {       
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 0.1;
        context.fillStyle = "red";
        context.strokeRect(50, 50, 50, 70);
        context.fillRect(50, 50, 50, 70);
        context.closePath();
     }

    initialiseContext();

    draw();
}

window.addEventListener('load', onLoad, false);
