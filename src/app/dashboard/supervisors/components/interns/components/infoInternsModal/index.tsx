import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const InfoInternsModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline">Mais Informações</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Estagiário</DialogTitle>
                </DialogHeader>
                <div>
                    <h1 className="text-gray-600">Nome</h1>
                    <h1>André Ferreira</h1>
                </div>

                <div>
                    <h1 className="text-gray-600">Email</h1>
                    <p>andreferreira@gmail.com</p>
                </div>
                

                    {/* Botão de Submissão */}
                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                        Editar
                    </Button>
            </DialogContent>
        </Dialog>
    )
}