local window = js.global
local document = window.document
local THREE = window.THREE

local Common = require("lua.Common")

local Vector2 = THREE.Vector2

local Mouse = {}
local MouseMT = {__index = Mouse}

function Mouse:new()
    local self = {}

    self.mouseMoved = false
    self.coords = Vector2()
    self.coords_old = Vector2()
    self.diff = Vector2()
    self.timer = nil
    self.count = 0

    return setmetatable(self, MouseMT)
end

function Mouse:init()
    document.body:addEventListener("mousemove", self:onDocumentMouseMove(), false)
    document.body:addEventListener("touchstart", self:onDocumentTouchStart(), false)
    document.body:addEventListener("touchmove", self:onDocumentTouchMove(), false)
end

return Mouse:new()