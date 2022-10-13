form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const { title, description } = e.target;
    const valid = validationFields(title, description);
    if (!valid) return;

    const color = e.target.dataset.color;
    const newNote = {
        id: Date.now(), // Numerico
        title: title.value,
        description: description.value,
        color: color, 
        pin: false,
        idUser: currentUser.id
    }
    createNote(newNote);
    form.reset();
    form.dataset.color = "white";
    containerNote.style.backgroundColor = "white";
    title.style.backgroundColor = "white";
    description.style.backgroundColor = "white";
    renderNotes(arrayUserNotes);
})

function validationFields(title, description) {
    let valid = true;
    const messageErrorTitle = document.querySelector(".message__error-title");
    const messageErrorDescription = document.querySelector(".message__error-description");
    if (!title.value && !description.value) {
        messageErrorTitle.textContent = "Title no puede ser vacio";
        document.querySelector(".js-title-color").classList.add("input-error");

        messageErrorDescription.textContent = "Description no puede ser vacio";
        document.querySelector(".js-description-color").classList.add("input-error");
        return false;
    }
    if (!title.value) {
        messageErrorTitle.textContent = "Title no puede ser vacio";
        document.querySelector(".js-title-color").classList.add("input-error");
        document.querySelector(".js-description-color").classList.remove("input-error");
        messageErrorDescription.textContent = "";
        return false
    }
    if (!description.value) {
        messageErrorDescription.textContent = "Description no puede ser vacio";
        document.querySelector(".js-description-color").classList.add("input-error");
        document.querySelector(".js-title-color").classList.remove("input-error");
        messageErrorTitle.textContent = "";
        return false;
    }

    messageErrorTitle.textContent = "";
    messageErrorDescription.textContent = "";
    document.querySelector(".js-title-color").classList.remove("input-error");
    document.querySelector(".js-description-color").classList.remove("input-error");
    return valid ;
}