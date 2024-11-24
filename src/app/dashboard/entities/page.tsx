"use client";

import { SupervisorDashboardOverview } from "./components/overview";
import React from "react";
import { Navbar } from "@/components/ui/navbar";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen">
      <Navbar title="O seu dashboard" />

      <div className="px-4 py-3 flex flex-col gap-4">
        <SupervisorDashboardOverview />
      </div>
    </div>
  );
}

