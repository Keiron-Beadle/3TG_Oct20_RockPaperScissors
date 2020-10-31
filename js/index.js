function onLoad() {
    var canvas, context, originMatrix;
    var image;
    var rootNode, renderVisitor;
    var enemyTest, player;
    var entities = [];
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
        image = new Image();
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
        enemyTest = new Enemy(context, new Vector(100,50,1), 'SpriteSheets/Demon-Walk.png');
        player = new Player(context, new Vector(-200,0,1), 'SpriteSheets/Werewolf_walk.png');
        entities.push(enemyTest);
        entities.push(player);
        enemyTest.setTarget(player);
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
    }

    function draw() {
        context.clearRect(-canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height);
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
