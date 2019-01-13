import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Backboard extends cc.Component {
    private main:Main = null;

    @property(cc.Node)
    top_pos:cc.Node = null;
    @property(cc.Node)
    bottom_pos:cc.Node = null;

    onLoad(){
        this.node.getComponent(cc.Widget).left = 1;
        this.scheduleOnce(function(){

        },0);
    }

    init(main:Main){
        this.main = main;
    }

    changePos(pos:number){
        cc.log("篮筐 ============ " , pos);
        this.node.y = pos;
        let moveTo:cc.ActionInterval = null;
        if (this.node.scaleX == 1) {
            this.node.scaleX = -1;
            // this.node.x = cc.winSize.width-this.node.width/2;
            this.node.x = cc.winSize.width + this.node.width/2;
            moveTo = cc.moveTo(0.1, cc.v2(cc.winSize.width-this.node.width/2, pos));

        }else if (this.node.scaleX == -1){
            this.node.scaleX = 1;
            this.node.x = -this.node.width/2;

            // this.node.x = cc.winSize.width + this.node.width/2;
            moveTo = cc.moveTo(0.1, cc.v2(this.node.width/2, pos));
        }

        this.node.runAction(moveTo);
    }

}
