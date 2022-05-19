import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import usePacientes from '../hooks/usePacientes'

const Header = () => {

    const {setPacientes} = usePacientes();
    const {cerrarSesion} = useAuth();

    const limpiarPacientes = () => {
        setPacientes([])
    }

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex justify-between flex-col lg:flex-row items-center">
                <h1 className="text-2xl font-black text-indigo-200 text-center">Administrador de Pacientes de <span className="text-white">Veterinaria</span> </h1>


                <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
                    <Link to='/admin' className="text-white text-sm uppercase font-bold hover:text-indigo-200">Pacientes</Link>
                    <Link to='/admin/perfil' className="text-white text-sm uppercase font-bold hover:text-indigo-200">Perfil</Link>

                    <button onClick={ () => {cerrarSesion(), limpiarPacientes()} } type='button' className="text-white text-sm uppercase font-bold hover:text-red-400">Cerrar Sesión</button>
                </nav>
            </div>


        </header>
    )
}

export default Header