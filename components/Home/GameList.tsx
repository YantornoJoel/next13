import { useEffect, useState } from "react";

import { Games } from "@/shared";
import { IGameList } from "@/models";

export const GameList = ({ onGamePress }: any) => {
  const [games, setGames] = useState<IGameList[]>([]);

  useEffect(() => {
    setGames(Games);
  }, []);

  return (
    // <div className="px-8 md:px-16 flex justify-center">
    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
      {games.map((game) => (
        <div
          key={game.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onGamePress(game.name)}
        >
          <img
            src={game.image}
            width={60}
            height={60}
            className="hover:animate-pulse transition-all duration-100"
          />
          <h2 className="text-[14px] text-center">{game.name}</h2>
        </div>
      ))}
    </div>
  );
};
