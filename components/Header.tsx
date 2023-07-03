import Image from "next/image";
import { HiArrowLeftOnRectangle, HiOutlinePencilSquare } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const USER_IMAGE =
  "https://res.cloudinary.com/ddbujqxjh/image/upload/v1688152094/icon-256x256_z0rgks.png";

export const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex justify-between p-3 border-b-[2px] border-[#717171] px-7 ">
      <div className="flex gap-5 hover:cursor-pointer" onClick={() => router.push("/")}>
        <img src="./vite.svg" alt="logo" width={40} />
        {/* <img src="./next.svg" alt="logo" width={40} />
        <img src="./vercel.svg" alt="logo" width={40} /> */}
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => router.push("/create-post")}
          className="bg-black p-2 px-3 text-white rounded-full"
        >
          <span className="hidden sm:block">Subir</span>
          <HiOutlinePencilSquare className="sm:hidden text-[20px]" />
        </button>

        {!session ? (
          <button
            className="bg-white text-gray-500 p-2 px-3 border-[1px] rounded-full"
            onClick={() => signIn()}
          >
            <span className="hidden sm:block">Entrar</span>
            <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
          </button>
        ) : (
          <button
            className="bg-white text-gray-500 p-2 px-3 border-[1px] rounded-full"
            onClick={() => signOut()}
          >
            <span className="hidden sm:block">Salir</span>
            <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
          </button>
        )}

        <Image
          className="rounded-full hover:cursor-pointer"
          src={session?.user?.image ?? USER_IMAGE}
          width={45}
          height={40}
          alt="Usuario"
          onClick={() => router.push("/profile")}
        />
      </div>
    </div>
  );
};
