import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState();

  function handleShowFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelectFriend={handleSelectFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowFriend}>
          {!showAddFriend ? "Add Friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill friend={selectedFriend} />
    </div>
  );
}

function FriendList({ friends, onSelectFriend }) {
  return (
    <div className="frineds--container">
      <ul className="friends-list">
        {friends.map((f) => (
          <Friend friend={f} key={f.key} onSelectFriend={onSelectFriend} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelectFriend }) {
  return (
    <div className="frined">
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {friend.balance}$
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button onClick={(e) => onSelectFriend(friend)}>Select</Button>
      </li>
    </div>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);
    setName("");
    setImage("shttps://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫Freind Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {friend ? friend.name : "a friend"}</h2>

      <label>💰Bill Value</label>
      <input type="text" />

      <label>🧍‍♀️Your Expense</label>
      <input type="text" />

      <label>🧍‍♂️{friend ? friend.name : "friends"} Expense</label>
      <input type="text" disabled />

      <label>🤑Who's paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{friend ? friend.name : "Your Friend"}</option>
      </select>
      <input type="text" disabled />
      <Button>Split the bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
