import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword =  () => {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({password: '', password_nuevo: '' })
    const {guardarPassword} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some( campo => campo === '')){
            setAlerta({msg: 'Todos los campos son obligatiorios', error: true})
            return;
        }

        if(password.password.length<8){
            setAlerta({ msg: 'El password debe contener al menos 8 caracteres', error: true });			
			return;
        }

        if(password.password === password.password_nuevo){
            setAlerta({ msg: 'El password no puede ser el mismo', error: true });
            return;
        }

        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);
        
    }

    const { msg } = alerta
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-center text-3xl mt-10"> Cambiar password</h2>
            <p className="text-xl mt-5 mb-10 text-center ">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="my-3">
                                <label htmlFor="password" className="uppercase font-bold text-gray-600">Password actual</label>
                                <input onChange={e => setPassword({...password, [e.target.name]: e.target.value})} type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="password" placeholder="Tu password" />
                            </div>

                            <div className="my-3">
                                <label htmlFor="password_nuevo" className="uppercase font-bold text-gray-600">Nueva Password</label>
                                <input onChange={e => setPassword({...password, [e.target.name]: e.target.value})} type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="password_nuevo" placeholder="Tu nueva password" />
                            </div>

                        </div>

                        <input type="submit" value="Actualizar password" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword