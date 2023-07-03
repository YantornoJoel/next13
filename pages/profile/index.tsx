import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { PostItem } from "@/components";
import Toast from "../../components/Toast";
import app from "@/config/Firebase.config";

function Profile() {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState<any[]>([]);
  const db = getFirestore(app);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    getUserPost();
  }, [session, showToast]);

  const getUserPost = async () => {
    setUserPost([]);
    if (session?.user && session.user.email) {
      const q = query(
        collection(db, "posts"),
        where("email", "==", session?.user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        setUserPost((userPost) => [...userPost, data]);
      });
    }
  };

  const onDeletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    setShowToast(true);
    window.location.reload();
  };
  return (
    <div className="p-6 mt-8">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Deleted Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}
      <h2 className="text-[35px] font-extrabold text-blue-500">Perfil</h2>
      <p>Administre sus publicaciones</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10">
        {userPost &&
          userPost?.map((item: any, index) => (
            <div key={index}>
              <PostItem post={item} modal={true} />
              <button
                className="bg-red-500 w-full p-1 mt-1 rounded-md text-white"
                onClick={() => onDeletePost(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
