import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Menu extends cc.Component {
    private main:Main = null;

    @property(cc.Button)
    btn_startGame: cc.Button = null;

    init(main: Main){
        this.main = main;

        this.node.active = true;

        let scaleS = cc.scaleTo(1.4,0.9);
        let scaleX = cc.scaleTo(1.4,1.1);

        this.btn_startGame.node.runAction(cc.repeatForever(cc.sequence(scaleS, scaleX)));

        this.btn_startGame.node.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.active = false;
            this.main.opening_hint.active = true;
            this.main.startGame();
        });
    }
}
