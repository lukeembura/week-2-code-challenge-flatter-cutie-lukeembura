document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const votesForm = document.getElementById("votes-form")
  const resetVotesButton = document.getElementById("reset-votes");
  const characterForm = document.getElementById("character-form");
});
// Fetch all characters and display them in the character bar
fetch("/characters")
.then((response) => response.json())
.then((characters) => {
  characters.forEach((character) => {
    const span = document.createElement("span");
    span.textContent = character.name;
    span.addEventListener("click", () => displayCharacterDetails(character));
    characterBar.appendChild(span);
  });
});