import {Routes, Route} from "react-router-dom";
import PartidaView from '../components/ajedrez/PartidaView.jsx';
import Inicio from '../pages/Inicio.jsx';
import PaginaJuegos from "../pages/PaginaJuegos.jsx";
import PaginaProyectos from "../pages/PaginaProyectos.jsx";
import PaginaAbout from "../pages/PaginaAbout.jsx";
import PerfilUsuario from "../components/usuario/PerfilUsuario.jsx";

const Rutas = () => {

    return (
        <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/chess" element={<PartidaView/>}/>
            <Route path="/about" element={<PaginaAbout/>}/>
            <Route path="/juegos" element={<PaginaJuegos/>}/>
            <Route path="/proyectos" element={<PaginaProyectos/>}/>
            <Route path="/juegos" element={<PaginaJuegos/>}/>
            <Route path="/perfil" element={<PerfilUsuario/>}/>
        </Routes>
    )
}

export default Rutas;