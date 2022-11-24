import { BrowserRouter, Route, Routes } from "react-router-dom";
import DatosCliente from "./Componentes/AdministracionDatosCliente/DatosCliente";
import Canjes from "./Componentes/Canjes/Canjes";
import Dashborad from "./Componentes/Commons/Dashborad";
import MainRoute from "./Componentes/Commons/MainRoute";
import Navtop from "./Componentes/Commons/Navtop";
import Compra from "./Componentes/Compras/Compra";
import Puntos from "./Componentes/puntos/Puntos";
import Reglas from "./Componentes/Reglas/Reglas";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navtop />

        <Routes>
          <Route path="/dashboard" element={<MainRoute />}>
            <Route index element={<Dashborad />} />
          </Route>
          <Route >
            <Route exact path="/compras" element={<Compra />} />
            <Route exact path="/clientes" element={<DatosCliente />} />
            <Route exact path="/puntos" element={<Puntos />} />
            <Route exact path="/reglas" element={<Reglas />} />
            <Route exact path="/canjes" element={<Canjes />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
