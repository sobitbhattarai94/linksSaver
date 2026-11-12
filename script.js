// const input = document.getElementById("input");
// const btn = document.getElementById("btn");
// const ul = document.getElementById("ul");
// let userInputs = [];
// // const inputTxt = input.value;

// // save function
// const saveInput = () => {
//   const userInput = input.value.trim();
//   if (!userInput) {
//     alert("enter something first");
//     return;
//   }
//   userInputs.push(userInput);
//   // ul.innerHTML += "<li>" + userInput + "</li>";
//   ul.innerHTML += `
//     <li>
//       <a target='_abc' href='${userInput}'>
//         ${userInput}
//       </a>
//     </li>
//     `;
//   input.value = "";
// };
// btn.addEventListener("click", saveInput);

const input = document.getElementById("input");
const btn = document.getElementById("btn");
const ul = document.getElementById("ul");
let userInputs = [];
// const inputTxt = input.value;

// save function
const saveInput = () => {
  const userInput = input.value.trim();
  if (!userInput) {
    alert("enter something first");
    return;
  }

  userInputs.push(userInput);
  localStorage.setItem(localStorage.length, userInput);
  renderLinks({ ...localStorage });
  input.value = "";
};

const renderLinks = (linksArray) => {
  ul.innerHTML = "";
  for (const key in linksArray) {
    ul.innerHTML += `
      <li> 
        <a target='_abc' href='${linksArray[key]}'>
          ${linksArray[key]}
        </a>
      </li>
      `;
  }
};
document.addEventListener("DOMContentLoaded",renderLinks({...localStorage}));
btn.addEventListener("click", saveInput);
