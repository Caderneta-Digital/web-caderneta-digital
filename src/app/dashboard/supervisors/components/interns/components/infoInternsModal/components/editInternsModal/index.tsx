import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const EditInternsModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                {/* Botão de Submissão */}
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                        Editar
                    </Button>
            </DialogTrigger>
            <DialogContent className="h-[500px] overflow-auto">
                <DialogHeader>
                <DialogTitle>Estagiário</DialogTitle>
                </DialogHeader>
                <div>
                    <Label className="text-gray-600">Nome</Label>
                    <h1>André Ferreira</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Email</Label>
                    <h1>andreferreira@gmail.com</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Curso</Label>
                    <h1>GPSI</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Classificação</Label>
                    <h1>18</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Horas Restantes</Label>
                    <h1>172</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Registos Semanais</Label>
                    <h1>7</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Entidade de Acolhimento</Label>
                    <h1>Continente</h1>
                </div>

                <div>
                    <Label className="text-gray-600">CC Nº</Label>
                    <h1>000000000</h1>
                </div>

                <div>
                    <Label className="text-gray-600">NIF</Label>
                    <h1>0000000000</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Endereço</Label>
                    <h1>Rua da Estrada Velha, Meadela, 393</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Código Postal</Label>
                    <h1>4925-572</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Pai</Label>
                    <h1>Luís Marques Mendes</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Mãe</Label>
                    <h1>Antónia Reis Brito</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Observações</Label>
                    <h1>N/A</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Estado</Label>
                    <h1>Ativo</h1>
                </div>
                

                    {/* Botão de Submissão */}
                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                        Editar
                    </Button>
            </DialogContent>
        </Dialog>
    )
}