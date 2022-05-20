import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'
import Footer from '../components/Footer'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const {setAuth} = useAuth();

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();
        if ([email, password].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
            localStorage.setItem('token', data.token);
            setAuth(data)
            navigate('/admin')

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }

    }

    const { msg } = alerta;
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" placeholder="Email de registro" name="email" />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Tu Password" name="password" />
                    </div>

                    <input type="submit" value="Iniciar Sesión"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-2xl text-white font-bold uppercase mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500 font-medium hover:underline hover:font-semibold" to="/registrar">¿No tienes una cuenta? Registrate!</Link>
                    <Link className="block text-center my-5 text-gray-500 font-medium hover:underline hover:font-semibold" to="/olvide-password">Olvide mi password</Link>
                </nav>
                
            </div>

            <footer className="mt-10 text-xl lg:pr-7">
                <Footer/>
            </footer>

            
        </>
    )
}

export default Login