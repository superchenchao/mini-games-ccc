export class Data {
    //小鸟上升的线速度
    static birdSpeedY:number = 500;
    //小鸟的重力
    static birdGravity:number = 5;
    //障碍物移动的速度
    static barrierSpeedX:number = 200;
    //子弹移动速度
    static bullectSpeedX:number = 1500;
    //子弹的攻击力
    static bullectPower:number = 1;
    //子弹的攻速
    static bullectAttackSpeed:number = 0.3;
    //子弹最快攻速
    static superAttackSpeed:number = 0.05;
    //子弹每次增加攻速
    static addAttackSpeed:number = 0.01;
    //子弹未处于super speed状态
    static bullectSuperSpeed:boolean = false;
    //超级攻速的持续时长
    static superSpeedDuration:number = 4;
    //颜色
    static color = ["", "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];
    //随机生成特殊方块的概率（比这个数小，则生成特殊方块）
    static randomSquare:number = 20;
    //随机是否生成药品的概率（比这个数小，则生成药）
    static randomMedicine:number = 30;
    //随机生成不同种类的药的概率（比这个数小，生成攻击速度药；>=这个数，则生成攻击力药）
    static randomDifferentMedicine:number = 5;
    //方块上面的数字的最小值
    static minNumberOnBarrier:number = 1;
    //是否处于生成方块状态
    static isProduceState:boolean = true;
    //游戏结束
    static isGameOver:boolean = false;

}

export enum Color {
    Red,
    Orange,
    Yellow,
    Green,
    Cyan,
    Blue,
    Purple
}