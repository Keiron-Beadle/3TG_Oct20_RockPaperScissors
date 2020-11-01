function onLoad() {
    var canvas, context, originMatrix;
    var backgroundImage;
    var rootNode, renderVisitor;
    var enemyTest, player;
    var entities = [];
    var powerups = [];
    var obstacles = [];
    
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
       /*
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
        */
        backgroundImage = new Image();
        backgroundImage.src="SpriteSheets/Background.png";
        originMatrix = setCanvasOrigin();
        renderVisitor = new RenderVisitor(context);
        rootNode = new TransformNode("Root", originMatrix);
        //Keiron's Polygon & Scenegraph Test
        //var polygonTestVertices = [new Vector(-200, -200), new Vector(100, -50), new Vector(0,0), new Vector(-200, -200)];
        //var polygonTest = new Polygon(polygonTestVertices, "#FFFFFF");
        //var polygonTestNode = new GeometryNode("Polygon Geometry Node", polygonTest);
        //rootNode.addChild(polygonTestNode);
        //

        //Keiron's Enemy Test
        //enemyTest = new Enemy(context, new Vector(100,25,1), 'SpriteSheets/Demon-Walk.png');
        //player = new Player(context, new Vector(-200,0,1), 'SpriteSheets/Werewolf-Idle.png');
        enemyTest = new Enemy(context, new Vector(0,15,1), 'SpriteSheets/Demon-Walk.png');
        player = new Player(context, new Vector(100,0,1));
        entities.push(player);
        //entities.push(enemyTest);
        //enemyTest.setTarget(player);
        let powerupTest = new Powerup(context, new Vector(0,0,1), originMatrix);
        //powerups.push(powerupTest);

        let platformTest = new Platform(context, new Vector(-50,350,1), 500, originMatrix);
        obstacles.push(platformTest);
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
        for (var i = 0; i < entities.length; i++){
            entities[i].update(canvas, obstacles, originMatrix); //Update all entities i.e. enemy/player
        }

        for (var i = 0; i < obstacles.length; i++){
            obstacles[i].update();
        }

        for (var i = 0; i < powerups.length; i++){
            powerups[i].update(player);
            if (!powerups[i].isAlive()){
                powerups.splice(i, 1);
                if (i == powerups.length){
                    break;
                }
                else{
                    i--;
                }
            }
        }
        if(entities[0].health == 0){
            location.reload();
        }
    }

    function draw() {
        context.drawImage(backgroundImage, -canvas.width / 2, - canvas.height / 2);
        renderVisitor.visit(rootNode);

        // TRY CONTROL
        document.getElementById('down').onclick = function() {
            //alert(moveY);
            var moveY = entities[1].getMoveY();
            moveY += 1;
            entities[1].setMoveY(moveY);
        }
        //
        for (var i = 0; i < entities.length; i++){
            entities[i].draw(); //Draw all entities i.e. enemy/player
        }

        for (var i = 0; i < obstacles.length; i++){
            obstacles[i].draw();
        }

        for (var i = 0; i < powerups.length; i++){
            powerups[i].draw();
        }
    }

    function startGame() {
        myGameArea.start();
        player = new Player(context, new Vector(0,0,1), 'SpriteSheets/Werewolf-Walk.png');
    }

    initialiseContext();

    //startGame();

    animationLoop();
    //draw();
}

window.addEventListener('load', onLoad, false);
