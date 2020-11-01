class Player {
    constructor(pMainContext, pPosition){
         this.setPosition(pPosition);
         this.mMainContext = pMainContext;
         this.mTransformMatrix;

         this.canJump = true;
         this.jumping = false;
         this.timeOfJump = 50;
         this.jumpCounter = this.timeOfJump;
         this.heightOfJump = 300;
         this.jumpVelocity = this.heightOfJump / this.timeOfJump;
         this.gravity = 2;

         this.poweredUp = false;
         this.poweredUpDuration = 6000; //10 seconds~
         this.health = 100; //Player Health
         //Constructor
         // MainContext, Position, Rotation, Scale (Vector), SpriteSheet, NumOfFrames, Size of Individual Frame , <-- , Size of spritesheet
         
         this.IDLE = 0;
         this.WALK = 1;
         this.BITE = 2;
         this.CLAW = 3;
         this.JUMP = 4;
         this.DOUBLEJUMP = 5;

         this.initialiseSprites();      
       
         this.mAnimatedSpriteSheet = this.werewolfSprites[this.IDLE];

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
        let oldPos = this.mPosition;
        this.newPosition(pWorldMatrix, pObstacles); //New position is meant to run when player inputs new direction
        if (this.mAnimatedSpriteSheet.isFinished()){
            if (oldPos == this.mPosition){
                UpdateSpriteSheet("Idle");
            }
            else{
                UpdateSpriteSheet("Walk");
            }
        }
        this.mAnimatedSpriteSheet.update();
    }
    draw(){
        this.mAnimatedSpriteSheet.draw(this.mTransformMatrix);
    }   

    newPosition(pWorldMatrix, pObstacles) {
        var x, y, translate, newPosition;

        x = this.getPosition().getX();
        y = this.getPosition().getY();

        if (this.isJumping()){
            this.jump();
            if (this.jumpCounter <= 0){
                this.jumping = false;
                this.UpdateSpriteSheet("Walk");
                this.jumpCounter = this.timeOfJump;
            }
        }
        else{
            if(!this.collisionCheck(pObstacles)){
                y += this.gravity;
            }
        }

        newPosition = new Vector(x, y, 1);
        this.setPosition(newPosition);
        translate = Matrix.createTranslation(this.getPosition());
        this.mTransformMatrix = pWorldMatrix.multiply(translate);
    }

    collisionCheck(pObstacles){
        for (var i = 0; i < pObstacles.length; i++){
            let vertices = pObstacles[i].getVertices();
            let centerPos = this.getCenterPosition();
            let vert0X = vertices[0].getX();
            let vert1X = vertices[1].getX();
            let vert2Y = vertices[2].getY();
            if (centerPos.getX() + 80 < vert0X && centerPos.getX() + 560 > vert1X){
                return false;
            }
            if (centerPos.getY() + 420 < vert2Y && centerPos.getY() + 50 <= vert2Y + 80){
                if (centerPos.getY() + 30 <= vert2Y + 80){
                    this.jumping = false;
                }
                return false;
            }

            return true;
            
        }
    }

    getCenterPosition(){
        return new Vector(this.getPosition().getX() + 270 / 2, this.getPosition().getY() - 270 / 2, 0);
    }
    
    getVertices(){
          let posX = this.getPosition().getX();
          let posY = this.getPosition().getY();
          return [new Vector(posX, poY, 0),
                  new Vector(posX + 270, posY, 0),
                  new Vector(posX + 270, posY - 270, 0),
                  new Vector(posX, posY - 270, 0)];
    }

    canJump(){
        return this.canJump;
    }

    isJumping(){
        return this.jumping;
    }

    jump(){
        this.UpdateSpriteSheet("Jump");
        this.mPosition.setY(this.mPosition.getY() - this.jumpVelocity);
        this.jumpCounter--;
    }
            //Idle, Walk, Bite, Claw, Jump, Howl, DoubleJump
  
    UpdateSpriteSheet(pAnimation) {
        let anim;
        switch (pAnimation){
            case "Idle":
                anim = this.IDLE;
                break;
            case "Walk":
                anim =  this.WALK;
                break;
            case "Bite":
                anim =  this.BITE;
                break;
            case "Claw":
                anim =  this.CLAW;
                break;
            case "Jump": 
                anim =  this.JUMP;
                break;
            case "DoubleJump":
                anim =  this.DOUBLEJUMP;
                break;
        }
        if (this.poweredUp) {
            if (this.mAnimatedSpriteSheet != this.beewolfSprites[anim]) {
                this.mAnimatedSpriteSheet = this.beewolfSprites[anim];
            }
        }
        else {
            if (this.mAnimatedSpriteSheet != this.werewolfSprites[anim]) {
                this.mAnimatedSpriteSheet = this.werewolfSprites[anim];
            }
        }
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

    findCurrentAction(){
        let actionIndex;
        for (var i = 0; i < this.werewolfSprites.length; i++){
            if (this.werewolfSprites[i] == this.mAnimatedSpriteSheet || this.beewolfSprites[i] == this.mAnimatedSpriteSheet){
                actionIndex = i;
                break;
            }
        }
        switch (actionIndex){
            case 0:
                return "Idle";
            case 1:
                return "Walk";
            case 2:
                return "Bite";
            case 3:
                return "Claw";
            case 4:
                return "Jump";
            case 5:
                return "DoubleJump";
        }
    }

    initialiseSprites() {
        let werewolfImages = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
        werewolfImages[this.IDLE].src = "SpriteSheets/Werewolf-Idle.png";
        werewolfImages[this.WALK].src = "SpriteSheets/Werewolf-Walk.png";
        werewolfImages[this.BITE].src = "SpriteSheets/Werewolf-Bite.png";
        werewolfImages[this.CLAW].src = "SpriteSheets/Werewolf-Claw.png";
        werewolfImages[this.JUMP].src = "SpriteSheets/Werewolf-Jump.png";
        werewolfImages[this.DOUBLEJUMP].src = "SpriteSheets/Werewolf-DoubleJump.png";

        let beewolfImages = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
        beewolfImages[this.IDLE].src = "SpriteSheets/Beewolf-Idle.png";
        beewolfImages[this.WALK].src = "SpriteSheets/Beewolf-Walk.png";
        beewolfImages[this.BITE].src = "SpriteSheets/Beewolf-Bite.png";
        beewolfImages[this.CLAW].src = "SpriteSheets/Beewolf-Claw.png";
        beewolfImages[this.JUMP].src = "SpriteSheets/Beewolf-Jump.png";
        beewolfImages[this.DOUBLEJUMP].src = "SpriteSheets/Beewolf-DoubleJump.png";
    
        //Idle, Walk, Bite, Claw, Jump, Howl, DoubleJump
        //Constructor
        // MainContext, Position, Rotation, Scale (Vector), SpriteSheet, NumOfFrames, Size of Individual Frame , <-- , Size of spritesheet
        this.werewolfSprites = [
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), werewolfImages[0], 2, 270, 270, [1, 1], 300),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), werewolfImages[1], 10, 270, 270, [3, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), werewolfImages[2], 5, 270, 270, [2, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), werewolfImages[3], 7, 270, 270, [3, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), werewolfImages[4], 6, 270, 270, [2, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), werewolfImages[6], 7, 270, 270, [3, 3])
        ];
        //Idle, Walk, Bite, Claw, Jump, DoubleJump
        this.beewolfSprites = [
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), beewolfImages[0], 4, 270, 270, [2, 2]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), beewolfImages[1], 9, 270, 270, [3, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), beewolfImages[2], 5, 270, 270, [2, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), beewolfImages[3], 6, 270, 270, [2, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), beewolfImages[4], 5, 270, 270, [2, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), beewolfImages[5], 9, 270, 270, [3, 3])
        ];
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

 







    
