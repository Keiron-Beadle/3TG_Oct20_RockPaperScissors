class Enemy{
    constructor(pMainContext, pPositionVec, pSprite){
        this.loaded = false;
        this.sprite = pSprite;
        this.position = pPositionVec;
        this.mainContext = pMainContext;
        var enemyImage = new Image();
        enemyImage.onload = function(){
            this.loaded = true;
            this.animatedSpriteSheet = new AnimatedSpriteSheet(this.mainContext, this.position,
                0, new Vector(1,1,1), enemyImage, 10, enemyImage.width / 3, enemyImage.height / 4);
        }
        enemyImage.src = this.sprite;
    }

    update(){
        if (!this.loaded){
            return;
        }
        this.animatedSpriteSheet.update();
    }

    draw(pWorldMatrix){
        if (!this.loaded){
            return;
        }
        //this.mainContext.drawImage(this.enemyImage, 0, 0);
        this.animatedSpriteSheet.draw(pWorldMatrix);
    }   
}