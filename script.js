  console.log("Script loaded!");
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');

  function toggleSidebar() {
    sidebar.classList.toggle('hidden');
    main.classList.toggle('full-width');
  }

  // Auto-show sidebar on hover near left edge
  document.addEventListener('mousemove', function (e) {
    if (e.clientX <= 5) {
      sidebar.classList.remove('hidden');
      main.classList.remove('full-width');
    }
  });

  // Auto-hide when mouse leaves sidebar
  sidebar.addEventListener('mouseleave', function () {
    sidebar.classList.add('hidden');
    main.classList.add('full-width');
  });
   document.querySelector('.login-btn').addEventListener('click', function () {
    loginModal.style.display = 'flex';
  });
const mainContent = document.getElementById("mainContent");

document.addEventListener('mousemove', (e) => {
  if (e.clientX <= 10) {
    sidebar.classList.add('show');
    mainContent.classList.add('shifted');
  } else if (e.clientX > 260 && sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    mainContent.classList.remove('shifted');
  }
});

  // Close modal
  function closeModal() {
    loginModal.style.display = 'none';
  }

  // Optional: Close on outside click
  window.onclick = function(event) {
    if (event.target == loginModal) {
      closeModal();
    }
  };
  function showSignup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}
  const tools = [
  { name: "audio-player",link: "tools/audio-player.html"},
  { name: "Image to PDF", link: "tools/image-to-pdf.html" },
  { name: "PDF to Image", link: "tools/pdf-to-image.html" },
  { name: "Compress PDF", link: "tools/compress-pdf.html" },
  { name: "Word to PDF", link: "tools/word-to-pdf.html" },
  { name: "PDF to Word", link: "tools/pdf-to-word.html" },
  { name: "Merge PDFs", link: "tools/merge-pdfs.html" },
  { name: "Split PDF", link: "tools/split-pdf.html" },
  { name: "Image Compressor", link: "tools/image-compressor.html" },
  { name: "QR Code Generator", link: "tools/qr-code-generator.html" },
  { name: "Base64 Encoder", link: "tools/base64-encoder.html" },
  { name: "JSON Formatter", link: "tools/json-formatter.html" },
  { name: "Text to Binary", link: "tools/text-to-binary.html" },
  { name: "Color Picker", link: "tools/color-picker.html" },
  { name: "Password Generator", link: "tools/password-generator.html" },
  // Add remaining tools...
];

const searchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("suggestionBox");

let selectedIndex = -1;

searchInput.addEventListener("input", () => {
  const input = searchInput.value.toLowerCase();
  suggestionBox.innerHTML = "";
  selectedIndex = -1;

  if (input.length === 0) return;

  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(input)
  ).slice(0, 8);

  filtered.forEach((tool, index) => {
    const li = document.createElement("li");
    li.innerHTML = highlightMatch(tool.name, input);
    li.dataset.link = tool.link;
    li.dataset.index = index;
    li.onclick = () => openTool(tool.link);
    suggestionBox.appendChild(li);
  });
});

function highlightMatch(text, keyword) {
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, `<b>$1</b>`);
}

searchInput.addEventListener("keydown", (e) => {
  const items = suggestionBox.querySelectorAll("li");
  if (items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % items.length;
    updateHighlight(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    updateHighlight(items);
  } else if (e.key === "Enter" && selectedIndex >= 0) {
    e.preventDefault();
    items[selectedIndex].click();
  }
});

function updateHighlight(items) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === selectedIndex);
  });
}

// Hide when clicking outside
document.addEventListener("click", (e) => {
  if (!document.getElementById("searchContainer").contains(e.target)) {
    suggestionBox.innerHTML = "";
    selectedIndex = -1;
  }
});
function openTool(toolUrl) {
  const popup = document.getElementById("toolPopup");
  const frame = document.getElementById("toolFrame");
  popup.style.display = "flex";
  frame.src = toolUrl;
}

function closePopup() {
  const popup = document.getElementById("toolPopup");
  const frame = document.getElementById("toolFrame");
  popup.style.display = "none";
  frame.src = "";
}
function openTool(toolUrl) {
  const popup = document.getElementById("toolPopup");
  const frame = document.getElementById("toolFrame");
  popup.style.display = "flex";
  frame.src = toolUrl;
}

function closePopup() {
  const popup = document.getElementById("toolPopup");
  const frame = document.getElementById("toolFrame");
  popup.style.display = "none";
  frame.src = "";
}
function openTool(toolUrl, toolName = 'Tool') {
  const popup = document.getElementById("toolPopup");
  const frame = document.getElementById("toolFrame");
  const nameEl = document.getElementById("popupToolName");

  popup.classList.remove("fade-out");
  popup.style.display = "flex";
  frame.src = toolUrl;
  nameEl.textContent = toolName;
}

function closePopup() {
  const popup = document.getElementById("toolPopup");
  const frame = document.getElementById("toolFrame");

  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.style.display = "none";
    frame.src = "";
    popup.classList.remove("fade-out");
  }, 250);
}
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const x = e.clientX - card.getBoundingClientRect().left;
    const y = e.clientY - card.getBoundingClientRect().top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});
function refreshTool() {
  const frame = document.getElementById("toolFrame");
  const currentUrl = frame.src;
  frame.src = ''; // Clear first to force reload
  setTimeout(() => {
    frame.src = currentUrl;
  }, 50); // Short delay ensures reload
}