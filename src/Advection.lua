local window = js.global
local THREE = window.THREE

local Common = require("src.Common")
local Object = require("utils.convertToJSObject")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local LineVert = get("line.vert")
local AdvectionFrag = get("advection.frag")

local BufferGeometry = THREE.BufferGeometry
local BufferAttribute = THREE.BufferAttribute
local LineSegments = THREE.LineSegments
local Scene = THREE.Scene
local Camera = THREE.Camera
local RawShaderMaterial = THREE.RawShaderMaterial
local PlaneGeometry = THREE.PlaneGeometry
local Mesh = THREE.Mesh

local Advection = {}
local AdvectionMT = {__index = Advection}

function Advection:new(simProps)
    self.props = {
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
    }

    local _a = self.props.material
    if (_a) then
        self.uniforms = _a.uniforms
    end
    
    self:initAdvection()

    return setmetatable(self, AdvectionMT)
end

function Advection:initAdvection()
    self.scene = js.new(Scene)
    self.camera = js.new(Camera)
    if (self.uniforms) then
        self.material = js.new(RawShaderMaterial, Object(self.props.material))
        self.geometry = js.new(PlaneGeometry, 2.0, 2.0)
        self.plane = js.new(Mesh, self.geometry, self.material)
        self.scene:add(self.plane)
    end

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

function Advection:updateAdvection(_a1)
    local dt = _a1.dt
    local isBounce = _a1.isBounce
    local BFECC = _a1.BFECC
    if (self.uniforms) then
        self.uniforms.dt.value = dt
    end
    self.line.visible = isBounce
    self.uniforms.isBFECC.value = BFECC

    local renderer = Common.renderer

    if (renderer) then
        renderer:setRenderTarget(self.props.output)
        renderer:render(self.scene, self.camera)
        renderer:setRenderTarget(nil)

        print("Advection:updateAdvection()")
    end
end


print("Advection.lua initialized")
return Advection