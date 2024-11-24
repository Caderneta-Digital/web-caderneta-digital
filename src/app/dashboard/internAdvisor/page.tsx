"use client";

import { InternAdvisorDashboardOverview } from "./components/overview";
import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { Api } from "@/services/api";
import { Navbar } from "@/components/ui/navbar";

export default function Dashboard() {
  const { user: internAdvisor } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["internAdvisorDashboard", internAdvisor?.id],
    queryFn: async () => {
      const response = await Api.internAdvisorDashboard();
      return response;
    },
  });

  if (!data || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title="O seu dashboard" />
      <div className="px-4 py-3 flex flex-col gap-4">
        <InternAdvisorDashboardOverview interns={data.interns} />
      </div>
    </div>
  );
}
