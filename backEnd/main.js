function showSection(sectionId) {
  const sections = document.querySelectorAll("main#main-content section");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });
}

function toggleCustomOperation() {
  const operation = document.getElementById("operation").value;
  const customOperationGroup = document.getElementById(
    "custom-operation-group"
  );
  if (operation === "custom") {
    customOperationGroup.style.display = "block";
  } else {
    customOperationGroup.style.display = "none";
  }
}
document.getElementById("showCalc").addEventListener("click", () => {
  let calcBack = document.getElementById("calcOfZnoverly");
  let znBack = document.getElementById("znContainer");
  if (calcBack.style.display === "none" || calcBack.style.display === "") {
    calcBack.style.display = "block";
    znBack.style.display = "none";
    UnBack.style.display = "none";

    document.getElementById("showCalc").textContent = "Hide Calculator";
    document.getElementById("showCalc").style.backgroundColor = "red";
  } else {
    calcBack.style.display = "none";
    znBack.style.display = "block";
    document.getElementById("showCalc").style.backgroundColor = "#009eff";

    document.getElementById("showCalc").textContent = "Show Calculator";
  }
});

let UnBack = document.getElementById("Un");
document.getElementById("UnModeBtn").addEventListener("click", () => {
  
  let znBack = document.getElementById("znContainer");
  if (UnBack.style.display === "none" || UnBack.style.display === "") {
    UnBack.style.display = "block";
    znBack.style.display = "none";
    document.getElementById("UnModeBtn").textContent = "Zn Mode";
    document.getElementById("UnModeBtn").style.backgroundColor = "#000";
  } else {
    UnBack.style.display = "none";
    znBack.style.display = "block";
    document.getElementById("UnModeBtn").style.backgroundColor = "#009eff";

    document.getElementById("UnModeBtn").textContent = "Un Mode";
  }
});