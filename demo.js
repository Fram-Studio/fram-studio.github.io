// Hintet på forsiden: et ekte dagsbrett (Easy, 11. februar 2026) og et skjult single i boksen øverst til høyre.
// Sifferet 7 passer bare i rad 2, kolonne 8: kolonne 9 har en 7 lenger ned, og den stryker de tre andre
// åpne cellene i boksen. Beviset er regnet ut fra brettet, ikke skrevet for hånd.
(function () {
  var PUZZLE = ".3.9..51....4..2.....5..84.6...3......27.56......8...7.49..2.....5..7....73..6.9.";
  var TARGET = 16;            // rad 2, kolonne 8
  var WITNESS = 53;           // rad 6, kolonne 9: 7-tallet som stryker
  var STRUCK = [8, 17, 26];   // de tre andre åpne cellene i boksen
  var DIGIT = "7";

  var board = document.getElementById("board");
  var title = document.getElementById("demo-title");
  var body = document.getElementById("demo-body");
  var stepLabel = document.getElementById("demo-step");
  var next = document.getElementById("demo-next");
  var ticks = document.querySelectorAll("#demo .ticks i");
  if (!board || !next) return;

  var cells = [];
  for (var i = 0; i < 81; i++) {
    var c = document.createElement("div");
    c.className = "cell";
    var ch = PUZZLE.charAt(i);
    if (ch !== ".") c.textContent = ch;
    board.appendChild(c);
    cells.push(c);
  }

  function inBox(i) { return Math.floor(i / 9) < 3 && i % 9 > 5; }

  function clearNotes(c) {
    var n = c.querySelector(".note");
    if (n) c.removeChild(n);
    c.classList.remove("struck");
  }

  function note(c, struck) {
    clearNotes(c);
    var n = document.createElement("span");
    n.className = "note";
    n.textContent = DIGIT;
    c.appendChild(n);
    if (struck) c.classList.add("struck");
  }

  var STAGES = [
    {
      title: "Try a hidden single",
      body: "A digit that fits in only one cell of a box.",
      button: "Show where"
    },
    {
      title: "Try a hidden single",
      body: "Look at the shaded box. One digit has only one place to go.",
      button: "Show proof"
    },
    {
      title: "Try a hidden single",
      body: "Column 9 already has a 7, circled. That rules out the three open cells above it in this box. The 7 can only go in the amber cell.",
      button: "Fill in " + DIGIT
    },
    {
      title: "Filed",
      body: "That is a hint at its last step: the cell, and the cells that prove it. Every hint in Kata ends this way.",
      button: "Start again"
    }
  ];

  var stage = 0;

  function render() {
    var s = STAGES[stage];
    title.textContent = s.title;
    body.textContent = s.body;
    next.textContent = s.button;
    stepLabel.textContent = stage < 3 ? "Step " + (stage + 1) + " of 3" : "Done";
    for (var t = 0; t < ticks.length; t++) ticks[t].className = t <= Math.min(stage, 2) ? "on" : "";

    for (var i = 0; i < 81; i++) {
      var c = cells[i];
      c.classList.remove("shade", "target", "witness", "mine");
      clearNotes(c);
      if (i === TARGET) c.textContent = stage === 3 ? DIGIT : "";
      if (stage >= 1 && stage <= 2 && inBox(i)) c.classList.add("shade");
    }
    if (stage === 2) {
      cells[TARGET].classList.add("target");
      cells[WITNESS].classList.add("witness");
      note(cells[TARGET], false);
      STRUCK.forEach(function (i) { note(cells[i], true); });
    }
    if (stage === 3) cells[TARGET].classList.add("mine");

    board.setAttribute("aria-label",
      stage === 0 ? "A sudoku board. The hint has not shown where to look yet."
      : stage === 1 ? "A sudoku board. The top right box is shaded."
      : stage === 2 ? "A sudoku board. The top right box is shaded. A 7 in the bottom of column 9 is circled, and the open cell in row 2, column 8 is amber."
      : "A sudoku board. The 7 is filled in at row 2, column 8.");
  }

  next.addEventListener("click", function () {
    stage = (stage + 1) % STAGES.length;
    render();
  });

  render();
})();
