// Навигация между страницами
const hws = document.querySelector(".hws");
const back1 = document.querySelector(".back");
const container = document.getElementById("container");
const container_hw = document.getElementById("container_hw");
const hw1 = document.getElementById("1");
const hw2 = document.getElementById("2");
const container_hwPage1 = document.querySelector(".container_hw-page1");
const container_hwPage2 = document.querySelector('.container_hw-page2')
const back2 = document.querySelector(".back2");
const back3 = document.querySelector(".back3");

// Переход на домашки
hws.addEventListener("click", () => {
  container.style.display = "none";
  container_hw.style.display = "flex";
});

// Назад на главную
back1.addEventListener("click", () => {
  container.style.display = "flex";
  container_hw.style.display = "none";
});

// Открыть домашку
hw1.addEventListener("click", () => {
  container_hwPage1.style.display = "flex";
  container_hw.style.display = "none";
});
hw2.addEventListener("click", () => {
    container_hwPage2.style.display = "flex";
    container_hw.style.display = "none";
  });

// Назад к списку домашек
back2.addEventListener("click", () => {
  container_hwPage1.style.display = "none";
  container_hw.style.display = "flex";
});
back3.addEventListener("click", () => {
    container_hwPage2.style.display = "none";
    container_hw.style.display = "flex";
  });





// Журнал
const journalBtn = document.querySelector(".book");
const container_journal = document.getElementById("container_journal");
const back_journal = document.querySelector(".back_journal");
const journalBody = document.getElementById("journal_body");

// Массив для хранения всех записей
let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

// Функция рендера журнала
function renderJournal() {
  journalBody.innerHTML = "";

  journalEntries.forEach((entry, index) => {
    const row = document.createElement("tr");

    // Имя
    const nameCell = document.createElement("td");
    nameCell.textContent = entry.name;

    // Дата
    const dateCell = document.createElement("td");
    dateCell.textContent = entry.date;

    // Оценка
    const scoreCell = document.createElement("td");
    scoreCell.textContent = entry.score;

    const scoreValue = parseInt(entry.score);
    if (scoreValue >= 4) scoreCell.classList.add("score-good");
    else if (scoreValue >= 2) scoreCell.classList.add("score-mid");
    else scoreCell.classList.add("score-bad");

    // Кнопка просмотра
    const viewCell = document.createElement("td");
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "Ответы";
    viewBtn.classList.add("btn-view");

    viewBtn.addEventListener("click", () => {
      alert(`Ответы:\n${entry.answers.join(", ")}`);
    });

    viewCell.appendChild(viewBtn);

    // Кнопка удаления
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("btn-delete");

    deleteBtn.addEventListener("click", () => {
      journalEntries.splice(index, 1);
      localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
      renderJournal();
    });

    deleteCell.appendChild(deleteBtn);

    row.append(
      nameCell,
      dateCell,
      scoreCell,
      viewCell,
      deleteCell
    );

    journalBody.appendChild(row);
  });
}

renderJournal();


// Кнопки для перехода в журнал
journalBtn.addEventListener("click", () => {
  container.style.display = "none";
  container_journal.style.display = "flex";
});

back_journal.addEventListener("click", () => {
  container_journal.style.display = "none";
  container.style.display = "flex";
});




// HW1
const containerHw1 = document.querySelector(".container_hw1");
const nameInp = containerHw1.querySelector('.name');


// Кнопка проверки
const submitBtn = document.createElement("button");
submitBtn.textContent = "Проверить";
submitBtn.style.marginTop = "20px";
submitBtn.classList.add('check');
containerHw1.appendChild(submitBtn);

// Правильные ответы
const correctAnswers = ["ayudan","estás","viajamos","dais","explica"];

// Проверка домашки и добавление в журнал
    submitBtn.addEventListener("click", () => {
    const inputs = containerHw1.querySelectorAll("input[type='text']:not(.name)");
  
    // Проверка на заполненность
    if (!nameInp.value.trim() || Array.from(inputs).some(input => !input.value.trim())) {
      alert('Введи имя и все ответы!');
      return;
    }
  
    let score = 0;
    const studentAnswers = [];
  
    inputs.forEach((input, index) => {
      const answer = input.value.trim();
      studentAnswers.push(answer);
      if (answer.toLowerCase() === correctAnswers[index].toLowerCase()) {
        input.style.border = "2px solid green";
        score++;
      } else {
        input.style.border = "2px solid red";
      }
    });
  
    // Вывод оценки
    const notaSpan = containerHw1.querySelector(".notaAuto");
    notaSpan.textContent = `${score} / ${correctAnswers.length}`;
  
    // Добавляем запись в журнал
    const now = new Date();
    const newEntry = {
      name: nameInp.value.trim(),
      date: now.toLocaleDateString() + " " + now.toLocaleTimeString(),
      score: `${score} / ${correctAnswers.length}`,
      answers: studentAnswers
    };
  
    journalEntries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    renderJournal();
  });



// HW2
const containerHw2 = document.querySelector(".container_hw2");
const nameInp2 = containerHw2.querySelector('.name');

// Кнопка проверки
const submitBtn2 = document.createElement("button");
submitBtn2.textContent = "Проверить";
submitBtn2.style.marginTop = "20px";
submitBtn2.classList.add('check');
containerHw2.appendChild(submitBtn2);

// Правильные ответы
const correctAnswers2 = ["estoy","comemos","lee","tienes","beben"];

// Проверка домашки и добавление в журнал
    submitBtn2.addEventListener("click", () => {
    const inputs = containerHw2.querySelectorAll("input[type='text']:not(.name)");
  
    // Проверка на заполненность
    if (!nameInp2.value.trim() || Array.from(inputs).some(input => !input.value.trim())) {
      alert('Введи имя и все ответы!');
      return;
    }
  
    let score = 0;
    const studentAnswers2 = [];
  
    inputs.forEach((input, index) => {
      const answer2 = input.value.trim();
      studentAnswers2.push(answer2);
      if (answer2.toLowerCase() === correctAnswers2[index].toLowerCase()) {
        input.style.border = "2px solid green";
        score++;
      } else {
        input.style.border = "2px solid red";
      }
    });
  
    // Вывод оценки
    const notaSpan2 = containerHw2.querySelector(".notaAuto");
    notaSpan2.textContent = `${score} / ${correctAnswers2.length}`;
  
    // Добавляем запись в журнал
    const now2 = new Date();
    const newEntry2 = {
      name: nameInp2.value.trim(),
      date: now2.toLocaleDateString() + " " + now2.toLocaleTimeString(),
      score: `${score} / ${correctAnswers2.length}`,
      answers: studentAnswers2
    };
  
    journalEntries.push(newEntry2);
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    renderJournal();
  });


