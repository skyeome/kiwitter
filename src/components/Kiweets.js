import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

function Kiweet({ kwt, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newKiweet, setNewKiweet] = useState(kwt.text);
  const KiweetRef = doc(dbService, "kiweets", `${kwt.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 이 트윗을 삭제하시겠습니까?");
    if (ok) {
      //delete kiweet
      await deleteDoc(KiweetRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(KiweetRef, {
      text: newKiweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setNewKiweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Type your new Kiweet"
              value={newKiweet}
              onChange={onChange}
            />
            <input type="submit" value="Update Kiweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{kwt.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Kiweet</button>
              <button onClick={onDeleteClick}>Delete Kiweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Kiweet;
