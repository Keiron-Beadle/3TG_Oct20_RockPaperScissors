function onLoad() {
    var canvas, context, originMatrix;
    var image;
    var rootNode, renderVisitor;
    var enemyTest;
    var entities = [];
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
        
        //Keiron's Polygon & Scenegraph Test
        renderVisitor = new RenderVisitor(context);
        var polygonTestVertices = [new Vector(-200, -200), new Vector(100, -50), new Vector(0,0), new Vector(-200, -200)];
        var polygonTest = new Polygon(polygonTestVertices, "#FFFFFF");
        var polygonTestNode = new GeometryNode("Polygon Geometry Node", polygonTest);
        rootNode = new TransformNode("Root", originMatrix);
        //rootNode.addChild(polygonTestNode);
        //

        //Keiron's Enemy Test
            enemyTest = new Enemy(context, new Vector(-500,0,1), 'SpriteSheets/Werewolf-Walk.png');
            entities.push(enemyTest);
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
            entities[i].update();
        }
    }

    function draw() {
        context.clearRect(-canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height);
        originMatrix = setCanvasOrigin();
        rootNode.setLocalTransform(originMatrix);
        renderVisitor.visit(rootNode);
        for (var i = 0; i < entities.length; i++){
            entities[i].draw(originMatrix);
        }
    }

    initialiseContext();
    animationLoop();
    draw(context);
}

window.addEventListener('load', onLoad, false);
