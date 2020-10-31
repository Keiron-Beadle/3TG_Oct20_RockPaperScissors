function onLoad() {
    var canvas, context, newSpriteSheet, originMatrix;
    var image, frameSizeX, frameSizeY, numFrames;
    var rootNode, renderVisitor;
    var enemyTest, player;
    var entities = [];

    
    function initialiseContext() {
        /*
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
        */
        var myGameArea = {
            canvas : document.getElementById("gameCanvas"),
        
            start : function() {
            if(!canvas) {
                alert ("I can not find the canvas element!");
                return;
            }
            this.context = this.canvas.getContext('2d');
            if (!context) {
                alert('Error: failed to get context!');
                return;
            }
              document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        }
    }


        //image = new Image();
        //image.src = 'SpriteSheets/Beewolf_idle gif.png';
        //newSpriteSheet = new AnimatedSpriteSheet(context, new Vector(-370, -200, 1), 0, new Vector(1.5, 1.5, 1),
        //image, numFrames, frameSizeX, frameSizeY);

        //Keiron's Polygon & Scenegraph Test
        renderVisitor = new RenderVisitor(context);
        var polygonTestVertices = [new Vector(-200, -200), new Vector(100, -50), new Vector(0,0), new Vector(-200, -200)];
        var polygonTest = new Polygon(polygonTestVertices, "#FFFFFF");
        var polygonTestNode = new GeometryNode("Polygon Geometry Node", polygonTest);
        rootNode = new TransformNode("Root", originMatrix);
        //rootNode.addChild(polygonTestNode);
        //

        //Keiron's Enemy Test
            enemyTest = new Enemy(context, new Vector(0,0,1), 'SpriteSheets/Werewolf-Walk.png');
            entities.push(enemyTest);
            //player = new Player(context, new Vector(0,0,1), 'SpriteSheets/Werewolf-Walk.png');
            //entities.push(player);
        //
    }

    function setCanvasOrigin(){
        var origin = new Vector(canvas.width /2, canvas.height /2, 1);
        var originMatrix = Matrix.createTranslation(origin);
        originMatrix.setTransform(context);
        return originMatrix;
    }

    function animationLoop() {
        update();
        draw();
        requestAnimationFrame(animationLoop);
    }

    function update(){
        //newSpriteSheet.update();
        for (var i = 0; i < entities.length; i++){
            entities[i].update();
        }
    }

    function draw() {
        context.clearRect(0,0, canvas.width, canvas.height);
        originMatrix = setCanvasOrigin();
        rootNode.setLocalTransform(originMatrix);
        renderVisitor.visit(rootNode);
        //newSpriteSheet.draw(originMatrix);
        for (var i = 0; i < entities.length; i++){
            entities[i].draw(originMatrix);
        }
    }

    function startGame() {
        myGameArea.start();
        player = new Player(context, new Vector(0,0,1), 'SpriteSheets/Werewolf-Walk.png');
    }

    initialiseContext();

    startGame();

    animationLoop();
    draw(context);
}

window.addEventListener('load', onLoad, false);
