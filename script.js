const localStorageKey = "savedLinks:";
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
  if (!isValidURL(userInput)) {
    alert("please enter a valid url");
    return;
  }
  if (isDuplicate(userInput)) {
    alert("url already exists in the list!");
    return;
  }

  let existingLocalStorageValues = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  existingLocalStorageValues.push(userInput);
  localStorage.setItem(
    localStorageKey,
    JSON.stringify(existingLocalStorageValues),
  );
  // userInputs.push(userInput);
  // localStorage.setItem(localStorageKey, userInputs);
  renderLinks(localStorage.getItem(localStorageKey));
  input.value = "";
};

// renders the links
const renderLinks = (linksArray) => {
  const newLinksArray = JSON.parse(linksArray) || [];
  ul.innerHTML = "";
  // for (const key in newLinksArray) {
  newLinksArray.forEach((link) => {
    ul.innerHTML += `
      <li> 
        <a target='_blank' href='${link}'>
         ${link}
        </a>
      </li>
      `;
  });
};

// render all links on page load
document.addEventListener("DOMContentLoaded", () => {
  renderLinks(localStorage.getItem(localStorageKey));
});

// check duplicate values
const isDuplicate = (link) => {
  const existingLocalStorageValues = Object.values({ ...localStorage }) || [];
  if (existingLocalStorageValues.includes(link)) {
    return true;
  } else {
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
  renderLinks(localStorage.getItem(localStorageKey));
});
