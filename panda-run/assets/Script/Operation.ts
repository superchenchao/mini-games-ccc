import {Player} from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export class Operation extends cc.Component {
    @property(cc.Button)
    btn_jump:cc.Button = null;

    @property(cc.Button)
    btn_squat:cc.Button = null;

    @property(Player)
    player:Player = null;

    onLoad(){
        this.btn_jump.node.on(cc.Node.EventType.TOUCH_START, this.btnJump, this);
        this.btn_squat.node.on(cc.Node.EventType.TOUCH_START,() => {
            this.player.Squat(true);
        });
        this.btn_squat.node.on(cc.Node.EventType.TOUCH_END,() => {
            this.player.Squat(false);
        });

    }

    btnJump(){
        this.player.Jump();
    }

}
