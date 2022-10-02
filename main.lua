local window = js.global

local WebGL = require("lua/WebGL")

WebGL:new(window.document)

print("main.lua initialized")