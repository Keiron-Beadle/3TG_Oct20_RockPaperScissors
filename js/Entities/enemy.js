class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        this.projectiles = [];
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
        this.AI.update(this.position, this.getTarget());
        //Implement AI updates here
        //Projectiles passed & Position
    }

    draw(pWorldMatrix){
        this.animatedSpriteSheet.draw(pWorldMatrix);
    }   
}