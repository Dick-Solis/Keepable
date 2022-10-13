const initialNote =[]
const arrayTrash = [];

// Adicion localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const notesFromlocalStorage = JSON.parse(localStorage.getItem("notes")); //null
let notes = notesFromlocalStorage || initialNote;

const trashFromlocalStorage = JSON.parse(localStorage.getItem("trash")); //null
const trash = trashFromlocalStorage || arrayTrash;

const usersFromlocalStorage = JSON.parse(localStorage.getItem("users")); //null
const users = usersFromlocalStorage || [];

let arrayUserNotes = notes.filter(note => note.idUser === currentUser?.id);
let arrayTrashUserNotes = trash.filter(note => note.idUser === currentUser?.id);

// Functions Users
function registerNewUser(newUser) {
  const exitUser = users.some( user => user.email === newUser.email || user.username === newUser.username);
  if (!exitUser) {
    newUser.id = Date.now();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return {
      status: "success",
      message: "User Log in Correctly"
    }
  }else{
    return {
      status: "error",
      message: "User has already been created"
    }
  }
}

function loginUser(newUser) {
  const exitUser = users.find( user => (user.email === newUser.email || user.username === newUser.username) && (user.password === newUser.password)
  );

  if (exitUser) {
    localStorage.setItem("currentUser", JSON.stringify(exitUser));
    return {
      status: "success",
      message: "User Log in Correctly"
    }
  }else {
    return {
      status: "error",
      message: "Username/Email or Password incorrect"
    }
  }
}

function logoutUser() {
  localStorage.removeItem('currentUser');
}

// Functions Note
function orderNotes() {
  
  arrayUserNotes =  arrayUserNotes.sort((x, y) => {
    if (x.pin === y.pin) {
      return 0;
    }else if (x.pin) {
      return -1;
    }else {
      return 1;
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote (note) {
  notes.push(note);
  arrayUserNotes = notes.filter(note => note.idUser === currentUser?.id);

  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote (note) {
  // Eliminar la nota de mi arreglo de notas
  const index = notes.indexOf(note);
  notes.splice(index, 1);

  arrayUserNotes = notes.filter(note => note.idUser === currentUser?.id);

  //Guardar la nota borrada en el trash
  trash.push(note);

  // Guardar en el localStorage nuestra nota borrada y tambien nuestras notas vigentes.
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("trash", JSON.stringify(trash));
}

function deletePermanetNote(note) {
  // Eliminar la nota de mi arreglo de trash
  const index = trash.indexOf(note);
  trash.splice(index, 1);

  arrayTrashUserNotes = trash.filter(note => note.idUser === currentUser?.id);

  // Guardar en el localStorage nuestra nota borrada y tambien nuestras notas vigentes.
  localStorage.setItem("trash", JSON.stringify(trash));
}

function revertNote(note) {
  // Restauramos la nota
  notes.push(note);

  // Eliminamos la nota de nuestro arreglo trash
  const index = trash.indexOf(note);
  trash.splice(index, 1);

  arrayTrashUserNotes = trash.filter(note => note.idUser === currentUser?.id);

  localStorage.setItem("trash", JSON.stringify(trash));
  localStorage.setItem("notes", JSON.stringify(notes));
}

function editNote(updatenNote) {
  notes = notes.map( note => {
    if (note.id === updatenNote.id) {
      note.title = updatenNote.title;
      note.description = updatenNote.description;
      return note;
    }else{
      return note;
    }
  })
  

  arrayUserNotes = notes.filter(note => note.idUser === currentUser?.id);

  localStorage.setItem("notes", JSON.stringify(notes));
}

function changePinNote(note){
  notes = notes.map(item => {
    if (item.id === note.id) {
      note.pin = !note.pin;
      return note
    }else{
      return item
    }
  })
  arrayUserNotes = notes.filter(note => note.idUser === currentUser?.id);

}