local window = js.global
local document = window.document
local THREE = window.THREE

local Common = require("src.Common")
local new = require("utils.new")

return (function()
    local self = {}

    self.mouseMoved = false
    self.coords = new(THREE.Vector2)
    self.coords_old = new(THREE.Vector2)
    self.diff = new(THREE.Vector2)
    self.timer = nil
    self.count = 0

    self.mouseDownX = 100
    self.mouseDownY = 100
    self.mouseUpX = 200
    self.mouseUpY = 200

    self.mouseDownBind = false
    self.mouseUpBind = false

    self.init = function()
        document.body:addEventListener('mousemove', self.onDocumentMouseMove, false)
        document.body:addEventListener('mousedown', self.onDocumentMouseDown, false)
        document.body:addEventListener('mouseup', self.onDocumentMouseUp, false)
        document.body:addEventListener('touchstart', self.onDocumentTouchStart, false)
        document.body:addEventListener('touchmove', self.onDocumentTouchMove, false)
    end

    self.setCoords = function(x, y)
        if (self.timer) then window:clearTimeout(self.timer) end
        self.coords:set((x/Common.width) * 2 - 1, -(y/Common.height) * 2 + 1)
        self.mouseMoved = true
        self.timer = window:setTimeout(function()
            self.mouseMoved = false
        end, 100)
    end

    self.onDocumentMouseMove = function(_, event)
        self.setCoords(event.clientX, event.clientY)
    end

    self.onDocumentMouseDown = function(_, event)
        self.mouseDown = true
        self.mouseDownX = event.clientX
        self.mouseDownY = event.clientY

        if (self.mouseDownBind) then self.mouseDownBind() end
    end

    self.onDocumentMouseUp = function(_, event)
        self.mouseDown = false
        self.mouseUpX = event.clientX
        self.mouseUpY = event.clientY

        if (self.mouseUpBind) then self.mouseUpBind() end
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

        if (self.coords_old.x == 0 and self.coords_old.y == 0) then self.diff:set(0, 0) end
    end

    return self
end)()