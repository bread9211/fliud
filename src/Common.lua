local window = js.global
local document = js.global.document
local THREE = window.THREE

local new = require("utils.new")
local Object = require("utils.convertToJSObject")

return (function ()
    local self = {}

    self.width = nil
    self.height = nil
    self.aspect = nil
    self.isMobile = false
    self.breakpoint = 768

    self.fboWidth = nil
    self.fboHeight = nil

    self.resizeFunc = self.resize

    self.time = 0
    self.delta = 0

    self.init = function()
        self.pixelRatio = window.devicePixelRatio

        self.resize()

        self.renderer = new(THREE.WebGLRenderer, Object({
            antialias = true,
            alpha = true,
            canvas = window.document:querySelector("canvas")
        }))

        self.renderer.autoClear = false

        self.renderer:setSize(self.width, self.height)

        self.renderer:setClearColor(0x000000)

        self.renderer:setPixelRatio(self.pixelRatio)

        self.clock = new(THREE.Clock)
        self.clock:start()
    end

    self.resize = function()
        self.width = window.innerWidth
        self.height = window.innerHeight
        self.aspect = self.width / self.height

        if (self.renderer) then self.renderer:setSize(self.width, self.height) end
    end

    self.update = function()
        self.delta = self.clock:getDelta()
        self.time = self.time + self.delta
    end

    print("Common.lua initialized")
    return self
end)()