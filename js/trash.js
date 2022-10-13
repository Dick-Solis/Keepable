// Variables 
// Spinner 
const position = document.querySelector(".position");
const spinner = document.querySelector(".spinner-container");
const containerNotes = document.querySelector(".js-notes");
const btnLogout = document.querySelector(".logout");

// Eventos
btnLogout.addEventListener("click", () => {
  logoutUser();
  window.location = "/login.html";
})

//Funciones
function createElementTrashNote (note) {
  //Create Elements
  const divNote = document.createElement("div");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const noteAction = document.createElement("div");
  const divTacho = document.createElement("div");
  const tacho = document.createElement("img");
  const divRevert = document.createElement("div");
  const revert = document.createElement("img");

  // Setup Elements
  divNote.className = "note note animate__animated animate__fadeIn";
  divNote.style.backgroundColor = note.color;
  title.textContent = note.title;
  description.className = "note__paragraph";
  description.textContent = note.description;
  noteAction.className = "note__action";
  tacho.src = "images/trash.png";
  revert.src = "images/revert.png";

  // Build templates
  divRevert.appendChild(revert);
  divTacho.appendChild(tacho);
  noteAction.append(divTacho, divRevert);
  divNote.append(title, description, noteAction);
  
  // Event Listeners
  tacho.addEventListener("click", () => {
    deletePermanetNote(note);
    renderTrashNotes(arrayTrashUserNotes);
  })

  revert.addEventListener("click", () => {
    revertNote(note);
    renderTrashNotes(arrayTrashUserNotes);
  })
  return divNote;
}

function renderTrashNotes(trash) {
  const notesEmpty = document.createElement("div");
  notesEmpty.className = "notes-empty";
  notesEmpty.innerHTML = `
    <img class = "imagen-empty" src = "../images/empty.png">
    <p>No notes to keep</p> 
  `
  containerNotes.innerHTML = "";
  if (trash.length > 0) {
    trash.forEach( note => {
      const noteHtml = createElementTrashNote(note);
      containerNotes.append(noteHtml);
    });
    const exists = document.querySelector(".notes-empty")
    if (exists) exists.remove();

  }else {
    position.append(notesEmpty)
  }
}

setTimeout(() => {
  spinner.classList.add("visibility")
  renderTrashNotes(arrayTrashUserNotes);
}, 500);
