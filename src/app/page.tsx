import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react"; // Ícone para as setas
import foto from "../public/aje.svg";

export default function HomePage() {
  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full bg-white">
      {/* Logo no topo para mobile */}
      <div className="relative w-full h-48 lg:hidden">
        <Image
          src={foto}
          alt="Caderneta Digital Overview"
          className="object-cover object-center scale-130" // Amplia a imagem e centraliza
          layout="fill"
        />
      </div>

      {/* Cards de Acesso */}
      <div className="flex flex-col justify-center items-start w-full lg:w-1/2 px-6 py-8 lg:px-10 pt-12 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
          Aceder à Caderneta Digital
        </h1>

        <Card className="relative mb-4 w-full">
          <Link href="/login/intern" className="mb-4">
            <CardHeader>
              <h2 className="text-lg lg:text-xl font-medium">Estagiário</h2>
            </CardHeader>
            <CardContent>
              Aceda à sua conta de estagiário e organize as suas tarefas de
              forma simples e eficiente.
            </CardContent>
          </Link>
          <ChevronRight className="absolute top-1/2 right-4 transform -translate-y-1/2 text-neutral-950" />
        </Card>

        <Card className="relative mb-4 w-full">
          <Link href="/login/supervisor" className="mb-4">
            <CardHeader>
              <h2 className="text-lg lg:text-xl font-medium">Orientador</h2>
            </CardHeader>
            <CardContent>
              Aceda à sua conta de orientador e acompanhe os seus alunos com
              facilidade e eficiência.
            </CardContent>
          </Link>
          <ChevronRight className="absolute top-1/2 right-4 transform -translate-y-1/2 text-neutral-950" />
        </Card>

        <Card className="relative w-full">
          <Link href="/login/internAdvisor" className="mb-4">
            <CardHeader>
              <h2 className="text-lg lg:text-xl font-medium">Tutor</h2>
            </CardHeader>
            <CardContent>
              Aceda à sua conta de tutor e suporte os seus orientados de forma
              simples e organizada.
            </CardContent>
          </Link>
          <ChevronRight className="absolute top-1/2 right-4 transform -translate-y-1/2 text-neutral-950" />
        </Card>
      </div>

      {/* Imagem lateral para desktop */}
      <div className="relative hidden lg:block w-full lg:w-1/2 h-full bg-slate-200">
        <Image
          src={foto}
          alt="Caderneta Digital Overview"
          className="object-cover"
          layout="fill"
        />
      </div>
    </div>
  );
}