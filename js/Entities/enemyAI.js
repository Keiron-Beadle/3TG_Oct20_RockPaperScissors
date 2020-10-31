class EnemyAI{
    constructor(){
        this.RANDOM = 0;
        this.MOVING = 1;
        this.ATTACKING = 2;
        this.states = ["Random", "Moving", "Attacking"];
        this.currentState = this.states[this.RANDOM];
    }

    update(pPos, pTarget, pObstacleArray){
        let returnGoal;

        if (visibilityTest(pPos, pTarget, pObstacleArray)){
            this.currentState = this.states[MOVING];
        }
        else{
            this.currentState = this.states[RANDOM];
        }

        switch(this.currentState){
            case this.states[this.RANDOM]:
                returnGoal = this.runRandom(pPos);
                break;
            case this.states[this.MOVING]:
                returnGoal = this.runMoving(pPos, pTarget);
                break;
            case this.states[this.ATTACKING]:
                returnGoal = this.runAttacking(pPos, pTarget);
                break
        }
        return returnGoal;
    }

    visibilityTest(pPos, pTarget, pObstacles){
        for (var i = 0; i < pObstacles.length; i++)
        {
            let eyePos = new Vector(pPos.getX(), pPos.getY() + 30, 0);
            let vertices = pTarget.getVertices();
            for (var j = 0; j < vertices.length; j++){
                let directionVector = eyePos.subtract(vertices[i]);
                
            }
        }
    }

    runRandom(pPos){
        let movement = Math.floor(Math.random() * 10);
        if (movement <= 5){
            movement = 10 -Math.random() *100;
        }
        else{
            movement = 10 + Math.random() *100;
        }
        return new Vector(pPos.getX() + movement, pPos.getY());
    }

    runMoving(pPos){

    }

    runAttacking(pPos){

    }

    getState(){
        return this.currentState;
    }
}