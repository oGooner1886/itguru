import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";
import user from "../assets/user_ico.svg";
import lock from "../assets/lock.svg";
import eye from "../assets/eye-off.svg";

import { api } from "../api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });
      login(res.data.token, formData.remember);
      navigate("./products");
    } catch {
      setError("Неверный логин или пароль");
    }
  };
  useEffect(() => {
    const savedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (savedToken) {
      navigate("/products");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] w-full max-w-[515px]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#F1F3FF] rounded-full flex items-center justify-center mb-8 overflow-hidden">
            <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <h1 className="text-[40px] font-bold text-[#111827]">
            Добро пожаловать!
          </h1>
          <p className="text-[#E0E0E0] text-[18px] mt-3 font-medium">
            Пожалуйста, авторизируйтесь
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5 ml-1">
              Логин
            </label>
            <div className="relative">
              <img
                src={user}
                alt="user"
                className="absolute left-4 top-3 w-5 h-5"
              />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#2D4BFF] transition-all text-sm"
                placeholder="Введите логин"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5 ml-1">
              Пароль
            </label>
            <div className="relative">
              <img
                src={lock}
                alt="lock"
                className="absolute left-4 top-3 w-5 h-5"
              />

              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#2D4BFF] transition-all text-sm"
                placeholder="Введите пароль"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <img
                src={eye}
                alt="toggle visibility"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className={`absolute right-4 top-3 w-5 h-5 cursor-pointer transition-opacity ${
                  isPasswordVisible ? "opacity-100" : "opacity-40"
                } hover:opacity-100`}
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
          </div>

          <div className="flex items-center ml-1">
            <input
              type="checkbox"
              id="rem"
              className="w-4 h-4 rounded border-gray-300 text-[#2D4BFF] focus:ring-[#2D4BFF] cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, remember: e.target.checked })
              }
            />
            <label
              htmlFor="rem"
              className="ml-2 text-sm text-gray-500 select-none cursor-pointer"
            >
              Запомнить данные
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D4BFF] text-white py-3.5 rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-2 active:scale-[0.98]"
          >
            Войти
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[16px] text-[#EBEBEB]">или</p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Нет аккаунта?{" "}
            <a
              href="#"
              className="text-[#2D4BFF] font-semibold hover:underline"
            >
              Создать
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
