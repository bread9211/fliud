local window = js.global
-- local THREE = window.THREE

local Common = require("src.Common")
local Output = require("src.Output")
local Mouse = require("src.Mouse")

local WebGL = {}
local WebGLMT = {__index = WebGL}

function WebGL:new(_a)
    local self = {}
    
    self.wrapper = _a.wrapper
    Common:init()
    Mouse:init()
    self.wrapper:prepend(Common.renderer.domElement)
    self.output = Output:new()

    return setmetatable(self, WebGLMT)
end

function WebGL:resize()
    Common:resize()
    self.output:resize()
end

function WebGL:render()
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
    window:requestAnimationFrame(function ()
        self:loop()
    end)
end

print("WebGL.lua initialized")
return WebGL