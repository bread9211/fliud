local window = js.global

local ShaderPass = require("lua.ShaderPass")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local ViscousFrag = get("viscous.frag")

local Viscous = {}
local ViscousMT = {__index = Viscous}

function Viscous:new(simProps)
    local self = ShaderPass:new({
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
    })

    self:init()
    return setmetatable(self, ViscousMT)
end

function Viscous:updateViscous(_a)
    local viscous = _a.viscous
    local iterations = _a.iterations
    local dt = _a.dt
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
        if (!!fbo_in and self.uniforms) then
            self.uniforms.dt.value = dt
        end
        self:update()
    end
    return exportedFboOut
end

return Viscous