local window = js.global
local THREE = window.THREE

local ShaderPass = require("src.ShaderPass")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local LineVert = get("line.vert")
local AdvectionFrag = get("advection.frag")

local BufferGeometry = THREE.BufferGeometry
local BufferAttribute = THREE.BufferAttribute
local RawShaderMaterial = THREE.RawShaderMaterial
local LineSegments = THREE.LineSegments

local Advection = {}
local AdvectionMT = {__index = function (table, key)
    if (ShaderPass[key]) then
        return ShaderPass.init
    else
        return Advection[key]
    end
end}

function Advection:new(simProps)
    local self = ShaderPass:new({
        material = {
            vertexShader = FaceVert,
            fragmentShader = AdvectionFrag,
            uniforms = {
                boundarySpace = {
                    value = simProps.cellScale,
                },
                px = {
                    value = simProps.cellScale,
                },
                fboSize = {
                    value = simProps.fboSize,
                },
                velocity = {
                    value = simProps.src.texture,
                },
                dt = {
                    value = simProps.dt,
                },
                isBFECC = {
                    value = true,
                },
            }
        },
        output = simProps.dst
    })

    return setmetatable(self, AdvectionMT)
end

function Advection:initAdvection()
    self:init()
    self:createBoundary()
end

function Advection:createBoundary()
    local _a
    local boundaryG = js.new(BufferGeometry)
    local vertices_boundary = {
        -- left
        -1, -1, 0, -1, 1, 0,
        -- top
        -1, 1, 0, 1, 1, 0,
        -- right
        1, 1, 0, 1, -1, 0,
        -- bottom
        1, -1, 0, -1, -1, 0,
    }
    boundaryG:setAttribute("position", js.new(BufferAttribute, vertices_boundary, 3))
    local boundaryM = js.new(RawShaderMaterial, {
        vertexShader = LineVert,
        fragmentShader = AdvectionFrag,
        uniforms = self.uniforms,
    })
    self.line = js.new(LineSegments, boundaryG, boundaryM)

    _a = self.scene

    if not (_a) then
        _a:add(self.line)
    end
end

function Advection:updateAdvection(_a)
    local dt = _a.dt
    local isBounce = _a.isBounce
    local BFECC = _a.BFECC
    if (self.uniforms) then
        self.uniforms.dt.value = dt
    end
    self.line.visible = isBounce
    self.uniforms.isBFECC.value = BFECC
    self:update()
end


print("Advection.lua initialized")
return Advection