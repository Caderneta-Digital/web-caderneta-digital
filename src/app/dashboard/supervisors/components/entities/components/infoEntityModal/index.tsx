import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputEditLine } from "@/components/ui/inputEditLine";

export const InfoEntityModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline">Mais Informações</Button>
            </DialogTrigger>
            <DialogContent className="h-[500px] overflow-auto">
                <DialogHeader>
                <DialogTitle>Entidade de Acolhimento</DialogTitle>
                </DialogHeader>
                <div>
                    <Label className="text-gray-600">Nome</Label>
                    <h1>HitEcossystem</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Nome do Responsável</Label>
                    <h1>Ricardo Rocha</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Ramo de Atividade</Label>
                    <h1>Desenvolvimento Software</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Tutores de FCT</Label>
                    <h1>Fábio Afonso</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Cargo que desempenha na empresa</Label>
                    <h1>Programador</h1>
                </div>

                <div>
                    <Label className="text-gray-600">NIF</Label>
                    <h1>000000000</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Endereço</Label>
                    <h1>Rua da Estrada Velha, Meadela, 393</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Telefone</Label>
                    <h1>000 000 000</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Email</Label>
                    <h1>info@hitecossytem.com</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Estagiários Inseridos</Label>
                    <h1>Fábio Pereira, Rita Saramago</h1>
                </div>

                <div>
                    <Label className="text-gray-600">Estado</Label>
                    <InputEditLine value="Ativo"/>
                </div>
            </DialogContent>
        </Dialog>
    )
}