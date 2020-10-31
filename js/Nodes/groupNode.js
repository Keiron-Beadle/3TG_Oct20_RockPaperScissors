class GroupNode extends SceneGraphNode{
    constructor(pTag){
        super(pTag);
        super.setType("Group");
        this.mChildren = [];
    }

    addChild(pChild){
        this.mChildren.push(pChild);
    }

    getNumberOfChildren(){
        return this.mChildren.length;
    }

    getChildAt(index){
        return this.mChildren[index];
    }
}