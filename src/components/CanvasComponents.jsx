import { OrbitControls, PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import * as random from "maath/random/dist/maath-random.esm";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ⭐ Star Background Component
const StarBackground = () => {
  const ref = useRef();
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    const coords = random.inSphere(positions, { radius: 1.2 });
    return coords;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="white"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// ⭐ Stars Canvas Wrapper
export const StarsCanvas = () => (
  <>
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black z-[-1]" />
    <div className="fixed top-0 w-full h-[50vh] z-[2] mix-blend-screen">
      <div className="relative w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src="/blackhole.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
    <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  </>
);

// ⭐ 3D Model Component
const Model = () => {
  const gltf = useLoader(GLTFLoader, "/models/robot.glb");
  const modelRef = useRef();
  const [currentSection, setCurrentSection] = useState("hero");

  const positions = {
    hero: {
      position: new Vector3(7, 0, 0),
      rotation: [0, -Math.PI / 4, 0],
      scale: 11
    },
    services: {
      position: new Vector3(-7, 0, 0),
      rotation: [0, Math.PI / 2, 0],
      scale: 11
    },
    about: {
      position: new Vector3(4, 0, -2),
      rotation: [0, -Math.PI / 3, 0],
      scale: 12
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollPosition / documentHeight;

      if (modelRef.current) {
        let targetPosition, targetRotation, targetScale;

        if (progress < 0.33) {
          const t = gsap.parseEase("power2.inOut")(progress / 0.33);
          targetPosition = new Vector3().lerpVectors(
            positions.hero.position,
            positions.services.position,
            t
          );
          targetRotation = positions.hero.rotation.map((start, i) => 
            start + (positions.services.rotation[i] - start) * t
          );
          targetScale = positions.hero.scale + (positions.services.scale - positions.hero.scale) * t;
        } else if (progress < 0.66) {
          const t = gsap.parseEase("power2.inOut")((progress - 0.33) / 0.33);
          targetPosition = new Vector3().lerpVectors(
            positions.services.position,
            positions.about.position,
            t
          );
          targetRotation = positions.services.rotation.map((start, i) => 
            start + (positions.about.rotation[i] - start) * t
          );
          targetScale = positions.services.scale + (positions.about.scale - positions.services.scale) * t;
        } else {
          targetPosition = positions.about.position;
          targetRotation = positions.about.rotation;
          targetScale = positions.about.scale;
        }

        modelRef.current.position.lerp(targetPosition, 0.1);
        
        modelRef.current.rotation.x += (targetRotation[0] - modelRef.current.rotation.x) * 0.1;
        modelRef.current.rotation.y += (targetRotation[1] - modelRef.current.rotation.y) * 0.1;
        modelRef.current.rotation.z += (targetRotation[2] - modelRef.current.rotation.z) * 0.1;
        
        const currentScale = modelRef.current.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.1;
        modelRef.current.scale.set(newScale, newScale, newScale);
      }
    };

    let animationFrame;
    const animate = () => {
      handleScroll();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  useFrame((state, delta) => {
    if (modelRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      modelRef.current.position.y = floatY;
      
      modelRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={positions.hero.position}
      rotation={positions.hero.rotation}
      scale={positions.hero.scale}
      castShadow
      receiveShadow
    />
  );
};

// ⭐ Model Canvas Wrapper
export const ModelCanvas = () => (
  <div className="w-full h-screen fixed inset-0 z-[10] pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 15], fov: 35 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      shadows
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Model />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  </div>
);
