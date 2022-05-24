
varying vec3 pos;
varying vec2 vUV;
varying vec3 n;

uniform float iTime;
uniform sampler2D tex;

uniform vec2 tiling;
uniform vec2 offset;

uniform float minV;
uniform float maxV;
uniform float valueV;
uniform float powerV;

vec3 gamma(vec3 c){
  return pow(c,vec3(1./2.2));
}

void main() {
  vec3 col = vec3(1.,0.,1.);

  vec2 texUV = fract(vUV*tiling + offset); // this is producing tiling lines

  vec3 exr = texture2D(tex,texUV).rgb;
  
  vec3 val = exr;
  val = pow(val,vec3(2.2));
  // val = gamma(val);
  val = clamp((val-minV)/(maxV-minV),0.,1.);
  vec3 mixV = mix(val,vec3(1.),1.-valueV);
  mixV = clamp(mixV,vec3(0.),vec3(1.));
  vec3 result = pow(mixV,vec3(1./powerV));

  // col = exr;
  col = vec3(result);

  col = gamma(col);

  gl_FragColor = vec4(col,1.);
}