local get = require("utils.shaders")
local face_vert = get("face.vert")
local viscous_frag = get("viscous.frag")

local ShaderPass = require("src.ShaderPass")
local Object = require("utils.convertToJSObject")
local THREE = js.global.THREE

return function(simulationProperties)
    local self = ShaderPass(Object{
        material = {
            vertexShader = face_vert,
            fragmentShader = viscous_frag,
            uniforms = {
                boundarySpace = {
                    value = simulationProperties.boundarySpace
                },
                velocity = {
                    value = simulationProperties.src.texture
                },
                velocity_new = {
                    value = simulationProperties.dst_.texture
                },
                v = {
                    value = simulationProperties.viscous,
                },
                px = {
                    value = simulationProperties.cellScale
                },
                dt = {
                    value = simulationProperties.dt
                }
            }
        },

        output = simulationProperties.dst,

        output0 = simulationProperties.dst_,
        output1 = simulationProperties.dst
    })

    self.init()

    self.update = function(viscous, iterations, dt)
        local fbo_in, fbo_out
        self.uniforms.v.value = viscous
        for i = 0, #iterations, 1 do
            if (i % 2 == 0) then
                fbo_in = self.props.output0
                fbo_out = self.props.output1
            else
                fbo_in = self.props.output1
                fbo_out = self.props.output0
            end

            self.uniforms.velocity_new.value = fbo_in.texture
            self.props.output = fbo_out
            self.uniforms.dt.value = dt

            self._update()
        end

        return fbo_out
    end

    print("Viscous.lua initialized")
    return self
end