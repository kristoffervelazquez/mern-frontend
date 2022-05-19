import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'


const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil

        if ([nombre, email].includes('')) {
            setAlerta({msg: 'Email y Nombre son Obligatorios', error: true})
            return;
        }

        const resultado = await actualizarPerfil(perfil);
        
        setAlerta(resultado)
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-center text-3xl mt-10"> Editar perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center ">Modifica tu {''} <span className="text-indigo-600 font-bold">Información aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="my-3">
                                <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                                <input value={perfil.nombre || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="nombre" placeholder="Nombre" />
                            </div>

                            <div className="my-3">
                                <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                                <input value={perfil.web || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="web" placeholder="Sitio web" />
                            </div>

                            <div className="my-3">
                                <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Telefono</label>
                                <input value={perfil.telefono || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="telefono" placeholder="Telefono" />
                            </div>

                            <div className="my-3">
                                <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                                <input value={perfil.email || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} type="email" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="email" placeholder="Email" />
                            </div>
                        </div>

                        <input type="submit" value="Guardar Cambios" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer" />
                    </form>
                </div>
            </div>

        </>
    )
}

export default EditarPerfil