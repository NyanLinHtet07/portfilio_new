"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const cities = [
  { name: "Hamburg", lat: 53.5511, lon: 9.9937 },
  { name: "Rotterdam", lat: 51.9244, lon: 4.4777 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createArc(start: THREE.Vector3, end: THREE.Vector3, lift = 0.42) {
  const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1 + lift);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return curve.getPoints(72);
}

function createWorldMapTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const project = (lon: number, lat: number) => [
    ((lon + 180) / 360) * canvas.width,
    ((90 - lat) / 180) * canvas.height,
  ];

  const drawLand = (points: Array<[number, number]>) => {
    ctx.beginPath();
    points.forEach(([lon, lat], index) => {
      const [x, y] = project(lon, lat);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  };

  const drawIsland = (lon: number, lat: number, rx: number, ry: number) => {
    const [x, y] = project(lon, lat);
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#0f172a");
  ocean.addColorStop(0.55, "#172554");
  ocean.addColorStop(1, "#020617");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(96, 165, 250, 0.07)";
  for (let lon = -180; lon <= 180; lon += 20) {
    const [x] = project(lon, 0);
    ctx.fillRect(x, 0, 1, canvas.height);
  }
  for (let lat = -80; lat <= 80; lat += 20) {
    const [, y] = project(0, lat);
    ctx.fillRect(0, y, canvas.width, 1);
  }

  ctx.fillStyle = "rgba(214, 168, 93, 0.74)";

  drawLand([
    [-168, 72], [-140, 70], [-122, 56], [-106, 52], [-92, 48], [-82, 32], [-97, 19],
    [-111, 22], [-123, 33], [-134, 48], [-155, 56],
  ]);
  drawLand([
    [-82, 12], [-70, 8], [-58, -5], [-52, -18], [-58, -36], [-70, -55],
    [-78, -40], [-81, -22], [-88, -5],
  ]);
  drawLand([
    [-74, 82], [-22, 80], [-18, 66], [-42, 60], [-68, 65],
  ]);
  drawLand([
    [-18, 36], [8, 58], [34, 56], [45, 40], [32, 30], [16, 36], [3, 44],
  ]);
  drawLand([
    [-17, 34], [10, 37], [34, 31], [50, 12], [42, -18], [28, -34],
    [14, -35], [2, -20], [-10, 0],
  ]);
  drawLand([
    [33, 70], [84, 68], [122, 55], [145, 48], [136, 30], [104, 22], [78, 8],
    [64, 23], [42, 32], [30, 50],
  ]);
  drawLand([
    [68, 24], [90, 25], [99, 8], [108, -6], [96, -10], [78, 7],
  ]);
  drawLand([
    [112, -10], [154, -18], [153, -38], [132, -43], [114, -28],
  ]);
  drawLand([
    [48, -13], [52, -25], [46, -28], [42, -18],
  ]);

  ctx.fillStyle = "rgba(242, 201, 120, 0.55)";
  drawIsland(-4, 54, 10, 14);
  drawIsland(139, 37, 10, 16);
  drawIsland(122, 12, 13, 18);
  drawIsland(103, 1, 5, 5);
  drawIsland(172, -42, 11, 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  return texture;
}

export default function GlobalRouteGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 4.9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -0.72;
    globeGroup.rotation.x = -0.1;
    scene.add(globeGroup);

    const radius = 1.52;
    const worldMapTexture = createWorldMapTexture();
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: worldMapTexture ?? undefined,
        transparent: true,
        opacity: 0.92,
      }),
    );
    globeGroup.add(shell);

    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const gold = new THREE.Color("#d6a85d");
    const blue = new THREE.Color("#bfdbfe");

    for (let lat = -68; lat <= 72; lat += 5) {
      const pointsAtLat = Math.max(8, Math.floor(34 * Math.cos((lat * Math.PI) / 180)));
      for (let i = 0; i < pointsAtLat; i += 1) {
        const lon = (i / pointsAtLat) * 360 - 180;
        const skip =
          (lon < -132 && lat < -18) ||
          (lon > -25 && lon < 20 && lat < -36) ||
          (lon > 80 && lon < 135 && lat > 42);
        if (skip) continue;

        const point = latLonToVector3(lat, lon, radius + 0.012);
        dotPositions.push(point.x, point.y, point.z);
        const mix = (Math.sin((lat + lon) * 0.08) + 1) / 2;
        const color = blue.clone().lerp(gold, mix * 0.45);
        dotColors.push(color.r, color.g, color.b);
      }
    }

    const dotsGeometry = new THREE.BufferGeometry();
    dotsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    dotsGeometry.setAttribute("color", new THREE.Float32BufferAttribute(dotColors, 3));
    const dots = new THREE.Points(
      dotsGeometry,
      new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
      }),
    );
    globeGroup.add(dots);

    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xf2c978 });
    const markerVectors = cities.map((city) => latLonToVector3(city.lat, city.lon, radius + 0.055));

    markerVectors.forEach((point) => {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.035, 18, 18), markerMaterial);
      marker.position.copy(point);
      globeGroup.add(marker);
    });

    const routeGroup = new THREE.Group();
    for (let i = 0; i < markerVectors.length - 1; i += 1) {
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(createArc(markerVectors[i], markerVectors[i + 1]));
      const route = new THREE.Line(
        arcGeometry,
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? 0xd6a85d : 0xffffff,
          transparent: true,
          opacity: i % 2 === 0 ? 0.78 : 0.38,
        }),
      );
      routeGroup.add(route);
    }
    globeGroup.add(routeGroup);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.08, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0xd6a85d,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
      }),
    );
    globeGroup.add(halo);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const clock = new THREE.Clock();
    let frameId = 0;

    const resize = () => {
      const width = mount.clientWidth || 470;
      const height = mount.clientHeight || 430;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      globeGroup.rotation.y = -0.72 + elapsed * 0.16;
      routeGroup.children.forEach((child, index) => {
        const material = (child as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = (index % 2 === 0 ? 0.62 : 0.28) + Math.sin(elapsed * 1.6 + index) * 0.16;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      dotsGeometry.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      markerMaterial.dispose();
      worldMapTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="globe-card">
      <div ref={mountRef} className="globe-canvas" />
      <div className="globe-labels" aria-hidden="true">
        {cities.map((city, index) => (
          <span key={city.name} className={`globe-label globe-label-${index + 1}`}>
            {city.name}
          </span>
        ))}
      </div>
      <div className="route-caption">
        <span>Global Freight Network</span>
        <strong>Europe · Middle East · Asia Pacific</strong>
      </div>
    </div>
  );
}
