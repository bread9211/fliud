return[[
precision highp float;
uniform sampler2D velocity;
varying vec2 uv;

uniform float hue;
uniform float background;
uniform float brightness;

void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    
    vec3 color = vec3(vel.x, vel.y, hue);
    color = mix(vec3(background), color, len);

    gl_FragColor = vec4(color,  brightness);
}
]]