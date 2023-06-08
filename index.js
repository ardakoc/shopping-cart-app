import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopping-cart-16da0-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const db = getDatabase(app)
const shoppingListDb = ref(db, "shoppingList")

const addBtn = document.getElementById("add-btn")
const inputEl = document.getElementById("input-el")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function () {
  let input = inputEl.value
  
  push(shoppingListDb, input)
  clearInput()
})

onValue(shoppingListDb, function(snapshot) {
  let shoppingListArray = Object.values(snapshot.val())

  clearShoppingList()
  
  for (let i=0; i<shoppingListArray.length; i++) {
    appendItemToList(shoppingListArray[i])
  }
})

function clearInput() {
  inputEl.value = ""
}

function clearShoppingList() {
  shoppingListEl.innerHTML = ""
}

function appendItemToList(item) {
  shoppingListEl.innerHTML += `<li>${item}</li>`
}