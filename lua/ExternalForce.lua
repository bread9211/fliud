local window = js.global
local THREE = window.THREE

local ShaderPass = require("lua.ShaderPass")
local Mouse = require("lua.Mouse")

local get = require("utils.shaders")
local MouseFrag = get("mouse.frag")
local ExternalForceFrag = get("externalForce.frag")

local PlaneBufferGeometry = THREE.PlaneBufferGeometry;
local RawShaderMaterial = THREE.RawShaderMaterial;
local AdditiveBlending = THREE.AdditiveBlending;
local Vector2 = THREE.Vector2;
local Mesh = THREE.Mesh;

local ExternalForce = {}
local ExternalForceMT = {__index = ExternalForce}

function ExternalForce:new(simProps)
    local self = ShaderPass:new(simProps)
    ShaderPass.init(self)

    local mouseG = PlaneBufferGeometry(1, 1);
    local mouseM = RawShaderMaterial({
        vertexShader = MouseFrag,
        fragmentShader = ExternalForceFrag,
        blending = AdditiveBlending,
        uniforms = {
            px = {
                value = simProps.cellScale,
            },
            force = {
                value = js:new(Vector2(0.0, 0.0)),
            },
            center = {
                value = js:new(Vector2(0.0, 0.0)),
            },
            scale = {
                value = js:new(Vector2(simProps.cursor_size, simProps.cursor_size)),
            },
        },
    });

    self.mouse = js:new(Mesh, mouseG, mouseM);
    self.scene:add(self.mouse);

    return setmetatable(self, ExternalForceMT);
end

function ExternalForce:updateExternalForce(props)
    local forceX = (Mouse.diff.x / 2) * props.mouse_force;
    local forceY = (Mouse.diff.y / 2) * props.mouse_force;
    local cursorSizeX = props.cursor_size * props.cellScale.x;
    local cursorSizeY = props.cursor_size * props.cellScale.y;
    local centerX = math.min(math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2);
    local centerY = math.min(math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2);
    local uniforms = self.mouse.material.uniforms;

    uniforms.force.value:set(forceX, forceY);
    uniforms.center.value:set(centerX, centerY);
    uniforms.scale.value:set(props.cursor_size, props.cursor_size);

    ShaderPass.update(self);
end

print("ExternalForce.lua initialized")
return ExternalForce