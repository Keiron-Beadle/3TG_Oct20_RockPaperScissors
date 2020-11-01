class Player {
    constructor(pMainContext, pPosition, pSprite){
         this.setPosition(pPosition);
         this.mSprite = pSprite;
         this.mMainContext = pMainContext;
         this.mTransformMatrix;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         //Constructor
         // MainContext, Position, Rotation, Scale (Vector), SpriteSheet, NumOfFrames, Size of Individual Frame , <-- , Size of spritesheet
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, [3,3]);

    }
    getPosition(){
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    //pCanvas needed for when checking player is inside boundaries, and if not, prevent movement
    //pObstacles for collision
    update(pCanvas, pObstacles, pWorldMatrix){
        this.newPosition(pWorldMatrix); //New position is meant to run when player inputs new direction
        this.mAnimatedSpriteSheet.update();
    }
    draw(){
        this.mAnimatedSpriteSheet.draw(this.mTransformMatrix);
    }   

    newPosition(pWorldMatrix) {
        var x, y, translate, newPosition;

        x = this.getPosition().getX();
        y = this.getPosition().getY();

        newPosition = new Vector(x, y, 1);

        translate = Matrix.createTranslation(newPosition);
        this.mTransformMatrix = pWorldMatrix.multiply(translate);
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
  
    moveUp(pCanvas) {
        var y = this.getPosition().getY();
        if (y < 0){
            y = 0;
        }
        else {
            y -= 1;
        }
        this.setPosition(y);
    }
    moveDown(pCanvas) {
        var y = this.getPosition().getY();
        //if (y + this.mPlayerImage.height > pCanvas.height){
            /*
        if (y + 100 > pCanvas.height){
                y = pCanvas.height - this.mPlayerImage.height;
        }
        else {
            y += 1;
        }
        */
        y += 1;
        this.setPosition(y);
    }
    moveLeft(pCanvas) {
        var x = this.getPosition().getX();
        if (x < 0){
            x = 0;
        }
        else {
            x -= 1;
        }
        this.setPosition(x);
    }
    moveRight(pCanvas) {
        var x = this.getPosition().getX();
        if (x + this.mPlayerImage.width > pCanvas.width){
            x = pCanvas.width - this.mPlayerImage.width;
        }
        else {
            x += 1;
        }
        this.setPosition(x);
    }
    /*
    stopMove() {
        this.setMoveX(0);
        this.setMoveY(0);
    }
    */
}

 







    
