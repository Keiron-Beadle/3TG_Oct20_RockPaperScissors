class AnimatedSpriteSheet {
    constructor(pContext, pPosition, pRotation, pScale, pImage, pNumFrames, pFrameSizeX, pFrameSizeY, pNumOfImagesDimensions, pDelay = 100) { 
        this.mContext = pContext;
        this.mImage = pImage;
        this.mNumFrames = pNumFrames;
        this.mFrameSizeX = pFrameSizeX;
        this.mFrameSizeY = pFrameSizeY;
        this.imageCountDimensions = [pNumOfImagesDimensions[0], pNumOfImagesDimensions[1]];
        this.mFrameIndex = 0;
        this.delay = pDelay;
        this.finished = false;
        //this.mUpdateCounter = 0;
        //this.mUpdateLimit = 650;

        this.mLastTime = Date.now();

        this.setPosition(pPosition);
        this.setRotation(pRotation);
        this.setScale(pScale);
    }

    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
    getRotation() {
        return this.mRotation;
    }
    setRotation(pRotation) {
        this.mRotation = pRotation;
    }
    getScale() {
        return this.mScale;
    }
    setScale(pScale) {
        this.mScale = pScale;
    }
    getImage(){
        return this.mImage.src;
    }
    isFinished(){
        if (this.mImage.src.includes("Walk") || this.mImage.src.includes("Idle")){
            return false;
        }
        return this.finished;
    }
    resetFlag(){
        this.finished = false;
    }
    
    draw(pWorldMatrix) {
        var translate, scale, transform, rotation;
        
        //translate = Matrix.createTranslation(this.getPosition());
        //rotation = Matrix.createRotation(this.getRotation());
        //scale = Matrix.createScale(this.getScale());
        //transform = pWorldMatrix.multiply(translate.multiply(rotation.multiply(scale)));
        transform = pWorldMatrix;
        
        transform.setTransform(this.mContext);

        this.drawAnimatedSprite(this.mContext);

        pWorldMatrix.setTransform(this.mContext);
    }    

    drawAnimatedSprite() {         
        var frameX, frameY, frameWidth, frameHeight;
        
        // Dims of our finale anime
        frameWidth = this.mFrameSizeX; 
        frameHeight = this.mFrameSizeY;    

        frameX =  (this.mFrameIndex % this.imageCountDimensions[0]) * frameWidth;
        frameY = Math.floor((this.mFrameIndex / this.imageCountDimensions[1])) * frameHeight;    

        this.mContext.drawImage(this.mImage, frameX, frameY, this.mFrameSizeX, this.mFrameSizeY,
            0, 0, frameWidth, frameHeight);
    }
    
    update() {
        var thisTime, deltaTime;

        thisTime = Date.now();
        deltaTime = thisTime - this.mLastTime;
       
            if (deltaTime >= this.delay) {
                if (this.mFrameIndex >= this.mNumFrames-1) { 
                    this.mFrameIndex = 0;     
                    this.finished = true;              
                }
                else {
                    this.mFrameIndex += 1;
                }
            
                if ((deltaTime - this.delay) > this.delay){
                    this.mLastTime = thisTime;
                } 
                else {
                this.mLastTime += this.delay;
                }
            }
    }
}

