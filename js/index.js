function onLoad() {
    var canvas, context, newSpriteSheet, originMatrix;
    var image, frameSizeX, frameSizeY, numFrames;
    var rootNode, renderVisitor;

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

        //Keiron's Polygon & Scenegraph Test
        renderVisitor = new RenderVisitor(context);
        var polygonTestVertices = [new Vector(-200, -200), new Vector(100, -50), new Vector(0,0), new Vector(-200, -200)];
        var polygonTest = new Polygon(polygonTestVertices, "#FFFFFF");
        var polygonTestNode = new GeometryNode("Polygon Geometry Node", polygonTest);
        rootNode = new TransformNode("Root", originMatrix);
        rootNode.addChild(polygonTestNode);
        //
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
        rootNode.setLocalTransform(originMatrix);
        renderVisitor.visit(rootNode);
        animationLoop();
    }

    initialiseContext();

    draw(context);
}

window.addEventListener('load', onLoad, false);
