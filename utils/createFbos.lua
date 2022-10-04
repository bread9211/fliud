local window = js.global
local THREE = window.THREE

local HalfFloatType = THREE.HalfFloatType
local FloatType = THREE.FloatType
local WebGLRenderTarget = THREE.WebGLRenderTarget

function CreateFbos (fboSize)
    local initialFbos = {
        vel_0 = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
        vel_1 = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
        vel_viscous0 = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
        vel_viscous1 = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
        div = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
        pressure_0 = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
        pressure_1 = js.new(WebGLRenderTarget, fboSize.x, fboSize.y),
    };

    local exportedFbos = initialFbos;
    return exportedFbos;
end

print("createFbos.lua initialized")

return CreateFbos