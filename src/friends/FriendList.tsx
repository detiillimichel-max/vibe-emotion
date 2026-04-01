import React, { useEffect, useState } from "react";
import { getFriends, addFriend, removeFriend } from "./friendService";

export function FriendList({ userId }: { userId: string }) {
  const [friends, setFriends] = useState<any[]>([]);
  const [newFriend, setNewFriend] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getFriends(userId);
      setFriends(data);
    };
    fetchFriends();
  }, [userId]);

  const handleAdd = async () => {
    await addFriend(userId, newFriend);
    setNewFriend("");
    const updated = await getFriends(userId);
    setFriends(updated);
  };

  const handleRemove = async (friendId: string) => {
    await removeFriend(userId, friendId);
    const updated = await getFriends(userId);
    setFriends(updated);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Meus Amigos</h2>
      <ul>
        {friends.map((f) => (
          <li key={f.id}>
            {f.username}
            <button onClick={() => handleRemove(f.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <input
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
        placeholder="ID do amigo"
      />
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
}
