import { LogOut, User } from "lucide-react";
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

type PropsType = {
  title: string;
};

export const Navbar: React.FC<PropsType> = ({ title }) => {
  const { user, logOut } = useAuth();

  return (
    <div className="flex justify-between items-center px-5 py-3 border-b-[1px] border-b-gray-300">
      <h1 className="font-bold text-2xl">{title}</h1>
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
            <User className="mr-2 h-4 w-4" />
            <span>Minha conta</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-600"
            onClick={logOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
