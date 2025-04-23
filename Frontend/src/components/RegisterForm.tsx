import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/AuthValidation";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: any) => {
    console.log("Login:", data);
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-blue-50">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Iniciar sesión
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-blue-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-blue-700">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};
