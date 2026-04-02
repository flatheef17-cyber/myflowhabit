let habits = [];

function addHabit() {
  const input = document.getElementById("habitInput");
  const text = input.value.trim();

  if (!text) return;

  habits.push({ name: text, done: false });

  input.value = "";
  saveHabits();
  render();
}

function render() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  let doneCount = 0;

  habits.forEach((h, i) => {
    const div = document.createElement("div");
    div.className = "glass habit";

    const span = document.createElement("span");
    span.textContent = h.name;

    if (h.done) {
      span.classList.add("done");
      doneCount++;
    }

    span.onclick = () => {
      habits[i].done = !h.done;
      saveHabits();
      render();
    };

    const del = document.createElement("button");
    del.textContent = "✕";

    del.onclick = () => {
      habits.splice(i, 1);
      saveHabits();
      render();
    };

    div.appendChild(span);
    div.appendChild(del);
    list.appendChild(div);
  });

  document.getElementById("total").textContent = habits.length;
  document.getElementById("completed").textContent = doneCount;
}

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

window.onload = () => {
  const data = localStorage.getItem("habits");
  if (data) habits = JSON.parse(data);
  render();
};