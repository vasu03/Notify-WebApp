const deleteBtn = document.querySelector("#deleteBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmationPrompt = document.querySelector("#confirmationPrompt");
const confirmationOverlay = document.querySelector("#confirmationOverlay");
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");

// Show the confirmation overlay and prompt
deleteBtn.addEventListener("click", () => {
    confirmationOverlay.style.display = "block";
    confirmationPrompt.classList.add("prompt-active");
});

// Hide the confirmation overlay and prompt if "Cancel" is clicked
cancelBtn.addEventListener("click", () => {
    confirmationOverlay.style.display = "none";
    confirmationPrompt.classList.remove("prompt-active");
});
