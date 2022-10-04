local window = js.global

local Common = require("src.Common"):new()
local Output = require("src.Output")
local Mouse = require("src.Mouse")

local WebGL = {}
local WebGLMT = {__index = WebGL}

function WebGL:new(_a)
    local self = {}
    
    self.wrapper = _a
    print("before")
    Common:init()
    print("hello")
    Mouse:init()
    -- self.wrapper:prepend(Common.renderer.DOMElement)
    self.output = Output:new()
    self:loop()
    self:resize()
    window:addEventListener("resize", function ()
        self:resize()
    end)
    print("webgl new")
    return setmetatable(self, WebGLMT)
end

function WebGL:resize()
    Common:resize()
    self.output:resize()
    print("webgl resize")
end

function WebGL:render()
    Mouse:update()
    Common:update()
    self.output:update()
    print("webgl render")
end

function WebGL:loop()
    self:render()
    window:requestAnimationFrame(self:loop())
    print("webgl loop")
end

print("WebGL.lua initialized")
return WebGL