import {Data} from "./Data";
import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Board extends cc.Component {
    @property(cc.Graphics)
    private graphics: cc.Graphics = null;

    @property(cc.Node)
    head_collide:cc.Node = null;

    private main:Main = null;

    private increasePosX:number = 0;
    private increasePosY:number = Data.snakeInitPosY;

    increaseConstX:number = Data.bgSpeed; //增长常量
    private increaseConstY:number = Data.bgSpeed; //增长常量

    private isClick:boolean = true;    //没有点击
    isDie:boolean = false;  //没有死亡

    snakeColor:number = 0;     //蛇的颜色

    onLoad(){

        this.node.parent.parent.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.increaseConstX *= -1;
            // this.graphics.lineTo(this.posX,this.posY);
            this.isClick = true;
        });
        this.increasePosX = cc.winSize.width / 2;
    }

    init(main:Main){
        this.main = main;
    }

    //计算角度，（与水平方向的角度）
    getAngle(pos1:cc.Vec2, pos2:cc.Vec2) {
        //var pos = this.node.getPosition();
        let _angle = Math.atan2(pos1.y - pos2.y, pos1.x - pos2.x) * (180 / Math.PI);
        return _angle;
    }

    changeColor(){
        switch (this.snakeColor) {
            case 0:
                this.graphics.strokeColor = cc.Color.RED.fromHEX("#FF007E");
                this.head_collide.color = cc.Color.RED.fromHEX("#FF007E");
                break;
            case 1:
                this.graphics.strokeColor = cc.Color.GREEN.fromHEX("#53C027");
                this.head_collide.color = cc.Color.GREEN.fromHEX("#53C027");
                break;
            case 2:
                this.graphics.strokeColor = cc.Color.BLUE.fromHEX("#8E12FC");
                this.head_collide.color = cc.Color.BLUE.fromHEX("#8E12FC");
                break;
            case 3:
                this.graphics.strokeColor = cc.Color.YELLOW.fromHEX("#F7DD0E");
                this.head_collide.color = cc.Color.YELLOW.fromHEX("#F7DD0E");
                break;
        }
    }

    gameOver(){
        this.graphics.clear();
        this.isDie = true;
    }

    update(dt){
        if (!this.isDie) {
            //碰撞头向上移动
            this.head_collide.y += dt * Data.bgSpeed;

            this.node.y -= dt * Data.bgSpeed;

            if (this.increaseConstX < 0) {
                this.head_collide.x -= dt * Data.bgSpeed;
            }else{
                this.head_collide.x += dt * Data.bgSpeed;
            }
            if (this.isClick) {
                this.isClick = false;
            }
            cc.log("this.increasePosX ---------",this.increasePosX)

            this.graphics.moveTo(this.increasePosX,this.increasePosY);


            this.increasePosX += dt * this.increaseConstX;
            this.increasePosY += dt * this.increaseConstY;

            Data.snakeFramePos = cc.v2(this.increasePosX, Data.snakeInitPosY);

            this.graphics.lineTo(this.increasePosX,this.increasePosY);
            this.graphics.stroke();
        }

    }
}
