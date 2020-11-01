class Pumpkin extends Projectile{
    constructor(pMainContext, pTarget, pStartPos, pWorldMat){
        let spriteArray = ["SpriteSheets/Pumpkin-Flying.png", "SpriteSheets/Pumpkin-Splat.png"];
        super(pMainContext, pTarget, pStartPos, spriteArray, 4, 270, 270, [2,2], 1.7, pWorldMat);
    }

    update(){
        super.update(this.speed);
    }

    draw(){
        super.draw();
    }

}