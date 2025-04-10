"use client";

import Sidebar from "@/components/layouts/Sidebar";
import dynamic from "next/dynamic";
import { useState } from "react";

const MapView = dynamic(() => import("@/components/common/MapView"), {
  ssr: false,
});

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex">
      <Sidebar onSelect={setSelected} />
      <MapView selected={selected} />
    </div>
  );
}
