local window = js.global
local THREE = window.THREE

local Controls = require("src.Controls")
local Advection = require("src.Advection")
local ExternalForce = require("src.ExternalForce")
local Viscous = require("src.Viscous")
local Divergence = require("src.Divergence")
local Poisson = require("src.Poisson")
local Pressure = require("src.Pressure")
local Common = require("src.Common")

local createFbos = require("utils.createFbos")
local Vector2 = THREE.Vector2

local Simulation = {}
local SimulationMT = {__index = Simulation}

local function round(n)
    return math.floor(n+0.5)
end

function Simulation:new()
    print("Creating simulation...")

    local self = {}

    self.options = {
        ["iterations_poisson"] = 32,
        ["iterations_viscous"] = 32,
        ["mouse_force"] = 20,
        ["resolution"] = 0.5,
        ["cursor_size"] = 100,
        ["viscous"] = 30,
        ["isBounce"] = false,
        ["dt"] = 0.014,
        ["isViscous"] = false,
        ["BFECC"] = true,
    }
    -- Controls:new(self.options):init()
    self.fboSize = js.new(Vector2)
    self.cellScale = js.new(Vector2)
    self.boundarySpace = js.new(Vector2)

    local width = round(self.options.resolution * Common.width)
    local height = round(self.options.resolution * Common.height)
    local px_x = 1.0 / width
    local px_y = 1.0 / height
    self.cellScale:set(px_x, px_y)
    self.fboSize:set(width, height)
    self.fbos = createFbos(self.fboSize)

    self.advection = Advection:new({
        cellScale = self.cellScale,
        fboSize = self.fboSize,
        dt = self.options.dt,
        src = self.fbos.vel_0,
        dst = self.fbos.vel,
    })
    self.advection:initAdvection()
    self.externalForce = ExternalForce:new({
        cellScale = self.cellScale,
        cursor_size = self.options.cursor_size,
        dst = self.fbos.vel,
    })
    self.viscous = Viscous:new({
        cellScale = self.cellScale,
        boundarySpace = self.boundarySpace,
        viscous = self.options.viscous,
        src = self.fbos.vel,
        dst = self.fbos.vel_viscous1,
        dst_ = self.fbos.vel_viscous0,
        dt = self.options.dt,
    })
    self.divergence = Divergence:new({
        cellScale = self.cellScale,
        boundarySpace = self.boundarySpace,
        src = self.fbos.vel_viscous0,
        dst = self.fbos.div,
        dt = self.options.dt,
    })
    self.poisson = Poisson:new({
        cellScale = self.cellScale,
        boundarySpace = self.boundarySpace,
        src = self.fbos.div,
        dst = self.fbos.pressure,
        dst_ = self.fbos.pressure_0,
    })
    self.pressure = Pressure:new({
        cellScale = self.cellScale,
        boundarySpace = self.boundarySpace,
        src_p = self.fbos.pressure_0,
        src_v = self.fbos.vel_viscous0,
        dst = self.fbos.vel_0,
        dt = self.options.dt,
    })

    print("Created simulation")
    return setmetatable(self, SimulationMT)
end

function Simulation:resize()
    local _self = self;
    for _, v in ipairs(self.fbos) do
        v:setSize(_self.fboSize.x, _self.fboSize.y)
    end
end

function Simulation:update()
    if (self.options.isBounce) then
        self.boundarySpace:set(0, 0);
    else
        self.boundarySpace:copy(self.cellScale);
    end
    self.advection:updateAdvection(self.options);
    self.externalForce:updateExternalForce({
        cursor_size = self.options.cursor_size,
        mouse_force = self.options.mouse_force,
        cellScale = self.cellScale,
    });
    local vel = self.option.isViscous and self.fbos.vel_1 or self.viscous:updateViscous({
        viscous = self.options.viscous,
        iterations = self.options.iterations_viscous,
        dt = self.options.dt,
    })
    self.divergence:updateDivergence({ vel = vel });
    local pressure = self.poisson:updatePoisson({
        iterations = self.options.iterations_poisson,
    });
    self.pressure:updatePressure({ vel = vel, pressure = pressure });
end

print("Simulation.lua initialized")
return Simulation