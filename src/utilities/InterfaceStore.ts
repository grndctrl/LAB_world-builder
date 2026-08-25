import * as THREE from 'three';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

import { ClusterRef, ClusterType, Material } from '@components/Cluster';

interface InterfaceStore {
  isPointerDown: boolean;

  pointerDownStart: THREE.Vector2;

  isPointerDragging: boolean;

  togglePointerDown: (toggle: boolean) => void;

  togglePointerDragging: (toggle: boolean) => void;

  setPointerDownStart: (x: number, y: number) => void;

  //

  isWorldInteractive: boolean;

  toggleWorldInteractive: (toggle: boolean) => void;

  intersection: THREE.Intersection | null;

  setIntersection: (intersection: THREE.Intersection | null) => void;

  //

  pointerBlockPosition: THREE.Vector3 | null;

  setPointerBlockPosition: (position: THREE.Vector3) => void;

  //

  currentMaterial: Material;

  setMaterial: (material: Material) => void;
}

const state: StateCreator<InterfaceStore> = (set, get) => ({
  isPointerDown: false,

  pointerDownStart: new THREE.Vector2(0, 0),

  isPointerDragging: false,

  togglePointerDown: (toggle) => set(() => ({ isPointerDown: toggle })),

  togglePointerDragging: (toggle) => set(() => ({ isPointerDragging: toggle })),

  setPointerDownStart: (x, y) => set(() => ({ pointerDownStart: new THREE.Vector2(x, y) })),

  //

  isWorldInteractive: true,

  toggleWorldInteractive: (toggle: boolean) => set(() => ({ isWorldInteractive: toggle })),

  intersection: null,

  setIntersection: (intersection) => set(() => ({ intersection: intersection })),

  //

  pointerBlockPosition: null,

  setPointerBlockPosition: (position) => set(() => ({ pointerBlockPosition: position })),

  //

  currentMaterial: Material.ROCK,

  setMaterial: (material) => set(() => ({ currentMaterial: material })),
});

const useInterfaceStore = create<InterfaceStore>()(
  devtools(state, { name: 'Interface Store', enabled: process.env.NODE_ENV === 'development' })
);

// The hook returned by `create` is also the vanilla store API, so non-React
// callers can keep using `interfaceStore.getState()`.
const interfaceStore = useInterfaceStore;

export { interfaceStore, useInterfaceStore };
