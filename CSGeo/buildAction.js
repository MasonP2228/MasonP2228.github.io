class BuildAction{
    constructor(shape){
        this.shape = shape;
        this.translation = null;
    }

    addTranslation(vector){
        this.translation = vector;
    }
}
