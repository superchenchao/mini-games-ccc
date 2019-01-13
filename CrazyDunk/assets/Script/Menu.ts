import {Data} from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass
export class Menu extends cc.Component {
    @property(cc.Node)
    click_start:cc.Node = null;

    @property(cc.Node)
    basket:cc.Node = null;
    @property(cc.Node)
    backboard:cc.Node = null;

    @property(cc.Node)
    start_pos:cc.Node = null;

    @property(cc.Node)
    end_pos:cc.Node = null;

    @property(cc.Graphics)
    graphics:cc.Graphics = null;

    @property(cc.Node)
    circle:cc.Node = null;

    private curveStartPosX:number = 0;
    private curveStartPosY:number = 0;

    private curveCreateNumX:number = 0;
    private curveCreateNumY:number = 0;

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            cc.director.loadScene("game");
        });

        let rotation1 = cc.rotateBy(0.1,10);
        let moveBy1 = cc.moveBy(0.1, 0, 15);

        let rotation2 = cc.rotateBy(0.1,-10);
        let moveBy2 = cc.moveBy(0.1, 0, -15);


        this.schedule(()=>{
            this.click_start.runAction(cc.sequence(cc.spawn(rotation1, moveBy1), cc.spawn(rotation2, moveBy2)));
        },2)

        this.basket.getComponent(cc.Widget).left = 1;
        this.backboard.getComponent(cc.Widget).left = 1;

        this.curveAnimation()
    }

    curveAnimation(){
        let scaleS = cc.scaleTo(0.1, 0.9);
        let scaleZ = cc.scaleTo(0.1, 1);
        let scaleX = cc.scaleTo(0.1, 1.1);

        let drawCurve = cc.callFunc(()=>{
            this.graphics.moveTo(this.start_pos.getPosition().x, this.start_pos.getPosition().y);
            this.graphics.quadraticCurveTo(20,100,200,20);
        });
        this.schedule(()=>{
            this.circle.runAction(cc.sequence(scaleS, scaleZ, scaleX, scaleZ))
        },2)

    }

    update(dt){

    }
}
