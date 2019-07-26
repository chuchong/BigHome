/**
 * wx api: https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
 */
cc.Class({
    extends: cc.Component,

    properties: {
        wxSubContextView: cc.Node,

        avatar: cc.Sprite,

        background: cc.Node,
    },

    start () {
        this.initAction();
        this.initUserInfoButton();
    },

    initAction () {
        this._isShow = false;
        let size = cc.winSize;
        this._showAction = cc.moveTo(0.5, this.wxSubContextView.x, 0);
        this._hideAction = cc.moveTo(0.5, this.wxSubContextView.x, Math.floor(size.height));

        this.wxSubContextView.runAction(this._hideAction);

        this.background.on('touchstart', this.onClick, this);
    },

    initUserInfoButton () {
        if (typeof wx === 'undefined') {
            return;
        }

        let systemInfo = wx.getSystemInfoSync();
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 30,
                top: 30,
                width: 100,
                height: 100,
                lineHeight: 40,
                backgroundColor: '#00000000',
                color: '#00000000',
                textAlign: 'center',
                fontSize: 10,
                borderRadius: 50
            }
        });

        button.onTap((res) => {
            let userInfo = res.userInfo;
            if (!userInfo) {
                return;
            }

            this.onClick()

            button.hide();
            button.destroy();

        });
    },

    onClick () {
        this._isShow = !this._isShow;
        if (this._isShow) {
            this.wxSubContextView.runAction(this._showAction);
        }
        else {
            this.wxSubContextView.runAction(this._hideAction);
        }
    },
});
