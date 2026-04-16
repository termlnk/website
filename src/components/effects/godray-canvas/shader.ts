export const VERTEX_SHADER = 'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}';

export const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_color;
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform float u_dither;

float mod289(float x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
float permute(float x){return mod289(((x*34.)+1.)*x);}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec2 quintic(vec2 v){return v*v*v*(v*(v*6.-15.)+10.);}

float pnoise(vec2 P,vec2 rep){
  vec4 Pi=floor(P.xyxy)+vec4(0,0,1,1);
  vec4 Pf=fract(P.xyxy)-vec4(0,0,1,1);
  Pi=mod(Pi,rep.xyxy);Pi=mod289(Pi);
  vec4 ix=Pi.xzxz,iy=Pi.yyww,fx=Pf.xzxz,fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=fract(i*(1./41.))*2.-1.;
  vec4 gy=abs(gx)-.5;
  vec4 tx=floor(gx+.5);
  gx=gx-tx;
  vec2 g00=vec2(gx.x,gy.x),g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z),g11=vec2(gx.w,gy.w);
  vec4 norm=1.79284291400159-.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
  g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x));
  float n10=dot(g10,vec2(fx.y,fy.y));
  float n01=dot(g01,vec2(fx.z,fy.z));
  float n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fade=quintic(Pf.xy);
  vec2 nx=mix(vec2(n00,n01),vec2(n10,n11),fade.x);
  return 2.3*mix(nx.x,nx.y,fade.y);
}

float rayStr(vec2 src,vec2 dir,vec2 coord,float sA,float sB,float spd){
  vec2 d=coord-src;
  float cosA=dot(normalize(d),dir);
  float diag=length(u_res);
  return clamp(
    (.45+.15*sin(cosA*sA+u_time*spd))+
    (.3+.2*cos(-cosA*sB+u_time*spd)),
    u_reach,1.)*
    clamp((diag-length(d))/diag,u_reach,1.);
}

float bayer4(vec2 p){
  int x=int(mod(p.x,4.));
  int y=int(mod(p.y,4.));
  int i=x+y*4;
  float th;
  if(i==0)th=0.;else if(i==1)th=8.;else if(i==2)th=2.;else if(i==3)th=10.;
  else if(i==4)th=12.;else if(i==5)th=4.;else if(i==6)th=14.;else if(i==7)th=6.;
  else if(i==8)th=3.;else if(i==9)th=11.;else if(i==10)th=1.;else if(i==11)th=9.;
  else if(i==12)th=15.;else if(i==13)th=7.;else if(i==14)th=13.;else th=5.;
  return th/16.;
}

void main(){
  vec2 coord=vec2(gl_FragCoord.x,u_res.y-gl_FragCoord.y);
  float spd=u_rays*10.;
  vec2 src1=vec2(u_res.x*0.5,u_res.y*-0.4);
  vec2 src2=vec2(u_res.x*0.52,u_res.y*-0.5);
  float s1=rayStr(src1,normalize(vec2(1.,-.116)),coord,36.22*spd,21.11*spd,1.5*spd);
  float s2=rayStr(src2,normalize(vec2(1.,.241)),coord,22.4*spd,18.02*spd,1.1*spd);
  float bright=1.0*u_reach-(coord.y/u_res.y);
  float att=clamp(bright+(.5+u_intensity),0.,1.);
  float a1=s1*att;
  float a2=s2*att;
  vec3 pm1=u_color*a1;
  vec3 pm2=u_color*a2;
  vec3 blended=pm1+pm2;
  float a=a1+a2*(1.-a1);
  vec3 final=blended/max(a,0.0001);

  float da=u_dither>0.5?step(bayer4(gl_FragCoord.xy),a):a;
  gl_FragColor=vec4(final*da,da);
}
`;
