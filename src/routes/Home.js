import Kiweet from "components/Kiweets";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function Home({ userObj }) {
  const [kiweet, setKiweet] = useState("");
  const [kiweets, setKiweets] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(dbService, "kiweets"), (doc) => {
      const kiweetArr = doc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKiweets(kiweetArr);
    });
    return () => unsubscribe();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const collect = collection(dbService, "kiweets");
    await addDoc(collect, {
      text: kiweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setKiweet("");
  };
  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setKiweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={kiweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Kiweet" />
      </form>
      <div>
        {kiweets.length > 0 &&
          kiweets.map((kwt) => (
            <Kiweet
              key={kwt.id}
              kwt={kwt}
              isOwner={kwt.creatorId === userObj.uid}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
