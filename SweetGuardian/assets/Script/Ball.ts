import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Ball extends cc.Component {

    private main:Main = null;

    @property(cc.Node)
    ball_pos:cc.Node = null;

    tempBool:boolean = false;

    onLoad(){

        this.node.parent.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            //将世界坐标转化为本地坐标

            let getStartLocation = this.node.parent.convertToNodeSpace(event.getStartLocation());//获取开始点击点的位置

            let moveTo = cc.moveTo(0.2, getStartLocation);
            this.node.runAction(moveTo);

            // this.node.position = getStartLocation;
            if (this.tempBool) {
                this.main.produceBarrier();
                this.main.opening_hint.active = false;
                this.tempBool = false;
                this.main.result.getScore();
            }
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            //将世界坐标转化为本地坐标
            let delta = this.node.parent.convertToNodeSpace(event.touch.getDelta());
            this.node.x += delta.x;
            this.node.y += delta.y;
        });
    }

    init(main:Main){
        this.main = main;
        let fadeIn = cc.fadeIn(1);
        this.node.runAction(cc.sequence(cc.callFunc(()=>{
            this.node.opacity = 0;
            this.node.position = this.ball_pos.getPosition();
        }),fadeIn));
        this.main.opening_hint.active = true;
        this.tempBool = true;
    }

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1://球碰到甜甜圈
                //this.main.onBallContactBrick(self.node, other.node);
                // let worldManifold = contact.getWorldManifold();
                // let points = worldManifold.points;
                // cc.log("point ---------- ||" + points);
                // let velocity = cc.v2();
                // this.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(points[0], velocity);
                // cc.log("v ---------------- " + velocity);
                break;

        }
    }

    update(){
        // this.onBeginContact()
    }
}
