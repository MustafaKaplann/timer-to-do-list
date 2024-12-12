document.addEventListener('DOMContentLoaded', () => {
    const timedNoteInput = document.getElementById('timedNoteInput');
    const noteDurationInput = document.getElementById('noteDuration');
    const addTimedNoteButton = document.getElementById('add-timed-note-button');
    const timedNotesContainer = document.getElementById('timedNotesContainer');
  
    let noteCounter = 0;
  
    function addTimedNote() {
      const noteText = timedNoteInput.value.trim();
      const noteDuration = parseInt(noteDurationInput.value.trim(), 10);
  
      if (noteText !== '' && !isNaN(noteDuration) && noteDuration > 0) {
        const note = createTimedNoteElement(noteText, noteDuration);
        timedNotesContainer.appendChild(note);
        timedNoteInput.value = '';
        noteDurationInput.value = '';
  
        // Set a timeout to remove the note after the specified duration
        setTimeout(() => {
          showExpiredNotePopup(noteText, noteDuration);
          note.remove();
        }, noteDuration * 1000);
      }
    }
  
    function createTimedNoteElement(noteText, noteDuration) {
      const note = document.createElement('div');
      note.classList.add('note');
      note.dataset.id = noteCounter;
  
      const noteContent = document.createElement('div');
      noteContent.classList.add('note-content');
      noteContent.textContent = noteText;
  
  
      note.appendChild(noteContent);
  
      noteCounter++;
  
      return note;
    }
  
    function showExpiredNotePopup(noteText, noteDuration) {
      const popup = document.getElementById('expiredNotePopup');
      const popupText = document.getElementById('expiredNoteText');
      const popupDuration = document.getElementById('expiredNoteDuration');
      const closeButton = document.querySelector('.close');
  
      popupText.innerHTML = `<b>Note Content:</b> ${noteText}`;
      popupDuration.innerHTML = `<b>Duration:</b> ${noteDuration} seconds`;
  
      popup.style.display = 'block';
  
      closeButton.onclick = function() {
        popup.style.display = 'none';
      };
  
      window.onclick = function(event) {
        if (event.target == popup) {
          popup.style.display = 'none';
        }
      };
    }
  
    addTimedNoteButton.addEventListener('click', (event) => {
      event.preventDefault();
      addTimedNote();
    });
  });
  