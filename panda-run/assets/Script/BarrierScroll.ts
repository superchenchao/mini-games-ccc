import {Main} from "./Main";
import Vec2 = cc.Vec2;
import v2 = cc.v2;

const {ccclass, property} = cc._decorator;

@ccclass
export  class BarrierScroll extends cc.Component {
    private speed:number = Main.barrierSpeed;
    birthIndex: number = 0;

    onLoad(){
        // let temer = setInterval(()=>{
        //     this.node.x -= this.speed;
        // },10)
    }

    update(dt){
        // cc.log("update ------||| " + this.speed)
        this.node.x -= this.speed * dt;
    }
}
