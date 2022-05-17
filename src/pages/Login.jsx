import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <>

            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" placeholder="Email de registro" name="email"/>
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Tu Password" name="password"/>
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

        </>
    )
}

export default Login