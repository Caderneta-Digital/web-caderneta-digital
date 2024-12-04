import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Card, CardContent } from "@/components/ui/card";
  
  export const InternGrades11anoInfo = () => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" size="sm">
            Ver Mais
          </Button>{" "}
        </DialogTrigger>
        <DialogContent className="h-[500px] overflow-auto w-11/12">
          <DialogHeader>
            <DialogTitle>Avaliação Final do Tutor/Professor Orientador</DialogTitle>
          </DialogHeader>
          <DialogDescription>Avaliação Final do 11º Ano</DialogDescription>
          <Card className="max-w-md mb-3">
            <CardContent className="p-6 space-y-2">
              <p>
                <b>Nota:</b>
              </p>
              <p>1 = 0 a 44 (Muito Insuficiente)</p>
              <p>2 = 45 a 94 (Insuficiente)</p>
              <p>3 = 95 a 134 (Suficiente)</p>
              <p>4 = 135 a 174 (Bom)</p>
              <p>5 = 175 a 200 (Muito Bom)</p>
            </CardContent>
          </Card>
          <Label className="text-lg">Trabalho Prático (80%)</Label>
          <DialogDescription className="text-sm">
            Processo de Trabalho na FCT
          </DialogDescription>
          <div>
            <Label>Participação</Label>
            <p className="text-neutral-500 text-sm">(Interesse, Integração)</p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Autonomia</Label>
            <p className="text-neutral-500 text-sm">
              (Iniciativa, Adaptabilidade)
            </p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Responsabilidade</Label>
            <p className="text-neutral-500 text-sm">
              (Cumprimento de Tarefas, Recetivo, Trabalho em Equipa)
            </p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Relacionamento</Label>
            <p className="text-neutral-500 text-sm">
              (Assiduidade, Pontualidade, Higiene e Segurança no Trabalho)
            </p>
            <h1>?</h1>
          </div>
  
          <Label className="text-lg">
            Conceptualização/Compreensão/Aplicação (20%)
          </Label>
          <DialogDescription className="text-sm">
            Relatório de FCT
          </DialogDescription>
          <div>
            <Label>Pertinência</Label>
            <p className="text-neutral-500 text-sm">
              (Seleciona e recorre a informação e meios descritores da entidade)
            </p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Rigor</Label>
            <p className="text-neutral-500 text-sm">
              (Clareza, Coerência, Objetividade){" "}
            </p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Estruturação</Label>
            <p className="text-neutral-500 text-sm">
              (Respeita a estrutura do relatório e a formatação textual){" "}
            </p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Reflexão</Label>
            <p className="text-neutral-500 text-sm">
              (Argumenta, apresenta Conclusões da FCT){" "}
            </p>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Avaliação Final</Label>
            <h1>?</h1>
          </div>
  
          <div>
            <Label>Data</Label>
            <h1>?</h1>
          </div>
        </DialogContent>
      </Dialog>
    );
  };