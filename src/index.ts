const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

form?.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    if(input && (input.value === "" || input.value === null)) {}
    return;
})
