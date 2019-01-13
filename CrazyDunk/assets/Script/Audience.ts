const {ccclass, property} = cc._decorator;

@ccclass
export class Audience extends cc.Component {

    onLoad(){
        // this.playAudienceAnim()
    }

    playAudienceAnim(){
        let random = Math.floor(Math.random() * (this.node.childrenCount - 3) + 3);
        // cc.log("random ============== ", random);
        let x = 0;
        let arr =[];

        let select = ()=>{
            return Math.floor(Math.random() * this.node.childrenCount);
        };
        let a =  select();
        while (random > x) {

            if (arr.indexOf(a) == -1) {
                arr.push(a);
                x++;
            }else{
                a = select();
            }
        }
        // cc.log("arrrrrr === " , arr);
        let ran = Math.floor(Math.random() * 2);

        for (let i = 0; i < arr.length; i++) {
            if (ran == 0) {
                this.playDump(arr[i]);
            }else{
                this.playRotation(arr[i]);
            }
        }
    }

    playDump(index){
        let moveByTop = cc.moveBy(0.3, 0,8);
        let moveByDown = cc.moveBy(0.3, 0,-8);
        this.node.children[index].runAction(cc.sequence(moveByTop, moveByDown));
    }

    playRotation(index){
        let moveByR = cc.rotateBy(0.1, 12,0);
        let moveByZ = cc.rotateBy(0.1, -12,0);
        let moveByL = cc.rotateBy(0.1, -12,0);
        this.node.children[index].runAction(cc.sequence(moveByR, moveByZ, moveByL, moveByR));
    }
}
