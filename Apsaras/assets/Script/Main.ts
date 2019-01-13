const {ccclass, property} = cc._decorator;

@ccclass
export class Main extends cc.Component {
    private static _instance: Main;
    public static instance(){
        return this._instance;
    }
    //空气阻力
    airDrag: number = 2400;
    //人物跳起来的速度
    jumpSpeed: number = 1200;
    //平台需要移动的时间
    platformMoveTime:number = 0;

    //绿色平台没有移动
    greenMoving: boolean = false;
    //蓝色平台没有移动
    blueMoving: boolean = false;
    //橙色平台没有移动
    orangeMoving: boolean = false;

    //平台移动速度
    platformSpeed:number = 1200;
    //蓝，橙色平台移动速度
    platformSpeedBO:number = 1800;
    //背景移动速度
    bgSpeed:number = 200;
    //平台开始移动
    startMoving: boolean = false;
    //有效得碰撞的一瞬间
    // momentCollision: boolean = false;
    //平台移动距离
    moveDiatance: number = 0;

    //橙色平台移动时间
    orangeTime:number = 2;
    //蓝色平台移动时间
    blueTime:number = 1;
    //跳到了绿色平台后，移动的距离
    greenDistance:number = 0;

    @property(cc.Node)
    start_pos: cc.Node = null;

    //球能跳得最高点
    @property(cc.Node)
    high_pos: cc.Node = null;

    //显示距离
    @property(cc.Label)
    distance_text: cc.Label = null

    allTime:number = 0;

    onLoad(){
        Main._instance = this;
        cc.director.getCollisionManager().enabled = true;
    }

    update(dt){
        this.distance_text.string = this.moveDiatance + "m";

        if (Main.instance().blueMoving) {
            this.allTime += dt;
            cc.log(" this.allTime ============  " +  this.allTime);
            if (Main.instance().blueTime >= this.allTime) {
                cc.log("蓝色 platform 开始iyidong -----");
            }else{
                cc.log("blueMoving 变成了 false -----------");
                Main.instance().blueMoving = false;
                Main.instance().startMoving = false;
                this.allTime = 0;
            }
        }

    }
}
