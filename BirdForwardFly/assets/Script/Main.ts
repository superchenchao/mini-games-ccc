import {Barrier} from "./Barrier";
import {BullectFlyArea} from "./BullectFlyArea";
import {Bird} from "./Bird";
import {GameOver} from "./GameOver";
import {Data} from "./Data";
import {BarrierGroup} from "./BarrierGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export class Main extends cc.Component {
    private static _instance: Main;

    public static instance(){
        return this._instance;
    }
    @property(cc.Label)
    score:cc.Label = null;
    @property(cc.Node)
    game_over_layer:cc.Node = null;
    @property(BullectFlyArea)
    bullectArea:BullectFlyArea = null;
    @property(Bird)
    bird:Bird = null;
    @property(GameOver)
    gameOver:GameOver = null;
    @property(BarrierGroup)
    barrier_group:BarrierGroup = null;

    public _score:number = 0;
    onLoad(){
        Main._instance = this;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.bullectArea.init(this);
        this.bird.init(this);
        this.gameOver.init(this);
        Data.isGameOver = false;
    }

    getScore(num:number){
        this._score += num;
        this.score.string = this._score + "";
    }

    showGameOver() {
        Data.isGameOver = true;
        this.game_over_layer.active = true;
        this.score.string = "";
        if ((cc.sys.localStorage.getItem("HighScore") && cc.sys.localStorage.getItem("HighScore") < this._score) || !cc.sys.localStorage.getItem("HighScore")) {
            cc.sys.localStorage.setItem("HighScore", this._score + "");
        }
        this.barrier_group.isPause = false;
        this.gameOver.showGameOver();
    }
}
