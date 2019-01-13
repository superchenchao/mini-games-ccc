import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Platform extends cc.Component {
    @property(Number)
    collisionTimes:number = 0;  //平台被球撞击次数

    nodeMoving:boolean = false; //平台没有移动(有效碰撞产生后，只允许出现一次移动)
    birthNodePool: boolean = false;  //该平台不是节点池产生的

    // blueMoving: boolean = false;   //蓝色平台没有移动
    // orangeMoving: boolean = false;   //橙色平台没有移动

    onLoad(){

    }

    greenMoving(){

        // cc.log("-(Main.instance().start_pos.y+this.node.height)----------- " + (Main.instance().start_pos.y+this.node.height))

        if (!this.nodeMoving) {
            cc.log("所有平台需要移动的距离 ----------- " + (Main.instance().greenDistance + this.node.height));
            let moveBy = cc.moveBy(0.2, 0, -Math.round(Main.instance().greenDistance + this.node.height));
            let destroy = cc.callFunc(()=>{
                // cc.log("移动完成了 ---------")
                Main.instance().greenMoving = false;
                Main.instance().startMoving = false;
            });
            this.node.runAction(cc.sequence(destroy,moveBy))
       }
        this.nodeMoving = true

    }

    update(dt){
        if (Main.instance().greenMoving ) {
            // this.nodeMoving = false
            this.greenMoving();
        }else if (Main.instance().blueMoving) {
            this.node.y -= Main.instance().platformSpeedBO * dt;
        }


        if (this.node.y <= 0) {
        }


    }
}
