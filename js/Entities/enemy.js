class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        this.speed = 0.8; //Speed of enemy
        this.projectiles = []; //Array of the pumpkins/bats he's fired
        this.visibilityBubble = 400; //How far he can see
        this.updateDelay = 400; //Delay between running pathfinding algorithm, if i did this every frame we'd stutter
        this.attackDelay = 800; //Delay between attacks once in "Attack" mode.
        this.transformMatrix = Matrix.createIdentity(); //Transform of the enemy

        var enemyImage = new Image();
        enemyImage.src = this.sprite;
        this.enemySpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
            0, new Vector(1,1,1), enemyImage, 4, 270, 270, [2,2]);

        this.AI = new EnemyAI(this.visibilityBubble);
    }

    setTarget(pTarget){
        this.target = pTarget;
    }

    getTarget(){
        return this.target;
    }

    update(pCanvas, pObstacles, pWorldMat){
        this.enemySpriteSheet.update(); //Updates the spritesheet animation for Enemy

        let currentAIState = this.AI.getState(); //Gets current state of enemy
        if (currentAIState != "Random" && this.updateDelay <= 0){ 
            //If we're not randomly searching, meaning we've found the player, and we need to update in order
            //to get the current player position so that we can move to the player's new position, we run the algorithm.
            this.goal = this.AI.update(this.position, this.getTarget(), pObstacles, pCanvas);

            if (currentAIState == "Attacking" && this.attackDelay <= 0){
                this.attack(); //If we're attacking, and the attack is ready, run attack function.
                this.attackDelay = 800; 
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
            this.speed = 1;
        }

        for (var i = 0; i < this.projectiles.length; i++)
        {
            //Update any projectiles the enemy has fired
            this.projectiles[i].update();
        }

        //Move the enemy towards their goal
        this.moveToGoal(pWorldMat);
        this.updateDelay--;
        this.attackDelay--;
    }

    attack(){
        //this.projectiles.push(new Pumpkin(pTarget));
    }

    moveToGoal(pWorldMat){
        var translate;
        if (Math.floor(this.position.getX()) == Math.floor(this.goal.getX())){
            this.goal = null;
            return;
        }
        else if (this.position.getX() < this.goal.getX()){    
            this.position = this.position.add(new Vector(this.speed, 0, 0));
            translate = Matrix.createTranslation(this.position);
        }
        else if (this.position.getX() > this.goal.getX()){
            this.position = this.position.add(new Vector(-this.speed, 0, 0));
            translate = Matrix.createTranslation(this.position);
        }
        //Make new transform matrix depending on if we need to go left or right.
        this.transformMatrix = pWorldMat.multiply(translate);
    }

    draw(){
        this.enemySpriteSheet.draw(this.transformMatrix);

        for (var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].draw();
        }
    }   
}