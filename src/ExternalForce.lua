local window = js.global
local THREE = window.THREE

local ShaderPass = require("src.ShaderPass")
print("debug1")
local Mouse = require("src.Mouse")
local get = require("utils.shaders")
local MouseVert = get("mouse.vert")
local ExternalForceFrag = get("externalForce.frag")

local PlaneBufferGeometry = THREE.PlaneBufferGeometry
local RawShaderMaterial = THREE.RawShaderMaterial
local AdditiveBlending = THREE.AdditiveBlending
local Vector2 = THREE.Vector2
local Mesh = THREE.Mesh

local ExternalForce = {}

function ExternalForce:new(simProps)
    local self = ShaderPass:new(simProps)
    self:init()

    local mouseG = js.new(PlaneBufferGeometry, 1, 1)
    local mouseM = js.new(RawShaderMaterial, {
        vertexShader = MouseVert,
        fragmentShader = ExternalForceFrag,
        blending = AdditiveBlending,
        uniforms = {
            px = {
                value = simProps.cellScale,
            },
            force = {
                value = js.new(Vector2, 0.0, 0.0),
            },
            center = {
                value = js.new(Vector2, 0.0, 0.0),
            },
            scale = {
                value = js.new(Vector2, simProps.cursor_size, simProps.cursor_size),
            },
        },
    })

    self.mouse = js.new(Mesh, mouseG, mouseM)
    self.scene:add(self.mouse)

    return self
end

function ExternalForce:updateExternalForce(props)
    print("external force update among us")
    for i, v in pairs(self) do
        print(v)
        print("AMONG US")
    end
    print("hi")

    local forceX = (Mouse.diff.x / 2) * props.mouse_force
    local forceY = (Mouse.diff.y / 2) * props.mouse_force
    local cursorSizeX = props.cursor_size * props.cellScale.x
    local cursorSizeY = props.cursor_size * props.cellScale.y
    local centerX = math.min(math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2)
    local centerY = math.min(math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2)

    self.mouse.material.uniforms.force.value:set(forceX, forceY)
    self.mouse.material.uniforms.center.value:set(centerX, centerY)
    self.mouse.material.uniforms.scale.value:set(props.cursor_size, props.cursor_size)

    self:update()
end

print("ExternalForce.lua initialized")
return ExternalForce