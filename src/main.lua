local window = js.global

local WebGL = require("src.WebGL")

WebGL:new(window.document)

print("main.lua initialized")

return