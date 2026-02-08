// ========================
// 1️⃣ Навигация
// ========================
const hws = document.querySelector(".hws");
const back1 = document.querySelector(".back");
const container = document.getElementById("container");
const container_hw = document.getElementById("container_hw");

const hw1 = document.getElementById("1");
const hw2 = document.getElementById("2");

const container_hwPage1 = document.querySelector(".container_hw-page1");
const container_hwPage2 = document.querySelector(".container_hw-page2");

const back2 = document.querySelector(".back2");
const back3 = document.querySelector(".back3");

hws.onclick = () => {
  container.style.display = "none";
  container_hw.style.display = "flex";
};

back1.onclick = () => {
  container.style.display = "flex";
  container_hw.style.display = "none";
};

hw1.onclick = () => {
  container_hw.style.display = "none";
  container_hwPage1.style.display = "flex";
};

hw2.onclick = () => {
  container_hw.style.display = "none";
  container_hwPage2.style.display = "flex";
};

back2.onclick = () => {
  container_hwPage1.style.display = "none";
  container_hw.style.display = "flex";
};

back3.onclick = () => {
  container_hwPage2.style.display = "none";
  container_hw.style.display = "flex";
};

// ========================
// 2️⃣ Firebase
// ========================
const firebaseConfig = {
  databaseURL: "https://hw-website-25bce-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ========================
// 3️⃣ Журнал
// ========================
const journalBtn = document.querySelector(".book");
const container_journal = document.getElementById("container_journal");
const back_journal = document.querySelector(".back_journal");
const journalBody = document.getElementById("journal_body");

journalBtn.onclick = () => {
  container.style.display = "none";
  container_journal.style.display = "flex";
  fetchJournal();
};

back_journal.onclick = () => {
  container_journal.style.display = "none";
  container.style.display = "flex";
};

function renderJournal(entries) {
  journalBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = entry.name;

    const taskCell = document.createElement("td");
    taskCell.textContent = entry.task;

    const dateCell = document.createElement("td");
    dateCell.textContent = entry.date;

    const scoreCell = document.createElement("td");
    scoreCell.textContent = entry.score;

    const scoreValue = parseInt(entry.score);
    if (scoreValue >= 4) scoreCell.classList.add("score-good");
    else if (scoreValue >= 2) scoreCell.classList.add("score-mid");
    else scoreCell.classList.add("score-bad");

    const viewCell = document.createElement("td");
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "Ответы";
    viewBtn.classList.add("btn-view");
    viewBtn.onclick = () => alert(entry.answers.join(", "));
    viewCell.appendChild(viewBtn);

    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("btn-delete");
    deleteBtn.onclick = () => {
      db.ref("journal/" + entry.id).remove();
    };
    deleteCell.appendChild(deleteBtn);

    row.append(
      nameCell,
      taskCell,
      dateCell,
      scoreCell,
      viewCell,
      deleteCell
    );

    journalBody.appendChild(row);
  });
}

function fetchJournal() {
  db.ref("journal").on("value", snapshot => {
    const data = snapshot.val() || {};
    const entries = Object.keys(data).map(id => ({
      id,
      ...data[id]
    }));
    renderJournal(entries);
  });
}

// ========================
// 4️⃣ Проверка домашек
// ========================
function initHW(containerHw, correctAnswers, taskName) {
  const nameInp = containerHw.querySelector(".name");

  const btn = document.createElement("button");
  btn.textContent = "Проверить";
  btn.classList.add("check");
  btn.style.marginTop = "20px";
  containerHw.appendChild(btn);

  btn.onclick = () => {
    const inputs = containerHw.querySelectorAll("input[type='text']:not(.name)");

    if (!nameInp.value.trim() || [...inputs].some(i => !i.value.trim())) {
      alert("Введи имя и все ответы!");
      return;
    }

    let score = 0;
    const answers = [];

    inputs.forEach((input, i) => {
      const val = input.value.trim();
      answers.push(val);
      if (val.toLowerCase() === correctAnswers[i]) {
        input.style.border = "2px solid green";
        score++;
      } else {
        input.style.border = "2px solid red";
      }
    });

    containerHw.querySelector(".notaAuto").textContent =
      `${score} / ${correctAnswers.length}`;

    const entry = {
      name: nameInp.value.trim(),
      task: taskName,
      date: new Date().toLocaleString(),
      score: `${score} / ${correctAnswers.length}`,
      answers
    };

    db.ref("journal").push(entry);
    alert("Оценка сохранена ✅");
  };
}

// ========================
// 5️⃣ Инициализация
// ========================
initHW(
  document.querySelector(".container_hw1"),
  ["ayudan", "estás", "viajamos", "dais", "explica"],
  "Tarea 1"
);

initHW(
  document.querySelector(".container_hw2"),
  ["estoy", "comemos", "lee", "tienes", "beben"],
  "Tarea 2"
);
