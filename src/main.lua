local window = js.global

local WebGL = require("src.WebGL")

local o = WebGL:new(window.document)

o:loop()
o:resize()
window:addEventListener("resize", function ()
    o:resize()
end)

print("main.lua initialized")

return