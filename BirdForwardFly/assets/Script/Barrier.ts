import {Data} from "./Data";
import {Main} from "./Main";
import Color = cc.Color;

const {ccclass, property} = cc._decorator;

@ccclass
export class Barrier extends cc.Component {
    private showNum:cc.Label;
    private showStar:cc.Node;
    private bg:cc.Node;
    maxNum:number = 3;
    minNum:number = 1;      //初始的最小值
    initColor:Color = cc.Color.BLACK;  //障碍物出生时的颜色

    figure:number = 0;

    especiallyBarrier:number = 0;   //0:默认障碍物；1:极速属性障碍物; 2

    @property(cc.ParticleSystem)
    particle:cc.ParticleSystem = null;


    onLoad(){

        this.showNum = this.node.getChildByName("text").getComponent(cc.Label);
        this.showStar = this.node.getChildByName("star");
        this.bg = this.node.getChildByName("bg");
        this.randomBarrier(1)
    }

    // init(main:Main){
    //     main.barrier = this;
    // }

    //播放毁灭粒子效果
    playAnim(){
        Main.instance().getScore(this.figure);
        this.particle.startColor = this.initColor;
        this.particle.endColor = this.initColor;
        this.particle.resetSystem();
    }

    changeFigure(num:number){
        Main.instance().getScore(num);
        this.figure -= num;
        this.showNum.string = this.figure + "";
        this.randomBarrier(2)
    }

    //随机生成方块的值(参数为1时，是生成方块；为2时，是方块被击中时所变色；)
    randomBarrier(n:number){
        cc.log("当前 -- 最大值 ========和最小值== " + this.maxNum + " -- " + Data.minNumberOnBarrier);
        let random = 0;
        //当最大值大于10，且是10的倍数时，初始的最小值就加1；
        if (this.maxNum > 10 && this.maxNum % 10 == 0) {
            this.minNum += this.minNum;
        }
        //让最小值，比最大值小30；（最大值与最小值，必须最少间隔30，然后再重新从旧的最小值与1之间选出一个新的最小值，确保最小值不固定）
        if (this.maxNum - Data.minNumberOnBarrier >= 30 && Data.isProduceState) {
            Data.isProduceState = false;
            Data.minNumberOnBarrier = Math.floor(Math.random() * (this.maxNum - 30 + 1 - this.minNum) + this.minNum);
        }
        let disNum = this.maxNum - Data.minNumberOnBarrier + 1;
        if (n == 1) {
            //随机一个数后，然后上色
            random = Math.floor(Math.random() * (this.maxNum + 1 - Data.minNumberOnBarrier) + Data.minNumberOnBarrier);
        }else {
            random = this.figure;
        }
        let colorNum = random - Data.minNumberOnBarrier + 1;        //此数，用来计算颜色
        let numNum = random;        //此数，用来显示出障碍物上的数字
        this.figure = numNum;
        this.showNum.string = numNum + "";
        if (disNum % 7 == 0) {
            //刚好整除
            let num = disNum / 7;  //得出相同色有几个
            let colorIndex = Math.ceil(colorNum / num);  //得出当前数字所对应的颜色
            this.node.color = cc.Color.RED.fromHEX(Data.color[colorIndex]);
        }else {
            if (disNum / 7 >= 1) {
                //最大值大于7
                let remainder = disNum % 7;    //余数
                let quotient = Math.floor(disNum / 7);    //商

                let frontCommonColor = (quotient + 1) * remainder;  //有remainder组，每组(quotient + 1)个同色
                let colorIndex:number = 0;  //得出当前数的颜色索引
                if (frontCommonColor <= colorNum) {
                    colorIndex =  Math.ceil((colorNum - frontCommonColor) / quotient) + remainder;
                }else{
                    colorIndex = Math.ceil(colorNum / (quotient + 1));
                }
                this.node.color = cc.Color.RED.fromHEX(Data.color[colorIndex]);

            }else {
                //最大值小于7
                this.node.color = cc.Color.RED.fromHEX(Data.color[colorNum]);
            }
        }

        if (n == 1) {
            this.initColor = this.node.color;
        }
    }

    //生成特殊方块
    produceSpecialBarrier(){
        this.showStar.active = true;
        this.showNum.node.y += this.showNum.node.height / 2;
        this.bg.active = true;
        this.especiallyBarrier = 1;
    }

    //重置方块
    resetBarrier(){
        this.showStar.active = false;
        this.showNum.node.y = 0;
        this.bg.active = false;
        this.especiallyBarrier = 0
    }

    update(dt){
        // cc.log("this.node.x =========",this.node.x)
        // if (this.node.getBoundingBox().xMax < 0) {
        //     this.node.opacity = 255;
        //     this.node.getComponent(cc.PhysicsBoxCollider).enabled = true;
        //     this.node.getComponent(cc.BoxCollider).enabled = true;
        //     this.node.x = cc.winSize.width + this.node.width;
        //     this.maxNum += 1;
        //
        //     this.randomBarrier(1);
        // }else{
        //    // this.node.x -= dt * Data.barrierSpeedX;
        // }
    }
}
