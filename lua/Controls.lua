local window = js.global
local dat = window.dat

local GUI = dat.GUI

local Controls = {}
local ControlsMT = {__index = Controls}

function Controls:new(params)
    self.params = params
    self:init()
end

function Controls:init()
    self.gui = GUI({ width = 300 })
    self.gui:add(self.params, "mouse_force", 20, 200)
    self.gui:add(self.params, "cursor_size", 10, 200)
    self.gui:add(self.params, "isViscous")
    self.gui:add(self.params, "viscous", 0, 500)
    self.gui:add(self.params, "iterations_viscous", 1, 32)
    self.gui:add(self.params, "iterations_poisson", 1, 32)
    self.gui:add(self.params, "dt", 1 / 200, 1 / 30)
    self.gui:add(self.params, "BFECC")
    self.gui:close()
end

return Controls