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

type PropsType = {
  title: string;
  goBackUrl?: string
};

export const Navbar: React.FC<PropsType> = ({ title, goBackUrl }) => {
  const { user, logOut } = useAuth();

  return (
    <div className="flex justify-between items-center px-5 py-3 border-b-[1px] border-b-gray-300">
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
          <DropdownMenuItem>
            <Link href="/myAccount">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Minha conta</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/internshipConfigs">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Configurações do Estágio</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-600"
            onClick={logOut}
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
