import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ShaderCubeChrome } from "../vfx-library/ShaderCubeChrome";

export function RainbowClassic() {
  let refRainbow = useRef();
  let { gl, scene } = useThree();

  useEffect(() => {
    refRainbow.current = new ShaderCubeChrome({ renderer: gl });

    // let orig = scene.background;
    // scene.background = refRainbow.current.out.envMap;

    return () => {
      // scene.background = orig;
    };
  }, []);

  let time = 0;
  useFrame((st, dt) => {
    time += dt;
    if (refRainbow.current) {
      refRainbow.current.compute({ time });
    }
  });

  useFrame(() => {
    if (refRainbow.current) {
      let texture = refRainbow.current.out.texture;

      scene.traverse((it) => {
        if (it.material && it.userData.useRainbow && !it.___applied) {
          it.___applied = true;
          it.material.map = texture;
        }
      });
    }
  });

  return null;
}
