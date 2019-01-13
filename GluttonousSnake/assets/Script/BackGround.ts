import {Data} from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass
export class Background extends cc.Component {
    @property(cc.Node)
    bg:cc.Node[] = [];

    speed:number = Data.bgSpeed;
    //总时间
    allTime:number = 0;

    onLoad() {
        this.fixBgPos(this.bg);
    }

    fixBgPos (bgList:cc.Node[]) {
        bgList[0].x = 0;
        let bg1BoundingBox = bgList[0].getBoundingBox();
        for (let index = 1; index < bgList.length; index++) {
            let element = bgList[index];
            element.setPosition(bg1BoundingBox.xMin, bg1BoundingBox.yMax * index);
        }
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
            element.y -= bgSpeed * dt;
        }
    }
    checkBgReset(bgList:cc.Node[]) {
        let first_yMax = bgList[0].getBoundingBox().yMax;
        if (first_yMax <= 0) {
            let preFirstBg = bgList.shift();
            bgList.push(preFirstBg);

            let curFirstBg = bgList[0];
            preFirstBg.y = curFirstBg.getBoundingBox().yMax;
        }
    }
}
