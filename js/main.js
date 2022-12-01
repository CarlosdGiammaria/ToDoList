const $form = document.querySelector(".js-submit");
const lista = document.querySelector(".js-lista");

$form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const text = formData.get("text");
  const template = `
    <li class="list__item">
      <label class="checkbox">
        <input
          class="checkbox__input"
          type="checkbox"  
          name="myCheckboxName"
        />
        <div class="checkbox__box"></div>
        <span>${text}</span>
      </label>
      <button class="checkbox__button js-btn-eliminar">
              <img src="/images/icon-delete.svg"    alt="icon-delete"/>
         </button>
    </li>
  `
  $form.reset();
  lista.insertAdjacentHTML("afterbegin", template);
});


lista.addEventListener("click", (ev) => {
  const target = ev.target
   console.log('target', target) 
  if (target.classList.contains('js-btn-eliminar')) {
    const parent = target.closest('.list__item')
     console.log('entro', parent) 
    parent.remove(target);
  }
});