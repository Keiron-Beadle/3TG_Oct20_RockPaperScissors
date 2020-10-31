class Player {
    constructor(pMainContext, pPosition, pSprite){
         this.mSprite = pSprite;
         this.mMainContext = pMainContext;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, [3,3]);

             this.setPosition(pPosition);
    }
    getPosition(){
        return this.mPosition;
      }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
 
    update(){
         this.mAnimatedSpriteSheet.update();
    }
    draw(pWorldMatrix){
        var transformMatrix = this.newPosition(pWorldMatrix);
        this.mAnimatedSpriteSheet.draw(transformMatrix);
        //this.mAnimatedSpriteSheet.draw(pWorldMatrix);
    }

    newPosition(pWorldMatrix) {
        var x, y, translate, transform, newPosition;

        x = this.getPosition().getX();
        y = this.getPosition().getY();

        newPosition = new Vector(x, y, 1);

        translate = Matrix.createTranslation(newPosition);
        transform = pWorldMatrix.multiply(translate);
        
        return transform;
    }

    getCenterPosition(){
      return new Vector(this.getPosition().getX() + 270 / 2, this.getPosition().getY() + 270 / 2, 0);
    }
    
    getVertices(){
        let posX = this.getPosition().getX();
        let posY = this.getPosition().getY();
        return [new Vector(posX, poY, 0),
                new Vector(posX + 270, posY, 0),
                new Vector(posX + 270, posY - 270, 0),
                new Vector(posX, posY - 270, 0)];
    }

    moveUp() {
        var y = this.getPosition();
        y -= 1;
        this.setPosition(y);
    }
    moveDown() {
        var y = this.getPosition();
        y += 1;
        this.setPosition(y);
    }
    moveLeft() {
        var x = this.getPosition();
        x -= 1;
        this.setPosition(x);
    }
    moveRight() {
        var x = this.getPosition();
        x += 1;
        this.setPosition(x);
    }
    
    stopMove() {
        this.setMoveX(0);
        this.setMoveY(0);
    }
    /*
    setupKeyControls() {
        document.onkeydown = function(e) {
          switch (e.keyCode) {
            case 37:
            cube.rotation.x += 1;
            break;
            case 38:
            cube.rotation.z -= 1;
            break;
            case 39:
            cube.rotation.x -= 1;
            break;
            case 40:
            cube.rotation.z += 1;
            break;
          }
        };
    }
    */
}
    
