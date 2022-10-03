local ShaderPass = require("lua.ShaderPass")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local DivergenceFrag = get("divergence.frag")

local Divergence = {}
local DivergenceMT = {__index = Divergence}

function Divergence:new(simProps)
    local self = ShaderPass:new({
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
    })

    self:init()
    return setmetatable(self, DivergenceMT)
end

function Divergence:updateDivergence(_a)
    local vel = _a.vel;
    if (self.uniforms) then
        self.uniforms.velocity.value = vel.texture;
    end
    self:update();
end

print("Divergence.lua initialized")
return Divergence