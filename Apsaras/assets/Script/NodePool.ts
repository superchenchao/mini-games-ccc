import {Platform} from "./Platform";

export class NodePool {
     //批量初始化对象池
    static batchInitObjPool(thisO, objArray) {
        for (let index = 0; index < objArray.length; index++) {
            let objinfo = objArray[index];
            this.initObjPool(thisO, objinfo);
        }
    }
    //初始化对象池
    static initObjPool(thisO, objInfo) {
        let name = objInfo.nodePoolName;
        let poolName = name + 'Pool';
        thisO[poolName] = new cc.NodePool();
        let initPollCount = objInfo.initPollCount;

        for (let ii = 0; ii < initPollCount; ++ii) {
            let nodeO = cc.instantiate(objInfo.prefab); // 创建节点
            thisO[poolName].put(nodeO); // 通过 putInPool 接口放入对象池
        }
    }

    //生成节点
    static genNewNode(pool, prefab, nodeParent) {
        let newNode = null;
        if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            newNode = pool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            newNode = cc.instantiate(prefab);
        }
        //cc.log("newNode,,,,,,,,,,,", newNode);
        newNode.getComponent(Platform).birthNodePool = true;
        nodeParent.addChild(newNode);
        //cc.log("oooooooooooooooooooooo");
        return newNode;
    }
    //放回对象池
    static backObjPool(thisO, nodeinfo) {
        let poolName = nodeinfo.name + 'Pool';
        thisO[poolName].put(nodeinfo);
    }
}