local window = js.global

local EventBus = require("utils.EventBus")
window.EventBus = EventBus
local WebGL = require("src.WebGL")

if not (window.isDev) then window.isDev = false end

local webGL = WebGL({
    wrapper = window.document.body
})

print("main.lua initialized")