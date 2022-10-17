import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

// 20:00

export default function Player() {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 5, 0],
  }));

  const position = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      position.current = p;
    });
  }, [api.position]);

  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((p) => {
      vel.current = p;
    });
  }, [api.velocity]);
  

  useFrame(() => {
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2])
    );
  });

  return <mesh ref={ref}></mesh>;
}
