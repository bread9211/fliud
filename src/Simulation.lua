local window = js.global

local Mouse = require("src.Mouse")
local Common = require("src.Common")
local THREE = window.THREE
local Controls = require("src.Controls")

local Advection = require("src.Advection")
local ExternalForce = require("src.ExternalForce")
local Viscous = require("src.Viscous")
local Divergence = require("src.Divergence")
local Poisson = require("src.Poisson")
local Pressure = require("src.Pressure")
local new = require("utils.new")
local Object = require("utils.convertToJSObject")

local function round(n)
    return math.floor(n+0.5)
end
print("fdsafdsafdasf")
return function(properties)
    local self = {}
    self.properties = properties

    self.fbos = {
        vel_0 = nil,
        vel_1 = nil,
        vel_viscous0 = nil,
        vel_viscous1 = nil,
        div = nil,
        pressure_0 = nil,
        pressure_1 = nil,
    }

    self.options = {
        iterations_poisson = 32,
        iterations_viscous = 32,
        mouse_force = 20,
        resolution = 0.5,
        cursor_size = 100,
        viscous = 30,
        isBounce = false,
        dt = 0.014,
        isViscous = false,
        BFECC = true
    }

    local controls = Controls(self.options)

    self.fboSize = new(THREE.Vector2)
    self.cellScale = new(THREE.Vector2)
    self.boundarySpace = new(THREE.Vector2)

    self.calcSize()
    self.createAllFBO()
    self.createShaderPass()

    self.createAllFBO = function()
        local type = THREE.HalfFloatType

        for k, i in ipairs(self.fbos) do
            self.fbos[k] = new(THREE.WebGLRenderTarget,
                self.fboSize.x,
                self.fboSize.y,
                Object({
                    type = type
                })
            )
        end
    end

    self.createShaderPass = function()
        self.advection = Advection({
            cellScale = self.cellScale,
            fboSize = self.fboSize,
            dt = self.options.dt,
            src = self.fbos.vel_0,
            dst = self.fbos.vel_1
        })

        self.externalForce = ExternalForce({
            cellScale = self.cellScale,
            cursor_size = self.options.cursor_size,
            dst = self.fbos.vel_1,
        })

        self.viscous = Viscous({
            cellScale = self.cellScale,
            boundarySpace = self.boundarySpace,
            viscous = self.options.viscous,
            src = self.fbos.vel_1,
            dst = self.fbos.vel_viscous1,
            dst_ = self.fbos.vel_viscous0,
            dt = self.options.dt,
        })

        self.divergence = Divergence({
            cellScale = self.cellScale,
            boundarySpace = self.boundarySpace,
            src = self.fbos.vel_viscous0,
            dst = self.fbos.div,
            dt = self.options.dt,
        })

        self.poisson = Poisson({
            cellScale = self.cellScale,
            boundarySpace = self.boundarySpace,
            src = self.fbos.div,
            dst = self.fbos.pressure_1,
            dst_ = self.fbos.pressure_0,
        })

        self.pressure = Pressure({
            cellScale = self.cellScale,
            boundarySpace = self.boundarySpace,
            src_p = self.fbos.pressure_0,
            src_v = self.fbos.vel_viscous0,
            dst = self.fbos.vel_0,
            dt = self.options.dt,
        })
    end

    self.calcSize = function()
        local width = round(self.options.resolution * Common.width)
        local height = round(self.options.resolution * Common.height)

        local px_x = 1.0 / width
        local px_y = 1.0 / height

        self.cellScale.set(px_x, px_y)
        self.fboSize.set(width, height)
    end

    self.resize = function()
        self.calcSize()

        for k, v in self.fbos do
            self.fbos[k]:setSize(self.fboSize.x, self.fboSize.y)
        end
    end


    self.update = function()
        if (self.options.isBounce) then
            self.boundarySpace.set(0, 0)
        else
            self.boundarySpace.copy(self.cellScale)
        end

        self.advection.update(self.options)

        self.externalForce.update({
            cursor_size = self.options.cursor_size,
            mouse_force = self.options.mouse_force,
            cellScale = self.cellScale
        })

        local vel = self.fbos.vel_1

        if (self.options.isViscous) then
            vel = self.viscous.update({
                viscous = self.options.viscous,
                iterations = self.options.iterations_viscous,
                dt = self.options.dt
            })
        end

        self.divergence.update({vel})

        local pressure = self.poisson.update({
            iterations = self.options.iterations_poisson,
        })

        self.pressure.update({ vel , pressure})
    end

    print("Simulation.lua initialized")
    return self
end