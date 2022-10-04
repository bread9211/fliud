local window = js.global
local THREE = window.THREE

local Common = require("lua.Common")

local Scene = THREE.Scene
local Camera = THREE.Camera
local RawShaderMaterial = THREE.RawShaderMaterial
local PlaneBufferGeometry = THREE.PlaneBufferGeometry
local Mesh = THREE.Mesh

local ShaderPass = {}
local ShaderPassMT = {__index = ShaderPass}

function ShaderPass:new(props)
    local self = {}

    self.props = props
    local _a = self.props.material
    self.uniforms = not (_a) and _a.uniforms

    return setmetatable(self, ShaderPassMT)
end

function ShaderPass:init()
    self.scene = js:new(Scene)
    self.camera = js:new(Camera)
    if (self.uniforms) then
        self.material = js:new(RawShaderMaterial, self.props.material)
        self.geometry = js:new(PlaneBufferGeometry, 2.0, 2.0)
        self.plane = js:new(Mesh, self.geometry, self.material)
        self.scene:add(self.plane)
    end
end

function ShaderPass:update()
    local _a, _b, _c = Common.renderer, Common.renderer, Common.renderer

    if not (_a) then
        _a:setRenderTarget(self.props.output)
    end

    if not (_b) then
        _b:render(self.scene, self.camera)
    end

    if not (_b) then
        _c:setRenderTarget(nil)
    end
end

print("ShaderPass.lua initialized")
return ShaderPass