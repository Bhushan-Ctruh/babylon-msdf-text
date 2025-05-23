import "./style.css";
import * as BABYLON from "@babylonjs/core";
import { createTextMesh, TextMeshOptions } from "babylon-msdf-text";
import fnt from "../fontAssets/roboto-regular.json";
import png from "../fontAssets/roboto-regular.png";

const PARAMS: Partial<TextMeshOptions> = {
  text: "Hello Babylon",
  lineHeight: 1,
  letterSpacing: 0,
  width: 2500,
  align: "left",
  opacity: 1,
  color: new BABYLON.Color3(1, 0, 0),
};

const initCamera = (scene: BABYLON.Scene) => {
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  camera.attachControl(true);
  camera.setPosition(new BABYLON.Vector3(0, 0, -600));
  return camera;
};

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

if (!canvas) throw new Error("No canvas found");

const engine = new BABYLON.Engine(canvas);

const createScene = function (engine: BABYLON.Engine) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
  //CAMERA
  initCamera(scene);

  return scene;
};

const scene = createScene(engine);

const atlasTex = new BABYLON.Texture(png, scene);

const textMesh = createTextMesh(
  "textMesh",
  {
    font: fnt,

    atlas: atlasTex,
    text: "Hello",
    strokeColor: new BABYLON.Color3(1, 1, 0),
    strokeWidth: 0.5,
    ...PARAMS,
  },
  scene
);

const bb = textMesh.getBoundingInfo().boundingBox;
const width = bb.maximumWorld.x - bb.minimumWorld.x;
const height = bb.maximumWorld.y - bb.minimumWorld.y;

textMesh.position.x = -width / 2;
textMesh.position.y = -height / 2;

const instance1 = textMesh.createInstance("instance");

instance1.position.y = 50;
instance1.material = textMesh.material;

const textMesh2 = createTextMesh(
  "textMesh2",
  {
    font: fnt,
    atlas: atlasTex,
    text: "BYE",
    strokeColor: new BABYLON.Color3(1, 1, 0),
    strokeWidth: 0.5,
    color: new BABYLON.Color3(1, 0, 1),
  },
  scene
);

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});

//GUI PANEL
// const pane = new Pane();

// const lineHeightInput = pane.addBinding(PARAMS, "lineHeight", {
//   min: 1,
//   max: 10,
//   step: 0.1,
// });

// const textInput = pane.addBinding(PARAMS, "text");

// const letterSpacingInput = pane.addBinding(PARAMS, "letterSpacing", {
//   min: 0,
//   max: 100,
//   step: 0.1,
// });

// const widthInput = pane.addBinding(PARAMS, "width", {
//   min: 100,
//   max: 5000,
//   step: 10,
// });

// const alignInput = pane.addBinding(PARAMS, "align", {
//   options: { Left: "left", Center: "center", Right: "right" },
// });

// const colorInput = pane.addBinding(PARAMS, "color", {
//   color: { type: "float" },
// });
// const opacityInput = pane.addBinding(PARAMS, "opacity", {
//   min: 0,
//   max: 1,
//   step: 0.1,
// });

// const updateMesh = () => {
//   textGeo.dispose();
//   textGeo = createTextMesh({
//     text: `hello`,
//     font: fnt,
//     atlas: png,
//     scene,
//     engine,
//     color: new BABYLON.Color3(1, 0, 0),
//     width: 2500,
//     ...PARAMS,
//   });

//   textGeo.position.x = -textGeo.getBoundingInfo().boundingBox.center.x / 2;
//   textGeo.position.y = textGeo.getBoundingInfo().boundingBox.center.y / 2;
// };

// lineHeightInput.on("change", (e) => {
//   updateMesh();
// });

// textInput.on("change", (e) => {
//   updateMesh();
// });

// widthInput.on("change", (e) => {
//   updateMesh();
// });

// letterSpacingInput.on("change", (e) => {
//   updateMesh();
// });

// alignInput.on("change", (e) => {
//   updateMesh();
// });

// colorInput.on("change", (e) => {
//   updateMesh();
// });

// opacityInput.on("change", (e) => {
//   updateMesh();
// });
