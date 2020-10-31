class Werewolf {
        constructor(pPosition, pContext, pImage, pFrameSizeX, pFrameSizeY) { 
            this.mContext = pContext;
            this.mImage = pImage;
            this.mFrameSizeX = pFrameSizeX;
            this.mFrameSizeY = pFrameSizeY;
    
            this.mFrameIndex = 0;
            //this.mUpdateCounter = 0;
            //this.mUpdateLimit = 650;
    
            this.mLastTime = Date.now();
            this.setPosition(pPosition);
        }
        getPosition() {
            return this.mPosition;
        }
        setPosition(pPosition) {
            this.mPosition = pPosition;
        }
        
        draw(pWorldMatrix) {
            var translate, transform;
        
        translate = Matrix.createTranslation(this.getPosition());
        transform = pWorldMatrix.multiply(translate);
        
        transform.setTransform(this.mContext);

        this.mContext.drawImage(this.mImage, this.mFrameSizeX, this.mFrameSizeY);

        pWorldMatrix.setTransform(this.mContext);
        }    
    
        update(pDeltaTime) {
            var x, y, velocityX, velocityY;

            velocityX = 2;
            velocityY = 2;
            
            //Move with velocity x/y
            this.getPosition().getX() += velocityX * pDeltaTime;
            this.getPosition().getY() += velocityY * pDeltaTime;

            /*
            if(this.mUpdateCounter < this.mUpdateLimit) {
                this.mUpdateCounter += 1;
                var newRotation = this.getRotation() + (this.getRotation() * (pDeltaTime/2000));
                this.setRotation(newRotation);
            }
          
            x = this.getPosition().getX();
            y = this.getPosition().getY();
            */
        }
    }
    
    