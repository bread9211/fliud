local get = require("utils.shaders")
local face_vert = get("./glsl/sim/face.vert")
local line_vert = get("./glsl/sim/line.vert")
local advection_frag = get("./glsl/sim/advection.frag")

local ShaderPass = require("src.ShaderPass")
local new = require("utils.new")

local THREE = js.global.THREE

return function(simProps)
    local self = ShaderPass({
        material =  {
            vertexShader = face_vert,
            fragmentShader = advection_frag,
            uniforms = {
                boundarySpace = {
                    value = simProps.cellScale
                },
                px = {
                    value = simProps.cellScale
                },
                fboSize = {
                    value = simProps.fboSize
                },
                velocity = {
                    value = simProps.src.texture
                },
                dt = {
                    value = simProps.dt
                },
                isBFECC = {
                    value = true
                }
            },
        },
        output = simProps.dst
    })

    self.init()

    local boundaryG = new(THREE.BufferGeometry)
    local vertices_boundary = new(js.global.Float32Array, {
        -1, -1, 0,
        -1, 1, 0,
        -1, 1, 0,
        1, 1, 0,
        1, 1, 0,
        1, -1, 0,
        1, -1, 0,
        -1, -1, 0
    })

    boundaryG.setAttribute( 'position', new(THREE.BufferAttribute, vertices_boundary, 3 ) )

    local boundaryM = new THREE.RawShaderMaterial({
        vertexShader = line_vert,
        fragmentShader = advection_frag,
        uniforms = self.uniforms
    })

    self.line = new THREE.LineSegments(boundaryG, boundaryM)
    self.scene.add(self.line)

    self.update = function(dt, isBounce, BFECC)

        self.uniforms.dt.value = dt
        self.line.visible = isBounce
        self.uniforms.isBFECC.value = BFECC

        self._update()
    end
end