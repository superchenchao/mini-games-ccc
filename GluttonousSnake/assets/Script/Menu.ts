import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Menu extends cc.Component {
    private main:Main = null;

    @property(cc.Node)
    btn_start:cc.Node = null;

    init(main:Main){
        this.main = main;
        this.btn_start.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.main.startGame()
        })
    }

    gameStart(){
        this.node.active = false;
    }
}
