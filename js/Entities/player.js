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
         
             
             if(pSprite == "SpriteSheets/Werewolf-Idle.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 2, 270, 270, [1,1], 300);
             }
             else if(pSprite == "SpriteSheets/Werewolf_walk.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 10, 270, 270, [3,3]);
             }
             else if(pSprite == "SpriteSheets/Werewolf-Bite.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 5, 270, 270, [2,3]);
             }
             else if(pSprite == "SpriteSheets/Werewolf-Claw.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 7, 270, 270, [3,3]);
             }
             else if(pSprite == "SpriteSheets/Werewolf-Jump.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 6, 270, 270, [2,3]);
             }
             else if(pSprite == "SpriteSheets/Werewolf-Howl.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 7, 270, 270, [3,3]);
             }
             else if(pSprite == "SpriteSheets/Werewolf-DoubleJump.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 7, 270, 270, [3,3]);
             }
             else if(pSprite == "SpriteSheets/Beewolf-Walk.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 9, 270, 270, [3,3]);
             }
             else if(pSprite == "SpriteSheets/Beewolf-jump.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 5, 270, 270, [2,3]);
             }
             else if(pSprite == "SpriteSheets/Beewolf-Idle.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 4, 270, 270, [2,2]);
             }
             else if(pSprite == "SpriteSheets/Beewolf-DoubleJump.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 9, 270, 270, [3,3]);
             }
             else if(pSprite == "SpriteSheets/Beewolf-Claw.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 6, 270, 270, [2,3]);
             }
             else if(pSprite == "SpriteSheets/Beewolf-Bite.png"){
                this.mAnimatedSpriteSheet = new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                    0, new Vector(1,1,1), mPlayerImage, 5, 270, 270, [2,3]);
             }             
             


    }
    getPosition(){
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    getTransformedPosition(){
        return this.mTransformMatrix;
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

 







    
