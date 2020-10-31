class Player {
    constructor(pMainContext, pPositionVec, pSprite, pSpeedX, pSpeedY){
        // this.loaded = false;
         this.mSprite = pSprite;
         this.mPosition = pPositionVec;
         this.mMainContext = pMainContext;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, new Vector(3,3,0));

        this.setSpeedX(pSpeedX);
        this.setSpeedY(pSpeedY);
        //this.mSpeedX = 0;
        //this.mSpeedY = 0;

        //document.getElementById('down').onclick = function() {
        //    this.mSpeedY += 1;
        //}
    }
    getSpeedX() {
        return this.mSpeedX;
    }
    setSpeedX(pSpeedX) {
        this.mSpeedX = pSpeedX;
    }
    getSpeedY() {
        return this.mSpeedY;
    }
    setSpeedY(pSpeedY) {
        this.mSpeedY = pSpeedY;
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
        x += this.getSpeedX();
        y = this.mPosition.getY();
        y += this.getSpeedY();

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
        if(document.getElementById("up").onclick) {
            var speedY = this.getSpeedY();
            speedY -= 1;
            this.setSpeedY(speedY);
        }
    }
    
    /*
    movedown() {
        if(document.getElementById("up").onclick) {
            var speedY = this.getSpeedY();
            speedY += 1;
            this.setSpeedY(speedY);
        }
    }
    */
    moveleft() {
        if(document.getElementById("up").onclick) {
            var speedX = this.getSpeedX();
            speedX -= 1;
            this.setSpeedX(speedX);
        }
    }
    
    moveright() {
        if(document.getElementById("up").onclick) {
            var speedX = this.getSpeedX();
            speedX += 1;
            this.setSpeedX(speedX);
        }
    }

    stopMove() {
        this.setSpeedX(0);
        this.setSpeedY(0);
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
    
    