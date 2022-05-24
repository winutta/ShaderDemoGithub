
varying vec3 pos;
varying vec2 vUV;
varying vec3 n;

// uniform float iTime;
// uniform sampler2D tex;

uniform float IOR;
uniform float facing;
uniform float edge;

vec3 gamma(vec3 c){
  return pow(c,vec3(1./2.2));
}

void main() {
  vec3 col = vec3(1.,0.,1.);


  vec3 viewDir = normalize(pos*1.-cameraPosition);
  float NoV = dot(n,-viewDir);
  float fresnel = pow(1.-NoV,IOR);
  float mixResult = mix(facing,edge,fresnel);

  col = vec3(mixResult);

  col = gamma(col); //this isnt called for by the shader in unity but it looks closer with it. otherwise I have to multiply pos to get closer to center
  //maybe im missing something else?
  

  // vec3 exr = texture2D(tex,vUV).rgb;
  // col = exr;

  gl_FragColor = vec4(col,1.);
}