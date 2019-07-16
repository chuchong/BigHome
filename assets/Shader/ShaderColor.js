//borrow from https://forum.cocos.com/t/shader/70528
var _default_vert = require("../Shaders/ccShader_Default_Vert.js");
var _gaussian_blur_frag = require("../Shaders/ccShader_Color");
var ColorMaterial = require("ColorMaterial");
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

var ShaderColor = cc.Class({
    extends: cc.Component,

    properties: {
        angle: {
            default: 0,
            tooltip: "角度值 0 ~ 360"
        },
        offset: {
            default: 0,
            tooltip: "偏移值 -1 ~ 1"
        },
        beginColor: cc.color("#ffffff"),
        endColor: cc.color("#ff0000"),
        uvRatio: {
            default: 0,
            tooltip: "UV比例，默认为0。如果是Label则会自动设置为1，如果是Sprite则自动设置为10。如果非0则使用该值"
        },
    },

    onLoad: function () {
        this.orignalColor = this.node.color;
    },
    onEnable() {
        this.apply();
    },
    onDisable() {
        
    },
    resetUseCount() {
        // 此处不解为何要三帧之后才有效
        this.willUseCount = 3;
    },
    recover() {
        this.resetUseCount();
        this.parameters={
            beginColor: {
                r: this.orignalColor.r,
                g: this.orignalColor.g,
                b: this.orignalColor.b,
                a: this.orignalColor.a,
            },
            endColor: {
                r: this.orignalColor.r,
                g: this.orignalColor.g,
                b: this.orignalColor.b,
                a: this.orignalColor.a,
            },
            offset: this.offset,
            angle: this.angle,
        };
        this._use();
    },
    apply() {
        this.resetUseCount();
        this.parameters={
            beginColor: {
                r: this.beginColor.r,
                g: this.beginColor.g,
                b: this.beginColor.b,
                a: this.beginColor.a,
            },
            endColor: {
                r: this.endColor.r,
                g: this.endColor.g,
                b: this.endColor.b,
                a: this.endColor.a,
            },
            offset: this.offset,
            angle: this.angle,
        };
        this._use();
    },
    
    update: function(dt){
        if (this.willUseCount > 0) {
            this._use();
        }
    },
    _use: function()
    {
        if (CC_EDITOR) {
            return;
        }
        var targetTexture = null;
        var targetComponent = null;

        targetComponent = this.getComponent(cc.Label);
        if (targetComponent) {
            targetTexture = targetComponent._texture;
        } else {
            targetComponent = this.getComponent(cc.Sprite);
            if (targetComponent) {
                targetTexture = targetComponent.spriteFrame && targetComponent.spriteFrame._texture;
            }
        }
        if (targetComponent && targetTexture) {
            if (!this._customMaterial) {
                this._customMaterial = new ColorMaterial("shader_color");
            }
            if (this.uvRatio) {
                this.parameters.uvRatio = this.uvRatio;
            } else {
                if (targetComponent instanceof cc.Label) {
                    this.parameters.uvRatio = 1.0;
                    this.willUseCount = 1;
                } else {
                    this.parameters.uvRatio = 10.0;
                }
            }
            this._customMaterial.beginColor = this.parameters.beginColor;
            this._customMaterial.endColor = this.parameters.endColor;
            this._customMaterial.offset = this.parameters.offset;
            this._customMaterial.angle = this.parameters.angle;
            this._customMaterial.uvRatio = this.parameters.uvRatio;
            if (this._customMaterial.texture !== targetTexture) {
                this._customMaterial.texture = targetTexture;
                targetComponent._updateMaterial(this._customMaterial);
            }
            else if (this._customMaterial !== targetComponent._material) {
                targetComponent._updateMaterial(this._customMaterial);
            }
            if (targetComponent._renderData) {
                targetComponent._renderData.material = this._customMaterial;
            }
            targetComponent.markForUpdateRenderData(true);
            targetComponent.markForRender(true);
            --this.willUseCount;
        }
    },
});





module.exports = ShaderColor;



