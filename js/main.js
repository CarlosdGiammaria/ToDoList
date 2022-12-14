const $form = document.querySelector(".js-submit");
const list = document.querySelector(".js-list");
const counter = document.querySelector(".js-counter");
const clearList = document.querySelector(".js-clear-task");
const btnComplete = document.querySelector(".js-task-complete");
const btnAll = document.querySelector(".js-btn-all");
const btnActive = document.querySelector(".js-btn-active");
const btnCheck = document.querySelector(".js-btn-check");
let items = [];

const ACTIVE_TASK = "ACTIVE_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const ALL_TASK = "ALL_TASK";

$form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const text = formData.get("text");
  const check = formData.get("checkbox");
  const isChecked = Boolean(check);
  items.push({ id: items.length + 1, text, checked: isChecked });

  const template = renderTemplate({
    id: items.length,
    text,
    checked: isChecked,
  });

  list.insertAdjacentHTML("afterbegin", template);
  renderOrUpdateItemsLeftlElement(list.children.length);
  $form.reset();
});

//taskComplete
btnComplete.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerTarea(COMPLETE_TASK);
  console.log(items);
});

btnActive.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerTarea(ACTIVE_TASK);
});


//All
btnAll.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerTarea(ALL_TASK);
});

function obtenerTarea(action) {
  list.innerHTML = "";
  items.forEach(({ id, text, checked }) => {
    let template = "";

    if (action === COMPLETE_TASK && checked) {
      template = renderTemplate({ id, text, checked });
    }

    if (action === ALL_TASK) {
      template = renderTemplate({ id, text, checked });
    }

    if (action == ACTIVE_TASK && !checked) {
      template = renderTemplate({ id, text, checked });
    }

    if (template) {
      list.insertAdjacentHTML("afterbegin", template);
    }
  });
  renderOrUpdateItemsLeftlElement(list.children.length);
}

//Clear
clearList.addEventListener("click", (ev) => {
  ev.preventDefault();
  list.innerHTML = "";
  renderOrUpdateItemsLeftlElement(0);
});

//Delete
list.addEventListener("click", (ev) => {
  const target = ev.target;
  console.log(target)
  if (target.classList.contains("js-btn-eliminar")) {
    const parent = target.closest(".list__item");
    parent.remove(target);
    renderOrUpdateItemsLeftlElement(list.children.length);
  }
  if (target.classList.contains("js-btn-check")) {
    const id = parseInt(target.value);

    console.log("target", target);

    items.forEach((item) => {
      if (item.id === id) {
        item.checked = target.checked;
      }
      return item;
    });
  }
});

//Counter
function renderOrUpdateItemsLeftlElement(num = 0) {
  counter.textContent = `${num} items left`;
}

function renderTemplate({ id, text, checked }) {
  return `
     <li class="list__item">
       <label class="checkbox">
         <input
            value="${id}"
           class="checkbox__input js-btn-check"
           type="checkbox"  
           ${checked ? "checked" : ""}
         />
         <div class="checkbox__box"></div>
         <span>${text}</span>
       </label>
       <button class="checkbox__button js-btn-eliminar">
         <img src="/images/icon-delete.svg" alt="icon-delete"/>
       </button>
     </li>
   `;
}
