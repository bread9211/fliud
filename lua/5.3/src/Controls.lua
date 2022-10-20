local dat = js.global.dat
local stats = js.global.Stats
local new = require("utils.new")

return function (parameters)
    local self = {}
    self.params = parameters

    self.init = function()
        self.gui = new(dat.GUI, {width = 300})
        self.gui:add(self.params, "mouse_force", 20, 200)
        self.gui:add(self.params, "cursor_size", 10, 200)
        self.gui:add(self.params, "isViscous")
        self.gui:add(self.params, "viscous", 0, 500)
        self.gui:add(self.params, "iterations_viscous", 1, 32)
        self.gui:add(self.params, "iterations_poisson", 1, 32)
        self.gui:add(self.params, "dt", 1/200, 1/30)
        self.gui:add(self.params, 'BFECC')
        self.gui:add(self.params, 'isBounce')
        self.gui:add(self.params, "hue", 0.0, 1.0)
        self.gui:add(self.params, "brightness", 0.0, 1.0)
        self.gui:add(self.params, "background", 0.0, 1.0)

        self.vector = self.gui:addFolder("New vector")
        self.vector:add(self.params, "vector_force", 20, 200)
        self.vector:add(self.params, "vector_size", 10, 200)

        self.gui:close()

        self.stats = new(stats)
        self.stats:showPanel(0)
        js.global.document.body:appendChild(self.stats.dom)
    end

    self.init()

    return self
end