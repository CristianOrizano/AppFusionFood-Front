import { LoginForm } from "@/components/login-form";
import { Card } from "@/components/ui/card";

import logoDash from "@/assets/logoDash.png";
import fondo from "@/assets/img1.jpg";
import fondo2 from "@/assets/fondologin.png";

const index = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative  flex flex-col gap-4 p-6 md:p-10 ">
          <img
            src={fondo2} // reemplazá esto con tu imagen
            alt="Fondo"
            className="absolute inset-0 h-full w-full object-cover  dark:brightness-[0.2] dark:grayscale"
          />

          <div className="relative z-10 flex flex-1 items-center justify-center ">
            <div className="w-full max-w-md p-5 ">
              <Card className="p-8 shadow-lg">
                <div className="flex justify-center">
                  <img
                    src={logoDash}
                    className="w-20 h-10 sm:w-24 sm:h-12 md:w-25 md:h-12"
                  />
                </div>
                <LoginForm />
              </Card>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          {/* Imagen de fondo */}
          <img
            src={fondo}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />

          {/* Capa gris semitransparente */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              Sabores que unen culturas
            </h2>
            <p className="text-lg md:text-xl drop-shadow-sm">
              Explora una experiencia gastronómica única desde tu casa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
