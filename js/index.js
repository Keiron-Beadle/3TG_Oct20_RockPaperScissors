function onLoad() {
    var canvas, context, newSpriteSheet, originMatrix;
    var image, frameSizeX, frameSizeY, numFrames;


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

        image = new Image();
        //image.src = 'SpriteSheets/Beewolf_idle gif.png';
        newSpriteSheet = new AnimatedSpriteSheet(context, new Vector(-370, -200, 1), 0, new Vector(1.5, 1.5, 1),
        image, numFrames, frameSizeX, frameSizeY);
    }

    function setCanvasOrigin(){
        var origin = new Vector(canvas.width /2, canvas.height /2, 1);
        var originMatrix = Matrix.createTranslation(origin);
        originMatrix.setTransform(context);
        return originMatrix;
    }

    function animationLoop() {
        newSpriteSheet.update();
        newSpriteSheet.draw(originMatrix);
        requestAnimationFrame(animationLoop);
    }

    function draw() {
        originMatrix = setCanvasOrigin();
        animationLoop();
    }

    initialiseContext();

    draw(context);
}

window.addEventListener('load', onLoad, false);
