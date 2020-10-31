class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        this.projectiles = [];
        this.speed = 1;
        var enemyImage = new Image();
        enemyImage.src = this.sprite;
        this.animatedSpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
            0, new Vector(1,1,1), enemyImage, 10, 270, 270);

        this.AI = new EnemyAI();
    }

    setTarget(pTarget){
        this.target = pTarget;
    }

    getTarget(){
        return this.target;
    }

    update(){
        this.animatedSpriteSheet.update();
        if (this.goal == null){
            this.goal = this.AI.update(this.position, this.getTarget());
        }
        else{
            this.moveToGoal();
        }
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