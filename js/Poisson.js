let p_in, p_out;

for(var i = 0; i < iterations; i++) {
    if(i % 2 == 0){
        p_in = this.props.output0;
        p_out = this.props.output1;
    } else {
        p_in = this.props.output1;
        p_out = this.props.output0;
    }

    this.uniforms.pressure.value = p_in.texture;
    this.props.output = p_out;
}