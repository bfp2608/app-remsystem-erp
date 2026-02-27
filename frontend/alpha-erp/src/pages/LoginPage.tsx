import { useNavigate } from "react-router-dom"

export const LoginPage = () =>{

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/dashboard')
    }
    return(
        <div className="h-screen overflow-hidden">
        <section className="relative bg-linear-to-br from-slate-400 via-slate-600 to-slate-800  h-lvh flex justify-center items-center">

            <img src="img/background.svg" className="absolute inset-0 opacity-30 w-full h-full object-cover mix-blend-overlay pointer-events-none" alt="" />

            <div className="bg-gray-100 z-10 rounded-2xl shadow-lg w-full max-w-sm p-8 mx-4">
                <span className="block text-3xl text-slate-900 text-center font-bold mb-4 -mt-3">REMSYSTEMS - CRM</span>
                <form onSubmit={ () => {} } id="loginForm">
                    <article className="flex flex-col gap-4">
                        <label htmlFor="email" className="block text-slate-700 text-xl font-semibold mb-2 ml-1">Correo Electrónico</label>
                        <input type="email" onChange={ () => {}} name="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 ease-in-out shadow-sm" placeholder="nombre@empresa.com" />

                        <label htmlFor="password" className="block text-slate-700 text-xl font-semibold mb-2 ml-1">Contraseña</label>
                        <input type="password" onChange={ () => {} } name="password" id="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 ease-in-out shadow-sm" placeholder="********" />
                        
                        {/* { error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}

                        <button className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-slate-900/30 transform transition active:scale-95 cursor-pointer"
                        onClick={ handleLogin }
                        >
                            { 'Ingresar' }
                        </button>
                    </article>
                </form>
                <span className="mt-4 block text-sm text-center text-gray-600 w-full">Copyright © 2017-2026 REMSYSTEMS S.A.C.<br />Todos los derechos reservados.</span>
            </div>

        </section>
    </div>
    )
} 