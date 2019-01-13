import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Boss extends cc.Component {
    private main:Main = null;

    @property(cc.Node)
    end_pos:cc.Node = null;

    init(main:Main){
        this.main = main;
        // cc.log("this.main.barrier_group.node.childrenCount ============ " + this.main.barrier_group.node.childrenCount);
        this.main.barrier_group.node.removeAllChildren();
        let fun = cc.callFunc(()=>{
            this.node.y = - this.node.height;
        });

        cc.log("this.end_pos.getPosition() -------------" + this.end_pos.getPosition());
        let moveTo = cc.moveTo(0.8, this.end_pos.getPosition());
        this.node.runAction(cc.sequence(fun, moveTo));

    }

    onBeginContact(contact, self, other) {
        cc.log("碰撞了============== ");
        if (this.main.result.node.getChildByName("game_over").active == false) {
            switch (other.tag) {
                case 1://球碰到甜甜圈
                    cc.log("碰到了甜甜圈 ------------------");
                    this.main.result.gameOver();
                    this.main.barrier_group.startProduceBarrier = false;
                    other.node.active = false;
                    break;
                case 2://球碰到砖块
                    cc.log("碰到了砖块 ------------------");
                    this.main.result.gameOver();
                    this.main.barrier_group.startProduceBarrier = false;
                    other.node.active = false;
                    break;
            }
        }
    }
}
