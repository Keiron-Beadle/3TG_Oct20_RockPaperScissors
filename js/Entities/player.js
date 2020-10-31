class Player {
    constructor(pMainContext, pPositionVec, pSprite){
        // this.loaded = false;
         this.mSprite = pSprite;
         this.mPosition = pPositionVec;
         this.mMainContext = pMainContext;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270);

        this.mSpeedX = 0;
        this.mSpeedY = 0;
    }
 
     update(){
         this.mAnimatedSpriteSheet.update();
     }
 
     draw(pWorldMatrix){
         this.mAnimatedSpriteSheet.draw(pWorldMatrix);
    }   

    newPosition() {
        this.mPosition.getX() += this.mSpeedX;
        this.mPosition.getY() += this.mSpeedY;
      }
    
    updateGameArea() {
      myGameArea.clear();
      this.mAnimatedSpriteSheet.newPos();
      this.mAnimatedSpriteSheet.update();
    }
    
    moveup() {
        this.mAnimatedSpriteSheet.mSpeedY -= 1;
    }
    
    movedown() {
        this.mAnimatedSpriteSheet.mSpeedY += 1;
    }
    
    moveleft() {
        this.mAnimatedSpriteSheet.mSpeedX -= 1;
    }
    
    moveright() {
        this.mAnimatedSpriteSheet.mSpeedX += 1;
    }

    stopMove() {
        this.mAnimatedSpriteSheet.speedX = 0;
        this.mAnimatedSpriteSheet.speedY = 0;
    }
}
    
    