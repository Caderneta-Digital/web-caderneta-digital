import { ArrowLeft, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
//import { SupervisorTypeEnum, UserTypeEnum } from "@/types/userTypes";

type PropsType = {
  title: string;
  goBackUrl?: string;
};

export const Navbar: React.FC<PropsType> = ({ title, goBackUrl }) => {
  const { user, logOut } = useAuth();

  //const isSupervisor = user?.type === UserTypeEnum.SUPERVISOR && user.supervisorType === SupervisorTypeEnum.COURSE_DIRECTOR;

  return (
    <div className="flex justify-between items-center px-10 py-3 border-b-[1px] border-b-gray-300">
      <div className="flex items-center gap-2">
        {goBackUrl && (
          <Link href={goBackUrl}>
            <ArrowLeft />
          </Link>
        )}
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/myAccount">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>A Minha Conta</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/internshipConfigs">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Configurações do Estágio</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
            onClick={logOut}
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sair da Conta</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
