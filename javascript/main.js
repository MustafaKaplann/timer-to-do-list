document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');
    const pinnedNotesContainer = document.getElementById('pinnedNotesContainer');
    const thirdSection = document.getElementById('trashContainer');
    const pinNoteButton = document.getElementById('pin-note-button');
  
    let noteCounter = 0;
  
    function addNote() {
      const noteText = noteInput.value.trim(); // gereksiz boşlukları sil
      if (noteText !== '') {
        createNoteElement(noteText);
        noteInput.value = '';
      }
    }
  
    function createNoteElement(noteText, isPinned = false) {
      const note = document.createElement('div');
      note.classList.add('note');
      if (isPinned) {
        note.classList.add('pinned');
      }
      note.dataset.id = noteCounter;
  
      const noteContent = document.createElement('div');
      noteContent.classList.add('note-content');
      noteContent.textContent = noteText;
  
      const pinnedIcon = document.createElement('i');
      pinnedIcon.classList.add('fas', 'fa-thumbtack', 'pinned-note-icon');
  
      const noteButtons = document.createElement('div');
      noteButtons.classList.add('note-buttons');
  
      const editButton = document.createElement('button');
      editButton.classList.add('note-button');
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.addEventListener('click', () => editNoteContent(note));
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('note-button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener('click', () => deleteNote(note));
  
      noteButtons.appendChild(editButton);
      noteButtons.appendChild(deleteButton);
  
      note.appendChild(noteContent);
      note.appendChild(noteButtons);
      if (isPinned) {
        note.appendChild(pinnedIcon);
        pinnedNotesContainer.appendChild(note);
      } else {
        notesContainer.appendChild(note);
      }
  
      noteCounter++;
    }
  
    function deleteNote(note) {
      note.remove();
      createDeletedNoteElement(note.querySelector('.note-content').textContent);
    }
  
    function createDeletedNoteElement(noteText) {
      const note = document.createElement('div');
      note.classList.add('note');
      
    
      
      note.innerHTML = `
        <div class="note-content">${noteText}</div>
        <div class="note-buttons">
        </div>
      `;
      thirdSection.appendChild(note);
    }
  
    function editNoteContent(note) {
      const noteContent = note.querySelector('.note-content');
      const newContent = prompt('Edit your note:', noteContent.textContent);
      if (newContent !== null) {
        noteContent.textContent = newContent;
      }
    }
  
    // noteInput.addEventListener('keypress', (event) => {
    //   if (event.key === 'Enter') {
    //     event.preventDefault();
    //     addNote();
    //   }
    // });
  
    document.addEventListener('click', (event) => {
      if (!noteInput.contains(event.target) && !pinNoteButton.contains(event.target)) {
        addNote();
      }
    });
  
    pinNoteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const noteText = noteInput.value.trim();
      if (noteText !== '') {
        createNoteElement(noteText, true);
        noteInput.value = '';
      }
    });
  });
  