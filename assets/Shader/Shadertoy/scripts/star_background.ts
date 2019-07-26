// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;

import ShaderAssembler, { default_vert, default_frag_prefix, default_frag_postfix } from './ShaderAssembler';


@ccclass
export default class Test extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    _start = 0;
    rand = 0;
    zoom = false;
    zoom_scale = 0.80;
    distfading = 0.73;
    distfading_max = 2.0;
    zoom_start_time = null;
    // 这个时间需要和场景变暗的时间相同
    zoom_dure_time = 1.5;
    mat = null;
    freq = 10;
    counter = 0;

    start() {
        //this.sprite = cc.find("background")
        //cc.game.addPersistRootNode(this.node);
        this._start = Date.now();
        this.rand = Math.random() * 1000;
        var name = 'star_background';

        var self = this;
        cc.loader.loadRes('shader/' + name, function (err, data) {
            let shader_assembler = self.sprite.node.getComponent(ShaderAssembler);
            shader_assembler.registerFragShaderTemplate(
                name,
                default_vert,
                default_frag_prefix + data.text + default_frag_postfix
                ,
                [
                    { name: 'use2DPos' },
                    { name: 'useModel' },
                ]);
            let mat = shader_assembler.createCustomMaterial(
                name,
                [
                    { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
                    { name: 'iTime', type: renderer.PARAM_FLOAT },
                ],
                [
                    { name: 'use2DPos', value: 'true' },
                    { name: 'useModel', value: 'false' }
                ]
            )
            let iResolution = new cc.Vec3(
                self.sprite.node.width / 2,
                self.sprite.node.height / 2,
                10
            );
            shader_assembler.activateCustomMaterial(self.sprite, mat)
            mat.setParamValue("iResolution", iResolution);
        });
    }

    startZoom() {
        this.zoom = true;
        this.zoom_start_time = Date.now();
    }

    update() {
        if (!this.mat) {
            this.mat = this.sprite.node.getComponent(ShaderAssembler).currentMaterial;
            if (!this.mat){
                return;
            }
        }
        const now = Date.now();
        const time = (now - this._start) / 1000 + this.rand;
        this.mat.setParamValue("iTime", time);
    }
}
