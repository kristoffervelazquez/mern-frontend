import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'


const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({ msg: 'Coloca tu nuevo password' });
                setTokenValido(true);
            } catch (error) {
                setAlerta({ msg: 'Hubo un error en el enlace', error: true });
            }
        }
        comprobarToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (password.length < 8) {
            setAlerta({ msg: 'El password debe conetener minimo 8 caracteres', error: true });
            return;
        }

        if (password !== confirmarPassword) {
            setAlerta({ msg: 'Los password no coinciden', error: true });
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });
            setAlerta({ msg: data.msg });

            console.log(data)

            setPassword('');
            setConfirmarPassword('');
            setTokenValido(false);
            setPasswordModificado(true);
            

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }

    }
    const { msg } = alerta;
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Password y no Pierdas tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}
                {tokenValido && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Nuevo Password
                                </label>
                                <input value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Tu nueva Password" name="password" />
                            </div>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Confirmar password
                                </label>
                                <input value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Confirma tu nueva Password" name="password" />
                            </div>
                            <input type="submit" value="Confirmar nueva Password"
                                className="bg-indigo-700 w-full py-3 px-10 rounded-2xl text-white font-bold uppercase mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                            />
                        </form>

                    </>
                )}

                {passwordModificado && (
                    <Link className="block text-center bg-indigo-700 w-full py-3 px-10 rounded-2xl text-white font-bold uppercase mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" to="/">Iniciar sesión!</Link>
                )}
            </div>
        </>
    )
}

export default NuevoPassword;