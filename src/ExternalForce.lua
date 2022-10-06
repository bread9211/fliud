local window = js.global
local THREE = window.THREE

local Common = require("src.Common")
local Object = require("utils.convertToJSObject")

local Mouse = require("src.Mouse")
local get = require("utils.shaders")
local Object = require("utils.convertToJSObject")
local MouseVert = get("mouse.vert")
local ExternalForceFrag = get("externalForce.frag")

local PlaneBufferGeometry = THREE.PlaneBufferGeometry
local AdditiveBlending = THREE.AdditiveBlending
local Vector2 = THREE.Vector2
local Scene = THREE.Scene
local Camera = THREE.Camera
local RawShaderMaterial = THREE.RawShaderMaterial
local PlaneGeometry = THREE.PlaneGeometry
local Mesh = THREE.Mesh

local ExternalForce = {}
local ExternalForceMT = {__index = ExternalForce}

function ExternalForce:new(simProps)
    local self = {}

    self.props = simProps

    local _a = self.props.material
    if (_a) then
        self.uniforms = _a.uniforms
    end

    self.scene = js.new(Scene)
    self.camera = js.new(Camera)
    if (self.uniforms) then
        self.material = js.new(RawShaderMaterial, Object(self.props.material))
        self.geometry = js.new(PlaneGeometry, 2.0, 2.0)
        self.plane = js.new(Mesh, self.geometry, self.material)
        self.scene:add(self.plane)
    end

    local mouseG = js.new(PlaneBufferGeometry, 1, 1)

    local params = {
        vertexShader = MouseVert,
        fragmentShader = ExternalForceFrag,
        blending = AdditiveBlending,
        uniforms = Object({
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
        })
    }
    -- print(params.uniforms.force.value)
    -- for i, v in pairs(params) do
    --     print(i, v)
    -- end
    -- print("test")
    local mouseM = js.new(RawShaderMaterial, Object(params))

    self.mouse = js.new(Mesh, mouseG, mouseM)
    self.scene:add(self.mouse)

    return setmetatable(self, ExternalForceMT)
end

function ExternalForce:updateExternalForce(props)
    local forceX = (Mouse.diff.x / 2) * props.mouse_force
    local forceY = (Mouse.diff.y / 2) * props.mouse_force
    local cursorSizeX = props.cursor_size * props.cellScale.x
    local cursorSizeY = props.cursor_size * props.cellScale.y
    local centerX = math.min(math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2)
    local centerY = math.min(math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2)

    -- print(self)
    local uniforms = self.mouse.material.uniforms
    -- for i, v in pairs(self.mouse.material) do
    --     if (i == "uniforms") then
    --         print(#v)
    --     end
    -- end
    uniforms.force.value:set(forceX, forceY)
    uniforms.center.value:set(centerX, centerY)
    uniforms.scale.value:set(props.cursor_size, props.cursor_size)

    local renderer = Common.renderer

    if (renderer) then
        renderer:setRenderTarget(self.props.output)
        renderer:render(self.scene, self.camera)
        renderer:setRenderTarget(nil)

        print("ExternalForceFrag:updateExternalForce()")
    end
end

print("ExternalForce.lua initialized")
return ExternalForce