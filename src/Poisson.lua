local get = require("utils.shaders")
local face_vert = get("face.vert")
local poisson_frag = get("poisson.frag")

local ShaderPass = require("src.ShaderPass")

return function(simulationProperties)
    local self = ShaderPass({
        material = {
            vertexShader = face_vert,
            fragmentShader = poisson_frag,
            uniforms = {
                boundarySpace = {
                    value = simulationProperties.boundarySpace
                },
                pressure = {
                    value = simulationProperties.dst_.texture
                },
                divergence = {
                    value = simulationProperties.src.texture
                },
                px = {
                    value = simulationProperties.cellScale
                }
            },
        },
        output = simulationProperties.dst,

        output0 = simulationProperties.dst_,
        output1 = simulationProperties.dst
    })

    self.init()

    self.update = function(iterations)
        local p_in, p_out

        for i = 0, #iterations, 1 do
            if(i % 2 == 0) then
                p_in = self.props.output0
                p_out = self.props.output1
            else
                p_in = self.props.output1
                p_out = self.props.output0
            end

            self.uniforms.pressure.value = p_in.texture
            self.props.output = p_out
            self._update()
        end

        return p_out
    end

    print("Poisson.lua initialized")
    return self
end