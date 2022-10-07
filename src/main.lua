local window = js.global

local WebGL = require("src.WebGL")

local o = WebGL:new({wrapper = window.document.body})

o:loop()
o:resize()
window:addEventListener("resize", function ()
    o:resize()
end)

print("main.lua initialized")