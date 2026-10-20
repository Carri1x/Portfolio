import './Tecnologia.scss';

const Tecnologia = (props) => {
    const { nombre, imagen, detalles } = props.data;
    const [ verDetalles, setVerDetalles ] = useState(false);

    return (
        <>
            <div 
                onMouseEnter={setVerDetalles(valor => !valor)} 
                onMouseLeave={setVerDetalles(valor => !valor)}
            >
                
                <img src={imagen} 
                    className={`imgTecnologia ${verDetalles && `imgHover`}`} 
                    alt={nombre} 
                />
            {verDetalles && 
                <>
                    <p>{nombre}</p>
                    <small>{detalles}</small>
                </>
            }
            </div>

        </>
    );
};

export default Tecnologia;