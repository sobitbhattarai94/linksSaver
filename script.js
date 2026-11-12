
const input = document.getElementById("input");
const saveBtn = document.getElementById("saveBtn");
const ul = document.getElementById("ul");
const clearAllBtn = document.getElementById("clearAll");
let userInputs = [];

// save function
const saveInput = () => {
  const userInput = input.value.trim();
  if (!userInput) {
    alert("enter something first");
    return;
  }
  if(!isValidURL(userInput)){
    alert("please enter a valid url");
    return;
  }
  if(isDuplicate(userInput)){
    alert("url already exists in the list!");
    return;
  }

  userInputs.push(userInput);
  localStorage.setItem(localStorage.length, userInput);
  renderLinks({ ...localStorage });
  input.value = "";
};

// renders the links
const renderLinks = (linksArray) => {
  ul.innerHTML = "";
  for (const key in linksArray) {
    ul.innerHTML += `
      <li> 
        
        <a target='_blank' href='${linksArray[key]}'>
         ${linksArray[key]}
        </a>
      </li>
      `;
  }
};

// render all links on page load
document.addEventListener("DOMContentLoaded", () => {
  renderLinks({ ...localStorage });
});

// check duplicate values
const isDuplicate = (link) =>{
  const existingLocalStorageValues = Object.values({...localStorage}) || [];
  if(existingLocalStorageValues.includes(link)){
    return true;
  } else{
    return false;
  }
};

// checking if url is valid
const isValidURL = (value) => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

// save the links
saveBtn.addEventListener("click", saveInput);

// clear all links
clearAllBtn.addEventListener("click", () => {
  localStorage.clear();
  renderLinks({...localStorage})
})
