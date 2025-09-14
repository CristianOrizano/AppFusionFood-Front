import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { LoginRequest, LoginResponse } from '@/modules/auth/domain';
import { useNavigate } from 'react-router-dom';
import useLogin from '@/modules/auth/application/useLogin';
import { AxiosError } from 'axios';
import { showError, showSuccess } from '@/core/helpers/toast.helper';
import { LocalStorageSession } from '@/core/sessions';

interface DataMessage {
  message: string;
}
export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const navigate = useNavigate();
  // 1. Schema de validación con Zod
  const formSchema = z.object({
    username: z.string().min(1, 'Usuario requerido'),
    password: z.string().min(3, 'Mínimo 8 caracteres'),
    login: z.string(),
  });

  // 2. Configuración del formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      login: 'dashboard',
    },
  });
  // React Query
  const { mutateAsync, isSuccess, isError } = useLogin();

  // 3. Submit handler
  const loginAuth = async (datalogin: LoginRequest) => {
    console.log('Datos enviados: ', datalogin);
    try {
      const response: LoginResponse = await mutateAsync(datalogin);
      LocalStorageSession.saveAuthorization(response);
      navigate('/dashboard/home');
      showSuccess('Sesion iniciada correctamente');
    } catch (error) {
      const err = error as AxiosError;
      const data = err?.response?.data as DataMessage;
      showError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(loginAuth)}
        className={cn('flex flex-col gap-6 ', className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold ">Iniciar Sesion</h1>
          <p className="text-muted-foreground text-sm text-balance"></p>
        </div>
        <div className="grid gap-7">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese contraseña"
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
            Olvidaste tu constraseña?
          </a>
          <Button type="submit" variant={'outline'} className="bg-rose-500 text-white border-none">
            Ingresar
          </Button>
        </div>
      </form>
    </Form>
  );
}
