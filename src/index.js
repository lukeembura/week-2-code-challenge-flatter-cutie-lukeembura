const characters = [
    { id: 1, name: "Mr. Cute", image: "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif", votes: 0 },
    { id: 2, name: "Mx. Monkey", image: "https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif", votes: 0 },
    { id: 3, name: "Ms. Zebra", image: "https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif", votes: 0 },
    { id: 4, name: "Dr. Lion", image: "http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif", votes: 0 },
    {id: 5, name: "Mme. Panda", image: "https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif, votes: 0 },
  ];
const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const votesForm = document.getElementById("votes-form");
const resetBtn = document.getElementById("reset-btn");
const characterForm = document.getElementById("character-form");

let characters = [];
let currentCharacter = null;

fetch("http://localhost:3000/characters")
  .then(res => res.json())
  .then(data => {
    characters = data;
    characters.forEach(renderCharacterBar);
  });

function renderCharacterBar(character) {
  const span = document.createElement("span");
  span.textContent = character.name;
  span.addEventListener("click", () => showCharacterDetails(character));
  characterBar.appendChild(span);
}
function showCharacterDetails(character) {
    currentCharacter = character;
    detailedInfo.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" />
      <p><strong>Votes:</strong> <span id="vote-count">${character.votes}</span></p>
    `;
  }
  votesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const votesToAdd = parseInt(e.target.votes.value);
    const voteCountEl = document.getElementById("vote-count");
    const newTotal = currentCharacter.votes + votesToAdd;
  
    voteCountEl.textContent = newTotal;
    currentCharacter.votes = newTotal;
  
    // Extra bonus: persist to server
    fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ votes: newTotal })
    });
  
    e.target.reset();
  });
  
