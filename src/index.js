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
}
// Update votes on the server (Extra Bonus)
const characterId = detailedInfo.dataset.characterId;
fetch(/characters/${characterId}, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ votes: newVotes }),
});
;
// Handle reset votes button click
resetVotesButton.addEventListener("click", () => {
  const voteCount = document.getElementById("vote-count");
  voteCount.textContent = 0;
});
   // Update votes on the server (Extra Bonus)
   const characterId = detailedInfo.dataset.characterId;
   fetch(/characters/${characterId}, {
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ votes: 0 }),
   });
 // Handle new character form submission
 characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const imageInput = document.getElementById("image-url");

  const newCharacter = {
    name: nameInput.value,
    image: imageInput.value,
    votes: 0,
  };
});
 // Add new character to the character bar
 const span = document.createElement("span");
 span.textContent = newCharacter.name;
 span.addEventListener("click", () => displayCharacterDetails(newCharacter));
 characterBar.appendChild(span);

  // Display new character details
  displayCharacterDetails(newCharacter);

  // Save new character to the server (Extra Bonus)
  fetch("/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  });

  // Clear form inputs
  nameInput.value = "";
  imageInput.value = "";
 