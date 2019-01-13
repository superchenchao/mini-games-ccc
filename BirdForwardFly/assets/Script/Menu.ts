const {ccclass, property} = cc._decorator;

@ccclass
export class Menu extends cc.Component {
    @property(cc.Label)
    high_score:cc.Label = null;
    @property(cc.Button)
    btn_play:cc.Button = null;
    @property(cc.Button)
    btn_exit:cc.Button = null;
    @property(cc.Node)
    bird:cc.Node = null;

    protected onLoad(): void {
        this.btn_play.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            cc.director.loadScene("game");
        });
        this.btn_exit.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            window.close();
        });
        if (cc.sys.localStorage.getItem("HighScore")) {
            this.high_score.string = cc.sys.localStorage.getItem("HighScore") + "";
        }else{
            this.high_score.string = "0";
        }

        let up = cc.moveTo(1, cc.v2(-200, 200));
        let down = cc.moveTo(1, cc.v2(-200, -200));
        this.bird.runAction(cc.repeatForever(cc.sequence(up, down)));

    }
}
