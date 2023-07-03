import { GameList, Hero, Posts, Search } from "@/components";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";

import app from "@/config/Firebase.config";
import { useEffect, useState } from "react";
import { Post } from "@/models";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | any[]>([]);
  const db = getFirestore(app);

  const getPost = async () => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const newPosts: Post[] = snapshot.docs.map((doc) => ({
        title: doc.data().title,
        desc: doc.data().desc,
        date: doc.data().date,
        image: doc.data().image,
        location: doc.data().location,
        zip: doc.data().zip,
      }));
      setPosts(newPosts);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    getPost()
  }, []);

  const onGamePress = async (gameName: any) => {
    setPosts([]);
    if (gameName == "Otros deportes") {
      getPost();
      return;
    }
    const q = query(collection(db, "posts"), where("game", "==", gameName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      setPosts((posts) => [...posts, doc.data()]);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-9">
      <div className="w-[70%] md:w-[50%] lg:w-[55%]">
        <Hero />
        <Search />
        <GameList onGamePress={onGamePress} />
      </div>
      {posts ? <Posts posts={posts} /> : <h1>Sin resultados.</h1>}
    </div>
  );
}
