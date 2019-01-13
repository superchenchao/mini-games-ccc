import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Result extends cc.Component {
    private main:Main = null;

    @property(cc.Label)
    score:cc.Label = null;

    @property(cc.Label)
    cur_score: cc.Label = null;
    @property(cc.Label)
    his_score: cc.Label = null;
    @property(cc.Button)
    btn_restart: cc.Button = null;
    @property(cc.Button)
    btn_return: cc.Button= null;

    private tempScore:number = 0;

    private timeOut:any = null;

    onLoad(){
        this.btn_restart.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.main.startGame();
            this.node.getChildByName("game_over").active = false;
        })
    }

    init(main: Main){
        this.main = main;
        this.tempScore = 0;
        this.score.string = "0";
    }

    getScore(){

        this.timeOut = setInterval(()=>{
            this.tempScore++;
            this.score.string = this.tempScore + "";
        },1000);

    }

    gameOver(){
        clearInterval(this.timeOut);

        if (cc.sys.localStorage.getItem("sweet_score") == null) {
            cc.sys.localStorage.setItem("sweet_score", this.score.string);
        }

        let locScore = cc.sys.localStorage.getItem("sweet_score");
        if (Number(this.score.string) > Number(locScore)) {
            cc.sys.localStorage.setItem("sweet_score", this.score.string);
        }
        this.cur_score.string = this.score.string;
        this.his_score.string = cc.sys.localStorage.getItem("sweet_score");
        this.node.getChildByName("game_over").active = true;

        // this.main.barrier_group.node.removeAllChildren();


    }

    update(dt){

    }
}
