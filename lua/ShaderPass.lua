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
    self.uniforms = _a.uniforms and not (_a == nil)

    return setmetatable(self, ShaderPassMT)
end

function ShaderPass:init()
    self.scene = Scene()
    self.camera = Camera()
    if (self.uniforms) then
        self.material = RawShaderMaterial(self.props.material)
        self.geometry = PlaneBufferGeometry(2.0, 2.0)
        self.plane = Mesh(self.geometry, self.material)
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

return ShaderPass