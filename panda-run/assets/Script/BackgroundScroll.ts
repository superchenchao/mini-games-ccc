import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class GamePandaRunBgScroll extends cc.Component {
    @property(cc.Node)
    bg:cc.Node[] = [];

    pauseSpeed:number = 0;
    speed:number = Main.bgSpeed;

    onLoad() {
        this.fixBgPos(this.bg);
        this.pauseSpeed = 0;
    }

    fixBgPos (bgList:cc.Node[]) {
        bgList[0].x = 0;
        let bg1BoundingBox = bgList[0].getBoundingBox();
        for (let index = 1; index < bgList.length; index++) {
            let element = bgList[index];
            element.setPosition(bg1BoundingBox.xMax * index, bg1BoundingBox.yMin);
        }
    }

    pauseAction () {
        this.pauseSpeed = this.speed;
        this.speed = 0;
    }

    resumeAction() {
        this.speed = this.pauseSpeed;
    }
    update(dt) {
        // cc.log("dt -------------- " + dt);
        this.bgMove(this.bg, this.speed, dt);
        this.checkBgReset(this.bg);
    }
    bgMove(bgList:cc.Node[], bgSpeed:number, dt:number) {
        //cc.log("背景的速度。。。。。。。。。", bgSpeed);
        for (let index = 0; index < bgList.length; index++) {
            let element = bgList[index];
            element.x -= bgSpeed * dt;
        }
    }
    checkBgReset(bgList:cc.Node[]) {
        let first_xMax = bgList[0].getBoundingBox().xMax;
        if (first_xMax <= 0) {
            let preFirstBg = bgList.shift();
            bgList.push(preFirstBg);

            let curFirstBg = bgList[0];
            preFirstBg.x = curFirstBg.getBoundingBox().xMax;
        }
    }
}
