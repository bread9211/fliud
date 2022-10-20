local get = require("utils.shaders")
local mouse_vert = get("mouse.vert")
local externalForce_frag = get("externalForce.frag")

local ShaderPass = require("src.ShaderPass")
local new = require("utils.new")
local Object = require("utils.convertToJSObject")
local Common = require("src.Common")
local Mouse = require("src.Mouse")

local THREE = js.global.THREE

return function(simulationProperties)
    local self = ShaderPass({
        output = simulationProperties.dst
    })

    self.init()
    local mouseG = new(THREE.PlaneGeometry, 1, 1)

    local mouseM = new(THREE.RawShaderMaterial, Object({
        vertexShader = mouse_vert,
        fragmentShader = externalForce_frag,
        blending = THREE.AdditiveBlending,
        uniforms = {
            px = {
                value = simulationProperties.cellScale
            },
            force = {
                value = new(THREE.Vector2, (Mouse.mouseUpX - Mouse.mouseDownX)*simulationProperties.vector_force/200, -(Mouse.mouseUpY - Mouse.mouseDownY)*simulationProperties.vector_force/200)
            },
            center = {
                value = new(THREE.Vector2, Mouse.mouseDownX, Mouse.mouseDownY)
            },
            scale = {
                value = new(THREE.Vector2, simulationProperties.cursor_size, simulationProperties.cursor_size)
            }
        },
    }))

    self.mouse = new(THREE.Mesh, mouseG, mouseM)
    self.scene:add(self.mouse)

    self.sourceX = (Mouse.mouseDownX/Common.width) * 2 - 1
    self.sourceY = -(Mouse.mouseDownY/Common.height) * 2 + 1

    self.cursor_size = simulationProperties.cursor_size

    self.update = function(properties)
        local cursorSizeX = self.cursor_size * properties.cellScale.x
        local cursorSizeY = self.cursor_size * properties.cellScale.y

        local centerX = math.min(math.max(self.sourceX, -1 + cursorSizeX + properties.cellScale.x * 2), 1 - cursorSizeX - properties.cellScale.x * 2)
        local centerY = math.min(math.max(self.sourceY, -1 + cursorSizeY + properties.cellScale.y * 2), 1 - cursorSizeY - properties.cellScale.y * 2)

        local uniforms = self.mouse.material.uniforms
        -- print(properties.cellScale.x, properties.cellScale.y)

        uniforms.center.value:set(centerX, centerY)

        self._update()
    end

    return self
end