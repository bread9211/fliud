local face_vert = "./glsl/sim/face.vert"
local divergence_frag = "./glsl/sim/divergence.frag"

local ShaderPass = require("src.ShaderPass")

return function(simProps)
    local self = ShaderPass({
        material = {
            vertexShader = face_vert,
            fragmentShader = divergence_frag,
            uniforms = {
                boundarySpace = {
                    value = simProps.boundarySpace
                },
                velocity = {
                    value = simProps.src.texture
                },
                px = {
                    value = simProps.cellScale
                },
                dt = {
                    value = simProps.dt
                }
            }
        },
        output = simProps.dst
    })

    self.init()

    self.update = function(vel)
        self.uniforms.velocity.value = vel.texture
        self._update()
    end
end