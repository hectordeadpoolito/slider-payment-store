import React, {useState, useContext} from "react";
import "./Menu.css";
import {Link, useHistory} from "react-router-dom";
import apiCategoria from "./apiCategoria";
import {EstadoContexto} from "../../context/EstadoGeneral";
import CalcularPantalla from "../../util/CalcularPantalla";

export default function Menu() {
    const history = useHistory();
    const {productos, usuario, cambiarEstadoSidebar} =
    useContext(EstadoContexto);
    const exiteUsuario = object.keys(usuario).length;

    const [formBusqueda, setFormBusqueda] = useState("");
    const {ancho} = CalcularPantalla();
    const [dataCategoria] = useState(apiCategoria);

    const cambiarDatosBusqueda = (e) => {
        setFormBusqueda(e.target.value);
    };

    const [botonCategoria, setBotonCategoria] = useState(false);

    const [botonHamburguesa, setBotonHamburguesa] = useState(false);
    const cambiarBotonHamburguesa = () => {
        setBotonCategoria(false);
        setBotonSubcategoria(false);
        setBotonHamburguesa(!botonHamburguesa);
        cambiarEstadoSidebar(false);
    };

    const [botonPerfil, setBotonPerfil] = useState(true);
    const cambiarEstadoBotonPerfil = () => {
        setBotonPerfil(!botonPerfil);
        cambiarEstadoSidebar(true);
    };

    const [botonSubcategoria, setBotonSubcategoria] = useState(false);

    const estadoBotonCerrar = () => {
        setBotonHamburguesa(false);
        setBotonCategoria(false);
        setBotonSubcategoria(false);
    };

    const [tipoCategoria, setTipoCategoria] = useState({
        menuCategoria: "maletines",
    });

    const activarCategoria = (e) => {
        setTipoCategoria({
        ...tipoCategoria,
        menuCategoria: e.target.dataset.categoria,
    });
};

    const buscarProducto = (e) => {
        history.push(`/busqueda?producto=${formBusqueda}`);
        setFormBusqueda("");
    };

    return (
        <>
        <nav className="grid-menu-principal">
        <div className="grid-menu-logo">
        {}
        <div className="contenedor-menu-boton">
        {ancho <= 800 ? (
            <>
            <img
            src="/icons/menu/GeneralIconoMenu.svg"
            alt="logo"
            onClick={cambiarBotonHamburguesa} 
            />
            <span> Menu </span>
            </>
        ) : (
            <></>
        )}
        </div>

        {}
        <div className="contenedor-menu-logo">
        {ancho <= 500 ? (
            <Link to="/">
            <img src="/iconoLogan.png" alt="" /> 
            </Link>
        ): (
            <Link to="/">
            <img src="/logoLogan.png" alt=""/>
            </Link>
        )}
        </div>
        </div>
        {}
        <div className="grid-menu-buscador">
        <div className="formular-buscar">
        <input
        onChange={cambiarDatosBusqueda}
        placeholder="buscar productos"
        size="15"
        type="text"
        value={formBusqueda}
        />
        <button
        disabled={!formBusqueda}
        className="btn"
        onClick={buscarProducto}
        >
        {formBusqueda ? (
            <Link to="/busqueda">
            <img src="/icons/menu/GeneralIconoBuscar.svg" alt="logo"/>
            </Link>
        ): (
            <img src="/icons/menu/GeneralIconBuscar.svg" alt="logo"/>
        )}
        </button>
        </div>
        </div>
        <div 
        className={
            botonHamburguesa && ancho <= 100
            ? "grid-menu-links grid-menu-links-activo"
            : "grid-menu-links"
        }
        >
            {}
            <div
            className="contendedor-menu-hamburguesa"
            onClick={() => setBotonCategory(!botonCategoria)}
            //onMouseEnter={estadoEncimaMenuCategoria}
            >
                <img src="/icons/menu/GeneralIconoMenu.svg" alt="logo"/>
                <span>categorias</span>
            </div>

            {}
            <div className="contenedor-menu-links">
                {ancho <= 800 && (
                    <>
                    <p onClick={()=> setBotonCategoria(!botonCategoria)}>
                        Categorias
                    </p>

                    {exiteUsuario ? (
                        usuario.Rol === "administrador"? (
                            <Link to="/administrador/reportes">Perfil</Link>
                        ): (
                            <p onClick={cambiarEstadoBotonPerfil}>Perfil</p>
                        )
                    ) : (
                        <></>
                    )}
                    <hr/>

                    {!exiteUsuario && (
                        <>
                        <Link to="/registrar">Registrar</Link>
                        <Link to='/ingresar'>Ingresar</Link>
                        <hr/>
                        </>
                    )}
                    </>
                )}
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/contacto">Contacto</Link>
            </div>
        </div>

        {}
        <div className="grid-menu-iconos">
            {exiteUsuario? (
                usuario.Rol === "administrador" ? (
                    <Link to="/administrador/reportes" className="icono-perfiles">
                        <img src="/icons/menu/GeneralIconoPerfil.svg" alt="logo"/>
                    </Link>
            ):(
                <Link to="/cliente/perfil" className="icono-perfiles">
                    <img src="/icons/menu/GeneralIconoPerfil.svg" alt="logo"/>
                </Link>
                 )
            ) : (
            <Link to="/registrar" className="icono-perfiles">
                <img src="/icons/menu/GeneralIconoIngresar.svg" alt="logo"/>
                </Link>
            )}
            <Link to="/checkout">
                <img src="/icons/menu/GeneralIconoCarrito.svg" alt="logo"/>
                <span>
                    <p>{productos?.length}</p>
                </span>
            </Link>
        </div>
        </nav>
        {botonCategoria && (
            <div className="contenedor-categorias-secundario">
            {}
            <div
            className="grid-categorias-secundario"
            //onMouseLeave={estadoEncimaMenu}
            >
                {}
                <div 
                className={
                    botonCategoria && ancho <= 1000
                    ? "grid-categorias-menu grid-categorias-menu-activo"
                    : "grid-categorias-menu"
                }
                >
                    <div className="controles-menu">
                        <button onClick={() => setBotonCategoria(!botonCategoria)}>
                            Regresar
                        </button>
                    </div>
                    {dataCategoria.map((categoria) => (
                        <p
                        key={categoria.id}
                        data-categoria={categoria.urlCategoria}
                        onMouseOver={activarCategoria}
                        onClick={()=> setBotonSubcategoria(!botonSubcategoria)}
                        style={
                            categoria.urlCategoria === tipoCategoria.menuCategoria
                            ?{color: "red", fontWeight: "bold"}
                            : {color: "black"}
                        }
                        >
                            {categoria.nombreCategoria}
                        </p>
                    ))}
                </div>

                {}
                <div
                className={
                    botonSubcategoria && ancho <= 1000
                    ? "contenedor-subcagorias contenedor-subcagorias-activo"
                    : "contenedor-subcagorias"
                }
                >
                    <div className="controles-menu">
                        <button
                        onClick={() => setBotonSubcategoria(!botonSubcategoria)}
                    >
                        Regresar
                    </button>
                    <button onClick={estadoBotonCerrar}>Cerrar</button>
                        </div>

                        {}
                        {dataCategoria.map((categoria,index)=> (
                            <div
                            key={categoria.id}
                            data-categoria={categoria.urlCategoria}
                            className={
                                categoria.urlCategoria === tipoCategoria.menuCategoria
                                ? "grid-subcategorias-menu grid-subcategorias-menu-activo"
                                : "grid-subcategorias-menu"
                            }
                            >
                                <>
                                {}
                                <div className="contenedor-subcategorias-menu">
                                    <h3 className="subtitulo">{categoria.nombreCategoria}</h3>
                                    {dataCategoria[index].subCategaria.map((subCategoria)=> (
                                        <Link
                                        key={subCategaria.idsubCategoria}
                                        to={`/producto/${subCategoria.urlSubcategoria}`}
                                        >
                                            {subCategoria.nombreSubCategoria}
                                        </Link>
                                    ))}
                                </div>

                                {}
                                <div className="contenedor-subcategorias-imagen">
                                    <Link to={`/categoria/${categoria.urlCategoria}`}>
                                        <img src={categoria.imagenBanner} alt=""/>
                                    </Link>
                                </div>

                                {}
                                <div className="contenedor-subcategorias-subimagenes">
                                    {dataCategoria[index].galeriaImagenes.map((galeria)=> (
                                        <Link
                                        key={galeria.idGaleriaImagen}
                                        to={`/categoria/${categoria.urlCategoria}`}
                                        >
                                            <img src={galeria.urlImagen} alt=""/>
                                        </Link>
                                    ))}
                                </div>
                                </>
                                </div>
                        ))}
                </div>
            </div>
            </div>
        )}
        </>
    )
}