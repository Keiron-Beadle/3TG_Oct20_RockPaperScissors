class Projectile{
    constructor(pMainContext, pTarget, pStartPos, pImageSrc, pNumOfFrames, pFrameSizeX, 
        pFrameSizeY, pNumOfImagesDimensions, pSpeed, pWorldMat){
        this.target = pTarget;
        this.position = pStartPos;
        this.mainContext = pMainContext;
        this.worldMatrix = pWorldMat;
        this.projectileImage = new Image();
        this.projectileImage.src = pImageSrc
        this.animatedSprite = new AnimatedSpriteSheet(pMainContext, pStartPos, 0, new Vector(1,1,1),
        this.projectileImage, pNumOfFrames, pFrameSizeX, pFrameSizeY, pNumOfImagesDimensions);
        let remainingVec = this.target.getPosition().subtract(this.position);
        this.velocityVector = remainingVec.normalise().multiply(pSpeed);
        this.transformMatrix;
    }

    update(){
        let targetPos = this.target.getPosition();
        let XComparison = Math.floor(this.position.getX()) != Math.floor(targetPos.getX());
        let YComparison = this.position.getY() != targetPos.getY();
        if (XComparison && YComparison){
            this.position = this.position.add(this.velocityVector);
            this.transformMatrix = this.worldMatrix.multiply(Matrix.createTranslation(this.position));
        }
    }   

    draw(){
        this.animatedSprite.draw(this.transformMatrix);
    }
}