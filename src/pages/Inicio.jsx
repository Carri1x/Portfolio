import imagenAlvaro from '../assets/imagenCurriculumGrande.png';
import Footer from '../components/base/Footer.jsx';
import Header from '../components/base/Header.jsx';
import Contenido from '../components/Contenido.jsx';

const Inicio = () => {

    return(
        <>
            <Header />
            <main>
                <img src={imagenAlvaro} className='imagen-alvaro' alt="Álvaro Carrión Romero" />
                <div>
                    <p>Álvaro Carrión Romero</p>
                </div>
                <div className='inicio-descripcion'>
                    <p><b>Desarrollador de software</b></p>
                    <p>Especializado en desarrollo de aplicaciones web únicas.</p>
                </div>
                <Contenido />
            </main> 
            <Footer />
        </>
    )
}

export default Inicio;