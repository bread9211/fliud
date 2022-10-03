local window = js.global

local Common = require("lua.Common")
local Output = require("lua.Output")
local Mouse = require("lua.Mouse")

local WebGL = {}
local WebGLMT = {__index = WebGL}

function WebGL:new(_a)
    local self = {}

    self.wrapper = _a.wrapper
    Common:init()
    Mouse:init()
    self.wrapper:prepend(Common.renderer.DOMElement)
    self.output = Output:new()
    self:loop()
    window:addEventListener("resize", function ()
        self:resize()
    end)

    return setmetatable(self, WebGLMT)
end

function WebGL:resize()
    Common:resize()
    self.output:resize()
end

function WebGL:render()
    Mouse:update()
    Common:update()
    self.output:update()
end

function WebGL:loop()
    self:render()
    window:requestAnimationFrame(self:loop())
end

print("WebGL.lua initialized")
return WebGL