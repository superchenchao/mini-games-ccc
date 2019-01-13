import {Data} from "./Data";
import {Main} from "./Main";
import {Backboard} from "./Backboard";

const {ccclass, property} = cc._decorator;

@ccclass
export class Ball extends cc.Component {
    private main:Main = null;

    private firstGoal:boolean = true;      //避免球在框里弹时得分

    private clickLock:boolean = true;    //点击事件没有锁定

    // private ballSpeedX:number = Data.ballSpeed;

    onLoad(){
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(Data.ballSpeedX, Data.ballSpeedY);  //进游戏后，球弹下
        this.node.parent.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            //将世界坐标转化为本地坐标
            cc.log("dddddddddddd");
            if (this.clickLock) {
                this.firstGoal = true;
                // let getStartLocation = this.node.parent.convertToNodeSpace(event.getStartLocation());//获取开始点击点的位置
                //
                // let moveTo = cc.moveTo(0.2, getStartLocation);
                // this.node.runAction(moveTo);
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(Data.ballSpeedX, Data.ballSpeedY);

            }

        });
    }

    init(main:Main){
        this.main = main;
    }

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1://球碰到地板后
                this.node.getComponent(cc.RigidBody).linearVelocity.x = -Data.ballSpeedX;
                this.node.getComponent(cc.RigidBody).angularVelocity = Data.ballSpeedX;

                if (this.main.result.loadingGameover) {
                    this.main.result.gameOver();
                }
                break;
        }
    }

    //进球了!!!
    onCollisionEnter(other, self){
        if (other.tag == 2){
            let otherAabb = other.world.aabb;
            let otherPreAabb = other.world.preAabb.clone();

            let selfAabb = self.world.aabb;
            let selfPreAabb = self.world.preAabb.clone();

            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {

                if (selfPreAabb.xMin < otherPreAabb.xMin) {
                }
                return;
            }

            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                if ( selfPreAabb.yMax > otherPreAabb.yMax && selfPreAabb.yMin > otherPreAabb.yMin && this.firstGoal) {
                    cc.log("从上网下的进球（有效进球） ------------ ");
                    this.clickLock = false;
                    this.firstGoal = false;
                    Data.ballSpeedX *= -1;
                    this.main.result.isGoal = true;
                    this.main.result.allTime = 0;
                    this.main.result.loadingGameover = false;

                    //改变篮筐方向
                    this.scheduleOnce(()=>{

                        this.main.result.updateScore(1);
                        let pos =  this.main.GetBackboardPos();
                        this.main.backBoard.changePos(pos);
                        this.main.basket.changePos(pos);
                        this.node.getComponent(cc.RigidBody).gravityScale = Data.ballGravity;
                        this.main.audience.playAudienceAnim()
                    },0.3);
                }else if ( selfPreAabb.yMin < otherPreAabb.yMin) {
                    cc.log("无效进球 --- ----- ");
                }
            }
        }

    }

    onCollisionExit(other){
        cc.log("脱离篮框了----------------");
        if (!this.clickLock) {
            this.clickLock = true;
        }
    }


    update(dt){
        if (this.node.getBoundingBox().xMin >= cc.winSize.width) {
            this.node.x = -this.node.width/2;
        }else if (this.node.getBoundingBox().xMax < 0) {
            this.node.x = cc.winSize.width + this.node.width / 2
        }

        if (this.main.result.loadingGameover) {
            this.clickLock = false;
            this.node.getComponent(cc.RigidBody).gravityScale = 3;
            this.node.getComponent(cc.RigidBody).linearVelocity.y = -600;
        }
    }

}
