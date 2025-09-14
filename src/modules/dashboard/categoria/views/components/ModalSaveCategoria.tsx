import React, { useEffect, useState } from 'react';
import { CategoriaRequest, CategoriaResponse } from '../../domain';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategoriaCreate, useCategoriaUpdate } from '../../application';
import { showError, showSuccess } from '@/core/helpers/toast.helper';
import { Loader2 } from 'lucide-react';

interface ModalSaveCategoriaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: CategoriaResponse;
}
const ModalSaveCategoria: React.FC<ModalSaveCategoriaProps> = ({ open, onOpenChange, data }) => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: mutateAsyncCreate } = useCategoriaCreate();
  const { mutateAsync: mutateAsyncEdit } = useCategoriaUpdate();

  const formSchema: z.ZodType<CategoriaRequest> = z.object({
    nombre: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
    descripcion: z
      .string()
      .min(5, 'La descripción debe tener al menos 5 caracteres')
      .max(200, 'La descripción no puede superar los 200 caracteres'),
    nombreImg: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      nombreImg: '',
    },
  });

  useEffect(() => {
    if (data != undefined) {
      form.reset({
        nombre: data.nombre ?? '',
        descripcion: data.descripcion ?? '',
        nombreImg: data.nombreImg ?? '',
      });
    } else {
      form.reset({
        nombre: '',
        descripcion: '',
        nombreImg: '',
      });
    }
    console.log('entro aqui en save categoria', data);
  }, [data, form]);

  const saveCategoria = async (payload: CategoriaRequest) => {
    try {
      setLoading(true);

      if (data) {
        await mutateAsyncEdit({ id: data.id, categoria: payload });
      } else {
        await mutateAsyncCreate(payload);
      }
      showSuccess('Los datos se guardaron correctamente');
      form.reset();
      onOpenChange(false); // cerrar modal
    } catch (err) {
      showError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            form.reset();
          }
          onOpenChange(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5">{data ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(saveCategoria)} className="flex flex-col gap-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la categoría" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripción de la categoría" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <hr className="border border-gray-100 mt-2" />

              <DialogFooter>
                <Button
                  variant="outline"
                  className="hover:bg-gray-100"
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    form.reset();
                  }}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button variant="gray" className="bg-slate-600  hover:bg-gray-700" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Guardando
                    </>
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalSaveCategoria;
