export const handleError = (err: unknown, toast: any)=> {
  const error = err as any;
  toast({
    variant: "destructive",
    title: "Um erro aconteceu.",
    description: error?.response?.data?.message as string,
  });
};
