class Pumpkin extends Projectile{
    constructor(pMainContext, pTarget, pStartPos, pWorldMat){
        super(pMainContext, pTarget, pStartPos, "SpriteSheets/Pumpkin-Flying.png", 4, 270, 270, [2,2], 1.1, pWorldMat);
    }

    update(){
        super.update(this.speed);
    }

    draw(){
        super.draw();
    }

}