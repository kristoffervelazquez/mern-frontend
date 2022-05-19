import usePacientes from '../hooks/usePacientes'

const Paciente = (props) => {

    const { paciente } = props;

    const { email, fecha, nombre, propietario, sintomas, telefono, _id } = paciente;

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)

        return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(nuevaFecha)
    }

    const {setEdicion, eliminarPaciente} = usePacientes();

    return (
        <>
            <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">

                <p className="font-bold uppercase my-2 text-indigo-700">Nombre: {''} <span className="font-normal normal-case text-black">{nombre}</span>  </p>

                <p className="font-bold uppercase my-2 text-indigo-700">Propietario: {''} <span className="font-normal normal-case text-black">{propietario}</span>  </p>

                <p className="font-bold uppercase my-2 text-indigo-700">Email de contacto: {''} <span className="font-normal normal-case text-black">{email}</span>  </p>

                <p className="font-bold uppercase my-2 text-indigo-700">Telefono: {''} <span className="font-normal normal-case text-black">{telefono}</span>  </p>

                <p className="font-bold uppercase my-2 text-indigo-700">Fecha: {''} <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>  </p>

                <p className="font-bold uppercase my-2 text-indigo-700">Sintomas: {''} <span className="font-normal normal-case text-black">{sintomas}</span>  </p>

                <div className="flex justify-between my-5">
                    <button onClick={() => {setEdicion(paciente)}} type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-bold uppercase font-bold text-white rounded-xl transition-colors ">Editar</button>
                    <button onClick={() => {eliminarPaciente(_id)}}type="button" className="py-2 px-10 bg-red-600 hover:bg-red-800 text-bold uppercase font-bold text-white rounded-xl transition-colors">Eliminar</button>

                </div>
            </div>
        </>
    )
}

export default Paciente