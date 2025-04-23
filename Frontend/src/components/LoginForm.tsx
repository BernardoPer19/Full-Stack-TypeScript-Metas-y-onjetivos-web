import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/AuthValidation";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: any) => {
    console.log("Registro:", data);
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-green-100 to-green-50">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        Crear una cuenta
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-green-700">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre")}
            className="w-full mt-1 px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.nombre && (
            <p className="text-sm text-red-500">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-green-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-green-700">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-1 px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
