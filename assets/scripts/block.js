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
        main: {
            default: null,
            type: cc.Object,
            visible: false,
        },
        mode: { //水管類型
            default: null,
            type: cc.Object,
            visible: false,
        },
        idleBlock: { // 閒置的 block
            default: true,
            // type: cc.Boolean, // XXX
            visible: false,
        },
        row: { //  block row
            default: -1,
            type: cc.Integer,
            visible: false,
        },
        col: { //  block col
            default: -1,
            type: cc.Integer,
            visible: false,
        },
    },

    initPipe(main, mode) {
        this.main = main;
        this.mode = mode;

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.press, this);
    },

    initBlock(main, mode, row, col) {
        this.idleBlock = true;

        this.initPipe(main, mode)
        this.row = row;
        this.col = col;

        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.mouseenter, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseleave, this);
    },

    onDisable() {
        if (this.mode == "block") {
            this.node.off(cc.Node.EventType.MOUSE_ENTER, this.mouseenter, this);
            this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.mouseleave, this);
        }

        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.press, this);
    },

    getMode() {
        return this.mode;
    },

    press() {
        if (this.mode == "block" && this.idleBlock) {
            let ok = this.main.selectBlock(this.row, this.col);
            // console.log("press" + this.row + "," + this.col + ",  ok:" + ok);
            if (ok) {
                this.idleBlock = false;
            }
            return;
        }

        this.main.selectPipe(this);
    },

    mouseenter() {
        if (!this.idleBlock) {
            return
        }
        this.node.color = new cc.color(220, 250, 202);
    },

    mouseleave() {
        this.node.color = new cc.color(255, 255, 255);
    },
});