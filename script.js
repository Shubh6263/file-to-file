document.addEventListener("DOMContentLoaded", () => {
  const toolListElem = document.getElementById("toolList");
  const toolArea = document.getElementById("toolArea");
  const searchInput = document.getElementById("toolSearch");

  fetch("toolList.json")
    .then(res => res.json())
    .then(data => {
      window.allTools = data;
      renderToolList(data);
      checkURLForTool();
    });

  function renderToolList(tools) {
    toolListElem.innerHTML = "";
    tools.forEach(tool => {
      const li = document.createElement("li");
      li.textContent = tool.name;
      li.onclick = () => loadTool(tool);
      li.dataset.toolId = tool.id;
      toolListElem.appendChild(li);
    });
  }

  function loadTool(tool) {
    toolArea.innerHTML = \`<div class="tool-card" id="tool-\${tool.id}">
      <h3>\${tool.name}</h3>
      <p>\${tool.description}</p>
      <div id="toolUI"></div>
    </div>\`;

    import(\`./tools/\${tool.script}\`).then(mod => {
      mod.default(document.getElementById("toolUI"));
    });

    updateUsage(tool.id);
  }

  function checkURLForTool() {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.slice(1);
    const toolId = params.get("tool") || hash;
    if (toolId) {
      const tool = window.allTools.find(t => t.id === toolId);
      if (tool) loadTool(tool);
    }
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = window.allTools.filter(t => t.name.toLowerCase().includes(query));
    renderToolList(filtered);
  });

  function updateUsage(id) {
    const usage = JSON.parse(localStorage.getItem("toolUsage") || "{}");
    usage[id] = (usage[id] || 0) + 1;
    localStorage.setItem("toolUsage", JSON.stringify(usage));
  }
});
