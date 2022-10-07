local window = js.global
local THREE = js.global.THREE

local Object = require("utils.convertToJSObject")

local WebGLRenderer = THREE.WebGLRenderer
local Clock = THREE.Clock

local Common = {}
local CommonMT = {__index  =  Common}

function Common:new()
    local self = {}

    self.width = 0
    self.height = 0
    self.aspect = self.width/self.height
    self.isMobile = false
    self.breakpoint = 768
    self.fboWidth = 0
    self.fboHeight = 0
    self.resizeFunc = self.resize
    self.time = 0
    self.delta = 0

    return setmetatable(self, CommonMT)
end

function Common:init()
    self.pixelRatio = window.devicePixelRatio
    self:resize()
    self.renderer = js.new(WebGLRenderer, Object{
        antialias = true,
        alpha = true,
    })
    self.renderer.autoClear = false
    self.renderer:setSize(self.width,self.height)
    self.renderer:setClearColor(0x000000)
    self.renderer:setPixelRatio(self.pixelRatio)
    self.clock = js.new(Clock)
    self.clock:start()
end

function Common:resize()
    self.width = window.parseInt(window.innerWidth)
    self.height = window.parseInt(window.innerHeight)
    self.aspect = self.width/self.height
    if (self.renderer) then
        self.renderer:setSize(self.width,self.height)
    end
end

function Common:update()
    local _a = self.clock

    if (_a == nil or _a == 0) then
        self.delta = nil
    else
        self.delta = _a:getDelta()
    end

    self.time = self.time + self.delta
end

print("Common.lua initialized")
return Common:new()