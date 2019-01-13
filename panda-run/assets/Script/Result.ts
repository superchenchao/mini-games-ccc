import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Result extends cc.Component {
    private static _instance: Result;

    public static instance(){

        return this._instance;
    }

    @property(cc.Label)
    score_text: cc.Label = null;
    @property(cc.Label)
    distance_text: cc.Label = null;
    @property(cc.Node)
    game_over:cc.Node = null;
    @property(cc.Button)
    btn_restart: cc.Button = null;
    @property(cc.Button)
    btn_return: cc.Button = null;

    _distance: number = 0;
    _score:number = 0;

    playing:boolean = true;

    onLoad(){
        Result._instance = this;
        this.btn_restart.node.on(cc.Node.EventType.TOUCH_START, this.reStart, this);
        this.playing = true;
    }

    reStart(){
        cc.director.loadScene("pandarun_game");
    }

    showGameover(bool:boolean){
        this.game_over.active = true;
        if (!bool) {
            this.playing = bool;
        }
    }

    getScore(score:number){
        this._score += score;
        this.score_text.string = this._score + "";
    }
    update(dt){
        if (this.playing) {
            this._distance = this._distance + Main.barrierSpeed * dt;
            //cc.log(" this._distance ---------------- " + this._distance)
            this.distance_text.string = (this._distance / 10).toFixed(0) + "m";
        }
    }

}
