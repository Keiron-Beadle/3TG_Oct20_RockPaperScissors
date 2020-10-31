class Player {
    constructor(pMainContext, pPositionVec, pSprite){
        // this.loaded = false;
         this.mSprite = pSprite;
         this.mPosition = pPositionVec;
         this.mMainContext = pMainContext;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, [3,3]);

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
      myGamePiece.newPos();
      myGamePiece.update();
    }
    
    moveup() {
      myGamePiece.mSpeedY -= 1;
    }
    
    movedown() {
      myGamePiece.mSpeedY += 1;
    }
    
    moveleft() {
      myGamePiece.mSpeedX -= 1;
    }
    
    moveright() {
      myGamePiece.mSpeedX += 1;
    }
}
    
    