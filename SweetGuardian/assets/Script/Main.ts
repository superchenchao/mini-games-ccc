import {Ball} from "./Ball";
import {BarrierGroup} from "./BarrierGroup";
import {Menu} from "./Menu";
import {Result} from "./Result";
import {Boss} from "./Boss";

const {ccclass, property} = cc._decorator;

@ccclass
export class Main extends cc.Component {
    @property(Ball)
    ball:Ball = null;

    @property(BarrierGroup)
    barrier_group:BarrierGroup = null;

    @property(Menu)
    menu:Menu = null;

    @property(Result)
    result:Result = null;

    @property(Boss)
    boss:Boss = null;

    @property(cc.Node)
    opening_hint:cc.Node = null;


    onLoad(){
        cc.director.getPhysicsManager().enabled = true;


        this.menu.init(this);
        // this.startGame();
    }

    startGame(){
        cc.log("开始游戏-------------------");
        this.result.init(this);
        this.ball.init(this);
        this.boss.init(this);
    }

    produceBarrier(){
        this.barrier_group.init(this);
    }

    update(){
        // 物理步长，默认 FIXED_TIME_STEP 是 1/60
        // this.manager.FIXED_TIME_STEP = 1/120;
        // this.manager.VELOCITY_ITERATIONS = 22;
        // this.manager.POSITION_ITERATIONS = 22;
    }
}
