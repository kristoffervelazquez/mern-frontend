import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token');

                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data)

            } catch (error) {
                console.error(error.response.data.msg)
            }
        }
        obtenerPacientes();
    }, [])


    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizados)

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes])

                console.log('Se almacena')

            } catch (error) {
                console.log(error)
            }
        }


    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')

        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                console.log(data.msg)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);
                setPacientes(pacientesActualizado)
            } catch (error) {

            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes, guardarPaciente, setPacientes, setEdicion, paciente, eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}



export default PacientesContext;

