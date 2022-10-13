local get = require("utils.shaders")
local face_vert = get("face.vert")
local divergence_frag = get("divergence.frag")

local ShaderPass = require("src.ShaderPass")
local Object = require("utils.convertToJSObject")

return function(simulationProperties)
    local self = ShaderPass(Object({
        material = {
            vertexShader = face_vert,
            fragmentShader = divergence_frag,
            uniforms = {
                boundarySpace = {
                    value = simulationProperties.boundarySpace
                },
                velocity = {
                    value = simulationProperties.src.texture
                },
                px = {
                    value = simulationProperties.cellScale
                },
                dt = {
                    value = simulationProperties.dt
                }
            }
        },
        output = simulationProperties.dst
    }))

    self.init()

    self.update = function(vel)
        self.uniforms.velocity.value = vel.texture
        self._update()
    end

    return self
end