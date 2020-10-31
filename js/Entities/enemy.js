class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
       // this.loaded = false;
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        var enemyImage = new Image();
        enemyImage.src = this.sprite;
        this.animatedSpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
            0, new Vector(1,1,1), enemyImage, 10, 270, 270);
    }

    update(){
        //if (!this.loaded){ //This always triggers, never set to true
        //    return;
       // }
        this.animatedSpriteSheet.update();
    }

    draw(pWorldMatrix){
        //if (!this.loaded){
        //    return;
       // }
        //this.mainContext.drawImage(this.enemyImage, 0, 0);
        this.animatedSpriteSheet.draw(pWorldMatrix);
    }   
}