import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/AuthValidation";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContextxt";
import { LoginUserType } from "../types/AuthTypes";

export const LoginForm = () => {
  const { authError, loginUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginUserType) => {
    loginUser(data);
  };

  return (
    <div className="w-96 mx-auto p-15 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-blue-50">
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

        {authError && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-2 rounded-md text-sm font-medium text-center">
            {authError}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
        >
          Iniciar sesión
        </button>
      </form>
      <p className="my-4 text-center">
        No tienes una cuenta?{" "}
        <Link to="/register" className="text-cyan-600 font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
