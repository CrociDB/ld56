const WIDTH = 1280;
const HEIGHT = 768;

import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const CRTShader = {
  uniforms: {
    tDiffuse: { value: null },
    curvature: { value: [1, 1] },
    iTime: { value: 0 },
  },

  vertexShader: /* glsl */ `
                    varying vec2 vUv;

                    void main() {

                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

                    }`,

  fragmentShader: /* glsl */ `
                    uniform sampler2D tDiffuse;
                    uniform vec2 curvature;
                    uniform float iTime;

                    varying vec2 vUv;
                    
                    vec2 curve(vec2 uv)
                    {
                        uv = uv * 2.0 - 1.0;
                        vec2 offset = abs(uv.yx) * vec2(curvature.x, curvature.y);
                        uv = uv + uv * offset * offset;
                        uv = uv * 0.5 + 0.5;
                        return uv;
                    }

                    void scanline(inout vec3 color, vec2 uv)
                    {
                        float scanline = clamp( 0.95 + 0.05 * cos( 3.14 * ( uv.y + 0.008 * iTime ) * 240.0 * 1.0 ), 0.0, 1.0 );
                        float grille = 0.85 + 0.15 * clamp( 1.5 * cos( 3.14 * uv.x * 640.0 * 1.0 ), 0.0, 1.0 );    
                        color *= scanline * grille * 1.1;
                    }

                    void vignete(inout vec3 color, vec2 uv)
                    {    
                        float vignette = uv.x * uv.y * ( 1.0 - uv.x ) * ( 1.0 - uv.y );
                        vignette = 1.0 - clamp( pow( 16.0 * vignette, 0.3 ), 0.0, 1.0 );
                        color += color * vignette * .9;
                    }

                    void main() {
                        vec2 uv = curve(vUv);
                        vec4 tex = texture2D( tDiffuse, uv );
                        
                        tex = tex + vec4(.1, .1, .1, 0);

tex = vec4(pow(tex.rgb, vec3(1.0 / .4)), 1.0);
                        scanline(tex.xyz, uv);
                        vignete(tex.xyz, uv);

                        if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0)
                            gl_FragColor = vec4(0.0,0.0,0.0,1.0);
                        else
                            gl_FragColor = tex;
                    }`,
};

function main() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const canvas = document.querySelector("#game");
  const container = document.querySelector("#game_view");
  let game = new Game();

  let scene = new THREE.Scene();
  let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let composer = new EffectComposer(renderer);

  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  let renderPass = new RenderPass(scene, camera);

  const crtShader = new ShaderPass(CRTShader);
  crtShader.uniforms["curvature"].value = [0.3, 0.3];

  let bloomPass = new UnrealBloomPass(
    new THREE.Vector2(WIDTH, HEIGHT),
    1.5,
    0.4,
    0.85,
  );
  bloomPass.threshold = 0.9;
  bloomPass.strength = 0.7;
  bloomPass.radius = 0;

  const outputPass = new OutputPass();

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(crtShader);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  let texture = new THREE.CanvasTexture(canvas);
  let material = new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff });
  let geometry = new THREE.PlaneGeometry(2, 2);
  let plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  let time = 0;

  function update() {
    game.update_logic();
  }

  function render() {
    time += 0.016;
    game.update_render();
    crtShader.uniforms["iTime"].value = time;

    texture.dispose();
    texture = new THREE.CanvasTexture(canvas);
    material.map = texture;
    material.needsUpdate = true;

    // renderer.render(scene, camera);
    composer.render();
    requestAnimationFrame(render);
  }

  setInterval(update, 0.016);
  requestAnimationFrame(render);
}
main();
