local window = js.global
local document = window.document

local CustomEvent = window.CustomEvent

local function EventBus()
    local self = {}

    self.bus = document:createElement('fakeelement');

    self.on = function(event, callback)
        self.bus:addEventListener(event, callback);
    end

    self.off = function(event, callback)
        self.bus:removeEventListener(event, callback);
    end

    self.emit = function(event, detail)
        self.bus:dispatchEvent(js.new(CustomEvent, event, detail));
    end

    return self
end

return EventBus();