import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./stores/UserStore";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    services: [
      {
        id: "",
        name: "",
      },
    ],
  });
  const [step, setStep] = useState("name");
  const [service, setService] = useState({});
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setStep("role");
  };

  const handleRole = (role) => {
    setFormData({ ...formData, role });
    setUser(formData);
    setStep("select");
  };

  const handleSelectService = (service: { id: string; name: string }) => {
    setFormData({ ...formData, services: [...formData.services, service] });
    setService(service);
    setUser(formData);
    navigate(`/${service.name}`);
  };

  return (
    <>
      <div className="pb-6">
        <text className="text-7xl">
          Sprint<span className="text-[#00B100] font-bold">Sync</span>
        </text>
      </div>
      {step === "name" && (
        <div className="text-left p-6">
          <div className="pb-1">
            <text className="text-2xl">Hey there!</text>
          </div>
          <div className="pb-2">
            <text className="text-2xl">What should we call you?</text>
          </div>
          <div>
            <form onSubmit={handleNameSubmit}>
              <div>
                <div className="py-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="name"
                    placeholder="John"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <button type="submit">Let's go!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {step === "role" && (
        <div className="text-left pl-8">
          <div className="py-4">
            <text className="text-2xl">
              Hi, <span className="font-bold">{formData.name}</span>! &#128075;
            </text>
          </div>
          <div>
            <text className="text-2xl">Joining as:</text>
          </div>
          <button
            className="text-xl m-2"
            onClick={() => handleRole("facilitator")}
          >
            Facilitator
          </button>
          <button className="text-xl m-2" onClick={() => handleRole("user")}>
            User
          </button>
          <button
            className="text-xl m-2"
            onClick={() => handleRole("observer")}
          >
            Observer
          </button>
        </div>
      )}
      {step === "select" && (
        <div className="pt-8">
          <div className="p-8">
            <text className="text-2xl">Let's get Started! &#129497;</text>
          </div>
          <div className="w-2xl">
            <button
              className="p-6 text-4xl"
              onClick={() =>
                handleSelectService({
                  name: "estimation",
                  id: Math.random().toString(36).slice(2, 7),
                })
              }
            >
              Estimation
            </button>
          </div>
          <div className="card">
            <button
              className="p-6 text-4xl"
              onClick={() =>
                handleSelectService({
                  name: "retro",
                  id: Math.random().toString(36).slice(2, 7),
                })
              }
            >
              Retrospective
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
