local window = js.global

local ShaderPass = require("src.ShaderPass")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local PressureFrag = get("pressure.frag")

local Pressure = {}
local PressureMT = {__index = Pressure}

function Pressure:new(simProps)
    local self = ShaderPass:new({
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
    })
    print("pressure new")
    self:init()
    return setmetatable(self, PressureMT)
end

function Pressure:updatePressure(_a)
    local vel = _a.vel
    local pressure = _a.pressure
    self.uniforms.velocity.value = vel.texture
    self.uniforms.pressure.value = pressure.texture
    self:update()
    print("pressure update")
end

return Pressure