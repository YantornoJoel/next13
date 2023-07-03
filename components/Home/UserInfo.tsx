import Image from "next/image";
import React from "react";

export const UserInfo = ({ user }: any) => {
  return (
    <div>
      <p className="font-bold text-gray-900 dark:text-white">Publicado por :</p>

      <div className="flex gap-2 items-center mb-3 mt-2">
        {user?.image ? (
          <Image
            src={user.image}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : null}
        <div>
          <h2 className="text-[14px] font-medium text-gray-900 dark:text-white">{user?.name}</h2>
          <h2 className="text-[14px] font-light text-gray-900 dark:text-white">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};
