export class EventEmitter{
  constructor(){
    this.triggers = {};
  }

  register(trigger, listener){
    if(this.triggers[trigger]){
      this.triggers[trigger].push(listener);
    } else {
      this.triggers[trigger] = [listener];
    }
  }

  emit(trigger, args){
    if(this.triggers[trigger]){
      let tempArr = [];
      for (let i = 0; i < this.triggers[trigger].length; i++) {
        tempArr.push(this.triggers[trigger][i]);
      }
      for(let j = 0; j < tempArr.length; j++){
        let listener = tempArr[j];
        listener(args);
      }
    }
  }

  unregister(trigger, listener){
    if(this.triggers[trigger]){
      let position = this.triggers[trigger].indexOf(listener);
      if(position > -1){
        this.triggers[trigger].splice(position, 1);
      }
    }
  }

  unregisterAll(trigger){
    if(this.triggers[trigger]){
      this.triggers[trigger] = [];
    }
  }

  once(trigger, listener){
    let self = this;
    let tmp = (args) => {
      listener(args);
      self.unregister(trigger, tmp);
    };
    this.register(trigger, tmp);
  }
}
