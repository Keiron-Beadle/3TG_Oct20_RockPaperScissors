class Powerup{
    constructor(pMainContext, pPosition, pWorldMat){
        this.alive = true;
        this.position = pPosition;
        this.worldMatrix = pWorldMat;
        this.transformMatrix;
        let beehiveIdleSprite = new Image();
        beehiveIdleSprite.src = "SpriteSheets/Beehive-Idle.png";
        this.sprite = new AnimatedSpriteSheet(pMainContext, this.position, 0, new Vector(1,1,1),
        beehiveIdleSprite, 2, 270, 270, [1,1], 200);
    }

    pickup(){
        this.alive = false;
    }

    isAlive(){
        return this.alive;
    }

    update(pPlayer){
        if (this.checkIfCollided(pPlayer)){
            this.pickup();
            pPlayer.poweredUp = true;
        }
        this.sprite.update();
        this.transformMatrix = this.worldMatrix.multiply(Matrix.createTranslation(this.position));
    }

    checkIfCollided(pPlayer){
        let playerPosX = pPlayer.getPosition().getX();
        let playerPosY = pPlayer.getPosition().getY();
        let playerPosXMin = playerPosX - 40;
        let playerPosXMax = playerPosX + 40;
        let playerPosYMin = playerPosY - 80;
        let playerPosYMax = playerPosY + 80;
        let thisX = this.position.getX();
        let thisY = this.position.getY();

        if (thisX <= playerPosXMax && thisX >= playerPosXMin &&
            thisY <= playerPosYMax && thisY >= playerPosYMin){
            return true;
        }
        return false;
    }

    draw(){
        this.sprite.draw(this.transformMatrix);
    }
}