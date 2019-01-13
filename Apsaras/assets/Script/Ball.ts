import {Main} from "./Main";
import {Platform} from "./Platform";
import {Result} from "./Result";

const {ccclass, property} = cc._decorator;

@ccclass
export class Ball extends cc.Component {
    @property(cc.Node)
    platform_node:cc.Node = null;

    private jumpSpeed:number = 0;
    private drag:number = 0; //空气阻力
    private collisionY:number = 0;

    onLoad(){
        this.jumpSpeed = Main.instance().jumpSpeed;
        this.drag = Main.instance().airDrag;

        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            //将世界坐标转化为本地坐标
            let delta = this.node.parent.convertToNodeSpace(event.touch.getDelta());
            this.node.x += delta.x;
            if (this.node.x <= 0) {
                this.node.x = 0;
            }else if (this.node.x + this.node.width >= cc.winSize.width) {
                this.node.x = cc.winSize.width - this.node.width;
            }
        });
    }

    onCollisionEnter(other, self){
        if (other.tag == 1) {       //平台
            this.onCollisionPlatformEnter(other, self);
        }else if (other.tag == 2) {     //金币
            // this.onCollisionGoldEnter(other, self);
        }else if (other.tag == 3) {     //短平台
            // this.onCollisionShortEnter(other, self)
        }
    }

    onCollisionPlatformEnter(other, self){

        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            // cc.log("jumpspeed ----//" + this.jumpSpeed)
            if (this.jumpSpeed < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
                // cc.log("落在障碍物上 ------------ " + otherPreAabb.yMin);
                other.node.getComponent(Platform).collisionTimes++;
                this.jumpSpeed = Main.instance().jumpSpeed;
                // cc.log("collisionTimes ------- " + other.node.getComponent(Platform).collisionTimes);
                if (other.node.getComponent(Platform).collisionTimes < 2) {
                    if (Math.round(otherPreAabb.yMin) > Main.instance().start_pos.y) {
                        if (other.node.name == "platform_green") {
                            Main.instance().greenDistance = Math.round(otherPreAabb.yMin) - Main.instance().start_pos.y - other.node.height;
                            for (let i = 0; i < this.platform_node.childrenCount; i++) {
                                this.platform_node.children[i].getComponent(Platform).nodeMoving = false
                            }
                            Main.instance().greenMoving = true;
                        }else if (other.node.name == "platform_blue") {
                            other.node.opacity = 0;
                            Main.instance().blueMoving = true;
                        }

                    }else {
                        if (other.node.name == "platform_green") {
                            Main.instance().greenDistance = Math.round(otherPreAabb.yMin);
                            for (let i = 0; i < this.platform_node.childrenCount; i++) {
                                this.platform_node.children[i].getComponent(Platform).nodeMoving = false
                            }
                            Main.instance().greenMoving = true;
                        }else if (other.node.name == "platform_blue") {
                            other.node.opacity = 0;
                            this.drag = 1400;
                            Main.instance().blueMoving = true;
                        }
                    }
                    Main.instance().startMoving = true;
                }

            }else if (this.jumpSpeed > 0 && selfPreAabb.yMin < otherPreAabb.yMin) {
                // cc.log("顶到障碍物了 ----- ");
            }
        }
    }

    onCollisionExit(other){
        // Main.instance().momentCollision = false;
        // if (other.world.aabb.yMin <= Main.instance().start_pos.y) {
        //     other.node.getComponent(Platform).theLastOne = false;
        // }

    }

    update(dt){
        if (this.node.y > Main.instance().high_pos.y) {
            this.jumpSpeed = 0;
            this.node.y = Main.instance().high_pos.y;
        }
        // cc.log("ball --- speed ----|" + this.jumpSpeed);
        if (this.jumpSpeed <=0 && Main.instance().blueMoving) {
            // let moveTo = cc.moveBy(1.2, 0, Main.instance().high_pos.y-this.node.y);
            // this.node.runAction(moveTo);
            this.jumpSpeed = 0;
            this.collisionY = -1;
            // this.jumpSpeed = 3000;
        }
        if (!Main.instance().blueMoving) {
            // this.jumpSpeed = Main.instance().jumpSpeed;
            this.collisionY = 0;
            this.drag = Main.instance().airDrag;
        }
        if (this.collisionY === 0) {
            // cc.log("this.node. y =============== " + this.node.y);
            this.jumpSpeed -= dt * this.drag;
            this.node.y += dt * this.jumpSpeed;
        }

        if (this.node.getBoundingBox().yMax < 0) {
            Result.instance().showGameover();
            this.node.destroy();
        }
    }
}
