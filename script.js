// Navbar turns solid black when scrolling
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}

// Sample data (replace titles / add real image URLs later)
const categories = [
  { id: "new", title: "Trending Now", top10: false, items: ["Midnight Signal", "Desert Run", "The Last Chef", "Iron Harbor", "Cairo Nights", "Echo Valley", "Paper Kings", "Blue Static"] },
  { id: "movies", title: "Top 10 Movies Today", top10: true, items: ["Zero Hour", "The Long Road", "Red Sands", "Night Shift", "Open Water", "Glass House", "Final Take", "Wild Card"] },
  { id: "series", title: "Popular TV Shows", top10: false, items: ["Dark Orbit", "Family Rules", "The Syndicate", "Nile Stories", "Lost Frequency", "City of Ash", "Second Chance", "Hidden Doors"] },
  { id: "mylist", title: "My List", top10: false, items: ["Silent Echo", "Golden Hour", "The Archive", "Neon Streets", "Last Summer", "Black Ice"] }
];

// Different gradient for each poster, in the black/red family
function posterBackground(i) {
  const hue = (i * 23) % 40;           // stays in red/orange range
  const light = 14 + (i % 4) * 5;
  return `linear-gradient(160deg, hsl(${hue}, 80%, ${light + 12}%), hsl(${hue}, 60%, ${light}%) 60%, #0b0b0b)`;
}

const rowsEl = document.getElementById("rows");
let counter = 0;

(rowsEl ? categories : []).forEach(cat => {
  const section = document.createElement("section");
  section.className = "row-section";
  section.id = cat.id;

  const h2 = document.createElement("h2");
  h2.className = "row-title";
  h2.textContent = cat.title;

  const scroller = document.createElement("div");
  scroller.className = "row-scroll";

  cat.items.forEach(name => {
    const card = document.createElement("div");
    card.className = "poster" + (cat.top10 ? " top10" : "");
    card.style.background = posterBackground(counter++);
    card.tabIndex = 0;
    card.innerHTML = `<span>${name}</span>`;
    scroller.appendChild(card);
  });

  section.append(h2, scroller);
  rowsEl.appendChild(section);
});

// ---------- Login / Register validation ----------
const alertBox = document.getElementById("formAlert");

function showAlert(msg, type) {
  alertBox.className = "alert alert-" + type;
  alertBox.textContent = msg;
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const pass = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");
    confirm.setCustomValidity(pass.value === confirm.value ? "" : "Passwords do not match");
    registerForm.classList.add("was-validated");
    if (!registerForm.checkValidity()) return;
    showAlert("Account created successfully. Redirecting to sign in...", "success");
    setTimeout(() => (window.location.href = "login.html"), 1500);
  });
  document.getElementById("confirmPassword").addEventListener("input", e => e.target.setCustomValidity(""));
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    loginForm.classList.add("was-validated");
    if (!loginForm.checkValidity()) return;
    showAlert("Signed in successfully. Redirecting...", "success");
    setTimeout(() => (window.location.href = "index.html"), 1200);
  });
}
