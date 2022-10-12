local dat = js.global.dat
local new = require("utils.new")

return function (params)
    local self = {}
    self.params = params
    self.init()

    self.init = function()
        self.gui = new(dat.GUI, {width = 300})
        self.gui.add(self.params, "mouse_force",20, 200)
        self.gui.add(self.params, "cursor_size", 10, 200)
        self.gui.add(self.params, "isViscous")
        self.gui.add(self.params, "viscous", 0, 500)
        self.gui.add(self.params, "iterations_viscous", 1, 32)
        self.gui.add(self.params, "iterations_poisson", 1, 32)
        self.gui.add(self.params, "dt", 1/200, 1/30)
        self.gui.add(self.params, 'BFECC')
        self.gui.close()
    end
end