class Projectile{
    constructor(pMainContext, pTarget, pStartPos, pSpriteArray, pNumOfFrames, pFrameSizeX, 
        pFrameSizeY, pNumOfImagesDimensions, pSpeed, pWorldMat){
        this.target = pTarget;
        this.position = pStartPos.add(new Vector(-30, -20, 0));
        this.mainContext = pMainContext;
        this.worldMatrix = pWorldMat;
        this.projectileImageArray = [new Image(), new Image()];
        this.projectileImageArray[0].src = pSpriteArray[0];
        this.projectileImageArray[1].src = pSpriteArray[1];
        this.spriteArray = [ 
            new AnimatedSpriteSheet(pMainContext, pStartPos, 0, new Vector(1,1,1),
            this.projectileImageArray[0], pNumOfFrames, pFrameSizeX, pFrameSizeY, pNumOfImagesDimensions),
            new AnimatedSpriteSheet(pMainContext, pStartPos, 0, new Vector(1,1,1),
            this.projectileImageArray[1], pNumOfFrames, pFrameSizeX, pFrameSizeY, pNumOfImagesDimensions)
        ];
        this.currentSprite = this.spriteArray[0];
        let remainingVec = this.target.getPosition().subtract(this.position).add(new Vector(0,-70,0));
        this.velocityVector = remainingVec.normalise().multiply(pSpeed);
        this.transformMatrix;
        this.startedDying = false;
        this.alive = true;
    }
 
    incrementSprite(){
        this.currentSprite = this.spriteArray[1];
    }

    killSelf(){
        this.incrementSprite();
        this.startedDying = true;
    }

    isAlive(){
        return this.alive;
    }

    update(){
        if (!this.startedDying){

            this.moveProjectile();
            if (this.checkIfCollided(this.target)){
                this.killSelf();
            }   
        }
        else{
            this.currentSprite.update();
            if (this.currentSprite.isFinished()){
                this.alive = false;
            }
        }
    }   

    checkIfCollided(pTarget){
        let targetPos = pTarget.getPosition();
        let targetPosXMax = targetPos.getX() + 40;
        let targetPosXMin = targetPos.getX() - 40;
        let targetPosYMax = targetPos.getY() + 80;
        let targetPosYMin = targetPos.getY() - 80;

        if (this.position.getX() <= targetPosXMax && this.position.getX() >= targetPosXMin
        && this.position.getY() <= targetPosYMax && this.position.getY() >= targetPosYMin){
            return true;
        }

        return false;
    }

    moveProjectile() {
        let targetPos = this.target.getPosition();
        let XComparison = this.position.getX() != targetPos.getX();
        let YComparison = this.position.getY() != targetPos.getY();
        if (XComparison && YComparison) {
            this.position = this.position.add(this.velocityVector);
            this.transformMatrix = this.worldMatrix.multiply(Matrix.createTranslation(this.position));
        }
    }

    draw(){
        this.currentSprite.draw(this.transformMatrix);
    }
}