import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopping-cart-16da0-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const db = getDatabase(app)
const shoppingList = ref(db, "shoppingList")

const addBtn = document.getElementById("add-btn")
const inputEl = document.getElementById("input-el")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function () {
  let input = inputEl.value
  
  push(shoppingList, input)
  shoppingListEl.innerHTML += `<li>${input}</li>`
  inputEl.value = ""
})