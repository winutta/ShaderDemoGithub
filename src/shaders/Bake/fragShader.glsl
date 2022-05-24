
varying vec3 pos;
varying vec2 vUV;
varying vec3 n;

uniform float iTime;
uniform sampler2D tex;

uniform float minV;
uniform float maxV;
uniform float valueV;
uniform float gammaV;

uniform vec2 tiling;
uniform vec2 offset;

vec3 decodeRGBE(vec4 rgbe){

  vec3 c = rgbe.rgb;
  float expon = rgbe.a;

  float m = pow(2.,expon*255. - 128.)/255.;
  vec3 co = c*m;

  return co;

}

vec3 gamma(vec3 c){
  return pow(c,vec3(1./2.2));
}


void main() {
  vec3 col = vec3(1.,0.,1.);

  vec2 texUV = fract(vUV*tiling + offset);

  vec4 exr = texture(tex,texUV); //this is higher detail and so looking blurry.

  float val = exr.r;
  val = clamp(val,0.,1.);
  // val = pow(val,2.2);
  val = clamp((val-minV)/(maxV-minV),0.,1.);
  float mixV = mix(val,1.,1.-valueV);
  mixV = clamp(mixV,0.,1.);
  float result = pow(mixV,1./gammaV);
  // col = exr.rgb;
  col = vec3(result);
  col = gamma(col);
  // col = vec3(exr.a);


  gl_FragColor = vec4(col,1.);
}