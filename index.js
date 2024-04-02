function displayText() {
    const input = document.getElementById("textInput").value;
    const output = document.getElementById("textOutput");
    output.innerHTML = "";
    
    for (let char of input) {
        let span = document.createElement("span");
        span.textContent = char;
        span.className = "draggable";
        span.draggable = true;
        span.addEventListener("dragstart", dragStart);
        span.addEventListener("dragover", dragOver);
        span.addEventListener("drop", drop);
        output.appendChild(span);
    }
}

let selectedElements = [];
let dragSrcEl = null;

function dragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.outerHTML);

    this.classList.add("selected");
}

function dragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = "move"; 
    return false;
}

function drop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }

    if (selectedElements.length > 1) {
        let dropHTML = e.dataTransfer.getData("text/html");
        selectedElements.forEach(function (element) {
            let parent = element.parentNode;
            parent.removeChild(element);
            parent.innerHTML += dropHTML;
        });
        selectedElements = [];
        }

        return false;
      }

      document.addEventListener("keydown", function (e) {
        if (e.key === "Control") {
          document.querySelectorAll(".draggable").forEach(function (element) {
            element.addEventListener("click", function () {
              if (selectedElements.includes(this)) {
                this.classList.remove("selected");
                selectedElements.splice(selectedElements.indexOf(this), 1);
              } else {
                this.classList.add("selected");
                selectedElements.push(this);
              }
            });
          });
        }
      });

      document.addEventListener("keyup", function (e) {
        if (e.key === "Control") {
          document.querySelectorAll(".draggable").forEach(function (element) {
            element.removeEventListener("click", function () {});
          });
        }
      });