local window = js.global
local THREE = window.THREE

local HalfFloatType = THREE.HalfFloatType
local FloatType = THREE.FloatType
local WebGLRenderTarget = THREE.WebGLRenderTarget

local function createFbos (fboSize)
    local initialFbos = {
        vel_0 = WebGLRenderTarget(fboSize.x, fboSize.y),
        vel_1 = WebGLRenderTarget(fboSize.x, fboSize.y),
        vel_viscous0 = WebGLRenderTarget(fboSize.x, fboSize.y),
        vel_viscous1 = WebGLRenderTarget(fboSize.x, fboSize.y),
        div = WebGLRenderTarget(fboSize.x, fboSize.y),
        pressure_0 = WebGLRenderTarget(fboSize.x, fboSize.y),
        pressure_1 = WebGLRenderTarget(fboSize.x, fboSize.y),
    };

    local exportedFbos = initialFbos;
    return exportedFbos;
end

print("createFbos.lua initialized")

return createFbos