uniform vec3 uCamera;      
uniform sampler2D uTexture;

varying vec2 vUv;      
varying vec3 vPosition;
varying vec3 vNormal;

const vec3 lightColor = vec3(1.0,0.0,0.0);
const vec3 lightPosition = vec3(0.0,0.0,5.0);

const float lightIntensity = 0.20;
const float ambientLightIntensity = 0.50;
const float specularIntensity = 0.5;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(uCamera-vPosition);
  vec3 toLight = lightPosition - vPosition; 
  vec3 lightDir = normalize(toLight);

  float distToLight = length(toLight);
  float intensityInSurface = lightIntensity * max(dot(normal, lightDir),0.0);
  float diffused = intensityInSurface / (1.0+distToLight*distToLight);

  float ambient = ambientLightIntensity;

  vec3 reflection = reflect(lightDir, normal);
  float shine = 32.0;
  float specular = specularIntensity * pow(max(dot(viewDir,reflection), 0.0), shine);

  vec3 texColor = texture2D(uTexture,vUv).rgb; 
  vec3 finalColor = texColor * (ambient + diffused);
  gl_FragColor = vec4(finalColor,1.0);
} 