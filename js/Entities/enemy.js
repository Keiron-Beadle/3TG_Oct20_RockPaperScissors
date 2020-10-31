class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        this.projectiles = [];
        this.speed = 0.5;
        this.visibilityBubble = 200; 
        this.updateDelay = 600;
        var enemyImage = new Image();
        enemyImage.src = this.sprite;
        this.animatedSpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
            0, new Vector(1,1,1), enemyImage, 4, 270, 270, [2,2]);

        this.AI = new EnemyAI(this.visibilityBubble);
    }

    setTarget(pTarget){
        this.target = pTarget;
    }

    getTarget(){
        return this.target;
    }

    update(){
        this.animatedSpriteSheet.update();
        let currentAIState = this.AI.getState();
        if (currentAIState != "Random" && this.updateDelay <= 0){
            this.goal = this.AI.update(this.position, this.getTarget());
            this.updateDelay = 600;
        }
        else if (this.goal == null){
            this.goal = this.AI.update(this.position, this.getTarget());
        }
        else if (currentAIState == "Random"){
            this.speed = 0.3 + Math.random() / 4;
        }
        else{
            this.speed = 1;
        }

        this.moveToGoal();
        this.updateDelay--;
        //Implement AI updates here
        //Projectiles passed & Position
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
        this.animatedSpriteSheet.draw(pWorldMatrix);
    }   
}