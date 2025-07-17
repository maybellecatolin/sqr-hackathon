import { useState } from "react";
import { useUserStore } from "../stores/UserStore";
import InviteModal from "./InviteModal";
import { useNavigate } from "react-router-dom";

export const PokerRole = () => {
  const setUser = useUserStore((state) => state.setUser);
  useUserStore;
  const user = useUserStore((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleRole = (role: string) => {
    setUser({ ...user, role });
    setIsModalOpen(true);
  };

  const handleModalSubmit = (value: string) => {
    navigate("/estimation");
  };

  return (
    <>
      <div className="pb-2">
        <text className="text-6xl">
          Sprint<span className="text-[#00B100] font-bold">Sync</span>
        </text>
      </div>
      <h1 className="text-4xl font-bold py-4 text-green-500">
        Planning Poker 🃏{" "}
      </h1>
      <div className="text-left pl-8">
        <div className="py-4">
          <text className="text-2xl">
            Hi, <span className="font-bold">{user.name}</span>! &#128075;
          </text>
        </div>
        <div>
          <text className="text-2xl">Joining as:</text>
        </div>
        <div className="flex flex-row py-4">
          <div className="flex flex-col content-center justify-center px-3">
            <button
              className="w-44 h-44 bg-[url('https://t3.ftcdn.net/jpg/02/68/69/96/360_F_268699676_l2e8ARcqkXtlXeYDCf5XzWLRGemqYcyA.jpg')] bg-cover bg-center rounded-lg hover:brightness-110 transition-all "
              onClick={() => handleRole("facilitator")}
            ></button>
          </div>
          <div className="flex flex-col content-center justify-center px-3">
            <button
              className="w-44 h-44 bg-[url('https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/5fee2ab3-57d9-45cf-bf5b-fe7136cada31/8e68ab24-1d22-46b3-9ebc-c9935def7ae7.png')] bg-cover bg-center rounded-lg hover:brightness-110 transition-all "
              onClick={() => handleRole("user")}
            ></button>
          </div>
          <div className="flex flex-col content-center justify-center px-3">
            <button
              className="w-44 h-44 bg-[url('https://media.istockphoto.com/id/486972402/vector/watching-a-game.jpg?s=612x612&w=0&k=20&c=DdudPdwgohiBuvm7Hg-zmJAQzRZwTcDnLE5-aDDJP5g=')] bg-cover bg-center rounded-lg hover:brightness-110 transition-all "
              onClick={() => handleRole("observer")}
            ></button>
          </div>
        </div>
      </div>
      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default PokerRole;
