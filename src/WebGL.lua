local window = js.global

local Common = require("src.Common"):new()
local Output = require("src.Output")
local Mouse = require("src.Mouse")

local WebGL = {}
local WebGLMT = {__index = WebGL}

function WebGL:new(_a)
    local self = {}
    
    self.wrapper = _a
    Common:init()
    Mouse:init()
    -- self.wrapper:prepend(Common.renderer.DOMElement)
    self.output = Output:new()

    return setmetatable(self, WebGLMT)
end

function WebGL:resize()
    Common:resize()
    self.output:resize()
end

function WebGL:render()
    print(self)
    Mouse:update()
    Common:update()
    -- for i, v in ipairs(self) do
    --     print(type(v))
    --     print("lmao")
    -- end
    self.output:update()
end

function WebGL:loop()
    self:render()
    window:requestAnimationFrame(self:loop())
end

print("WebGL.lua initialized")
return WebGL