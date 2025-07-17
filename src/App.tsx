import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./stores/UserStore";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./App.css";
import InviteModal from "./components/InviteModal";

function App() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [step, setStep] = useState("name");
  const [service, setService] = useState({});
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    resetTranscript();
  };

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (transcript) {
      setFormData({ ...formData, name: transcript });
    }
    setUser(formData);
    setStep("role");
  };

  const handleRole = (role: string) => {
    setFormData({ ...formData, role });
    setUser({ ...user, role });
    setStep("select");
  };

  const handleSelectService = (service: { id: string; name: string }) => {
    setFormData({ ...formData, services: [...formData.services, service] });
    setService(service);
    setUser(formData);
    navigate(`/${service.name}`);
  };

  const handleModalSubmit = (value: string) => {
    handleSelectService({
      name: "estimation",
      id: value,
    });
  };

  const handleEstimationRoute = () => {
    if (user.role === "facilitator") {
      handleSelectService({
        name: "estimation",
        id: Math.random().toString(36).slice(2, 7),
      });
    } else {
      setIsModalOpen(true);
    }
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
                <div className="py-2 flex">
                  <input
                    className="mr-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={transcript || formData.name}
                    required
                  />
                  <button
                    className="bg-transparent px-2"
                    onClick={SpeechRecognition.startListening}
                  >
                    &#127908;
                  </button>
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
          <div className="flex flex-row py-4">
            <div className="flex flex-col content-center justify-center px-2">
              <button
                className="w-36 h-36 bg-[url('https://t3.ftcdn.net/jpg/02/68/69/96/360_F_268699676_l2e8ARcqkXtlXeYDCf5XzWLRGemqYcyA.jpg')] bg-cover bg-center rounded-lg hover:brightness-110 transition-all "
                onClick={() => handleRole("facilitator")}
              ></button>
              {/* <div>
                <text> Facilitator</text>
              </div> */}
            </div>
            <div className="flex flex-col content-center justify-center px-2">
              <button
                className="w-36 h-36 bg-[url('https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/5fee2ab3-57d9-45cf-bf5b-fe7136cada31/8e68ab24-1d22-46b3-9ebc-c9935def7ae7.png')] bg-cover bg-center rounded-lg hover:brightness-110 transition-all "
                onClick={() => handleRole("user")}
              ></button>
              {/* <div>
                <text> User</text>
              </div> */}
            </div>
            <div className="flex flex-col content-center justify-center px-2">
              <button
                className="w-36 h-36 bg-[url('https://media.istockphoto.com/id/486972402/vector/watching-a-game.jpg?s=612x612&w=0&k=20&c=DdudPdwgohiBuvm7Hg-zmJAQzRZwTcDnLE5-aDDJP5g=')] bg-cover bg-center rounded-lg hover:brightness-110 transition-all "
                onClick={() => handleRole("observer")}
              ></button>
              {/* <div>
                <text> User</text>
              </div> */}
            </div>
          </div>
        </div>
      )}
      {step === "select" && (
        <div className="pt-8">
          <div className="p-8">
            <text className="text-2xl">Let's get Started! &#129497;</text>
          </div>
          <div className="w-2xl">
            <button className="p-6 text-4xl" onClick={handleEstimationRoute}>
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
      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}

export default App;
