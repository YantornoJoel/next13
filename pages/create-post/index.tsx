import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "@/components/Post/Form";

export const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="p-6 mt-8 lg:w-[35%] md:w-[50%] text-center">
        <h2 className="text-[30px] font-extrabold text-blue-500">
          CREAR PUBLICACIÓN
        </h2>
        <p>Explore/Conozca nuevos jugadores y deportes de todo el mundo.</p>
        <Form />
      </div>
    </div>
  );
};

export default CreatePost;
