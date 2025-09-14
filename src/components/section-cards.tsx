import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Tags, User, Utensils } from "lucide-react";

export function SectionCards() {
  return (
    <> 
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-muted-foreground">
            Categorías
          </CardTitle>
          <Tags className="text-blue-500" size={32} />{" "}
          {/* Color azul para el ícono */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">registradas en total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-muted-foreground">
            Platos
          </CardTitle>
          <Utensils className="text-red-400" size={32} />{" "}
          {/* Color verde para el ícono */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">20</div>
          <p className="text-xs text-muted-foreground">registradas en total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-muted-foreground">
            Clientes
          </CardTitle>
          <User className="text-yellow-500" size={32} />{" "}
          {/* Color amarillo para el ícono */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15</div>
          <p className="text-xs text-muted-foreground">registradas en total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-muted-foreground">
            Ingresos
          </CardTitle>
          <DollarSign className="text-green-500" size={32} />{" "}
          {/* Color verde para el ícono */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">S/. 45,231</div>
          <p className="text-xs text-muted-foreground">Total ingresos del dia</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-muted-foreground">
            Ordenes 
          </CardTitle>
          <Package className="text-orange-500" size={32} />{" "}
          {/* Color naranja para el ícono */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
          <p className="text-xs text-muted-foreground">Ordenes del dia</p>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
