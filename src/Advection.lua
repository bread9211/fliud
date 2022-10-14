local get = require("utils.shaders")
local face_vert = get("face.vert")
local line_vert = get("line.vert")
local advection_frag = get("advection.frag")

local ShaderPass = require("src.ShaderPass")
local new = require("utils.new")
local Object = require("utils.convertToJSObject")

local THREE = js.global.THREE

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

    local boundaryG = new(THREE.PlaneBufferGeometry)
    local vertices_boundary = new(js.global.Float32Array)
    vertices_boundary[0] = -1
    vertices_boundary[1] = -1
    vertices_boundary[2] = 0
    vertices_boundary[3] = -1
    vertices_boundary[4] = 1
    vertices_boundary[5] = 0

    vertices_boundary[6] = -1
    vertices_boundary[7] = 1
    vertices_boundary[8] = 0
    vertices_boundary[9] = 1
    vertices_boundary[10] = 1
    vertices_boundary[11] = 0

    vertices_boundary[12] = 1
    vertices_boundary[13] = 1
    vertices_boundary[14] = 0
    vertices_boundary[15] = 1
    vertices_boundary[16] = -1
    vertices_boundary[17] = 0

    vertices_boundary[18] = 1
    vertices_boundary[19] = -1
    vertices_boundary[20] = 0
    vertices_boundary[21] = -1
    vertices_boundary[22] = -1
    vertices_boundary[23] = 0

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