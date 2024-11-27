import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

export const CreateInternAdvisorModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="outline">Criar Tutor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Conta</DialogTitle>
          <DialogDescription>
            Crie a conta do Tutor 
          </DialogDescription>
        </DialogHeader>
        <div>
          aaa
        </div>
      </DialogContent>
    </Dialog>
  )
}