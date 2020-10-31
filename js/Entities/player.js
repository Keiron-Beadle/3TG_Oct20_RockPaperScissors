class Player {
    constructor(pMainContext, pPositionVec, pSprite, pMoveX, pMoveY){
        // this.loaded = false;
         this.mSprite = pSprite;
         this.mPosition = pPositionVec;
         this.mMainContext = pMainContext;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, new Vector(3,3,0));

        this.setMoveX(pMoveX);
        this.setMoveY(pMoveY);
        //this.mSpeedX = 0;
        //this.mSpeedY = 0;

        //document.getElementById('down').onclick = function() {
        //    this.mSpeedY += 1;
        //}
    }
    getMoveX() {
        return this.mMoveX;
    }
    setMoveX(pMoveX) {
        this.mMoveX = pMoveX;
    }
    getMoveY() {
        return this.mMoveY;
    }
    setMoveY(pMoveY) {
        this.mMoveY = pMoveY;
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
        x += this.getMoveX();
        y = this.mPosition.getY();
        y += this.getMoveY();

        newPosition = new Vector(x, y, 1);

        translate = Matrix.createTranslation(newPosition);
        transform = pWorldMatrix.multiply(translate);
        
        return transform;
    }
    
    /* Dont need that
    updateGameArea() {
      //myGameArea.clear();
      this.mAnimatedSpriteSheet.newPos();
      this.mAnimatedSpriteSheet.update();
    }
    */
    moveUp() {
        if(document.getElementById("up").onclick) {
            var moveY = this.getMoveY();
            moveY -= 1;
            this.setMoveY(moveY);
        }
    }
    /*
    moveDown() {
        if(document.getElementById("up").onclick) {
            var moveY = this.getMoveY();
            moveY += 1;
            this.setMoveY(moveY);
        }
    }
    */
    moveLeft() {
        if(document.getElementById("up").onclick) {
            var moveX = this.getMoveX();
            moveX -= 1;
            this.setMoveX(moveX);
        }
    }
    moveRight() {
        if(document.getElementById("up").onclick) {
            var moveX = this.getMoveX();
            moveX += 1;
            this.setMoveX(moveX);
        }
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
    
    