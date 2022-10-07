local window = js.global

local WebGL = require("src.WebGL")

local o = WebGL:new({wrapper = window.document.body})

window.EventBus = require("utils.EventBus")

o:loop()
o:resize()
window:addEventListener("resize", function ()
    o:resize()
end)

print("main.lua initialized")