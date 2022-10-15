local get = require("utils.shaders")
local face_vert = get("face.vert")
local line_vert = get("line.vert")
local advection_frag = get("advection.frag")

local ShaderPass = require("src.ShaderPass")
local new = require("utils.new")
local Object = require("utils.convertToJSObject")

local THREE = js.global.THREE

local function Float32Array(array)
    local a = new(js.global.Float32Array)

    for i, v in ipairs(array) do
        a[i-1] = v
    end

    return a
end

return function(simulationProperties)
    local self = ShaderPass(Object({
        material = {
            vertexShader = face_vert,
            fragmentShader = advection_frag,
            uniforms = {
                boundarySpace = {
                    value = simulationProperties.cellScale
                },
                px = {
                    value = simulationProperties.cellScale
                },
                fboSize = {
                    value = simulationProperties.fboSize
                },
                velocity = {
                    value = simulationProperties.src.texture
                },
                dt = {
                    value = simulationProperties.dt
                },
                isBFECC = {
                    value = true
                }
            },
        },
        output = simulationProperties.dst
    }))

    self.init()

    local boundaryG = new(THREE.BufferGeometry)
    local vertices_boundary = Float32Array({
        -- left
        -1, -1, 0,
        -1, 1, 0,

        -- top
        -1, 1, 0,
        1, 1, 0,

        -- right
        1, 1, 0,
        1, -1, 0,

        -- bottom
        1, -1, 0,
        -1, -1, 0
    })

    boundaryG:setAttribute("position", new(THREE.BufferAttribute, vertices_boundary, 3))

    local boundaryM = new(THREE.RawShaderMaterial, Object({
        vertexShader = line_vert,
        fragmentShader = advection_frag,
        uniforms = self.uniforms
    }))

    self.line = new(THREE.LineSegments, boundaryG, boundaryM)
    self.scene:add(self.line)

    self.update = function(dt, isBounce, BFECC)
        self.uniforms.dt.value = dt
        self.line.visible = isBounce
        self.uniforms.isBFECC.value = BFECC

        self._update()
    end

    print("Advection.lua initialized")
    return self
end