// Spinner 
const spinner = document.querySelector(".spinner-container");

// Login
const spanUsername = document.querySelector(".username");
const btnLogout = document.querySelector(".logout");

// References Elements Colors
const position = document.querySelector(".position");
const pinned = document.querySelector(".pinned");
const others = document.querySelector(".others");
const form = document.querySelector(".js-new-note");
const containerNote = document.querySelector(".js-container-note");
const title = document.querySelector(".js-title-color");
const description = document.querySelector(".js-description-color");
const noteColor = document.querySelector(".js-note__color");
const paleta = document.querySelector(".js-paleta-form");

// Modal
const modal = document.querySelector(".modal");
const titleEditNote = document.querySelector(".modal__title");
const descriptionEditNote = document.querySelector(".modal__description");
const messageErrorModal = document.querySelector(".js-error");
const buttonEdit = document.querySelector(".js-edit-form");
const modalClose = document.querySelector(".modal__close");

btnLogout.addEventListener("click", () => {
  logoutUser();
  window.location = "/login.html";
})

paleta.addEventListener("click", () => {
  noteColor.classList.toggle("visibility");
})

noteColor.addEventListener("click", (e) => {
  let color = e.target.dataset.color; // se extrae el color
  if(!color) color = "white";
  form.dataset.color = color;
  containerNote.style.backgroundColor = color;
  title.style.backgroundColor = color;
  description.style.backgroundColor = color;
  noteColor.classList.toggle("visibility");
})

modalClose.addEventListener("click" , () => {
  messageErrorModal.textContent = "";
  modal.classList.remove("modal--show");
})

buttonEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEdit = e.target.title.value;
  const descriptionEdit = e.target.description.value;

  if (!titleEdit || !descriptionEdit) {
    messageErrorModal.textContent = "All fields are requeried";
    return
  }
  messageErrorModal.textContent = "";
  const newNote =  {
    id: parseInt(e.target.parentElement.parentElement.dataset.id),
    title: titleEdit,
    description: descriptionEdit,
  }
  
  editNote(newNote);
  renderNotes(arrayUserNotes);
  modal.classList.remove("modal--show");
})

function createElementNote (note) {
  //Create Elements
  const divNote = document.createElement("div");
  const divPin = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const noteAction = document.createElement("div");
  const divPaleta = document.createElement("div");
  const paleta = document.createElement("img");
  const divTacho = document.createElement("div");
  const tacho = document.createElement("img");
  const noteColor = document.createElement("div");

  // Setup Elements
  divNote.className = "note animate__animated animate__fadeIn";
  divNote.style.backgroundColor = note.color;
  divNote.setAttribute("data-color", note.color);
  divPin.className = note.pin ? "note__pin active-pin" : "note__pin";
  image.src = note.pin ? "images/pin-true.png" : "images/pin.png";
  title.textContent = note.title;
  title.className = "cursor-pointer";
  description.className = "note__paragraph cursor-pointer";
  description.textContent = note.description;
  noteAction.className = "note__action";
  tacho.src = "images/trash.png";
  paleta.src = "images/paleta.png";
  noteColor.className = "note__color visibility js-card-note-color";

  const colors = ["white", "orange", "blue", "yellow", "red", "gray", "salmon", "crimson", "firebrick", "darkred"];
  colors.forEach( (color) => {
    const divColor = document.createElement("div");
    divColor.className = `note__color--circule bg-${color}`;
    divColor.setAttribute("data-color", color);
    noteColor.appendChild(divColor);
  })

  // Build templates
  divPin.appendChild(image);
  divPaleta.appendChild(paleta);
  divTacho.appendChild(tacho);
  noteAction.append(divPaleta, divTacho);
  divNote.append(divPin, title, description, noteAction, noteColor);
  
  // Event Listeners
  divPin.addEventListener("click", () => {
    changePinNote(note);
    renderNotes(arrayUserNotes);
  })

  divNote.addEventListener("click", (e) => {
    openModalEditNote(e, note);
  })

  paleta.addEventListener("click", () => {
    noteColor.classList.toggle("visibility");
  })

  noteColor.addEventListener("click", (e) => {
    let color = e.target.dataset.color; // se extrae el color
    if(!color) color = "white";
    divNote.style.backgroundColor = color;
    note.color = color;
    localStorage.setItem("notes", JSON.stringify(notes));
    noteColor.classList.toggle("visibility");
  })

  tacho.addEventListener("click", () => {
    deleteNote(note);
    renderNotes(arrayUserNotes);
  })
  return divNote;
}

function renderNotes(arrayUserNotes){
  const notePinList = document.querySelector(".js-notes-pinned");
  const notesEmpty = document.querySelector(".notes-empty");
  const notesPinnedEmpty = document.querySelector(".notes-pinned-empty");
  const notesOtherEmpty = document.querySelector(".notes-others-empty");
  const noteList = document.querySelector(".js-notes");

  pinned.classList.remove("none")
  others.classList.remove("none")

  noteList.innerHTML = "";
  notePinList.innerHTML = "";
  if (arrayUserNotes.length > 0) {
    notesEmpty.classList.add("none");
    orderNotes();
    let countNotesPin = 0, countNotesOthers = 0;
    arrayUserNotes.forEach( note => {
      const note1 = createElementNote(note);
      if (note.pin) {
        countNotesPin++
        notePinList.append(note1);
      }else {
        countNotesOthers++
        noteList.append(note1);
      }
    });
    if (countNotesOthers === 0 && countNotesPin !== 0) {
      notesOtherEmpty.classList.remove("none");
    } else {
      notesOtherEmpty.classList.add("none");
    }
    if (countNotesPin === 0 && countNotesOthers !== 0) {
      notesPinnedEmpty.classList.remove("none");
    } else {
      notesPinnedEmpty.classList.add("none");
    }

  }else {
    notesEmpty.classList.remove("none");
    pinned.classList.add("none");
    others.classList.add("none");
  }
}

function openModalEditNote(event, note) {
  if (event.target.localName === "h3" || event.target.localName === "p") {
    modal.dataset.id = note.id;
    modal.classList.add("modal--show");
    titleEditNote.value = note.title;
    descriptionEditNote.value = note.description;
  }
}

if (!currentUser) {
  window.location = "/login.html"
}

spanUsername.textContent = currentUser.username;

setTimeout(() => {
  spinner.classList.add("none");
  renderNotes(arrayUserNotes);
}, 500);