export class Data {
    //背景移动速度
    static bgSpeed:number = 400;
    //🐍的初始X位置
    static snakeInitPosX:number = 380;
    //🐍的初始Y位置
    static snakeInitPosY:number = 300;
    //食物出现的时间间隔(最大)
    static ProduceFoodIntervalMax:number = 2;
    //食物出现的时间间隔(最小)
    static ProduceFoodIntervalMin:number = 0.2;
    //🐍每帧的位置
    static snakeFramePos:cc.Vec2 = cc.v2(0,0);
    //改变蛇颜色的概率(大于此值即变色)
    static changeColorProbability:number = 5;
}

//食物的颜色
export enum Color {
    Red,
    Green,
    Blue,
    Yellow,
}