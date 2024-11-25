import { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = getNotesFromLocalStorage();
    setNotes(savedNotes);
  }, []);

  // Get notes from localStorage
  const getNotesFromLocalStorage = () => {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  };

  // Add or update note event
  const handleAddNote = () => {
    const noteText = noteInput.trim();
    if (noteText) {
      if (editingIndex !== null) {
        updateNoteInLocalStorage(editingIndex, noteText);
        setEditingIndex(null);
      } else {
        addNoteToLocalStorage(noteText);
      }
      setNoteInput('');
      const updatedNotes = getNotesFromLocalStorage();
      setNotes(updatedNotes);
    }
  };

  // Add note to localStorage
  const addNoteToLocalStorage = (note) => {
    const notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Update note in localStorage
  const updateNoteInLocalStorage = (index, updatedNote) => {
    const notes = getNotesFromLocalStorage();
    notes[index] = updatedNote;
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Remove note from localStorage
  const removeNoteFromLocalStorage = (index) => {
    const notes = getNotesFromLocalStorage();
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    const updatedNotes = getNotesFromLocalStorage();
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <h1>Note App</h1>
      <textarea 
        value={noteInput} 
        onChange={(e) => setNoteInput(e.target.value)} 
        placeholder="Enter your note" 
      />
      <div className="buttons">
        <button onClick={handleAddNote}>
          {editingIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Display notes directly */}
      <div id="notesContainer">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <div className="note-text">{note}</div>
            <div className="button-container">
              <button 
                className="edit" 
                onClick={() => {
                  setNoteInput(note);
                  setEditingIndex(index);
                }}
              >
                Edit
              </button>
              <button 
                className="close" 
                onClick={() => removeNoteFromLocalStorage(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
