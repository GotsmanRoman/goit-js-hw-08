import throttle from 'lodash.throttle';

const formRefs = document.querySelector('.feedback-form');
const formBtnRefs = document.querySelector("button[type='submit']");
const formEmailRefs = document.querySelector("input[name='email']");
const formTextRefs = document.querySelector("textarea[name='message']");
const FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';
const DataFromLocalStorage = localStorage.getItem(FORM_LOCAL_STORAGE_KEY);
const data = {
  email: '',
  message: '',
};

formBtnRefs.addEventListener('click', e => {
  e.preventDefault();
  formRefs.reset();
  console.log(data);

  clearObjectData(data);
  setItemToLocalStorage(data);
});

formEmailRefs.addEventListener('input', throttle(getDataFromInput, 500));
formTextRefs.addEventListener('input', throttle(getDataFromInput, 500));

function getDataFromInput(e) {
  data[e.target.name] = e.target.value;
  setItemToLocalStorage(data);
}
function getItemFromLocalStorage() {
  if (DataFromLocalStorage != null) {
    const parsedDataFromLocalStorage = JSON.parse(DataFromLocalStorage);

    data.email = parsedDataFromLocalStorage.email;
    data.message = parsedDataFromLocalStorage.message;
    formEmailRefs.value = parsedDataFromLocalStorage.email;
    formTextRefs.value = parsedDataFromLocalStorage.message;
  }
}
function setItemToLocalStorage(objName) {
  return localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(objName));
}
function createEmptyLocalStorage() {
  if (DataFromLocalStorage === null) {
    setItemToLocalStorage(data);
  }
}
function clearObjectData(objName) {
  Object.keys(objName).forEach(key => {
    objName[key] = '';
  });
}

createEmptyLocalStorage();
getItemFromLocalStorage();
