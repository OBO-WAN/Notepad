// Arrays & globale Variablen deklarieren

let titles = [];
let notes = [];

let trashedTitles = [];
let trashedNotes = [];

load();
loadTrash();

// render Funktionen

function render() {
    let content = document.getElementById('content'); // <div> an Variable binden
    content.innerHTML = '';  // löschen

    // Code Outsourcing (Auslagerung)

function outsourcingHTML(title, note, i) {
    return `
    <div class="popup-container">
     <div class="card">
        <h4 id="input-Title">${title}</h4>
         <p>${note}</p>
        
         <button onclick="deleteNote(${i})">Delete</button>
        
     </div>
    </div>

    `
}    
    
for (let i = 0; i < notes.length; i++){
    const title = titles[i];
    const note = notes[i];

    content.innerHTML += outsourcingHTML(title, note, i);

    }
}

function addNote()  {
    let writedTitle = document.getElementById('input-Title');
    let writedNote = document.getElementById('input-Text');

    if (writedTitle.value === '') {
        alert('Please, fill all fields');
    }

    else if (writedNote.value === '') {
        alert('No empty field allowed!');
    }

    else {

    titles.push(writedTitle.value);
    notes.push(writedNote.value);

    writedTitle.value = '';
    writedNote.value = '';

    render(); // für sämtliches HTML <div> UND Array
    save();

    }

}

function renderTrash() {
    let trashContent = document.getElementById('content');
    trashContent.innerHTML = '';

    for (let i = 0; i < trashedNotes.length; i++) {
        const trashedTitle = trashedTitles[i];
        const trashedNote = trashedNotes[i];

        trashContent.innerHTML += `
        
        <div class="popup-container">
         <div class="card">
          <h4 id="input-Title">${trashedTitle}</h4>
           <p>${trashedNote}</p>
        
            <button onclick="deletePermanent(${i})">Eliminate</button>
            <button onclick="restoreNote(${i})">Restore</button>
                
        
         </div>
        </div>
        
        `;
    }
}

function deleteNote(i) {

    trashedTitles.push(titles[i]);
    trashedNotes.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();

    savingDeleted();
    
    //renderTrash(); // why not? 
}

// permanent delete with If/Else 

function deletePermanent(i) {
    

    if (confirm('Are you sure? This action cannot be undone')) {
        // Save it!
        console.log('This action was succesfully executed');
    
    trashedTitles.splice(i, 1);
    trashedNotes.splice(i, 1);

    render();
    save();

    savingDeleted();
    renderTrash(); // fast vergessen!

} else {
    // Do nothing!
    console.log('This action was not executed');
  }
}

// sämtliche Arrays werden verwendet

function restoreNote(i) {

    titles.push(trashedTitles[i]);
    notes.push(trashedNotes[i]);
    
    trashedTitles.splice(i, 1);
    trashedNotes.splice(i, 1);

    render();
    save();

    savingDeleted();
    renderTrash();
}

// saving variables for LS

function save() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
}

// loading variables from LS

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

}

function loadTrash() {
    let titlesAsText = localStorage.getItem('deletedTitles');
    let notesAsText = localStorage.getItem('deletedNotes');

    if (titlesAsText && notesAsText) {
        trashedTitles = JSON.parse(titlesAsText);
        trashedNotes = JSON.parse(notesAsText);
    }
}

// saving Deleted Notes for LS 

function savingDeleted() {
    let deletedTitle = JSON.stringify(trashedTitles);
    localStorage.setItem('deletedTitles', deletedTitle);

    let deletedNote = JSON.stringify(trashedNotes);
    localStorage.setItem('deletedNotes', deletedNote);

}

 // "normal" Dark Mode

 function toggleDarkMode() {
     const body = document.querySelector('body');
     body.classList.toggle('dark-mode');
        
}

// Enter Key instead "onclick"

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }

document.getElementById('enter').addEventListener('keydown', handleKeyPress);  

}