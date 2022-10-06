local window = js.global
local THREE = window.THREE

local Common = require("src.Common")

local get = require("utils.shaders")
local Object = require("utils.convertToJSObject")
local FaceVert = get("face.vert")
local DivergenceFrag = get("divergence.frag")

local Scene = THREE.Scene
local Camera = THREE.Camera
local RawShaderMaterial = THREE.RawShaderMaterial
local PlaneGeometry = THREE.PlaneGeometry
local Mesh = THREE.Mesh

local Divergence = {}
local DivergenceMT = {__index = Divergence}

function Divergence:new(simProps)
    local self = {}

    self.props = {
        material = {
            vertexShader = FaceVert,
            fragmentShader = DivergenceFrag,
            uniforms = {
                boundarySpace = {
                    value = simProps.boundarySpace,
                },
                velocity = {
                    value = simProps.src.texture,
                },
                px = {
                    value = simProps.cellScale,
                },
                dt = {
                    value = simProps.dt,
                },
            },
        }, 
        output = simProps.dst
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
    return setmetatable(self, DivergenceMT)
end

function Divergence:updateDivergence(_a)
    local vel = _a.vel;
    if (self.uniforms) then
        self.uniforms.velocity.value = vel.texture;
    end
    
    local renderer = Common.renderer

    if (renderer) then
        renderer:setRenderTarget(self.props.output)
        renderer:render(self.scene, self.camera)
        renderer:setRenderTarget(nil)

        print("Divergence:updateDivergence()")
    end
end

print("Divergence.lua initialized")
return Divergence