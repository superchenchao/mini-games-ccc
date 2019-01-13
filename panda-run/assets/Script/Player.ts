import {Main} from "./Main";
import Vec2 = cc.Vec2;
import v2 = cc.v2;
import size = cc.size;
import {Result} from "./Result";

const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {
    @property(cc.SpriteAtlas)
    player_img:cc.SpriteAtlas = null;

    private jumping:boolean = false;        //处于跳跃状态
    private jumpCount:number = 0;       //连跳次数
    private jumpSpeed:number = Main.jumpSpeed;
    private drag:number = Main.airDrag; //空气阻力
    private jumpBool:boolean = true;        //控制跳跃的开关

    private speed:number = Main.barrierSpeed;

    private collisionY:number = 0;
    private collisionX:number = 0;
    private collisionShortX:number = 0;     //没有正面撞到短的障碍物上

    private running: boolean = true;    //人物处于跑动中
    private initClickDown:boolean = false;  //下蹲按钮没有被按下

    private barrierSpeed:number = 0;
    private jumpingTime:number = 0;     //连跳的时间
    onLoad(){
    }

    onCollisionEnter(other, self){
        if (other.tag == 1) {       //长条平台
            this.onCollisionPlatformEnter(other, self);
        }else if (other.tag == 2) {     //金币
            this.onCollisionGoldEnter(other, self);
        }else if (other.tag == 3) {     //短平台
            this.onCollisionShortEnter(other, self)
        }
    }

    //碰撞到短的障碍物 ---
    onCollisionShortEnter(other, self){
        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {

            // if (selfPreAabb.xMax > otherPreAabb.xMin || selfPreAabb.xMin < otherPreAabb.xMax) {
            if (selfPreAabb.xMin < otherPreAabb.xMin) {
                cc.log("人物蹲下后再抬头顶到了短障碍物 ------------- ");
                this.collisionShortX = 1;
            }
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            cc.log("jumpspeed ----//" + this.jumpSpeed)
            if (this.jumpSpeed < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
                cc.log("落在障碍物上 ------------ ")

                this.node.y = otherPreAabb.yMax-0.5; //什么玩意，还要减0.5。
                this.jumping = false;
                this.jumpBool = true;
                this.jumpCount = 0;
                this.node.getComponent(cc.Animation).play("run");
                this.collisionY = -1;
            }else if (this.jumpSpeed > 0 && selfPreAabb.yMin < otherPreAabb.yMin) {
                cc.log("顶到障碍物了 ----- ");
                this.jumpSpeed = 0;
                this.collisionY = 1;
            }
            this.jumpSpeed = 0;
            other.touchingY = true;
        }
    }

    onCollisionGoldEnter(other, self){
        Result.instance().getScore(Main.goldScore);
        other.node.destroy();
    }

    onCollisionPlatformEnter(other, self){

        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            cc.log("正面碰到障碍物 ------------- ");
            if (selfPreAabb.xMin < otherPreAabb.xMin) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width;
                this.collisionX = 1;
            }
            other.touchingX = true;
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            cc.log("jumpspeed ----//" + this.jumpSpeed)
            if (this.jumpSpeed < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
                cc.log("落在障碍物上 ------------ ")
                this.jumpingTime = 0;
                this.node.y = otherPreAabb.yMax-0.5; //什么玩意，还要减0.5。
                this.jumping = false;
                this.jumpBool = true;
                this.jumpCount = 0;
                this.node.getComponent(cc.Animation).play("run");
                this.collisionY = -1;
            }else if (this.jumpSpeed > 0 && selfPreAabb.yMin < otherPreAabb.yMin) {
                cc.log("顶到障碍物了 ----- ");
                this.jumpSpeed = 0;
                this.collisionY = 1;
            }
            this.jumpSpeed = 0;
            other.touchingY = true;
        }
    }

    onCollisionStay(other, self) {
        if (this.collisionX == 1) {
            cc.log("碰撞中 ------------ ");
            this.node.x -= this.barrierSpeed;
        }

        if (this.collisionShortX === 1) {
            cc.log("人物已经下蹲了，but，站起来后会撞到障碍物 ----------- ");
            if (this.running) {
                this.node.x -= this.barrierSpeed;
            }
        }
    }

    onCollisionExit(other) {
        if (other.touchingY) {
            // cc.log("脱离碰撞 ------------ ")
            other.touchingY = false;
            this.collisionY = 0;
        }
        if (other.touchingX) {
            // cc.log("脱离碰撞 ------------ ")
            other.touchingX = false;
            this.collisionX = 0;
        }
        if (this.collisionShortX === 1) {
            cc.log("脱离碰撞 ------------ ");
            if (this.initClickDown === false) { //下蹲按钮没有被按下
                this.collisionShortX = 0;
                this.node.getComponent(cc.Animation).play("run");
                this.running = true;
            }

        }
    }

    Jump(){
        if (this.jumpBool && this.running) {
            if (!this.jumping || this.jumpCount < 2) {
                this.jumping = true;
                //this.speed.y = this.jumpSpeed;
                this.jumpSpeed = 350;
                this.jumpCount++;
                this.jumpCount < 2 ? this.node.getComponent(cc.Animation).play("jump") : this.node.getComponent(cc.Animation).play("twiceJump");
            }
        }
    }

    Squat(bool:boolean){
        if (bool) {
            this.initClickDown = true;
            //玩家必须跟地面接触，才能蹲下
            if (this.collisionY === -1) {
                this.node.getComponent(cc.Animation).stop();
                this.node.getComponent(cc.Sprite).spriteFrame = this.player_img.getSpriteFrame("panda_roll_02");
                this.running = false;
            }
        }else{
            this.initClickDown = false;
            if (this.collisionShortX == 0) {
                // cc.log("人物站起来了？？？？？？？？？？？？")
                this.node.getComponent(cc.Animation).play("run");
                this.running = true;
            }
        }

    }

    update(dt){
        if (this.collisionY === 0 || this.jumping) {
            // cc.log("update -------------- ")
            this.jumpSpeed -= dt * this.drag;
            this.node.y += dt * this.jumpSpeed;
            this.jumpingTime += dt;
        }

        if (this.node.x < 0 || this.node.y < 0) {
            Result.instance().showGameover(false);
            this.node.destroy()
        }

        this.barrierSpeed = this.speed * dt;

        //计算跳起来的时间
        // if (this.jumping) {
        //     this.jumpingTime += dt;
        // }
        if (this.jumping) {
            this.jumpingTime += this.speed * dt;
        }
        cc.log(" 跳起来费时 ---------- " + this.jumpingTime);
    }
}
