export class Data{
    //篮球横向线速度
    static ballSpeedX = -300;
    //篮球纵向线速度
    static ballSpeedY = 1300;
    //倒计时
    static count_down = 6;
    //篮球默认重力
    static ballGravity = 15;

    static init(){
        Data.count_down = 6;
        Data.ballSpeedX = -300;
        Data.ballSpeedY = 1300;
    }
}