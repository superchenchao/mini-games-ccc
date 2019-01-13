import {Ball} from "./Ball";
import {Backboard} from "./Backboard";
import {Result} from "./Result";
import {Data} from "./Data";
import {Audience} from "./Audience";

const {ccclass, property} = cc._decorator;

@ccclass
export class Main extends cc.Component {
    @property(Audience)
    audience:Audience = null;
    @property(Ball)
    ball:Ball = null;
    @property(Backboard)
    backBoard:Backboard = null;
    @property(Backboard)
    basket:Backboard = null;
    @property(Result)
    result:Result = null;

    @property(cc.Node)
    top_pos:cc.Node = null;
    @property(cc.Node)
    bottom_pos:cc.Node = null;

    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        // this.audience
        this.ball.init(this);
        this.backBoard.init(this);
        this.basket.init(this);
        this.result.init(this);
        Data.init();
    }

    //随机篮筐的y位置
    GetBackboardPos(){
        return Math.floor(Math.random() * (this.top_pos.y - this.bottom_pos.y) + this.bottom_pos.y);
    }
}
