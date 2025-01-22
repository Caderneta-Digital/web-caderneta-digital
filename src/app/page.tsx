import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import foto from "../public/aje.svg";

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="flex flex-col justify-center items-start w-full lg:w-1/2 px-6 py-8 lg:px-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
          Aceder à Caderneta Digital
        </h1>

        <Card className="mb-4 w-full">
          <Link href="/login/intern" className="mb-4">
            <CardHeader>
              <h2 className="text-lg lg:text-xl font-medium">Estagiário</h2>
            </CardHeader>
            <CardContent>
              Aceda à sua conta de estagiário e organize as suas tarefas de
              forma simples e eficiente.
            </CardContent>
          </Link>
        </Card>

        <Card className="mb-4 w-full">
          <Link href="/login/supervisor" className="mb-4">
            <CardHeader>
              <h2 className="text-lg lg:text-xl font-medium">Orientador</h2>
            </CardHeader>
            <CardContent>
              Aceda à sua conta de orientador e acompanhe os seus alunos com
              facilidade e eficiência.
            </CardContent>
          </Link>
        </Card>

        <Card className="w-full">
          <Link href="/login/internAdvisor" className="mb-4">
            <CardHeader>
              <h2 className="text-lg lg:text-xl font-medium">Tutor</h2>
            </CardHeader>
            <CardContent>
              Aceda à sua conta de tutor e suporte os seus orientados de forma
              simples e organizada.
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-slate-200">
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