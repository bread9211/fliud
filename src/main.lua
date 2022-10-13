local window = js.global

local EventBus = require("utils.EventBus")
window.EventBus = EventBus
local WebGL = require("src.WebGL")

local Object = require("utils.convertToJSObject")
local new = require("utils.new")

if not (window.isDev) then window.isDev = false end

local webGL = new(WebGL, Object{
    wrapper = window.document.body
})