local window = js.global
local document = window.document
local THREE = window.THREE

local Common = require("src.Common")
local new = require("utils.new")

return (function()
    local self = {}
    print("fdsafdsa")

    self.mouseMoved = false
    self.coords = new(THREE.Vector2)
    self.coords_old = new(THREE.Vector2)
    self.diff = new(THREE.Vector2)
    self.timer = nil
    self.count = 0
    print("fdsafdsa")

    self.init = function()
        document.body:addEventListener('mousemove', self.onDocumentMouseMove, false)
        document.body:addEventListener('touchstart', self.onDocumentTouchStart, false)
        document.body:addEventListener('touchmove', self.onDocumentTouchMove, false)
    end
    print("fdsafdsa")

    self.setCoords = function(x, y)
        if (self.timer) then window:clearTimeout(self.timer) end
        self.coords:set( (x/Common.width) * 2 - 1, -(y/Common.height) * 2 + 1)
        self.mouseMoved = true
        self.timer = window:setTimeout(function()
            self.mouseMoved = false
        end, 100)
    end

    self.onDocumentMouseMove = function(_, event)
        self.setCoords(event.clientX, event.clientY)
    end

    self.onDocumentTouchStart = function(_, event)
        if (event.touches.length == 1) then
            self.setCoords(event.touches[0].pageX, event.touches[0].pageY)
        end
    end

    self.onDocumentTouchMove = function(_, event)
        if (event.touches.length == 1) then
            self.setCoords(event.touches[0].pageX, event.touches[0].pageY)
        end
    end

    self.update = function()
        self.diff:subVectors(self.coords, self.coords_old)
        self.coords_old:copy(self.coords)

        if (self.coords_old.x == 0 and self.coords_old.y == 0) then self.diff.set(0, 0) end
    end

    print("Mouse.lua initialized")
    return self
end)()