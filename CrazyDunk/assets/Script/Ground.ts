const {ccclass, property} = cc._decorator;

@ccclass
export class Ground extends cc.Component {
    onLoad(){

        this.scheduleOnce(function(){
            this.node.x = 0;
        },0);
    }

}
