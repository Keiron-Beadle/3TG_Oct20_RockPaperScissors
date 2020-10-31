class TransformNode extends GroupNode{
    constructor(pTag, pTransformMatrix){
        super(pTag);
        super.setType("Transform");
        this.setLocalTransform(pTransformMatrix);
    }

    setLocalTransform(pTransform){
        this.localTransformMatrix = pTransform;
    }

    getLocalTransform(){
        return this.localTransformMatrix;
    }
}