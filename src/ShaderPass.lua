local Common = require("src.Common")
local new = require("utils.new")
local Object = require("utils.convertToJSObject")
local THREE = js.global.THREE

return function (properties)
    local self = {}

    self.properties = properties
    self.uniforms = nil
    if (self.properties.material) then
        self.uniforms = self.properties.material.uniforms
    end

    self.init = function()
        self.scene = new(THREE.Scene)
        self.camera = new(THREE.Camera)

        if (self.uniforms) then
            self.material = new(THREE.RawShaderMaterial, Object(self.properties.material))
            self.geometry = new(THREE.PlaneBufferGeometry, 2.0, 2.0)
            self.plane = new(THREE.Mesh, self.geometry, self.material)
            self.scene.add(self.plane)
        end
    end

    self._update = function()
        if (Common.renderer) then
            Common.renderer.setRenderTarget(self.properties.output)
            Common.renderer.render(self.scene, self.camera)
            Common.renderer.setRenderTarget(nil)
        end
    end

    print("ShaderPass.lua initialized")
    return self
end