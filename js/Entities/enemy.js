class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        this.speed = 0.8;
        this.projectiles = [];
        this.visibilityBubble = 400; 
        this.updateDelay = 400;
        this.attackDelay = 800;

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

    update(pCanvas, pObstacles){
        this.enemySpriteSheet.update();
        let currentAIState = this.AI.getState();
        if (currentAIState != "Random" && this.updateDelay <= 0){

            this.goal = this.AI.update(this.position, this.getTarget(), pObstacles, pCanvas);

            if (currentAIState == "Attacking" && this.attackDelay <= 0){
                this.attack();
                this.attackDelay = 800;
            }

            this.updateDelay = 400;
        }
        else if (this.goal == null){
            this.goal = this.AI.update(this.position, this.getTarget(), pObstacles, pCanvas);
        }
        else if (currentAIState == "Random"){
            this.speed = 0.3 + Math.random() / 4;
        }
        else{
            this.speed = 0.7;
        }

        for (var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].update();
        }

        this.moveToGoal();
        this.updateDelay--;
        this.attackDelay--;
    }

    attack(){
        this.projectiles.push(new Pumpkin(pTarget));
    }

    moveToGoal(){
        if (Math.floor(this.position.getX()) == Math.floor(this.goal.getX())){
            this.goal = null;
        }
        else if (this.position.getX() < this.goal.getX()){
            this.position.setX(this.position.getX() + this.speed);
        }
        else if (this.position.getX() > this.goal.getX()){
            this.position.setX(this.position.getX() - this.speed);
        }
    }

    draw(pWorldMatrix){
        this.enemySpriteSheet.draw(pWorldMatrix);

        for (var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].update();
        }
    }   
}