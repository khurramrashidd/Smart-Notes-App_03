import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setNotes(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!note.trim()) return;

    const newNote = {
      text: note,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setNote("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    const updated = prompt("Edit your note:", notes[index].text);
    if (updated) {
      const newNotes = [...notes];
      newNotes[index].text = updated;
      setNotes(newNotes);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addNote();
  };

  const filtered = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={dark ? "container dark" : "container"}>
        <h1>📝 Notes App</h1>

        <button onClick={() => setDark(!dark)}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="input-section">
          <input
            type="text"
            placeholder="Write a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={addNote}>Add</button>
        </div>

        <p>Characters: {note.length}</p>

        <div className="notes">
          {filtered.map((n, index) => (
            <div key={index} className="note-card">
              <p>{n.text}</p>
              <small>{n.date}</small>

              <div>
                <button onClick={() => editNote(index)}>✏️</button>
                <button onClick={() => deleteNote(index)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer day={3} />
    </>
  );
}

export default App;