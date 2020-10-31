class Werewolf {
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
         this.animatedSpriteSheet.update();
     }
 
     draw(pWorldMatrix){
         this.animatedSpriteSheet.draw(pWorldMatrix);
    }   
}
    
    