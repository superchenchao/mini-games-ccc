import {Main} from "./Main";
import {Shake} from "./Shake";

const {ccclass, property} = cc._decorator;

@ccclass
export class Result extends cc.Component {
    private main:Main = null;

    @property(cc.Label)
    score:cc.Label = null;

    @property(cc.Label)
    end_score:cc.Label = null;

    @property(cc.Node)
    game_over:cc.Node = null;

    @property(cc.Node)
    btn_exit:cc.Node = null;

    @property(cc.Node)
    btn_restart:cc.Node = null;

    init(main:Main){
        this.main = main;
        this.game_over.active = false;
        this.score.node.active = false;

        this.btn_restart.on(cc.Node.EventType.TOUCH_START, ()=>{
            cc.director.loadScene("game");
        })
    }

    getScore(num:number){
        this.score.string = (num + Number(this.score.string)).toString();
    }

    gameStart(){
        this.score.node.active = true;
    }

    gameOver(){
        this.game_over.active = true;
        this.end_score.string = this.score.string;
        this.score.node.active = false;

        this.scheduleOnce(()=>{
            let shake:Shake = Shake.create(0.6,10,10);
            this.game_over.runAction(shake);
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                navigator.vibrate(600);
            }
        },0)

    }
}
