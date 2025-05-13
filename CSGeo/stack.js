class Stack{
    constructor(){
        this.items = []
    }

    push(item){
        this.items.push(item);
    }

    pop(){
        if(this.items.length > 0){
            return this.items.pop();
        }
    }

    size(){
        return this.items.length;
    }

}