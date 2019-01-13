import {Food} from "./Food";
import {Main} from "./Main";
import {Data} from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass
export class ColliderHead extends cc.Component {
    private main:Main = null;

    isGameStart:boolean = false;    //游戏没有开始

    onLoad(){
        this.node.x = cc.winSize.width / 2;
    }

    init(main:Main){
        this.main = main;
    }

    onCollisionEnter(other, self) {
        if (other.tag == 1) {
            // cc.log("吃到了 ============================ ");
            if (other.node.getComponent(Food).foodColor == this.main.board.snakeColor) {
                other.node.active =false;    //食物消失
                this.main.result.getScore(1);
                let temp = this.changeColor(this.main.board.snakeColor);
                if (temp != this.main.board.snakeColor) {
                    this.main.board.snakeColor = temp;
                    this.main.board.changeColor();
                }
            }else{
                // cc.log("游戏结束 ！！！")
                this.main.gameOver();
            }
        }else if (other.tag == 9) {
            //撞墙了
            this.main.gameOver();
        }else if (other.tag == 10) {
            //显示菜单的时候出现的蛇
            if (!this.isGameStart) {
                this.main.board.increaseConstX *= -1;
            }
        }
    }

    changeColor(oldColor:number){
        let randomNum = Math.floor(Math.random() * 10);
        cc.log("是否改变颜色 -------------- ", randomNum);
        //改变颜色
        if (randomNum >= Data.changeColorProbability) {
            //随机出一种能颜色
            let newColor:number = oldColor;
            while (newColor == oldColor) {
                newColor = Math.floor(Math.random() * 4);
            }
            return newColor;
        }
        return oldColor;
    }

    gameStart(){
        this.isGameStart = true;
    }

    gameOver(){
        this.node.active = false;
    }

}
