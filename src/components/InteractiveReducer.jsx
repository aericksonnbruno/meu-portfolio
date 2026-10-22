import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import "../styles/InteractiveReducer.css";

function makeMaterial(color, metalness = 0.45, roughness = 0.38, emissive = "#000000") {
  return new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    emissive,
    emissiveIntensity: 0.04,
  });
}

function addMesh(parent, geometry, material, position, focusKey = "housing") {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.focusKey = focusKey;
  parent.add(mesh);
  return mesh;
}

function roundedBox(parent, size, position, material, focusKey = "housing", radius = 0.045) {
  return addMesh(
    parent,
    new RoundedBoxGeometry(size[0], size[1], size[2], 4, radius),
    material,
    position,
    focusKey,
  );
}

function gearGeometry(radius, teeth, thickness) {
  const shape = new THREE.Shape();
  const rootRadius = radius * 0.82;
  const tipRadius = radius;
  const step = (Math.PI * 2) / teeth;
  const offsets = [-0.5, -0.31, -0.2, 0.2, 0.31, 0.5];
  const radii = [rootRadius, rootRadius, tipRadius, tipRadius, rootRadius, rootRadius];

  for (let tooth = 0; tooth < teeth; tooth += 1) {
    offsets.forEach((offset, index) => {
      const angle = (tooth + 0.5) * step + offset * step;
      const point = new THREE.Vector2(
        Math.cos(angle) * radii[index],
        Math.sin(angle) * radii[index],
      );
      if (tooth === 0 && index === 0) shape.moveTo(point.x, point.y);
      else shape.lineTo(point.x, point.y);
    });
  }
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    curveSegments: 2,
  });
  geometry.translate(0, 0, -thickness / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function addBolt(parent, x, y, z, material) {
  const boltGroup = new THREE.Group();
  boltGroup.position.set(x, y, z);
  parent.add(boltGroup);
  const bolt = addMesh(
    boltGroup,
    new THREE.CylinderGeometry(0.043, 0.043, 0.035, 12),
    material,
    [0, 0, 0],
    "housing",
  );
  bolt.rotation.x = Math.PI / 2;
  const slot = roundedBox(
    boltGroup,
    [0.043, 0.008, 0.006],
    [0, 0, 0.021],
    makeMaterial("#283949", 0.6, 0.4),
    "housing",
    0.002,
  );
  slot.rotation.z = -0.35;
}

function addGearAssembly(parent, options) {
  const {
    x,
    y,
    radius,
    teeth,
    gearMaterial,
    hubMaterial,
    shaftMaterial,
    shaftRadius,
    shaftLength,
    focusKey,
  } = options;
  const assembly = new THREE.Group();
  assembly.position.set(x, y, -0.08);
  assembly.userData.basePosition = assembly.position.clone();
  assembly.userData.explodedPosition = new THREE.Vector3(
    x < 0 ? x - 0.23 : x + 0.23,
    y < 0 ? y - 0.10 : y + 0.10,
    x < 0 ? 0.04 : 0.20,
  );
  parent.add(assembly);

  addMesh(assembly, gearGeometry(radius, teeth, 0.14), gearMaterial, [0, 0, 0], "gears");

  const hub = addMesh(
    assembly,
    new THREE.CylinderGeometry(radius * 0.34, radius * 0.34, 0.22, 40),
    hubMaterial,
    [0, 0, 0.11],
    focusKey,
  );
  hub.rotation.x = Math.PI / 2;

  const shaft = addMesh(
    assembly,
    new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLength, 40),
    shaftMaterial,
    [0, 0, 0.19 + shaftLength / 2],
    focusKey,
  );
  shaft.rotation.x = Math.PI / 2;

  const key = roundedBox(
    assembly,
    [shaftRadius * 0.78, shaftRadius * 0.56, shaftLength * 0.40],
    [shaftRadius * 0.85, 0, 0.28 + shaftLength * 0.33],
    hubMaterial,
    focusKey,
    0.012,
  );
  key.material = hubMaterial;

  return assembly;
}

function buildReducer(scene) {
  const model = new THREE.Group();
  scene.add(model);

  const housingMat = makeMaterial("#465b6e", 0.78, 0.32);
  const housingLightMat = makeMaterial("#718696", 0.72, 0.28);
  const darkMat = makeMaterial("#132638", 0.6, 0.34);
  const steelMat = makeMaterial("#c0ccd5", 0.88, 0.22);
  const greenMat = makeMaterial("#31cfa2", 0.68, 0.24, "#063c2e");
  const brassMat = makeMaterial("#b6a16c", 0.76, 0.27);
  const boltMat = makeMaterial("#9baebc", 0.88, 0.24);

  // Rear casing and mounting feet.
  const housing = new THREE.Group();
  housing.userData.focusKey = "housing";
  model.add(housing);
  roundedBox(housing, [2.45, 1.58, 0.30], [0, 0, -0.47], housingMat, "housing", 0.085);
  roundedBox(housing, [1.95, 1.12, 0.055], [0, 0, -0.285], darkMat, "housing", 0.06);

  // Raised reinforcement ribs on the back shell.
  [-0.80, 0.80].forEach((x) => {
    roundedBox(housing, [0.10, 1.02, 0.07], [x, 0, -0.275], housingLightMat, "housing", 0.025);
  });

  // Front frame: left/right posts and top/bottom rails, leaving the gears visible.
  const frontFrame = new THREE.Group();
  model.add(frontFrame);
  roundedBox(frontFrame, [2.48, 0.20, 0.66], [0, 0.72, -0.02], housingLightMat, "housing", 0.045);
  roundedBox(frontFrame, [2.48, 0.20, 0.66], [0, -0.72, -0.02], housingLightMat, "housing", 0.045);
  roundedBox(frontFrame, [0.21, 1.30, 0.66], [-1.13, 0, -0.02], housingMat, "housing", 0.045);
  roundedBox(frontFrame, [0.21, 1.30, 0.66], [1.13, 0, -0.02], housingMat, "housing", 0.045);

  // Bearing collars face the viewer around the two shaft openings.
  const bearingMaterial = makeMaterial("#9aaebb", 0.88, 0.23);
  const bearingCenters = [
    { x: -0.40, y: 0.12, r: 0.22, focus: "input" },
    { x: 0.40, y: -0.12, r: 0.29, focus: "output" },
  ];
  bearingCenters.forEach(({ x, y, r, focus }) => {
    const ring = addMesh(
      frontFrame,
      new THREE.RingGeometry(r * 0.60, r, 48),
      bearingMaterial,
      [x, y, 0.32],
      focus,
    );
    ring.material.side = THREE.DoubleSide;
    const innerRing = addMesh(
      frontFrame,
      new THREE.RingGeometry(r * 0.40, r * 0.52, 48),
      greenMat,
      [x, y, 0.325],
      focus,
    );
    innerRing.material.side = THREE.DoubleSide;
  });

  // Gear assemblies use a conceptual ratio to demonstrate direction and speed change.
  const inputAssembly = addGearAssembly(model, {
    x: -0.40,
    y: 0.12,
    radius: 0.34,
    teeth: 14,
    gearMaterial: steelMat,
    hubMaterial: greenMat,
    shaftMaterial: steelMat,
    shaftRadius: 0.075,
    shaftLength: 0.43,
    focusKey: "input",
  });
  const outputAssembly = addGearAssembly(model, {
    x: 0.40,
    y: -0.12,
    radius: 0.50,
    teeth: 22,
    gearMaterial: brassMat,
    hubMaterial: housingLightMat,
    shaftMaterial: steelMat,
    shaftRadius: 0.105,
    shaftLength: 0.66,
    focusKey: "output",
  });

  // A removable top inspection cover.
  const topCover = new THREE.Group();
  topCover.position.set(0, 0.88, -0.12);
  model.add(topCover);
  roundedBox(topCover, [1.04, 0.20, 0.72], [0, 0, 0], housingLightMat, "housing", 0.055);
  roundedBox(topCover, [0.48, 0.055, 0.37], [0, 0.12, 0], housingMat, "housing", 0.025);
  const breather = addMesh(
    topCover,
    new THREE.CylinderGeometry(0.075, 0.085, 0.10, 20),
    boltMat,
    [0.30, 0.16, 0],
    "housing",
  );
  breather.rotation.x = 0;
  [-0.39, 0.39].forEach((x) => addBolt(topCover, x, 0, 0.37, boltMat));

  // Four visible fasteners on the front frame.
  [-1.03, 1.03].forEach((x) => {
    [-0.62, 0.62].forEach((y) => addBolt(frontFrame, x, y, 0.33, boltMat));
  });

  // Mounting feet and base pads.
  const feet = new THREE.Group();
  feet.userData.focusKey = "housing";
  model.add(feet);
  [-0.76, 0.76].forEach((x) => {
    roundedBox(feet, [0.54, 0.17, 0.74], [x, -0.88, -0.27], housingMat, "housing", 0.035);
    roundedBox(feet, [0.44, 0.055, 0.60], [x, -0.99, -0.27], darkMat, "housing", 0.02);
    [-0.15, 0.15].forEach((z) => addBolt(feet, x, -0.785, z - 0.27, boltMat));
  });

  // Low display plinth and a thin teal accent ring.
  const plinthMat = makeMaterial("#14283a", 0.72, 0.34);
  const plinth = addMesh(
    model,
    new THREE.CylinderGeometry(1.48, 1.52, 0.085, 72),
    plinthMat,
    [0, -1.105, -0.14],
    "housing",
  );
  plinth.castShadow = false;
  const ring = addMesh(
    model,
    new THREE.RingGeometry(1.32, 1.36, 72),
    greenMat,
    [0, -1.059, -0.14],
    "housing",
  );
  ring.rotation.x = -Math.PI / 2;
  ring.material.side = THREE.DoubleSide;
  ring.castShadow = false;

  // Add small external inspection details on the housing sides.
  [-1.0, 1.0].forEach((x) => {
    const rib = roundedBox(housing, [0.065, 0.70, 0.08], [x, -0.03, -0.235], housingLightMat, "housing", 0.018);
    rib.rotation.z = x < 0 ? -0.10 : 0.10;
  });

  return { model, frontFrame, topCover, inputAssembly, outputAssembly };
}

const InteractiveReducer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x071321, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "reducer-canvas";
    renderer.domElement.setAttribute("aria-label", "Interactive 3D model. Use the mouse or touch to rotate and zoom.");
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(3.35, 2.35, 4.65);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.65;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 3.4;
    controls.maxDistance = 7.2;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.target.set(0, -0.02, -0.05);
    controls.update();

    scene.add(new THREE.HemisphereLight(0xd8efff, 0x172332, 2.0));
    const keyLight = new THREE.DirectionalLight(0xf0f7ff, 3.2);
    keyLight.position.set(-3.5, 5, 4.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x4caeff, 2.2);
    rimLight.position.set(4, 2.5, -3.5);
    scene.add(rimLight);
    const greenLight = new THREE.PointLight(0x24e6ae, 16, 5.5, 2);
    greenLight.position.set(0.3, 0.9, 2.0);
    scene.add(greenLight);

    const parts = buildReducer(scene);

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let animationFrame = 0;
    let previousTime = 0;
    const animate = (timestamp) => {
      animationFrame = window.requestAnimationFrame(animate);
      const delta = previousTime ? Math.min((timestamp - previousTime) / 1000, 0.05) : 0;
      previousTime = timestamp;
      parts.inputAssembly.rotation.z += delta * 1.35;
      parts.outputAssembly.rotation.z -= delta * 1.35 * (14 / 22);

      controls.update();
      renderer.render(scene, camera);
    };
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material?.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="hero-card interactive-reducer-card reducer-model-only"
      aria-label="Interactive 3D model"
    >
      <div ref={mountRef} className="reducer-canvas-mount" />
    </div>
  );
};

export default InteractiveReducer;
