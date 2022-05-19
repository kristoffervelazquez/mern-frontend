import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'


const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    if (cargando) return 'cargando...'

    return (
        <>
            <Header />

                {/* Si en auth existe un id entonces carga el Outlet (Es lo que trae todos los componentes) */}
                {auth?._id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                ) : <Navigate to='/' />}

            <Footer />
        </>

    )
}

export default RutaProtegida