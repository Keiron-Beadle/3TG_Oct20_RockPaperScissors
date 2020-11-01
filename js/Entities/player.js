function onClick(event){
    Player.mousePos = new Vector(event.clientX, event.clientY, 0);
}

class Player {

    static mousePos;
    constructor(pMainContext, pPosition){
         this.setPosition(pPosition);
         this.mMainContext = pMainContext;
         this.mTransformMatrix;
         this.fireRate = 600;
         this.pumpkinDelay = 0;
         this.projectiles = [];

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
         
         this.SPAWN = 0;
         this.IDLE = 1;
         this.PUMPKIN = 2;
         this.DEATH = 3;
         this.JUMP = 4;
         this.DOUBLEJUMP = 5;

         this.initialiseSprites();      
       
         this.mAnimatedSpriteSheet = this.playerSprites[0];

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
            this.UpdateSpriteSheet("Idle");
        }

        if (this.pumpkinDelay <= 0 && Player.mousePos != null){ 
            //pMainContext, pTarget, pStartPos, pWorldMat
            let newPumpkin = new Pumpkin(this.mMainContext, Player.mousePos, this.getPosition(), pWorldMatrix);
            this.projectiles.push(newPumpkin);
            this.pumpkinDelay = this.fireRate; 
            Player.mousePos = null;
            
        }
        this.pumpkinDelay--;
        for (var i = 0; i < this.projectiles.length; i++){
            this.projectiles[i].update();
        }
        this.mAnimatedSpriteSheet.update();
    }
    draw(){
        for (var i = 0; i < this.projectiles.length; i++){
            this.projectiles[i].draw();
        }
        this.mAnimatedSpriteSheet.draw(this.mTransformMatrix);
    }   

    newPosition(pWorldMatrix, pObstacles) {
        var x, y, translate, newPosition;

        x = this.getPosition().getX();
        y = this.getPosition().getY();

        /*if (this.isJumping()){
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
        }*/

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
        if (this.poweredUp == true) {
            if (this.mAnimatedSpriteSheet != this.beewolfSprites[anim]) {
                this.mAnimatedSpriteSheet = this.beewolfSprites[anim];
                var b = 1;
            }
        }
        else {
            if (this.mAnimatedSpriteSheet != this.playerSprites[anim]) {
                this.mAnimatedSpriteSheet = this.playerSprites[anim];
            }
        }
    }

    moveUp(pCanvas) {
        var y = this.getPosition().getY();
        if (y < 0){
            y = 0;
        }
        else {
            y -= 1;
        }
        this.getPosition().setY(y);
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
        this.getPosition().setY(y);
    }
    moveLeft(pCanvas) {
        var x = this.getPosition().getX();
        if (x < 0){
            x = 0;
        }
        else {
            x -= 1;
        }
        this.getPosition().setX(x);
    }
    moveRight(pCanvas) {
        var x = this.getPosition().getX();
        if (x + this.mPlayerImage.width > pCanvas.width){
            x = pCanvas.width - this.mPlayerImage.width;
        }
        else {
            x += 1;
        }
        this.getPosition().setX(x);
    }
    /*
    stopMove() {
        this.setMoveX(0);
        this.setMoveY(0);
    }
    */

    findCurrentAction(){
        let actionIndex;
        for (var i = 0; i < this.playerSprites.length; i++){
            if (this.playerSprites[i] == this.mAnimatedSpriteSheet || this.playerSprites[i] == this.mAnimatedSpriteSheet){
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
        let SpawnImage = new Image();
        SpawnImage.src = "SpriteSheets/Demon-Spawn.png";
        let IdleImage = new Image();
        IdleImage.src = "SpriteSheets/Demon-Idle.png";
        let PumpkinImage = new Image();
        PumpkinImage.src = "SpriteSheets/Demon-Pumpkin.png";
        let DeathImage = new Image();
        DeathImage.src = "SpriteSheets/Demon-Death.png";

        this.playerSprites = [
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), SpawnImage, 4, 270, 270, [2, 3]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), IdleImage, 2, 270, 270, [1, 1], 250),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), PumpkinImage, 9, 270, 270, [3, 4]),
            new AnimatedSpriteSheet(this.mMainContext, this.mPosition,
                0, new Vector(1, 1, 1), DeathImage, 9, 270, 270, [3, 3])
        ];
        /*let werewolfImages = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
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
        beewolfImages[this.DOUBLEJUMP].src = "SpriteSheets/Beewolf-DoubleJump.png";*/
    
        //Idle, Walk, Bite, Claw, Jump, Howl, DoubleJump
        //Constructor
        // MainContext, Position, Rotation, Scale (Vector), SpriteSheet, NumOfFrames, Size of Individual Frame , <-- , Size of spritesheet
        /*this.werewolfSprites = [
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
        ];*/
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

 







    
