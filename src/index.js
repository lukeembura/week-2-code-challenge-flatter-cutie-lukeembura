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
// Display character details in the detailed-info div
function displayCharacterDetails(character) {
  detailedInfo.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}">
    <h4>Total Votes: <span id="vote-count">${character.votes}</span></h4>
  `;
  detailedInfo.dataset.characterId = character.id;
  detailedInfo.dataset.votes = character.votes;
}
// Handle votes form submission
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const votesInput = document.getElementById("votes");
  const additionalVotes = parseInt(votesInput.value, 10) || 0;
  const voteCount = document.getElementById("vote-count");
  const currentVotes = parseInt(voteCount.textContent, 10);
  const newVotes = currentVotes + additionalVotes;

  voteCount.textContent = newVotes;
  votesInput.value = "";