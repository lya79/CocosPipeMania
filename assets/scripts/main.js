// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        /** 遊戲設定 */
        gameTime: { // 幾秒後開始流動
            default: 60,
            type: cc.Integer,
        },
        blockTime: { // 每個格子幾秒鐘通過
            default: 5,
            type: cc.Integer,
        },
        blockPointCount: { // 每個格子多少個座標點
            default: 5,
            type: cc.Integer,
        },
        blockWidth: { // 每個格子寬度
            default: 100,
            type: cc.Integer,
        },
        blockHeight: { // 每個格子高度
            default: 100,
            type: cc.Integer,
        },
        blockOpacity: { // 格子透明度
            default: 200,
            type: cc.Integer,
        },
        row: { // 格子列數
            default: 4,
            type: cc.Integer,
        },
        col: { // 格子欄數
            default: 6,
            type: cc.Integer,
        },
        frameStrokeWidth: { // 邊框厚度
            default: 10,
            type: cc.Integer,
        },
        lineWidth: { // 水流寬度
            default: 43,
            type: cc.Integer,
        },

        /** node */
        labTimeInfo: { // 倒數計時訊息
            default: null,
            type: cc.Node,
        },
        layoutTitle: { // 初始畫面含play按鈕
            default: null,
            type: cc.Node,
        },
        btnReset: { // 遊戲進行中用來回到初始畫面的按鈕
            default: null,
            type: cc.Node,
        },

        /** prefab */
        prefabBlock: { // 格子
            default: null,
            type: cc.Prefab,
        },
        prefabInfo: { // 遊戲結束顯示過關或是失敗的元件
            default: null,
            type: cc.Prefab,
        },
        prefabBlockLL: { // 水管 左-下
            default: null,
            type: cc.Prefab,
        },
        prefabBlockLR: { // 水管 下-右
            default: null,
            type: cc.Prefab,
        },
        prefabBlockUL: { // 水管 左-上
            default: null,
            type: cc.Prefab,
        },
        prefabBlockUR: { // 水管 上-右
            default: null,
            type: cc.Prefab,
        },
        prefabBlockE: { // 水管 水平
            default: null,
            type: cc.Prefab,
        },
        prefabBlockN: { // 水管 垂直
            default: null,
            type: cc.Prefab,
        },
        prefabArrowDown: { // 箭頭
            default: null,
            type: cc.Prefab,
        },

        /** 內部變數 */
        blockPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        blockLLPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        blockLRPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        blockULPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        blockURPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        blockEPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        blockNPool: {
            default: null,
            type: cc.NodePool,
            visible: false,
        },
        graphicsNodeArray: { // 用來儲存 Graphics node
            default: null,
            type: cc.Node,
            visible: false,
        },
        blockArray: { // 用來儲存 block
            default: null,
            type: cc.Node,
            visible: false,
        },
        waitAreaPipeArray: { // 用來儲存等待區的 pipe node
            default: null,
            visible: false,
        },
        waitAreaMaskNode: { // 用來儲存等待區的 mask node
            default: null,
            visible: false,
        },
        gameStage: { // 遊戲階段
            default: 0,
            visible: false,
        },
        pipleDelay: { // 水管掉落等待區的延遲時間
            default: 0.5,
            visible: false,
        },
        selectedPipe: { // 被選中的水管
            default: null,
            type: cc.Object,
            visible: false,
        },
        currentX: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        currentY: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        delPipeIdx: {
            default: -1,
            type: cc.Integer,
            visible: false,
        },
        pipePosArray: { // 用來記錄目前遊戲區內有那些水管, 使用二維陣列儲存, 裡面儲存每個水管有哪些路徑座標
            default: null,
            visible: false,
        },
        pipeNodeArray: { // 用來記錄目前遊戲區內有那些水管 node
            default: null,
            visible: false,
        },
        lockWaitArea: { // 等待區的水管如果還在掉落中, 要禁止玩家拿取
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        firstPipe: {
            default: null,
            visible: false,
        },
        lastPipe: {
            default: null,
            visible: false,
        },
        currenttPipe: {
            default: null,
            visible: false,
        },
        nextPipe: {
            default: null,
            visible: false,
        },
        currentPosArr: {
            default: null,
            visible: false,
        },
        currentPosIdx: {
            default: -1,
            visible: false,
        },
        currentPosArr: {
            default: null,
            visible: false,
        },
        graphicsLineNode: {
            default: null,
            visible: false,
        },
        graphicsLine: {
            default: null,
            visible: false,
        },
        started: { // 水流開始
            default: false,
            visible: false,
        },
        gameState: { // T:win F:lose
            default: false,
            visible: false,
        },
        resultInfo: {
            default: null,
            visible: false,
        },
        prefabArrowDownIn: {
            default: null,
            visible: false,
        },
        prefabArrowDownOut: {
            default: null,
            visible: false,
        },
    },


    onLoad() {
        { // 初始化格子 prefab pool
            let initCount = this.row * this.col;
            this.blockPool = new cc.NodePool();
            this.newPipeBlock(this.blockPool, "block", initCount);
        }

        { // 初始化水管 prefab pool
            let initCount = 10;
            this.blockLLPool = new cc.NodePool();
            this.blockLRPool = new cc.NodePool();
            this.blockULPool = new cc.NodePool();
            this.blockURPool = new cc.NodePool();
            this.blockEPool = new cc.NodePool();
            this.blockNPool = new cc.NodePool();
            this.newPipeBlock(this.blockLLPool, "LL", initCount);
            this.newPipeBlock(this.blockLRPool, "LR", initCount);
            this.newPipeBlock(this.blockULPool, "UL", initCount);
            this.newPipeBlock(this.blockURPool, "UR", initCount);
            this.newPipeBlock(this.blockEPool, "E", initCount);
            this.newPipeBlock(this.blockNPool, "N", initCount);
        }

        { // 隱藏已經在畫布上的元件
            this.layoutTitle.active = false;
            this.btnReset.active = false;
            this.labTimeInfo.active = false;
        }

        { // init
            this.layoutTitle.getChildByName('btnPlay').getComponent("play").init(this);
            this.btnReset.getComponent("reset").init(this);
        }

        {
            this.graphicsNodeArray = [];
            this.blockArray = [];
            this.waitAreaPipeArray = [];
            this.waitAreaMaskNode = null;
            this.selectedPipe = null;
            this.currentXY = null;
            this.delPipeIdx = -1;
            this.pipePosArray = [];
            this.pipeNodeArray = [];
            this.firstPipe = null;
            this.lastPipe = null;
            this.currenttPipe = null;
            this.nextPipe = null;
            this.currentPosArr = []; // 目前格子裡面有哪耶座標, 由起始點到結束點
            this.currentPosIdx = -1; // 當前 pipe執行到哪一個座標點
        }

        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.mouseMove, this);
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_MOVE, this.mouseMove, this);
    },

    start() {
        this.stageWait();
    },

    enableWaitArea() { // 判斷目前水管等待區是否鎖定, 水管進行掉落動畫時會鎖定等待區
        return this.lockWaitArea == 0;
    },

    selectBlock(row, col) { // 將目前選中的水管固定到指定的區塊 
        if (this.selectedPipe == null) {
            return false;
        }

        let pipe = this.selectedPipe.pipe;
        let mode = this.selectedPipe.mode;

        this.selectedPipe = null;

        this.putObj(pipe, mode); // 回收選中的 pipe

        this.setPipe(row, col, mode);
        return true;
    },

    setPipe(row, col, mode) { // 放置水管在遊戲區
        // console.log("setPipe:" + row + "," + col + ", mode:" + mode);

        let obj = this.getObj(mode);
        let pipe = obj.pipe;
        this.node.addChild(pipe);

        this.pipeNodeArray.push(obj);

        { // 設定位置和大小 
            let frameStrokeWidth = this.frameStrokeWidth; // 邊框厚度

            let frameWidth = ((this.col + 1) * this.blockWidth) + (frameStrokeWidth * 3);
            let frameHeight = (this.row * this.blockHeight) + (frameStrokeWidth * 2);

            // row:0, col:0
            let baseX = 0 - (frameWidth / 2) + (frameStrokeWidth) + (this.blockWidth / 2);
            let baseY = 0 + (frameHeight / 2) - (frameStrokeWidth) - (this.blockWidth / 2);

            let x = baseX + (col * this.blockWidth);
            let y = baseY - (row * this.blockHeight);

            pipe.position = cc.v2(x, y);
            pipe.width = this.blockWidth;
            pipe.height = this.blockHeight;
        }

        { // 儲存水管資訊
            this.pipePosArray[row][col] = mode;
        }
    },



    selectPipe(pipeObj) {
        if (!this.enableWaitArea()) {
            return;
        }

        if (this.selectedPipe != null) { // 如果目前已經有選擇任何水管, 就制止選擇其他水管
            return;
        }

        let mode = pipeObj.getComponent('block').getMode();

        // console.log("selectPipe:", pipeObj, ", mode:" + mode);

        { // 將等待區內被選擇的水管做刪除
            let idx = -1;
            for (let i = 0; i < this.waitAreaPipeArray.length; i++) {
                if (this.waitAreaPipeArray[i] != pipeObj.node) {
                    continue;
                }
                idx = i;
            }

            if (idx > -1) {
                let obj = this.waitAreaPipeArray[idx];
                this.putObj(obj, mode); // 放回 nodepool
                this.delPipeIdx = idx;
            }
        }

        { // 讓水管圖跟著鼠標移動
            let obj = this.getObj(mode);
            let pipe = obj.pipe;

            this.node.addChild(pipe);

            pipe.position = cc.v2(this.currentX - (this.node.width / 2), this.currenty - (this.node.height / 2));
            pipe.width = this.blockWidth;
            pipe.height = this.blockHeight;

            this.selectedPipe = obj;
        }

        return;
    },

    mouseMove(event) {
        let x = event.getLocationX();
        let y = event.getLocationY();

        this.currentX = x;
        this.currenty = y;

        if (this.selectedPipe == null) {
            return;
        }

        this.selectedPipe.pipe.position = cc.v2(x - (this.node.width / 2), y - (this.node.height / 2));
    },

    /**
     * 參考: https://www.cnblogs.com/fangsmile/p/11642784.html
     * 
     * @param poss      贝塞尔曲线控制点坐标
     * @param precision 精度，需要计算的该条贝塞尔曲线上的点的数目
     * @return 该条贝塞尔曲线上的点（二维坐标）
     */
    //  function bezierCalculate(poss:Array<Point>, precision:number) {
    bezierCalculate(poss, precision) { // 包含頭尾
        precision -= 1;

        //维度，坐标轴数（二维坐标，三维坐标...）
        let dimersion = 2;

        //贝塞尔曲线控制点数（阶数）
        let number = poss.length;

        //控制点数不小于 2 ，至少为二维坐标系
        if (number < 2 || dimersion < 2)
            return null;

        let result = new Array();

        //计算杨辉三角
        let mi = new Array();
        mi[0] = mi[1] = 1;
        for (let i = 3; i <= number; i++) {

            let t = new Array();
            for (let j = 0; j < i - 1; j++) {
                t[j] = mi[j];
            }

            mi[0] = mi[i - 1] = 1;
            for (let j = 0; j < i - 2; j++) {
                mi[j + 1] = t[j] + t[j + 1];
            }
        }

        //计算坐标点
        for (let i = 0; i <= precision; i++) {
            let t = i / precision;
            // let p = new Point(0, 0);
            let p = {
                x: 0,
                y: 0,
            };
            result.push(p);
            for (let j = 0; j < dimersion; j++) {
                let temp = 0.0;
                for (let k = 0; k < number; k++) {
                    temp += Math.pow(1 - t, number - k - 1) * (j == 0 ? poss[k].x : poss[k].y) * Math.pow(t, k) * mi[k];
                }
                j == 0 ? p.x = temp : p.y = temp;
            }
            // p.x = this.toDecimal(p.x);
            // p.y = this.toDecimal(p.y);
        }

        // result.push(poss[poss.length-1])

        return result;
    },

    update(dt) {
        if (this.gameStage != 2) {
            return;
        }

        { // 繪製水管等待區
            let frameStrokeWidth = this.frameStrokeWidth; // 邊框厚度

            let frameWidth = ((this.col + 1) * this.blockWidth) + (frameStrokeWidth * 3);
            let maskWidth = this.blockWidth;
            let maskHeight = this.blockHeight * this.row;
            let maskNodeX = 0 + (frameWidth / 2) - frameStrokeWidth - (this.blockWidth / 2);
            let maskNodeY = 0; //0 + ((this.blockHeight * this.row) / 2);

            if (this.waitAreaMaskNode == null) { // 建立遮罩節點
                this.waitAreaMaskNode = new cc.Node("maskNode");
                this.node.addChild(this.waitAreaMaskNode);

                this.waitAreaMaskNode.width = maskWidth;
                this.waitAreaMaskNode.height = maskHeight;
                this.waitAreaMaskNode.position = cc.v2(maskNodeX, maskNodeY);
                // console.log("maskNode: " + maskNodeX + "," + maskNodeY);

                let mask = this.waitAreaMaskNode.addComponent(cc.Mask); // 增加遮罩組件
                mask.type = cc.Mask.Type.RECT;
                mask.inverted = false;

                { // 隨機放置兩個橫向水管在左右兩側, 設定起點和終點 
                    this.setPipe(0, 0, "N"); // 左上 起點
                    this.setPipe(this.row - 1, this.col - 1, "N"); //右下 終點
                }
            }

            let idx = this.delPipeIdx;
            if (idx >= 0) { // 更新水管位置
                this.delPipeIdx = -1;

                this.waitAreaPipeArray.splice(idx, 1);

                let t = this.pipleDelay; // 水管移動到達指定位置所需的時間
                let self = this;

                for (let i = idx; i < this.waitAreaPipeArray.length; i++) {
                    this.lockWaitArea += 1;

                    let pipe = this.waitAreaPipeArray[i];
                    let targetX = pipe.x;
                    let targetY = pipe.y - this.blockHeight;
                    let delay = ((i - idx) * t);
                    let self = this;

                    let playTween = function(pipe, targetX, targetY) {
                        cc.tween(pipe)
                            .to(t, { position: cc.v2(targetX, targetY) }, { easing: 'sineIn' })
                            .call(() => { self.lockWaitArea -= 1; })
                            .start();
                    }

                    if (delay <= 0) {
                        playTween(pipe, targetX, targetY);
                    } else {
                        pipe.getComponent("block").scheduleOnce(function() { // 每個元件各自計時
                            playTween(pipe, targetX, targetY);
                        }, delay);
                    }
                }
            }

            { // 掉落新的水管
                let currentPipeCount = this.waitAreaPipeArray.length;
                let waitAreaPipeCount = this.row - currentPipeCount; // 等待區缺幾個水管
                if (waitAreaPipeCount > 0) {
                    for (let i = 0; i < waitAreaPipeCount; i++) { // 水管出現由最上面依序處理到最下面
                        this.lockWaitArea += 1;

                        let p = this.randPipeBlock(); // 隨機取出一種水管
                        let pipe = p.pipe;
                        let mode = p.mode;
                        // console.log("pipe: " + pipe);

                        this.waitAreaPipeArray.push(pipe);
                        this.waitAreaMaskNode.addChild(pipe);

                        { // 初始化水管(大小、位置)
                            // 初始位置
                            let srcX = 0;
                            let srcY = 0 + (maskHeight / 2) + (this.blockHeight / 2);

                            // 目標位置位置
                            let targetX = srcX;
                            // let targetY = 0 - (maskHeight / 2) + (this.blockHeight / 2) + (i * this.blockHeight);
                            let targetY = srcY - (waitAreaPipeCount * this.blockHeight) + (i * this.blockHeight);

                            let t = this.pipleDelay; // 水管移動到達指定位置所需的時間
                            // let delay = (i * t); // 幾秒後開始動畫
                            // let delay = ((idx + 1) * t) + (i * t); // 幾秒後開始動畫
                            let delay = (i * t);
                            if (idx >= 0) { // 先等待幾秒, 讓已存在的先往下掉落
                                // let count = this.row - (idx + 1) - 1; // 目前還剩下幾個水管
                                let count = this.row - (idx + 1); // 目前還剩下幾個水管
                                delay = (count * t) + (i * t);
                                // console.log("delay " + delay + ", idx:" + idx);
                            }

                            pipe.position = cc.v2(srcX, srcY);
                            pipe.width = this.blockWidth;
                            pipe.height = this.blockHeight;

                            { // 播放水管掉落動畫
                                let self = this;
                                let playTween = function() {
                                    cc.tween(pipe)
                                        .to(t, { position: cc.v2(targetX, targetY) }, { easing: 'sineIn' })
                                        .call(() => { // 更新水管狀態, 允許玩家使用 
                                            pipe.getComponent('block').initPipe(self, mode);
                                            self.lockWaitArea -= 1;
                                        })
                                        .start();
                                }

                                if (delay <= 0) {
                                    playTween();
                                } else {
                                    // console.log(typeof pipe)
                                    pipe.getComponent("block").scheduleOnce(function() { // 每個元件各自計時
                                        playTween();
                                    }, delay);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.started) { // 繪製水流
            /**
                this.pipePosArray[row][col] = mode 
            */

            /**

            倒數計時完成後, 水流開始流動,
            水開始流動之前, 會先初始化一個格子, 確認起始點, 還有終端路徑, 還有下一個格子預計為哪一個位置和類型

             */

            // ---------------------------
            let changePipe = false; // 是否換下一個水管

            if (this.currenttPipe != null && this.currentPosIdx == this.currentPosArr.length - 1) { // 目前的水管已經跑完
                changePipe = true;
                // console.log("找下一個水管");
            } else if (this.currenttPipe == null) { // 初始化
                changePipe = true;
                this.nextPipe = this.firstPipe;
                // console.log("初始化");
            }

            let changeSuccessful = false;
            if (changePipe) {
                { // 計算下一個 this.nextPipe
                    let nextRow;
                    let nextCol;
                    let currentExit;

                    if (this.currenttPipe == null) {
                        nextRow = -1;
                        nextCol = 0;
                        currentExit = "down";
                    } else {
                        // 下一個水管的 row和 col必須為何
                        nextRow = this.currenttPipe.row;
                        nextCol = this.currenttPipe.col;
                        currentExit = this.currenttPipe.exit;
                    }

                    let nextEntrance; // 下一個水管的入口必須為何

                    switch (currentExit) {
                        case "top":
                            nextRow -= 1;
                            nextEntrance = "down";
                            break;
                        case "down":
                            nextRow += 1;
                            nextEntrance = "top";
                            break;
                        case "left":
                            nextCol -= 1;
                            nextEntrance = "right";
                            break;
                        case "right":
                            nextCol += 1;
                            nextEntrance = "left";
                            break;
                    }

                    // console.log("下一個水管資訊:" + nextRow, nextCol, nextEntrance);

                    if (nextRow >= 0 && nextRow < this.row && nextCol >= 0 && nextCol < this.col) {
                        let vaild = false;

                        let mode = this.pipePosArray[nextRow][nextCol];
                        let entrance = nextEntrance;
                        let exit = "";

                        switch (nextEntrance) {
                            case "top":
                                if (mode == "N" || mode == "UL" || mode == "UR") {
                                    vaild = true;
                                    if (mode == "N") {
                                        exit = "down";
                                    } else if (mode == "UL") {
                                        exit = "left";
                                    } else if (mode == "UR") {
                                        exit = "right";
                                    }
                                }
                                break;
                            case "down":
                                if (mode == "N" || mode == "LL" || mode == "LR") {
                                    vaild = true;
                                    if (mode == "N") {
                                        exit = "top";
                                    } else if (mode == "LL") {
                                        exit = "left";
                                    } else if (mode == "LR") {
                                        exit = "right";
                                    }
                                }
                                break;
                            case "left":
                                if (mode == "E" || mode == "LL" || mode == "UL") {
                                    vaild = true;
                                    if (mode == "E") {
                                        exit = "right";
                                    } else if (mode == "LL") {
                                        exit = "down";
                                    } else if (mode == "UL") {
                                        exit = "top";
                                    }
                                }
                                break;
                            case "right":
                                if (mode == "E" || mode == "LR" || mode == "UR") {
                                    vaild = true;
                                    if (mode == "E") {
                                        exit = "left";
                                    } else if (mode == "LR") {
                                        exit = "down";
                                    } else if (mode == "UR") {
                                        exit = "top";
                                    }
                                }
                                break;
                        }

                        // console.log("確認是否有下一個水管:" + vaild);

                        this.nextPipe = null;

                        if (vaild) {
                            console.log("目前水管更新為:" + nextRow + "," + nextCol);

                            changeSuccessful = true;

                            // this.currenttPipe = this.nextPipe;
                            // this.nextPipe = { row: nextRow, col: nextCol, mode: mode, entrance: entrance, exit: exit };
                            this.currenttPipe = { row: nextRow, col: nextCol, mode: mode, entrance: entrance, exit: exit };
                            this.currentPosIdx = -1;

                            { // 計算 this.currenttPipe的每一個座標寫入到 this.currentPosArr 
                                let frameWidth = ((this.col + 1) * this.blockWidth) + (this.frameStrokeWidth * 3);
                                let frameHeight = (this.row * this.blockHeight) + (this.frameStrokeWidth * 2);

                                let baseX = 0 - (frameWidth / 2) + this.frameStrokeWidth + (this.blockWidth / 2);
                                let baseY = 0 + (frameHeight / 2) - this.frameStrokeWidth - (this.blockHeight / 2);

                                // 水管的中心點
                                let x = baseX + (nextCol * this.blockWidth);
                                let y = baseY - (nextRow * this.blockHeight);

                                let entranceX = x;
                                let entranceY = y;

                                let exitX = x;
                                let exitY = y;

                                let halfWidth = this.blockHeight / 2;
                                let halfHeight = this.blockWidth / 2;

                                switch (entrance) {
                                    case "top":
                                        entranceY += halfHeight;
                                        break;
                                    case "down":
                                        entranceY -= halfHeight;
                                        break;
                                    case "left":
                                        entranceX -= halfWidth;
                                        break;
                                    case "right":
                                        entranceX += halfWidth;
                                        break;
                                }

                                switch (exit) {
                                    case "top":
                                        exitY += halfHeight;
                                        break;
                                    case "down":
                                        exitY -= halfHeight;
                                        break;
                                    case "left":
                                        exitX -= halfWidth;
                                        break;
                                    case "right":
                                        exitX += halfWidth;
                                        break;
                                }

                                // console.log("entrance:" + entrance, ", exit:" + exit);
                                // console.log("entranceX:" + entranceX, ", entranceY:" + entranceY);
                                // console.log("x:" + x, ", y:" + y);
                                // console.log("exitX:" + exitX, ", exitY:" + exitY);

                                var poss = [
                                    { x: entranceX, y: entranceY },
                                    { x: x, y: y },
                                    { x: exitX, y: exitY },
                                ];

                                this.currentPosArr = this.bezierCalculate(poss, this.blockPointCount) // 每個水管包含頭尾共有幾個座標點 
                                this.currentPosArr = this.currentPosArr.slice(1);
                                let arr = this.currentPosArr;
                            }
                        }
                    }
                }
            }

            if (changePipe && !changeSuccessful) {
                let pass = (this.currenttPipe.row == this.row - 1 && this.currenttPipe.col == this.col - 1);
                console.log("過關:" + (pass ? "true" : "false"));
                this.gameState = pass;
                this.stageEnd();
                return;
            }

            { // 計時
                this.tmp += dt;
                if (this.tmp < (this.blockTime / this.blockPointCount)) {
                    return;
                }
                this.tmp = 0;
            }

            // console.log("t  ", this.blockTime, this.blockPointCount, (this.blockTime / this.blockPointCount));

            { // 水流向下一個座標
                if (this.graphicsLineNode == null) { // 初始化路線 Graphics
                    this.graphicsLineNode = new cc.Node("graphicsNode");
                    this.node.addChild(this.graphicsLineNode);

                    this.graphicsLine = this.graphicsLineNode.addComponent(cc.Graphics);

                    // ctx.lineCap = cc.Graphics.LineCap.BUTT; //默认。 向线条的每个末端添加平直的边缘
                    // this.graphicsLine.lineCap = cc.Graphics.LineCap.ROUND; //向线条的每个末端添加圆形线帽
                    // ctx.lineCap = cc.Graphics.LineCap.SQUARE; // 向线条的每个末端添加正方形线帽

                    // this.graphicsLine.lineJoin = cc.Graphics.LineJoin.ROUND; // 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
                    // ctx.lineJoin = cc.Graphics.LineJoin.BEVEL; // 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
                    // ctx.lineJoin = cc.Graphics.LineJoin.MITER; // 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

                    // ctx.miterLimit = 100;

                    // let fillColor = cc.Color.RED; //宣告一個顏色變數
                    // fillColor.a = 200; //新增透明度
                    // this.ctx2.fillColor = fillColor; //填充
                    this.graphicsLine.strokeColor = new cc.Color().fromHEX('#66FFE6');
                    this.graphicsLine.lineWidth = this.lineWidth;

                    let frameWidth = ((this.col + 1) * this.blockWidth) + (this.frameStrokeWidth * 3);
                    let frameHeight = (this.row * this.blockHeight) + (this.frameStrokeWidth * 2);

                    let x = 0 - (frameWidth / 2) + this.frameStrokeWidth + (this.blockWidth / 2);
                    let y = 0 + (frameHeight / 2) - this.frameStrokeWidth; // - (this.blockHeight / 2);

                    this.graphicsLine.moveTo(x, y);
                    this.graphicsLineNode.zIndex = cc.macro.MAX_ZINDEX; // 讓元件顯示在最上層 // XXX
                }

                this.currentPosIdx += 1;
                let pos = this.currentPosArr[this.currentPosIdx];

                console.log("繪製座標索引(" + this.currentPosIdx + ") x:" + pos.x + ", y:" + pos.y); //+ ", " + (new Date()));

                this.graphicsLine.lineTo(pos.x, pos.y);
                this.graphicsLine.stroke();

                {
                    let self = this;
                    let printPoint = function(x, y, fillColor) {
                        // console.log("point: " + x + ", " + y);

                        var name = "circle" + x + "_" + y;
                        var node = new cc.Node(name);
                        self.node.addChild(node);
                        var ctx = node.addComponent(cc.Graphics);
                        ctx.circle(x, y, 3);

                        // let fillColor = cc.Color.RED; //宣告一個顏色變數
                        fillColor.a = 200; //新增透明度
                        ctx.fillColor = fillColor; //填充
                        ctx.strokeColor = new cc.Color().fromHEX('#66FFE6');
                        // ctx.stroke();
                        ctx.fill();
                        return;
                    }

                    // printPoint(pos.x, pos.y, cc.Color.RED);
                    // printPoint(-255, 200, cc.Color.RED);

                    // for (var i = 0; i < arr.length; i++) {
                    //     let color = cc.Color.RED;
                    //     if (i == 0) {
                    //         color = cc.Color.BLUE;
                    //     } else if (i == arr.length - 1) {
                    //         color = cc.Color.GREEN;
                    //     }
                    //     printPoint(arr[i].x, arr[i].y, color);
                    //     // this.graphics.lineTo(arr[i].x, arr[i].y);
                    //     // this.graphics.stroke();
                    // }
                }
            }
        }


    },

    stageWait() { // 等待開始階段 
        this.gameStage = 1;
        this.delPipeIdx = -1;

        this.layoutTitle.active = true;
        this.btnReset.active = false;
        this.labTimeInfo.active = false;
        this.pipePosArray = [];

        this.firstPipe = { row: 0, col: 0, mode: "N", entrance: "top", exit: "down" };
        this.lastPipe = { row: this.row - 1, col: this.col - 1, mode: "N", entrance: "top", exit: "down" };
        this.currenttPipe = null;
        this.nextPipe = null;
        this.currentPosArr = []; // 目前格子裡面有哪耶座標, 由起始點到結束點
        this.currentPosIdx = -1; // 當前 pipe執行到哪一個座標點

        this.started = false;

        if (this.graphicsLineNode != null) {
            this.graphicsLineNode.destroy();
            this.graphicsLine = null;
            this.graphicsLineNode = null;
        }

        // this.unschedule(this.currentTime);
        this.unscheduleAllCallbacks(); // 停止全部計時器

        if (this.resultInfo != null) {
            this.resultInfo.destroy();
            this.resultInfo = null
        }

        { // 清除格子
            for (let i = 0; i < this.graphicsNodeArray.length; i++) {
                this.graphicsNodeArray[i].destroy();
            }
            this.graphicsNodeArray = [];
        }

        { //  格子 nodepool
            for (let i = 0; i < this.blockArray.length; i++) {
                this.blockPool.put(this.blockArray[i])
            }
            this.blockArray = [];
        }

        { // 清除等待區的水管
            for (let i = 0; i < this.waitAreaPipeArray.length; i++) {
                this.waitAreaPipeArray[i].destroy();
            }
            this.waitAreaPipeArray = [];
        }

        { // 等待區的背景
            if (this.waitAreaMaskNode != null) {
                this.waitAreaMaskNode.destroy();
            }
            this.waitAreaMaskNode = null;
        }

        { // 清除被選中的水管
            if (this.selectedPipe != null) {
                this.selectedPipe.pipe.destroy();
            }
            this.selectedPipe = null;
        }

        {
            for (let i = 0; i < this.pipeNodeArray.length; i++) {
                let obj = this.pipeNodeArray[i];
                this.putObj(obj.pipe, obj.mode);
            }
            this.pipeNodeArray = []
        }

        if (this.prefabArrowDownIn != null) {
            this.prefabArrowDownIn.destroy();
            this.prefabArrowDownIn = null;
        }

        if (this.prefabArrowDownOut != null) {
            this.prefabArrowDownOut.destroy();
            this.prefabArrowDownOut = null;
        }
    },

    updateTime() {
        if (this.currentTime <= 0) {
            return;
        }

        this.currentTime -= 1;
        this.labTimeInfo.getComponent(cc.Label).string = this.currentTime + "s";

        if (this.currentTime == 0) {
            this.started = true;
        }
    },

    stagePlaying() { // 遊戲進行中 
        this.gameStage = 2;

        this.lockWaitArea = 0;
        this.layoutTitle.active = false;
        this.btnReset.active = true;
        this.labTimeInfo.active = true;

        let waitAreaBlockMax = this.row; // 等待區最多顯示幾個水管
        let frameStrokeWidth = this.frameStrokeWidth; // 邊框厚度

        { // 初始化計時器
            this.currentTime = this.gameTime + 1;
            this.updateTime();
            this.schedule(this.updateTime,
                1, // 每隔 n秒執行一次
                this.gameTime - 1, // 重複幾次
                1); // 第一次幾秒後才開始執行
        }

        { // 初始化水流路線陣列
            for (let row = 0; row < this.row; row++) {
                let arr = [];
                for (let col = 0; col < this.col; col++) {
                    arr.push(null);
                }
                this.pipePosArray.push(arr);
            }
            this.pipePosArray[0][0] = "N";
            this.pipePosArray[this.row - 1][this.col - 1] = "N";
        }

        { // 繪製邊框
            let frameWidth = ((this.col + 1) * this.blockWidth) + (frameStrokeWidth * 3);
            let frameHeight = (this.row * this.blockHeight) + (frameStrokeWidth * 2);
            let frameX = -(frameWidth / 2);
            let frameY = -(frameHeight / 2);

            { // 箭頭 in
                let x = 0 - (frameWidth / 2) + frameStrokeWidth + (this.blockWidth / 2);
                let y = 0 + (frameHeight / 2) + (this.blockWidth / 2);
                this.prefabArrowDownIn = cc.instantiate(this.prefabArrowDown);
                this.prefabArrowDownIn.position = cc.v2(x, y);
                this.prefabArrowDownIn.width = this.blockWidth * 0.5;
                this.prefabArrowDownIn.height = this.blockHeight * 0.5;

                this.node.addChild(this.prefabArrowDownIn);

                var animState = this.prefabArrowDownIn.getComponent(cc.Animation).play('arrow');
                animState.wrapMode = cc.WrapMode.Loop;
                animState.repeatCount = Infinity;
            }

            { // 箭頭 out
                let x = 0 + (frameWidth / 2) - (frameStrokeWidth * 2) - this.blockWidth - (this.blockWidth / 2);
                let y = 0 - (frameHeight / 2) - (this.blockWidth / 2);
                this.prefabArrowDownOut = cc.instantiate(this.prefabArrowDown);
                this.prefabArrowDownOut.position = cc.v2(x, y);
                this.prefabArrowDownOut.width = this.blockWidth * 0.5;
                this.prefabArrowDownOut.height = this.blockHeight * 0.5;

                this.node.addChild(this.prefabArrowDownOut);

                var animState = this.prefabArrowDownOut.getComponent(cc.Animation).play('arrow');
                animState.wrapMode = cc.WrapMode.Loop;
                animState.repeatCount = Infinity;
            }

            { // 繪製整個遊戲區域
                var node = new cc.Node("FrameNode");
                this.node.addChild(node);
                this.graphicsNodeArray.push(node);

                var ctx = node.addComponent(cc.Graphics);
                ctx.rect(frameX, frameY, frameWidth, frameHeight);

                let fillColor = cc.Color.GRAY;
                fillColor.a = 50;
                ctx.fillColor = fillColor;

                ctx.fill();
            }

            let pipeAreaWidth = this.col * this.blockWidth;
            let pipeAreaHeight = this.row * this.blockHeight;
            let pipeAreaX = frameX + frameStrokeWidth;
            let pipeAreaY = frameY + frameStrokeWidth;

            { // 接水管區
                var node = new cc.Node("PipeAreaNode");
                this.node.addChild(node);
                this.graphicsNodeArray.push(node);

                var ctx = node.addComponent(cc.Graphics);
                ctx.rect(pipeAreaX, pipeAreaY, pipeAreaWidth, pipeAreaHeight);

                let fillColor = cc.Color.GRAY;
                fillColor.a = 50;
                ctx.fillColor = fillColor;

                ctx.fill();
            }

            let waitAreaWidth = this.blockWidth;
            let waitAreaHeight = this.row * this.blockHeight;
            let waitAreaX = frameX + (frameStrokeWidth * 2) + pipeAreaWidth;
            let waitAreaY = frameY + frameStrokeWidth;

            { // 等待區
                var node = new cc.Node("WaitAreaNode");
                this.node.addChild(node);
                this.graphicsNodeArray.push(node);

                var ctx = node.addComponent(cc.Graphics);
                ctx.rect(waitAreaX, waitAreaY, waitAreaWidth, waitAreaHeight);

                let fillColor = cc.Color.GRAY;
                fillColor.a = 50;
                ctx.fillColor = fillColor;

                ctx.fill();
            }

            { // 繪製格子
                // console.log("繪製格子 數量:" + (this.row * this.col));

                let count = this.row * this.col;
                for (let i = 0; i < count; i++) {
                    let block;
                    if (this.blockPool.size() > 0) {
                        block = this.blockPool.get();
                    } else {
                        this.newPipeBlock(this.blockPool, "block", initCount);
                        block = this.blockPool.get();
                    }
                    let row = Math.floor(i / this.col);
                    let col = i % this.col;

                    block.getComponent('block').initBlock(this, "block", row, col);
                    this.blockArray.push(block);
                }

                let idx = -1;
                let baseX = 0 - ((((this.col + 1) * this.blockWidth) + (frameStrokeWidth * 3)) / 2) + ((this.blockWidth) / 2) + frameStrokeWidth; // 最左上角 x
                let baseY = 0 + ((this.blockHeight * this.row) / 2) - (this.blockHeight / 2); // 最左上角 y
                for (let row = 0; row < this.row; row++) {
                    for (let col = 0; col < this.col; col++) {
                        idx += 1;
                        let block = this.blockArray[idx];
                        this.node.addChild(block);

                        let x = baseX + (col * this.blockWidth);
                        let y = baseY - (row * this.blockHeight);
                        block.position = cc.v2(x, y);
                        block.width = this.blockWidth;
                        block.height = this.blockHeight;
                        block.opacity = this.blockOpacity;
                    }
                }
            }
        }
    },

    getGameStage() {
        return this.gameStage;
    },

    stageEnd() { // 遊戲結束 
        this.gameStage = 3;

        this.layoutTitle.active = false;
        this.btnReset.active = true;
        this.labTimeInfo.active = true;

        this.resultInfo = cc.instantiate(this.prefabInfo);
        this.resultInfo.getChildByName("info").getComponent(cc.Label).string = (this.gameState ? "STAGE COMPLETED" : "GAME OVER");

        this.node.addChild(this.resultInfo);
        this.node.position = cc.v2(0, 0);

        // prefabInfo

        this.resultInfo.zIndex = cc.macro.MAX_ZINDEX; // 讓元件顯示在最上層 // XXX

        // STAGE COMPLETED   GAME OVER

        // this.gameState



        { // 清除被選中的水管
            if (this.selectedPipe != null) {
                this.selectedPipe.pipe.destroy();
            }
            this.selectedPipe = null;
        }
    },

    putObj(obj, mode) {
        let pool;
        switch (mode) {
            case "block":
                pool = this.blockPool;
                break;
            case "LL":
                pool = this.blockLLPool;
                break;
            case "LR":
                pool = this.blockLRPool;
                break;
            case "UL":
                pool = this.blockULPool;
                break;
            case "UR":
                pool = this.blockURPool;
                break;
            case "E":
                pool = this.blockEPool;
                break;
            case "N":
                pool = this.blockNPool;
                break;
        }
        pool.put(obj);
    },

    getObj(mode) {
        let self = this;
        let getPipe = function(pool, tag) {
            // console.log("getPipe: " + tag)
            let node;
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                self.newPipeBlock(pool, tag, 1);
                node = pool.get();
            }
            // console.log("return getPipe: node:" + node)
            return node;
        }

        switch (mode) {
            case "LL":
                return { pipe: getPipe(this.blockLLPool, "LL"), mode: "LL" };
            case "LR":
                return { pipe: getPipe(this.blockLRPool, "LR"), mode: "LR" };
            case "UL":
                return { pipe: getPipe(this.blockULPool, "UL"), mode: "UL" };
            case "UR":
                return { pipe: getPipe(this.blockURPool, "UR"), mode: "UR" };
            case "E":
                return { pipe: getPipe(this.blockEPool, "E"), mode: "E" };
            case "N":
                return { pipe: getPipe(this.blockNPool, "N"), mode: "N" };
        }
    },

    randPipeBlock() { // 隨機取出一種水管
        let self = this;
        let getPipe = function(pool, tag) {
            // console.log("getPipe: " + tag)
            let node;
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                self.newPipeBlock(pool, tag, 1);
                node = pool.get();
            }
            // console.log("return getPipe: node:" + node)
            return node;
        }

        let r = Math.floor(Math.random() * 6);
        switch (r) {
            case 0:
                return { pipe: getPipe(this.blockLLPool, "LL"), mode: "LL" };
            case 1:
                return { pipe: getPipe(this.blockLRPool, "LR"), mode: "LR" };
            case 2:
                return { pipe: getPipe(this.blockULPool, "UL"), mode: "UL" };
            case 3:
                return { pipe: getPipe(this.blockURPool, "UR"), mode: "UR" };
            case 4:
                return { pipe: getPipe(this.blockEPool, "E"), mode: "E" };
            case 5:
                return { pipe: getPipe(this.blockNPool, "N"), mode: "N" };
        }
    },

    newPipeBlock(pool, mode, num) {
        for (let i = 0; i < num; i++) {
            let block;
            switch (mode) {
                case "block":
                    block = cc.instantiate(this.prefabBlock);
                    break;
                case "LL":
                    block = cc.instantiate(this.prefabBlockLL);
                    break;
                case "LR":
                    block = cc.instantiate(this.prefabBlockLR);
                    break;
                case "UL":
                    block = cc.instantiate(this.prefabBlockUL);
                    break;
                case "UR":
                    block = cc.instantiate(this.prefabBlockUR);
                    break;
                case "E":
                    block = cc.instantiate(this.prefabBlockE);
                    break;
                case "N":
                    block = cc.instantiate(this.prefabBlockN);
                    break;
            }
            pool.put(block);
        }
    },



    clickPlay() { // 觸發 play
        this.stagePlaying();
    },

    clickReset() { // 觸發 reest
        this.stageWait();
    },
});