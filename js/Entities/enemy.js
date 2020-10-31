class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        this.speed = 0.4; //Speed of enemy
        this.projectiles = []; //Array of the pumpkins/bats he's fired
        this.visibilityBubble = 600; //How far he can see
        this.updateDelay = 400; //Delay between running pathfinding algorithm, if i did this every frame we'd stutter
        this.attackDelay = 0; //Delay between attacks once in "Attack" mode.
        this.transformMatrix; //Transform of the enemy

        var enemyImage = new Image();
        enemyImage.src = this.sprite;

        if(pSprite == "SpriteSheets/Demon-Walk.png"){
            this.enemySpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
                0, new Vector(1,1,1), enemyImage, 4, 270, 270, [2,2]);
         }
        else if(pSprite == "SpriteSheets/Demon-Spawn.png"){
            this.enemySpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
                0, new Vector(1,1,1), enemyImage, 4, 270, 270, [2,2]);
         }
         else if(pSprite == "SpriteSheets/Demon-Pumpkin.png"){
            this.enemySpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
                0, new Vector(1,1,1), enemyImage, 10, 270, 270, [3,4]);
         }
         else if(pSprite == "SpriteSheets/Demon-Death.png"){
            this.enemySpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
                0, new Vector(1,1,1), enemyImage, 9, 270, 270, [3,3]);
         }
         else if(pSprite == "SpriteSheets/Demon-Bat.png"){
            this.enemySpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
                0, new Vector(1,1,1), enemyImage, 14, 270, 270, [4,4]);
         }
        

        this.AI = new EnemyAI(this.visibilityBubble);
    }

    setTarget(pTarget){
        this.target = pTarget;
    }

    getTarget(){
        return this.target;
    }

    update(pCanvas, pObstacles, pWorldMat){
        this.moveToGoal(pWorldMat);
        let currentAIState = this.AI.getState(); //Gets current state of enemy
        if (currentAIState != "Random" && this.updateDelay <= 0){ 
            //If we're not randomly searching, meaning we've found the player, and we need to update in order
            //to get the current player position so that we can move to the player's new position, we run the algorithm.
            this.goal = this.AI.update(this.position, this.getTarget(), pObstacles, pCanvas);
            currentAIState = this.AI.getState();
            if (currentAIState == "Attacking" && this.attackDelay <= 0){
                this.attack(pWorldMat); //If we're attacking, and the attack is ready, run attack function.
                this.attackDelay = 600; 
            }

            this.updateDelay = 400;
        }
        else if (this.goal == null){
            //If we don't have a current goal (endpoint), we need to get a new one.
            this.goal = this.AI.update(this.position, this.getTarget(), pObstacles, pCanvas);
        }
        else if (currentAIState == "Random"){
            this.speed = 0.3 + Math.random() / 4;
        }
        else{
            this.speed = 0.4;
        }

        for (var i = 0; i < this.projectiles.length; i++)
        {
            //Update any projectiles the enemy has fired
            this.projectiles[i].update();
        }
        this.updateDelay--;
        this.attackDelay--;
        this.enemySpriteSheet.update(); //Updates the spritesheet animation for Enemy
        pWorldMat.setTransform(this.mainContext);
    }

    attack(pWorldMat){
        this.projectiles.push(new Pumpkin(this.mainContext, this.getTarget(), this.position, pWorldMat));
        
    }

    moveToGoal(pWorldMat){
        var translate;
        try{
            if (Math.floor(this.position.getX()) == Math.floor(this.goal.getX())){
                this.goal = null;
                return;
            }
            else if (this.position.getX() < this.goal.getX()){    
                this.position = this.position.add(new Vector(this.speed, 0, 0));
            }
            else if (this.position.getX() > this.goal.getX()){
                this.position = this.position.add(new Vector(-this.speed, 0, 0));
            }
        }
        catch{

        }
        translate = Matrix.createTranslation(this.position);
        this.transformMatrix = pWorldMat.multiply(translate);
    }

    draw(){
        this.enemySpriteSheet.draw(this.transformMatrix);

        for (var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].draw(this.transformMatrix);
        }
    }   
}