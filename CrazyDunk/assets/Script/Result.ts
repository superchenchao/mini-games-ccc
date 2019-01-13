import {Main} from "./Main";
import {Data} from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass
export class Result extends cc.Component {
    private main:Main = null;

    @property(cc.Label)
    score:cc.Label = null;

    @property(cc.ProgressBar)
    progress_bar:cc.ProgressBar = null;

    @property(cc.Node)
    btn_exit:cc.Node = null;
    @property(cc.Node)
    btn_restart:cc.Node = null;

    @property(cc.Label)
    cur_score: cc.Label = null;
    @property(cc.Label)
    his_score: cc.Label = null;


    allTime:number = 0;
    isGoal:boolean = false;  //没有进球

    loadingGameover:boolean = false;    //加载游戏结束

    onLoad(){
        this.btn_restart.on(cc.Node.EventType.TOUCH_START, ()=>{
            // this.main.startGame();
            cc.director.loadScene("ready");
            // this.node.getChildByName("game-over").active = false;
        })
        this.score.string = "0";
        this.node.getChildByName("game-over").active = false;
    }

    init(main:Main){
        this.main = main;
    }

    updateScore(num:number){
        let n = Number(this.score.string) + num;
        this.score.string = n + "";
    }

    gameOver(){
        if (cc.sys.localStorage.getItem("basket_score") == null) {
            cc.sys.localStorage.setItem("basket_score", this.score.string);
        }

        let locScore = cc.sys.localStorage.getItem("basket_score");
        if (Number(this.score.string) > Number(locScore)) {
            cc.sys.localStorage.setItem("basket_score", this.score.string);
        }
        this.cur_score.string = this.score.string;
        this.his_score.string = cc.sys.localStorage.getItem("basket_score");
        this.node.getChildByName("game-over").active = true;
    }

    update(dt){
        if (this.isGoal) {
            this.allTime += dt;
            if (this.allTime <= Data.count_down) {
                this.progress_bar.progress = this.allTime / Data.count_down;
            }else{
                // this.allTime = 0;
                this.loadingGameover = true;
            }
        }

    }
}
