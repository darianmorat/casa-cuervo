import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./ui/form";
import { EyeIcon, EyeOffIcon, Lock, User } from "lucide-react";
import { useState } from "react";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
   email: z.email({ message: "Email invalido" }),
   password: z.string().min(1, { message: "Contraseña invalida" }),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
   const [showPassword, setShowPassword] = useState(false);

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      // authenticate(values.email, values.password);
      console.log(values);
   };

   const toggleShowPassword = () => {
      setShowPassword(!showPassword);
   };

   return (
      <Form {...form}>
         <form
            {...props}
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
         >
            <Card>
               <CardHeader className="text-center">
                  <CardTitle className="text-lg font-bold uppercase">
                     Acceso de Administrador
                  </CardTitle>
                  <CardDescription>
                     Ingresa tus credenciales para acceder al panel de administración
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid gap-6">
                     <FormField
                        control={form.control}
                        name="email"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <User
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input {...field} className="pl-10" />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="password"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Contraseña</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Lock
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />

                                    <Input
                                       type={showPassword ? "text" : "password"}
                                       {...field}
                                       className="pl-10"
                                    />
                                    <Button
                                       type="button"
                                       variant={"ghost"}
                                       className="absolute right-0 top-0 text-muted-foreground"
                                       onClick={() => toggleShowPassword()}
                                       // disabled={isLoading}
                                    >
                                       {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                    </Button>
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit" className="w-full" /* disabled={isLoading} */>
                        {/* {isLoading ? "Iniciando Sesión..." : "Inicio Sesión"} */}
                        Acceder
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </form>
      </Form>
   );
}
