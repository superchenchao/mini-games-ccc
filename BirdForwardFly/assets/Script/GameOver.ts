import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class GameOver extends cc.Component {
    @property(cc.Button)
    btn_return:cc.Button = null;
    @property(cc.Button)
    btn_restart:cc.Button = null;
    @property(cc.Label)
    score:cc.Label = null;
    @property(cc.Label)
    high_score:cc.Label = null;

    private main:Main = null;

    onLoad(){
        this.btn_restart.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            // this.main.startGame();
            cc.director.loadScene("game");
            // this.node.getChildByName("game-over").active = false;
        });
        this.btn_return.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            cc.director.loadScene("menu");
        })
    }

    init(m:Main){
        this.main = m;
    }

    showGameOver(){
        this.score.string = this.main._score + "";
        this.high_score.string = cc.sys.localStorage.getItem("HighScore");
    }



}
