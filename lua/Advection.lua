local window = js.global
local THREE = window.THREE

local ShaderPass = require("lua.ShaderPass")

local get = require("utils.shaders")
local FaceVert = get("face.vert")
local LineVert = get("line.vert")
local AdvectionFrag = get("advection.frag")

local BufferGeometry = THREE.BufferGeometry
local BufferAttribute = THREE.BufferAttribute
local RawShaderMaterial = THREE.RawShaderMaterial
local LineSegments = THREE.LineSegments