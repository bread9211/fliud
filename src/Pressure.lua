local window = js.global
local THREE = window.THREE

local Common = require("src.Common")

local Scene = THREE.Scene
local Camera = THREE.Camera
local RawShaderMaterial = THREE.RawShaderMaterial
local PlaneGeometry = THREE.PlaneGeometry
local Mesh = THREE.Mesh

local get = require("utils.shaders")
local Object = require("utils.convertToJSObject")
local FaceVert = get("face.vert")
local PressureFrag = get("pressure.frag")

local Pressure = {}
local PressureMT = {__index = Pressure}

function Pressure:new(simProps)
    local self = {}

    self.props = {
        material = {
            vertexShader = FaceVert,
            fragmentShader = PressureFrag,
            uniforms = {
                boundarySpace = {
                    value = simProps.boundarySpace,
                },
                pressure = {
                    value = simProps.src_p.texture,
                },
                velocity = {
                    value = simProps.src_v.texture,
                },
                px = {
                    value = simProps.cellScale,
                },
                dt = {
                    value = simProps.dt,
                },
            },
        },
        output = simProps.dst,
    }

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
    return setmetatable(self, PressureMT)
end

function Pressure:updatePressure(_a1)
    local vel = _a1.vel
    local pressure = _a1.pressure
    self.uniforms.velocity.value = vel.texture
    self.uniforms.pressure.value = pressure.texture

    local renderer = Common.renderer

    if (renderer) then
        renderer.setRenderTarget(self.props.output)
        print(self.props.output)
        renderer:render(self.scene, self.camera)
        renderer.setRenderTarget(nil)

        -- print("Pressure:updatePressure()")
    end
end

print("Pressure.lua initialized")
return Pressure