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
local ViscousFrag = get("viscous.frag")

local Viscous = {}
local ViscousMT = {__index = Viscous}

function Viscous:new(simProps)
    local self = {}

    self.props = {
        material = {
            vertexShader = FaceVert,
            fragmentShader = ViscousFrag,
            uniforms = {
                boundarySpace = {
                    value = simProps.boundarySpace,
                },
                velocity = {
                    value = simProps.src.texture,
                },
                velocity_new = {
                    value = simProps.dst_.texture,
                },
                v = {
                    value = simProps.viscous,
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
        output0 = simProps.dst_,
        output1 = simProps.dst,
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
    
    return setmetatable(self, ViscousMT)
end

function Viscous:updateViscous(_a1)
    local viscous = _a1.viscous
    local iterations = _a1.iterations
    local dt = _a1.dt
    local exportedFboOut = (iterations - 1) % 2 == 0 and self.props.output1 or self.props.output0
    if (self.uniforms) then
        self.uniforms.v.value = viscous
    end
    for i = 0, iterations, 1 do
        local isOdd = i % 2 == 0
        local fbo_in = isOdd and self.props.output0 or self.props.output1
        local fbo_out = isOdd and self.props.output1 or self.props.output0
        if (self.uniforms) then
            self.uniforms.velocity_new.value = fbo_in.texture
        end
        self.props.output = fbo_out
        if (fbo_in and self.uniforms) then
            self.uniforms.dt.value = dt
        end

        local renderer = Common.renderer

        if (renderer) then
            renderer.setRenderTarget(self.props.output)
            print(self.props.output)
            renderer:render(self.scene, self.camera)
            renderer.setRenderTarget(nil)

            -- print("Viscous:updateViscous()")
        end
    end
    return exportedFboOut
end

print("Viscous.lua initialized")
return Viscous