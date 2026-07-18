"use client";

import { useApp } from "@/context/app-context";
import { GravityMeshVisualizer } from "@/components/visualizer/gravity-mesh-visualizer";

export function VJView() {
  const { audioAnalyser } = useApp();
  return <GravityMeshVisualizer audioAnalyser={audioAnalyser} />;
}
