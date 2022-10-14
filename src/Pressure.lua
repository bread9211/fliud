local get = require("utils.shaders")
local face_vert = get("face.vert")
local pressure_frag = get("pressure.frag")
local ShaderPass = require("src.ShaderPass")
local Object = require("utils.convertToJSObject")

return function(simulationProperties)
    local self = ShaderPass(Object({
        material = {
            vertexShader = face_vert,
            fragmentShader = pressure_frag,
            uniforms = {
                boundarySpace = {
                    value = simulationProperties.boundarySpace
                },
                pressure = {
                    value = simulationProperties.src_p.texture
                },
                velocity = {
                    value = simulationProperties.src_v.texture
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
    print(self.uniforms.velocity.value)

    self.init()

    self.update = function(vel, pressure)
        self.uniforms.velocity.value = vel.texture
        self.uniforms.pressure.value = pressure.texture
        self._update()
    end

    print("Pressure.lua initialized")
    return self
end