let fbo_in, fbo_out;
this.uniforms.v.value = viscous;
for(var i = 0; i < iterations; i++){
    if(i % 2 == 0){
        fbo_in = this.props.output0;
        fbo_out = this.props.output1;
    } else {
        fbo_in = this.props.output1;
        fbo_out = this.props.output0;
    }

    this.uniforms.velocity_new.value = fbo_in.texture;
    this.props.output = fbo_out;
    this.uniforms.dt.value = dt;
}