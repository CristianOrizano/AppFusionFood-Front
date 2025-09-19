import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import React, { useEffect, useRef, useState } from 'react';
import upload from '@/assets/uplo.jpg';
import { Upload } from 'lucide-react';
import useUploadPhoto from '@/core/service/application/useUploadPhoto';
import { showError, showSuccess } from '@/core/helpers/toast.helper';
import { FoodResponse } from '../../domain';
import { useFoodUpdate } from '../../application';
import { CLOUDINARY_BASE_URL, CLOUDINARY_FOOD_URL } from '@/core/constantes/env';

interface ModalSavePhotoCategoriaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: FoodResponse;
}
const ModalSavePhoto: React.FC<ModalSavePhotoCategoriaProps> = ({ open, onOpenChange, data }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageValid, setIsImageValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: mutateAsyncUpload } = useUploadPhoto();
  const { mutateAsync: mutateAsyncEdit } = useFoodUpdate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      // Si no selecciona nada → limpiar todo
      setErrorMessage(null);
      setSelectedImage(null);
      setSelectedFile(null);
      setIsImageSelected(false);
      return;
    }
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setErrorMessage('Solo se permiten imágenes PNG o JPG');
        setSelectedImage(null);
        setIsImageSelected(false);
        return;
      }
      setErrorMessage(null);
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadPhoto = async () => {
    if (!data) return;
    setLoading(true);

    try {
      const payload = {
        file: selectedFile as File,
        carpeta: 'food',
        ...(data.nombreImg && isImageValid ? { publicIdAntiguo: data.nombreImg } : {}),
      };

      const response = await mutateAsyncUpload(payload);
      const idPhoto = response.publicId;

      await mutateAsyncEdit({
        id: data.id,
        food: {
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          idCategoria: data.categoria.id,
          nombreImg: idPhoto,
        },
      });
      setIsImageValid(true);
      showSuccess('Imagen guardada correctamente');
      onOpenChange(false);
      setSelectedFile(null);
      setIsImageSelected(false);
    } catch (error) {
      showError(('Hubo un problema al guardar' + error) as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data != undefined) {
      if (data?.nombreImg) {
        setSelectedImage(
          data?.nombreImg ? `${CLOUDINARY_BASE_URL}/w_500,c_fit,q_auto,f_auto/food/${data.nombreImg}` : null,
        );
      } else {
        setSelectedImage(null);
      }
    }
  }, [data]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            // limpiar todo cuando cierras
            setSelectedFile(null);
            setIsImageSelected(false);
            setErrorMessage(null);
            // opcional: limpiar el input nativo si usas ref
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }
          onOpenChange(isOpen); // mantener el control del open
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5 font-bold">Subir Imagen</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img
              src={selectedImage || upload}
              className="shadow-lg rounded-xl object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = upload;
                setIsImageValid(false); // ya no es válida
              }}
              style={{ width: '270px', height: '270px' }}
            />
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            {/* Input oculto */}
            <Input
              ref={fileInputRef}
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              disabled={loading}
              onClick={handleButtonClick}
              className="mt-2 text-sky-500 hover:bg-gray-100 font-medium"
            >
              <Upload />
              Seleccionar Imagen
            </Button>

            {loading && (
              <div className="relative w-sm h-1 overflow-hidden rounded bg-gray-200 mt-4">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-sky-500 animate-progress" />
              </div>
            )}
          </div>

          <hr className="border border-gray-100 mt-2 dark:border-gray-800" />

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="hover:bg-slate-100"
              type="button"
              onClick={() => {
                onOpenChange(false);
                setSelectedFile(null);
                setIsImageSelected(false);
                setErrorMessage(null);
              }}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="gray"
              className="bg-slate-600  hover:bg-gray-700"
              onClick={uploadPhoto}
              disabled={loading || !isImageSelected}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalSavePhoto;
