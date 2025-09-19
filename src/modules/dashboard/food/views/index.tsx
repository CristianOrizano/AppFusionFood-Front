import { useState } from 'react';
import { FoodFilter, FoodResponse } from '../domain';
import PaginationRequest from '@/core/types/PaginationRequest';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFoodDeleteById, useFoodFindAll, useFoodPaginatedSearch } from '../application';
import { ColumnDef } from '@tanstack/react-table';
import { CLOUDINARY_BASE_URL, CLOUDINARY_FOOD_URL } from '@/core/constantes/env';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CirclePlus, Eraser, Image, PencilIcon, RefreshCcw, Search, TriangleAlert } from 'lucide-react';
import { showSuccess } from '@/core/helpers/toast.helper';
import upload from '@/assets/upload.jpg';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Card } from '@/components/ui/card';
import { DataTableSkeleton } from '@/core/componentes/DataTableSkeleton';
import DataTable from '@/components/data-table';
import AppPagination from '@/components/Pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCategoriaFindAll } from '../../categoria/application';
import ModalSaveFood from './components/ModalSaveFood';
import ModalSavePhoto from './components/ModalSavePhoto';

const Index = () => {
  const [selected, setSelected] = useState<FoodResponse | undefined>(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<FoodResponse | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentRow, setCurrentRow] = useState<FoodResponse | undefined>(undefined);

  const [searchFilter, setSearchFilter] = useState<PaginationRequest<FoodFilter>>({
    page: 1,
    perPage: 10,
    filter: {
      nombre: '',
      descripcion: '',
    },
  });

  // schema: todos los campos opcionales (para búsqueda/filtro)
  const formSchema: z.ZodType<FoodFilter> = z.object({
    nombre: z.string().optional(),
    descripcion: z.string().optional(),
    idCategoria: z.number().optional(),
    precio: z.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
    },
  });

  const filtrarFoodMenu = (values: z.infer<typeof formSchema>) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        page: 1,
        filter: {
          nombre: values.nombre || '',
          descripcion: values.descripcion || '',
          precio: values.precio ? Number(values.precio) : undefined,
          idCategoria: values.idCategoria ? Number(values.idCategoria) : undefined,
        },
      };
    });
  };

  // Hooks
  const { data: docData, isFetching: isFetchingFood } = useFoodPaginatedSearch(searchFilter);
  const { data: docDataCategoria } = useCategoriaFindAll();
  const { mutateAsync: mutateAsyncDelete } = useFoodDeleteById();

  const columns: ColumnDef<FoodResponse>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre',
    },
    {
      accessorKey: 'descripcion',
      header: 'Descripcion',
    },
    {
      accessorKey: 'categoria.nombre',
      header: 'Categoria',
    },
    {
      accessorKey: 'precio',
      header: 'Precio',
      cell: ({ row }) => {
        const value = row.getValue<number>('precio');
        return new Intl.NumberFormat('es-PE', {
          style: 'currency',
          currency: 'PEN',
        }).format(value);
      },
    },
    {
      id: 'imagen',
      header: () => <div className="text-center ">Imagen</div>, // centrado
      size: 150,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center ">
            <img
              src={
                row.original?.nombreImg
                  ? `${CLOUDINARY_BASE_URL}/w_50,h_45,c_fill,q_auto,f_auto/food/${row.original.nombreImg}`
                  : upload
              }
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = upload;
              }}
              className="w-[50px] h-[45px] object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'estado',
      header: () => <div className="text-center w-full">Estado</div>, // centrado
      cell: ({ row }) => {
        const estado: boolean = row.getValue('estado');
        return (
          <div className="text-center w-full">
            {estado ? <Badge variant="activo">Activo</Badge> : <Badge variant="inactivo">Inactivo</Badge>}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center w-full">Acciones</div>, // header centrado
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-2">
            <Button
              size="icon"
              className="rounded-full border border-blue-300 bg-white text-blue-500 shadow-md  hover:bg-sky-50 "
              onClick={() => {
                setSelected(row.original); // pasamos la fila al modal
                setOpen(true); // abrimos el modal
              }}
            >
              <PencilIcon />
            </Button>
            <Button
              size="icon"
              className="rounded-full border border-violet-300 bg-white shadow-md  text-violet-500 hover:bg-violet-50"
              onClick={() => {
                setSelectedPhoto(row.original); // pasamos la fila al modal
                setOpenPhoto(true); // abrimos el modal
              }}
            >
              <Image />
            </Button>
            <Button
              size="icon"
              className="rounded-full border border-red-300 bg-white shadow-md  text-red-600 hover:bg-red-50"
              onClick={() => {
                setCurrentRow(row.original); // saber si está activo o inactivo
                setOpenDelete(true);
              }}
            >
              <RefreshCcw />
            </Button>
          </div>
        );
      },
    },
  ];

  const removeCategoria = async () => {
    await mutateAsyncDelete(currentRow!.id);
    showSuccess('Los datos se guardaron correctamente');
    setOpenDelete(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setOpenPhoto(isOpen);
    if (!isOpen) {
      setSelected(undefined);
      setSelectedPhoto(undefined);
    }
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Administracion Platos</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Menús</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between my-3">
        <h1 className="text-2xl font-bold">Menus</h1>
        <Button
          variant="blue"
          onClick={() => {
            setOpen(true);
          }}
        >
          <CirclePlus />
          Agregar
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-3 bg-neutral-50 dark:bg-zinc-900 data-[state=open]:border-b-1">
              Busqueda
            </AccordionTrigger>
            <AccordionContent className="bg-white dark:bg-zinc-900 p-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(filtrarFoodMenu)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 "
                >
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ingrese nombre" {...field} />
                        </FormControl>
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
                          <Input type="text" placeholder="Ingrese descripción" {...field} />
                        </FormControl>
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
                            // Convertimos el string a number antes de pasarlo a react-hook-form
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value ? String(field.value) : ''}
                          >
                            <SelectTrigger className="w-full">
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
                      </FormItem>
                    )}
                  />

                  {/* Botón */}
                  <div className="flex items-center justify-end gap-3">
                    <Button type="submit" variant="grayOutline" size="sm">
                      <Search />
                      Buscar
                    </Button>
                    <Button
                      variant="gray"
                      onClick={() => {
                        form.reset();
                      }}
                    >
                      <Eraser className="mr-2 h-4 w-4" />
                      Limpiar
                    </Button>
                  </div>
                </form>
              </Form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="p-4">
          {isFetchingFood ? (
            <DataTableSkeleton columns={5} rows={12} />
          ) : (
            <>
              <DataTable columns={columns} data={docData} />
              {docData && (
                <AppPagination
                  meta={docData}
                  onPageChange={(page) => setSearchFilter((prev) => ({ ...prev, page }))}
                  onPageSizeChange={(size) =>
                    setSearchFilter((prev) => ({ ...prev, page: 1, perPage: size }))
                  }
                />
              )}
            </>
          )}
        </Card>
      </div>

      {/* El modal */}
      <ModalSaveFood open={open} onOpenChange={handleOpenChange} data={selected} />
      <ModalSavePhoto open={openPhoto} onOpenChange={handleOpenChange} data={selectedPhoto} />

      <AlertDialog
        open={openDelete}
        onOpenChange={(isOpen) => {
          setOpenDelete(isOpen);
          if (!isOpen) setCurrentRow(undefined);
        }}
      >
        <AlertDialogContent className="sm:max-w-[400px]">
          <AlertDialogHeader className="items-center text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/40 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
              <TriangleAlert className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>

            <AlertDialogTitle className="text-center font-semibold text-lg">
              {currentRow?.estado
                ? '¿Seguro que deseas desactivar este registro?'
                : '¿Seguro que deseas activar este registro?'}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex sm:justify-center sm:space-x-3 mt-5">
            <AlertDialogCancel className="hover:bg-gray-100">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-slate-600 text-white  hover:bg-gray-700"
              onClick={removeCategoria}
            >
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Index;
