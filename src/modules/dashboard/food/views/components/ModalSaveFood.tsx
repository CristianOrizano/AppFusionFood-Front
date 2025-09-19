import React, { useEffect, useState } from 'react';
import { FoodRequest, FoodResponse } from '../../domain';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError, showSuccess } from '@/core/helpers/toast.helper';
import { Loader2 } from 'lucide-react';
import { useFoodCreate, useFoodUpdate } from '../../application';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCategoriaFindAll } from '@/modules/dashboard/categoria/application';

interface ModalSaveCategoriaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: FoodResponse;
}

const ModalSaveFood: React.FC<ModalSaveCategoriaProps> = ({ open, onOpenChange, data }) => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: mutateAsyncCreate } = useFoodCreate();
  const { mutateAsync: mutateAsyncEdit } = useFoodUpdate();
  const { data: docDataCategoria } = useCategoriaFindAll();

  const formSchema: z.ZodType<FoodRequest> = z.object({
    nombre: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
    descripcion: z
      .string()
      .min(5, 'La descripción debe tener al menos 5 caracteres')
      .max(200, 'La descripción no puede superar los 200 caracteres'),
    precio: z
      .number({
        required_error: 'El precio es obligatorio',
        invalid_type_error: 'Debes ingresar un número',
      })
      .min(1, 'El precio debe ser mayor a 0'),
    idCategoria: z.number().min(1, 'Debe seleccionar una categoría'),
    nombreImg: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio: undefined,
      idCategoria: undefined,
      nombreImg: '',
    },
  });

  useEffect(() => {
    if (data != undefined) {
      form.reset({
        nombre: data.nombre ?? '',
        descripcion: data.descripcion ?? '',
        nombreImg: data.nombreImg ?? '',
        precio: data.precio ?? 0,
        idCategoria: data.categoria?.id ?? 0,
      });
    } else {
      form.reset({
        nombre: '',
        descripcion: '',
        precio: undefined,
        idCategoria: 0,
      });
    }
  }, [data, form]);

  const saveFoodMenu = async (payload: FoodRequest) => {
    try {
      setLoading(true);

      if (data) {
        await mutateAsyncEdit({ id: data.id, food: payload });
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
            <DialogTitle className="mb-5">{data ? 'Editar Menú' : 'Nuevo Menú'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(saveFoodMenu)} className="flex flex-col gap-6">
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
                  name="idCategoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value ? String(field.value) : ''}
                        >
                          <SelectTrigger
                            className="w-full"
                            aria-invalid={!!form.formState.errors.idCategoria}
                          >
                            <SelectValue placeholder="Seleccione categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {docDataCategoria?.map((cat) => (
                              <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="precio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese Precio"
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value === '' ? undefined : Number(e.target.value))
                          }
                        />
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

              <hr className="border border-gray-100 mt-2 dark:border-gray-800" />

              <DialogFooter>
                <Button
                  variant="outline"
                  className="hover:bg-gray-50"
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

export default ModalSaveFood;
