let addbtn = document.getElementById("addbtn");
var impcount = 0;

if (localStorage.length != 0) update(2);

addbtn.addEventListener("click", function () {
  update(1);
});

let clearbtn = document.getElementById("clearbtn");
clearbtn.addEventListener("click", clearAll);

function update(flag) {
  var notes = document.getElementById("notes");
  let notestring = localStorage.getItem("notes");

  if (flag == 1) {
    Alert();
    var addtxt = document.getElementById("addtxt");
    var title = document.getElementById("title");
    if (notestring == null) notesarr = [];
    else notesarr = JSON.parse(notestring);
    notesarr.push([addtxt.value, "card-body", title.value]);
    addtxt.value = ``;
    title.value = ``;
    localStorage.setItem("notes", JSON.stringify(notesarr));
  } else notesarr = JSON.parse(notestring);
  str = ``;
  notesarr.forEach((element, index) => {
    str += `
 <div class="noteCard mx-2 my-3" style="width: 18rem;">
    <div class="${element[1]} object-fit">
      <h3 class="card-title">${element[2]}</h3>
      <p class="card-text">${element[0]}</p>
      <button class="btn btn-danger btn-sm" onclick="deleted(${index})">Delete</button>
      <button class="btn btn-warning impbtn btn-sm mb-2"  onclick="markimp(${index})">Mark Important</button>
    </div>
  </div>
 `;
  });

  notes.innerHTML = str;
}

function deleted(index) {
  let notestring = localStorage.getItem("notes");
  notesarr = JSON.parse(notestring);

  notesarr.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesarr));

  update(2);
}

function clearAll() {
  if (confirm("Do you really want to clear ?")) {
    console.log("Clearing List");
    localStorage.clear();
    notes.innerHTML = "";
  }
}


let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  //console.log(noteCards);
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTitle = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

function markimp(number) {
  let notestring = localStorage.getItem("notes");
  notesarr = JSON.parse(notestring);

  notesarr.forEach((element, index) => {
    if (index == number) {
      if (element[1] == "imp card-body") element[1] = "card-body";
      else element[1] = "imp card-body";
    }
  });
  localStorage.setItem("notes", JSON.stringify(notesarr));

  update(2);
}

impNotesbtn = document.getElementById("impNotesbtn");

impNotesbtn.addEventListener("click", function () {
  impcount++;
  if (impcount % 2 != 0) {
    let notesarr = document.getElementsByClassName("imp card-body");
    str = ``;
    Array.from(notesarr).forEach((element) => {
      wrap = document.createElement("div");
      wrap.appendChild(element.parentElement);
      str += `
    ${wrap.innerHTML}
    `;
    });
    notes.innerHTML = str;
  } else {
    update(2);
  }
});

var resetbtn = document.getElementById("resetbtn");

resetbtn.addEventListener("click", function () {
  let notestring = localStorage.getItem("notes");
  notesarr = JSON.parse(notestring);

  notesarr.forEach((element, index) => {
    element[1] = "card-body";
    0;
  });
  localStorage.setItem("notes", JSON.stringify(notesarr));

  update(2);
});

function Alert() {
  alert = document.getElementById("alert");

  alert.innerHTML = `
<div class="alert alert-info alert-dismissible fade show" role="alert">
  <strong>Woohooo!!!</strong> Your Notes has been added
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
  setTimeout(function () {
    alert.innerHTML = ``;
  }, 3000);
}
