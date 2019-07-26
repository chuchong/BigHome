/* 平均值黑白 */
module.exports = 
`
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
varying vec4 v_fragmentColor;
// uniform float time;
uniform vec2 u_textureSize;
uniform vec4 u_beginColor;
uniform vec4 u_endColor;
uniform float u_angle;
uniform float u_offset;
void main()
{

    vec4 texColor = texture2D(CC_Texture0, v_texCoord);
    float angleInRadians = radians(u_angle); 
    float ratio = clamp(v_texCoord.y * cos(angleInRadians) + v_texCoord.x * sin(angleInRadians) + u_offset, 0.0, 1.0);
    float beginRatio = 1.0 - ratio;
    float endRatio = ratio;
    gl_FragColor = vec4(
        texColor.r * (u_beginColor.r * beginRatio + u_endColor.r * endRatio),
        texColor.g * (u_beginColor.g * beginRatio + u_endColor.g * endRatio),
        texColor.b * (u_beginColor.b * beginRatio + u_endColor.b * endRatio),
        texColor.a * (u_beginColor.a * beginRatio + u_endColor.a * endRatio)
    );
}
`