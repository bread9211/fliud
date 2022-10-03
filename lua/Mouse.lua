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
    self.coords = Vector2:new()
    self.coords_old = Vector2:new()
    self.diff = Vector2:new()
    self.timer = nil
    self.count = 0

    return setmetatable(self, MouseMT)
end

function Mouse:init()
    document.body:addEventListener("mousemove", self:onDocumentMouseMove(), false)
    document.body:addEventListener("touchstart", self:onDocumentTouchStart(), false)
    document.body:addEventListener("touchmove", self:onDocumentTouchMove(), false)
end

function Mouse:setCoords(x, y)
    if (self.timer) then
        window.clearTimeout(self.timer)
    end
    self.coords.set((x / Common.width) * 2 - 1, -(y / Common.height) * 2 + 1)
    self.mouseMoved = true
    self.timer = window.setTimeout(function ()
        self.mouseMoved = false
    end, 100)
end

function Mouse:onDocumentMouseMove(event)
    self:setCoords(event.clientX, event.clientY)
end

function Mouse:onDocumentTouchStart(event)
    if (event.touches.length == 1) then
        self:setCoords(event.touches[0].pageX, event.touches[0].pageY)
    end
end

function Mouse:onDocumentTouchMove(event)
    if (event.touches.length == 1) then
        self.setCoords(event.touches[0].pageX, event.touches[0].pageY)
    end
end

function Mouse:update()
    self.diff:subVectors(self.coords, self.coords_old)
    self.coords_old:copy(self.coords)
    if (self.coords_old.x == 0 and self.coords_old.y == 0) then
        self.diff:set(0, 0)
    end
end

return Mouse:new()