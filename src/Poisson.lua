local window = js.global
local THREE = window.THREE

local Common = require("src.Common")

local get = require("utils.shaders")
local Object = require("utils.convertToJSObject")
local FaceVert = get("face.vert")
local PoissonFrag = get("poisson.frag")

local Scene = THREE.Scene
local Camera = THREE.Camera
local RawShaderMaterial = THREE.RawShaderMaterial
local PlaneGeometry = THREE.PlaneGeometry
local Mesh = THREE.Mesh

local Poisson = {}
local PoissonMT = {__index = Poisson}

function Poisson:new(simProps)
    local self = {}

    self.props = {
        material = {
            vertexShader = FaceVert,
            fragmentShader = PoissonFrag,
            uniforms = {
                boundarySpace = {
                    value = simProps.boundarySpace,
                },
                pressure = {
                    value = simProps.dst_.texture,
                },
                divergence = {
                    value = simProps.src.texture,
                },
                px = {
                    value = simProps.cellScale,
                },
            },
        },
        output = simProps.dst,
        output0 = simProps.dst_,
        output1 = simProps.dst
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

    return setmetatable(self, PoissonMT)
end

function Poisson:updatePoisson(_a1)
    local iterations = _a1.iterations
    local p_in, p_out
    for i = 0, iterations, 1 do
        local isOdd = (i % 2) == 0
        p_in = isOdd and self.props.output0 or self.props.output1
        p_out = isOdd and self.props.output1 or self.props.output0
        self.uniforms.pressure.value = p_in.texture
        self.props.output = p_out

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
    
    return p_out
end

return Poisson