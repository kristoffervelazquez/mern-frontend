import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'
import axios from 'axios'

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {

        e.preventDefault();

        if (email === '' || email.length < 6) {
            setAlerta({ msg: 'El email es obligatorio', error: true });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
            setAlerta({ msg: data.msg });

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }

    }

    const { msg } = alerta

    return (
        <>
            <div>
                <div className="">
                    <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Pierdas <span className="text-black">tu Cuenta</span></h1>
                </div>
            </div>
            <div>
                <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Email
                            </label>
                            <input value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" placeholder="Email de registro" name="email" />
                        </div>
                        <input type="submit" value="Enviar instrucciones"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-2xl text-white font-bold uppercase mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                    </form>
                    <nav className="mt-8 lg:flex lg:justify-between">
                        <Link className="block text-center my-5 text-gray-500 font-medium hover:underline hover:font-semibold" to="/">¿Ya tienes una cuenta? Inicia sesión!</Link>
                        <Link className="block text-center my-5 text-gray-500 font-medium hover:underline hover:font-semibold" to="/registrar">¿No tienes una cuenta? Registrate!</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default OlvidePassword