const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("transactionModal");
const closeBtn = document.querySelector(".close");
const transactionForm = document.getElementById("transactionForm");
const totalSpentEl = document.getElementById("total-spent");
const remainingBudgetEl = document.getElementById("remaining-budget");
const budgetProgress = document.getElementById("budget-progress");
const foodEl = document.getElementById("food");
const rentEl = document.getElementById("rent");
const travelEl = document.getElementById("travel");

let totalSpent = 0;
let totalBudget = 100000; // Set default budget
let categories = {
  Food: 0,
  Rent: 0,
  Travel: 0,
  Others: 0,
};

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submit
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (type === "expense") {
    totalSpent += amount;
    categories[category] += amount;
  } else {
    totalBudget += amount;
  }

  updateDashboard();
  transactionForm.reset();
  modal.style.display = "none";
});

function updateDashboard() {
  totalSpentEl.textContent = totalSpent.toFixed(2);
  remainingBudgetEl.textContent = (totalBudget - totalSpent).toFixed(2);

  const percentUsed = Math.min((totalSpent / totalBudget) * 100, 100);
  budgetProgress.value = percentUsed;

  foodEl.textContent = categories.Food.toFixed(2);
  rentEl.textContent = categories.Rent.toFixed(2);
  travelEl.textContent = categories.Travel.toFixed(2);
}
modal.classList.add("fade-out");
setTimeout(() => {
  modal.style.display = "none";
  modal.classList.remove("fade-out");
}, 300);
