import React, { useEffect, useState } from "react";
import { Games } from "../../shared/Data";
import { useSession } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast from "../Toast";
import app from "@/config/Firebase.config";

export const Form = () => {
  const [inputs, setInputs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState<any>();
  const [submit, setSubmit] = useState(false);

  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);
  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name }));
      setInputs((values) => ({ ...values, userImage: session.user?.image }));
      setInputs((values) => ({ ...values, email: session.user?.email }));
    }
  }, [session]);

  useEffect(() => {
    if (submit == true) {
      savePost();
    }
  }, [submit]);
  const handleChange = (e: React.MouseEvent<HTMLElement> | any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowToast(true);
    const storageRef = ref(storage, "search-sports/" + file?.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          setInputs((values) => ({ ...values, image: url }));
          setSubmit(true);
        });
      });
  };

  const savePost = async () => {
    await setDoc(doc(db, "posts", Date.now().toString()), inputs);
  };
  return (
    <div className="mt-4">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Created Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="text-black">
        <input
          type="text"
          name="title"
          placeholder="Título"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <textarea
          name="desc"
          className="w-full mb-4 outline-blue-400 border-[1px] p-2 rounded-md resize-y min-h-[50px] max-h-[300px]"
          required
          onChange={handleChange}
          placeholder="Descripción"
        />

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
          placeholder="Fecha"
        />
        <input
          type="text"
          placeholder="Ubicación"
          name="location"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Código"
          name="zip"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <select
          name="game"
          onChange={handleChange}
          required
          className="w-full mb-4 border-[1px] p-2 rounded-md text-slate-600"
        >
          <option disabled>Seleccione deporte</option>
          {Games.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full rounded-md text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 rounded-md text-white"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form;
