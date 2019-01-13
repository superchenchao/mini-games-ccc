import {Data} from "./Data";
import {Main} from "./Main";
import {Medicine} from "./Medicine";

const {ccclass, property} = cc._decorator;

@ccclass
export class Bird extends cc.Component {
    private main:Main = null;
    private collisionY:number = 0;
    private collisionX:number = 0;

    private isTouchEnd: boolean = true;  //离开了触摸

    @property(cc.ParticleSystem)
    particle:cc.ParticleSystem = null;

    onLoad(){
        this.node.parent.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
           // cc.log("dddddddddddd");
           this.isTouchEnd = false;
            this.collisionY = 0;
            this.upBird();
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            //cc.log("end -------- touch ");
            this.isTouchEnd = true;
            this.node.getComponent(cc.RigidBody).gravityScale = Data.birdGravity;
            if (this.collisionY == 2) {
                this.collisionY = 0;
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -0.5);
            }
        });
    }

    init(main:Main){
        this.main = main;
    }

    //小鸟在y方向发生了碰撞，速度、重力均置为0；
    resetDefault(){
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        this.node.getComponent(cc.RigidBody).gravityScale = 0;
    }

    //小鸟上升
    upBird(){
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, Data.birdSpeedY);
        this.node.getComponent(cc.RigidBody).gravityScale = 0;
    }

    onCollisionEnter(other, self){
        switch (other.tag) {
            case 1: //障碍物
                this.onCollisionBarrierEnter(other, self);
                break;
            case 2:     //上下边缘
                this.extracted();
                break;
            case 3:     //药
                if (other.node.getComponent(Medicine).attribute == 0) {
                    //攻速
                    if (Data.bullectAttackSpeed - Data.addAttackSpeed < Data.superAttackSpeed) {
                        Data.bullectAttackSpeed = Data.superAttackSpeed;
                    }else {
                        Data.bullectAttackSpeed -= Data.addAttackSpeed;
                    }
                    this.main.bullectArea.updateAttackSpeed();
                }else{
                    //攻击力
                    Data.bullectPower += 1;
                }
                other.node.active = false;

                break;

        }
    }

    private extracted() {
        this.node.active = false;
        let pos = this.node.getPosition();
        this.particle.node.position = pos;
        this.particle.resetSystem();
        this.main.bullectArea.isShooting = false;
        this.main.showGameOver();
    }

    onCollisionBarrierEnter(other, self){
        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            cc.log("正面碰到障碍物 -------------gameover ");
            if (selfPreAabb.xMin < otherPreAabb.xMin) {
                this.extracted();
            }
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (selfPreAabb.yMax > otherPreAabb.yMax) {
                cc.log("落在障碍物上 ------------ ")
                this.node.y = otherPreAabb.yMax - 0.5;
                this.resetDefault();
                this.collisionY = -1;
            }else if (selfPreAabb.yMin < otherPreAabb.yMin) {
                cc.log("顶到障碍物了 ----- ");

                this.resetDefault();
                if (this.isTouchEnd) {
                    //如果触摸已经结束了
                    this.node.y = otherPreAabb.yMin - this.node.height - 0.5;
                    this.collisionY = 1;
                }else{
                    //触摸没有结束,给物体赋予向上的线速度，让小鸟持续触发碰撞事件
                    this.node.y = otherPreAabb.yMin - this.node.height;
                    // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1);
                    this.collisionY = 2;
                }
            }
        }
    }

    onCollisionStay(other, self) {
        cc.log("持续碰撞 ---------------------")
    }

    onCollisionExit(other) {
        cc.log("脱离碰撞 - ----------------------");
        if (this.collisionY == -1 || this.collisionY == 1) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -0.5);
            this.node.getComponent(cc.RigidBody).gravityScale = Data.birdGravity;
            this.collisionY = 0;
        }else if (this.collisionY == 2) {
            this.upBird();
        }
    }

    update(){

    }
}
