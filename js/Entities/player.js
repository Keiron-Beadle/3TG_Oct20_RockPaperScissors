class Player {
    constructor(pMainContext, pPositionVec, pSprite){
         this.mSprite = pSprite;
         this.mPosition = pPositionVec;
         this.mMainContext = pMainContext;
         this.transformMatrix;
         var mPlayerImage = new Image();
         mPlayerImage.src = this.mSprite;
         //Constructor
         // MainContext, Position, Rotation, Scale (Vector), SpriteSheet, NumOfFrames, Size of Individual Frame , <-- , Size of spritesheet
         this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
             0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, [3,3]);

        //this.setMoveX(pMoveX);
        //this.setMoveY(pMoveY); //<-- James said he didn't need these parameters anymore so I removed them from constructor
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

    //pCanvas needed for when checking player is inside boundaries, and if not, prevent movement
    //pObstacles for collision
    update(pCanvas, pObstacles, pWorldMatrix){
        this.newPosition(pWorldMatrix); //New position is meant to run when player inputs new direction
        this.mAnimatedSpriteSheet.update();
    }
    draw(){
        this.mAnimatedSpriteSheet.draw(this.transformMatrix);
    }

    newPosition(pWorldMatrix) {
        var x, y, translate, newPosition;

        x = this.mPosition.getX();
        //x += this.getMoveX();
        y = this.mPosition.getY();
        //y += this.getMoveY();

        newPosition = new Vector(x, y, 1);

        translate = Matrix.createTranslation(newPosition);
        this.transformMatrix = pWorldMatrix.multiply(translate);
    }

    getPosition(){
      return this.mPosition;
    }

    getCenterPosition(){
      return new Vector(this.mPosition.getX() + 270 / 2, this.mPosition.getY() + 270 / 2, 0);
    }

    getVertices(){
        let posX = this.mPosition.getX();
        let posY = this.mPosition.getY();
        return [new Vector(posX, poY, 0),
                new Vector(posX + 270, posY, 0),
                new Vector(posX + 270, posY - 270, 0),
                new Vector(posX, posY - 270, 0)];
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
    
