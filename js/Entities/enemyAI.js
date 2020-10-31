class EnemyAI{
    constructor(){
        this.RANDOM = 0;
        this.MOVING = 1;
        this.ATTACKING = 2;
        this.states = ["Random", "Moving", "Attacking"];
        this.currentState = this.states[this.RANDOM];
    }

    update(pPos, pTarget){
        let returnGoal;
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

    runRandom(pPos){
        let movement = Math.random();
        if (movement == 0){
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
}