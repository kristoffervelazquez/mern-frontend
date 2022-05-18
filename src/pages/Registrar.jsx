import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {

	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmarPassword, setConfirmarPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();

		if ([nombre, email, password, confirmarPassword].includes('')) {
			setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
			return;
		}
		if (password.length < 8) {
			setAlerta({ msg: 'El password debe contener al menos 8 caracteres', error: true });			
			return;
		}
		if (password !== confirmarPassword) {
			setAlerta({ msg: 'Los passwords no coinciden', error: true });

			return;
		}
		
		setAlerta({})

		// Crear el usuario en la API

		try {
			await clienteAxios.post('/veterinarios', {nombre, email, password});
			setAlerta({msg: 'Cuenta creada correctamente, revisa tu email', error: false})

			// Se resetean los campos
			setNombre('');
			setEmail('');
			setPassword('');
			setConfirmarPassword('');

			
		} catch (error) {
			console.error(error);
			setAlerta({msg: error.response.data.msg, error: true});
		}
		
	}

	const {msg} = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
			</div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta}/>}
				
				
				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Nombre
						</label>
						<input value={nombre} onChange={e => setNombre(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Tu Nombre" name="name" />
					</div>

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
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Confirmar password
						</label>
						<input value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Confirma tu Password" name="password" />
					</div>


					<input type="submit" value="Crear cuenta"
						className="bg-indigo-700 w-full py-3 px-10 rounded-2xl text-white font-bold uppercase mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>

				<nav className="mt-8 lg:flex lg:justify-between">
					<Link className="block text-center my-5 text-gray-500 font-medium hover:underline hover:font-semibold" to="/">¿Ya tienes una cuenta? Inicia sesión!</Link>
					<Link className="block text-center my-5 text-gray-500 font-medium hover:underline hover:font-semibold" to="/olvide-password">Olvide mi password</Link>

				</nav>
			</div>



		</>
	)
}

export default Registrar