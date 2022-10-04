local window = js.global

local ShaderPass = require("lua.ShaderPass")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local PoissonFrag = get("poisson.frag")

local Poisson = {}
local PoissonMT = {__index = Poisson}

function Poisson:new(simProps)
    local self = ShaderPass:new({
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
    })

    self:init()
    return setmetatable(self, PoissonMT)
end

function Poisson:updatePoisson(_a)
    local iterations = _a.iterations
    local p_in, p_out
    for i = 0, iterations, 1 do
        local isOdd = (i % 2) == 0
        p_in = isOdd and self.props.output0 or self.props.output1
        p_out = isOdd and self.props.output1 or self.props.output0
        self.uniforms.pressure.value = p_in.texture
        self.props.output = p_out
        self:update()
    end
    
    return p_out
end

return Poisson