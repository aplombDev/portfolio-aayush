import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

// Type definitions for your GLTF model
type ComputerNodes = {
    Cube000_ComputerDesk_0001_1: THREE.Mesh;
    Cube000_ComputerDesk_0001_2: THREE.Mesh;
};

type ComputerMaterials = {
    "ComputerDesk.001": THREE.Material;
    "FloppyDisk.001": THREE.Material;
};

type ComputerGLTF = {
    nodes: ComputerNodes;
    materials: ComputerMaterials;
};

export function Computer(props: ThreeElements['group']) {
    const { nodes, materials } = useGLTF(
        "/models/computer-optimized-transformed.glb"
    ) as unknown as ComputerGLTF;

    return (
        <group {...props} dispose={null}>
            <group position={[-4.005, 67.549, 58.539]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
                    material={materials["ComputerDesk.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
                    material={materials["FloppyDisk.001"]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");