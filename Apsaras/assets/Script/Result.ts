const {ccclass, property} = cc._decorator;

@ccclass
export class Result extends cc.Component {
    private static _instance: Result;

    public static instance(){

        return this._instance;
    }
    @property(cc.Button)
    btn_return: cc.Button = null;

    @property(cc.Button)
    btn_restart: cc.Button = null;

    @property(cc.Label)
    score:cc.Label = null;

    @property(cc.Label)
    cur_score: cc.Label = null;
    @property(cc.Label)
    his_score: cc.Label = null;

    onLoad(){
        Result._instance = this;
        this.btn_restart.node.on(cc.Node.EventType.TOUCH_START, this.reStart, this);
    }

    showGameover(){
        if (cc.sys.localStorage.getItem("score") == null) {
            cc.sys.localStorage.setItem("score", this.score.string.replace("m",""));
        }

        let locScore = cc.sys.localStorage.getItem("score");
        if (Number(this.score.string.replace("m","")) > Number(locScore)) {
            cc.sys.localStorage.setItem("score", this.score.string.replace("m",""));
        }
        this.cur_score.string = this.score.string.replace("m","");
        this.his_score.string = cc.sys.localStorage.getItem("score");
       this.node.getChildByName("result_bg").active = true;
    }

    reStart(){
        cc.director.loadScene("game");
    }
}
