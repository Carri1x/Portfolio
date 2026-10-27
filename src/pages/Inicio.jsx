import './Inicio.scss';

import imagenAlvaro from '../assets/imagenCurriculumGrande.png';
import Contenido from '../components/Contenido.jsx';
import Layout from '../components/base/Layout.jsx';

const Inicio = () => {
    return (
        <>
            <Layout>
                {/* Contenedor padre para controlar la superposición */}
                <div className="hero-section">
                    <img src={imagenAlvaro} className='imagen-alvaro' alt="Álvaro Carrión Romero" />
                    <div className="hero-container">
                        <span className="rol-destacado">Desarrollador de Software</span>
                        <h1 className="nombre-principal">Álvaro Carrión Romero</h1>
                        <p className="descripcion-subtitulo">Especializado en desarrollo de aplicaciones web únicas</p>
                    </div>
                </div>
                <Contenido />
            </Layout>
        </>
    )
}

export default Inicio;