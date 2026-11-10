let events = [];

const container = document.getElementById("events");
const filter = document.getElementById("filter");

function showEvents(list) {
  container.innerHTML = "";
  for (const event of list) {
    container.innerHTML += `
      <div class="card">
        <h3>${event.title}</h3>
        <p>Date: ${event.date}</p>
        <p>Place: ${event.place}</p>
        <p>Organiser: ${event.organiser}</p>
      </div>
    `;
  }
}

function fillDropdown() {
  filter.innerHTML = `<option value="All">All organisers</option>`;
  const organisers = [...new Set(events.map(e => e.organiser))];
  for (const name of organisers) {
    filter.innerHTML += `<option value="${name}">${name}</option>`;
  }
}

filter.addEventListener("change", function () {
  if (filter.value === "All") {
    showEvents(events);
  } else {
    showEvents(events.filter(e => e.organiser === filter.value));
  }
});

async function loadEvents() {
  const response = await fetch("/api/events");
  events = await response.json();
  fillDropdown();
  showEvents(events);
}

document.getElementById("addBtn").addEventListener("click", async function () {
  const newEvent = {
    title: document.getElementById("title").value,
    date: document.getElementById("date").value,
    place: document.getElementById("place").value,
    organiser: document.getElementById("organiser").value
  };

  if (newEvent.title === "" || newEvent.organiser === "") {
    alert("Please enter at least a title and an organiser.");
    return;
  }

  await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent)
  });

  loadEvents();
});

loadEvents();