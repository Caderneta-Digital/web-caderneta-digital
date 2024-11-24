import * as React from "react"

import { cn } from "@/lib/utils"
import { Check, Pencil } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    value:string
  }

const InputEditLine:React.FC<InputProps> = (({value, className, type, ...props }) => {
  console.log(className)
    const [shouldShowInput, setShouldShowInput] = React.useState<boolean>(false);
    // const [inputValue, setInputValue] = React.useState<string>(value);
    const inputRef = React.useRef<HTMLDivElement>(null);

    console.log(inputRef)

    React.useEffect(() => {
        console.log("olaa");
        const handleClickOutside = (event: MouseEvent) => {
          if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node)
          ) {
            setShouldShowInput(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <div ref={inputRef}>
            {
                shouldShowInput ? (
                    <div className="flex items-center justify-between">
                        <input
                            type={type}
                            className={cn(
                            "flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            )}
                            value={value}
                            {...props}
                        />
                        <div className="h-8 border border-neutral-200 p-2 ml-2 rounded-md flex items-center justify-center hover:bg-neutral-200 transition duration-200 cursor-pointer">
                            <Check size={20}></Check>
                        </div>
                    </div>

                ): (
                    <div onClick={() => setShouldShowInput(true)} className="flex items-center justify-between cursor-pointer">
                        <h1>{value}</h1>
                        <Pencil size={20}></Pencil>
                    </div>
                )
            }
        </div>
    )
  }
)

export { InputEditLine }