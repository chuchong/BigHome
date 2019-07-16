/**
 * 自定义材质
 */

const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;
var MaterialMgr = require("MaterialMgr");
var ColorMaterial = (function (Material$$1) {
	function ColorMaterial(shaderName, params, defines) {
		Material$$1.call(this, false);

		var pass = new renderer.Pass(shaderName);
		pass.setDepth(false, false);
		pass.setCullMode(gfx.CULL_NONE);
		pass.setBlend(
			gfx.BLEND_FUNC_ADD,
			gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
			gfx.BLEND_FUNC_ADD,
			gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
		);

		var techParams = [
			{ name: 'texture', type: renderer.PARAM_TEXTURE_2D },
			{ name: 'color', type: renderer.PARAM_COLOR4 },
			{ name: 'beginColor', type: renderer.PARAM_COLOR4 },
			{ name: 'endColor', type: renderer.PARAM_COLOR4 },
			{ name: 'angle', type: renderer.PARAM_FLOAT },
			{ name: 'offset', type: renderer.PARAM_FLOAT },
			{ name: 'uvRatio', type: renderer.PARAM_FLOAT },
		];
		if (params) {
			techParams = techParams.concat(params);
		}
		var mainTech = new renderer.Technique(
			['transparent'],
			techParams,
			[pass]
		);

		this.name = shaderName;
		
        this._color = { r: 1, g: 1, b: 1, a: 1 };
        this._beginColor = {r: 1, g: 1, b: 1, a: 1};
        this._endColor = {r: 1, g: 1, b: 1, a: 1};
        this._angle = 0;
        this._offset = 0;
        this._uvRatio = 0;

		this._effect = new renderer.Effect(
			[ mainTech ],
            {
            	'color': this._color,
            	'beginColor': this._beginColor,
            	'endColor': this._endColor,
            	'angle': this._angle,
            	'offset': this._offset,
            	'uvRatio': this._uvRatio,
            },
			defines,
        );
        this._texture = null;

		this._mainTech = mainTech;
	}

	// if (Material$$1) ColorMaterial.__proto__ = Material$$1;
	// ColorMaterial.prototype = Object.create(Material$$1 && Material$$1.prototype);
    // ColorMaterial.prototype.constructor = ColorMaterial;
    cc.js.extend(ColorMaterial, Material$$1);

	var prototypeAccessors = { 
        effect:  { configurable: true }, 
        texture: { configurable: true }, 
        color:   { configurable: true },
        offset:   { configurable: true },
        uvRatio:   { configurable: true },
        angle:   { configurable: true },
        beginColor:   { configurable: true },
        endColor:   { configurable: true },
    };

	prototypeAccessors.effect.get = function () {
		return this._effect;
	};

	prototypeAccessors.texture.get = function () {
		return this._texture;
	};

	prototypeAccessors.texture.set = function (val) {
		if (this._texture !== val) {
			this._texture = val;
			this._effect.setProperty('texture', val.getImpl());
			this._texIds['texture'] = val.getId();
		}
	};	
	prototypeAccessors.angle.get = function () {
		return this._angle;
	};

	prototypeAccessors.angle.set = function (val) {
		this._angle = val;
		this._effect.setProperty('angle', val);
	};
	prototypeAccessors.offset.get = function () {
		return this._offset;
	};

	prototypeAccessors.offset.set = function (val) {
		this._offset = val;
		this._effect.setProperty('offset', val);
	};
	prototypeAccessors.uvRatio.get = function () {
		return this._uvRatio;
	};

	prototypeAccessors.uvRatio.set = function (val) {
		this._uvRatio = val;
		this._effect.setProperty('uvRatio', val);
	};

	prototypeAccessors.color.get = function () {
		return this._color;
	};

	prototypeAccessors.color.set = function (val) {
		var color = this._color;
		color.r = val.r / 255;
		color.g = val.g / 255;
		color.b = val.b / 255;
		color.a = val.a / 255;
		this._effect.setProperty('color', color);
	};
	prototypeAccessors.beginColor.get = function () {
		return this._beginColor;
	};

	prototypeAccessors.beginColor.set = function (val) {
		var beginColor = this._beginColor;
		beginColor.r = val.r / 255;
		beginColor.g = val.g / 255;
		beginColor.b = val.b / 255;
		beginColor.a = val.a / 255;
		this._effect.setProperty('beginColor', beginColor);
	};	
	prototypeAccessors.endColor.get = function () {
		return this._endColor;
	};

	prototypeAccessors.endColor.set = function (val) {
		var endColor = this._endColor;
		endColor.r = val.r / 255;
		endColor.g = val.g / 255;
		endColor.b = val.b / 255;
		endColor.a = val.a / 255;
		this._effect.setProperty('endColor', endColor);
	};
	

	ColorMaterial.prototype.clone = function clone() {
		var copy = new ColorMaterial();
		copy.texture = this.texture;
		copy.color = this.color;
		copy.beginColor = this.beginColor;
		copy.endColor = this.endColor;
		copy.offset = this.offset;
		copy.angle = this.angle;
		copy.uvRatio = this.uvRatio;
		copy.updateHash();
		return copy;
	};

	// 设置自定义参数的值
	ColorMaterial.prototype.setParamValue = function (name, value) {
		this._effect.setProperty(name, value);
    };
   
    // 获取自定义参数的值
    ColorMaterial.prototype.getParamValue = function (name) {
		return this._effect.getProperty(name);
	};

	// 设置定义值
	ColorMaterial.prototype.setDefine = function (name, value) {
		this._effect.define(name, value);
	};

	Object.defineProperties(ColorMaterial.prototype, prototypeAccessors);

	return ColorMaterial;
}(Material));

MaterialMgr.addShader({
	name: "shader_color",
	vert: 
	`
		uniform mat4 viewProj;
		attribute vec3 a_position;
		attribute mediump vec2 a_uv0;
		varying mediump vec2 uv0;
		void main () {
		  vec4 pos = viewProj * vec4(a_position, 1);
		  gl_Position = pos;
		  uv0 = a_uv0;
		}
	`,
	frag: 
	`
		uniform sampler2D texture;
		varying mediump vec2 uv0;
		uniform lowp vec4 color;
		uniform lowp vec4 beginColor;
		uniform lowp vec4 endColor;
		uniform float angle;
		uniform float offset;
		uniform float uvRatio;
		void main () {
			// vec4 c = color * texture2D(texture, uv0);
			// float gray = 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
			// gl_FragColor = vec4(gray, gray, gray, c.a);

			vec4 texColor = color * texture2D(texture, uv0);
			// vec4 beginColor = vec4(1.0, 1.0, 1.0, 1.0);
			// vec4 endColor = vec4(0.0, 1.0, 0.0, 1.0);
			float angleInRadians = radians(angle); 
			float ratio = clamp((uv0.y * cos(angleInRadians) + uv0.x * sin(angleInRadians) + offset) * uvRatio, 0.0, 1.0);
			float beginRatio = 1.0 - ratio;
			float endRatio = ratio;

			gl_FragColor = vec4(
		        texColor.r * (beginColor.r * beginRatio + endColor.r * endRatio),
		        texColor.g * (beginColor.g * beginRatio + endColor.g * endRatio),
		        texColor.b * (beginColor.b * beginRatio + endColor.b * endRatio),
		        texColor.a * (beginColor.a * beginRatio + endColor.a * endRatio)
		    );
		}
	`,
});

module.exports = ColorMaterial;