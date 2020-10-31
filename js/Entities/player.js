class Player {
    constructor(pMainContext, pPositionVec, pSprite){
        // this.loaded = false;
         this.mSprite = pSprite;
         this.mPosition = pPositionVec;
         this.mMainContext = pMainContext;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, new Vector(3,3,0));

        this.mSpeedX = 0;
        this.mSpeedY = 0;
    }
 
     update(){
         this.mAnimatedSpriteSheet.update();
     }
 
     draw(pWorldMatrix){
        var transformMatrix = this.newPosition(pWorldMatrix);
        this.mAnimatedSpriteSheet.draw(transformMatrix);
    }   

    newPosition(pWorldMatrix) {
        var x, y, translate, transform, newPosition;

        x = this.mPosition.getX();
        x += this.mSpeedX;
        y = this.mPosition.getY();
        y += this.mSpeedY;

        newPosition = new Vector(x, y, 1);

        translate = Matrix.createTranslation(newPosition);
        transform = pWorldMatrix.multiply(translate);
        
        return transform;
    }
    
    /*
    updateGameArea() {
      //myGameArea.clear();
      this.mAnimatedSpriteSheet.newPos();
      this.mAnimatedSpriteSheet.update();
    }
    */

    moveup() {
        this.mSpeedY -= 1;
    }
    
    movedown() {
        this.mSpeedY += 1;
    }
    
    moveleft() {
        this.mSpeedX -= 1;
    }
    
    moveright() {
        this.mSpeedX += 1;
    }

    stopMove() {
        this.mSpeedX = 0;
        this.mSpeedY = 0;
    }

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
}
    
    