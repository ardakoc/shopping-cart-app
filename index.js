import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
  let shoppingListArray = Object.entries(snapshot.val())

  clearShoppingList()
  
  for (let i=0; i<shoppingListArray.length; i++) {
    let currentItem = shoppingListArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]
    appendItemToList(currentItem)
  }
})

function clearInput() {
  inputEl.value = ""
}

function clearShoppingList() {
  shoppingListEl.innerHTML = ""
}

function appendItemToList(item) {
  let itemID = item[0]
  let itemValue = item[1]
  let newElement = document.createElement("li")
  newElement.textContent = itemValue
  newElement.addEventListener("click", function() {
    remove(ref(db, `shoppingList/${itemID}`))
  })
  shoppingListEl.append(newElement)
}