local get = require("utils.new")
local mouse_vert = get("mouse.vert")
local externalForce_frag = get("externalForce.frag")

local ShaderPass = require("src.ShaderPass")
local new = require("utils.new")
local Object = require("utils.convertToJSObject")
local Mouse = require("src.Mouse")

local THREE = js.global.THREE

return function(simulationProperties)
    local self = ShaderPass(Object({
        output = simulationProperties.dst
    }))

    self.init()
    local mouseG = new(THREE.PlaneBufferGeometry, 1, 1)

    local mouseM = new(THREE.RawShaderMaterial, Object({
        vertexShader = mouse_vert,
        fragmentShader = externalForce_frag,
        blending = THREE.AdditiveBlending,
        uniforms = {
            px = {
                value = simulationProperties.cellScale
            },
            force = {
                value = new(THREE.Vector2, 0.0, 0.0)
            },
            center = {
                value = new(THREE.Vector2, 0.0, 0.0)
            },
            scale = {
                value = new(THREE.Vector2, simulationProperties.cursor_size, simulationProperties.cursor_size)
            }
        },
    }))

    self.mouse = new(THREE.Mesh, mouseG, mouseM)
    self.scene.add(self.mouse)

    self.update = function(properties)
        local forceX = Mouse.diff.x / 2 * properties.mouse_force
        local forceY = Mouse.diff.y / 2 * properties.mouse_force

        local cursorSizeX = properties.cursor_size * properties.cellScale.x
        local cursorSizeY = properties.cursor_size * properties.cellScale.y

        local centerX = math.min(math.max(Mouse.coords.x, -1 + cursorSizeX + properties.cellScale.x * 2), 1 - cursorSizeX - properties.cellScale.x * 2)
        local centerY = math.min(math.max(Mouse.coords.y, -1 + cursorSizeY + properties.cellScale.y * 2), 1 - cursorSizeY - properties.cellScale.y * 2)

        local uniforms = self.mouse.material.uniforms

        uniforms.force.value.set(forceX, forceY)
        uniforms.center.value.set(centerX, centerY)
        uniforms.scale.value.set(properties.cursor_size, properties.cursor_size)

        self._update()
    end

    return self
end