"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { InputEditLine } from "@/components/ui/inputEditLine";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/ui/navbar";
import { useAuth } from "@/context/AuthContext";
import { Api } from "@/services/api";
import { InternshipConfigType } from "@/types/internshipConfigTypes";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function InternshipConfigsPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: internshipConfigs, isLoading } = useQuery({
    queryKey: ["internshipConfigs"],
    queryFn: async () => {
      const response = await Api.findInternshipConfig()
      return response
    }
  })

  const { mutateAsync: updateInternshipConfig, isLoading: isLoadingUpdateConfig } = useMutation({
    mutationKey: ["updateInternshipConfig"],
    mutationFn: async (data: InternshipConfigType) => {
      const response = await Api.updateInternshipConfig(data)
      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["internshipConfigs"])
    }
  })

  const handleUpdatePeriodTotalHours = async (periodConfig: InternshipConfigType) => {
    await updateInternshipConfig(periodConfig)
  }


  if (!internshipConfigs || isLoading) {
    return <h1>A Carregar...</h1>
  }

  const firstPeriod = internshipConfigs.find(config => config.period === "11") as InternshipConfigType
  const secondPeriod = internshipConfigs.find(config => config.period === "12") as InternshipConfigType

  return (
    <div className="w-screen h-screen">
      <Navbar title="Configurações do Estágio" goBackUrl={`/dashboard/${user?.type}`}/>

      <div className="px-4 py-3 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Configure aqui os parâmetros do estágio para o curso que direges</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div>
              <Label>Horas do primeiro período</Label>
              <InputEditLine
                isLoading={isLoadingUpdateConfig}
                value={firstPeriod.totalHours.toString() || ""}
                onConfirmEdit={newValue => handleUpdatePeriodTotalHours({ ...firstPeriod, totalHours: Number(newValue) })} />
            </div>
            <div>
              <Label>Horas do segundo período</Label>
              <InputEditLine
                value={secondPeriod.totalHours.toString() || ""}
                isLoading={isLoadingUpdateConfig}
                onConfirmEdit={newValue => handleUpdatePeriodTotalHours({ ...secondPeriod, totalHours: Number(newValue) })} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}