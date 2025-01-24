let products = {
  whiteCoffee: {
    price: 5.2,
    stock: 4,
    wholeSale: 3.2,
  },
  blackCoffee: {
    price: 4.7,
    stock: 3,
    wholeSale: 2.7,
  },
  muffin: {
    price: 6,
    stock: 4,
    wholeSale: 3,
  },
  eggs: {
    price: 13.5,
    stock: 3,
    wholeSale: 8,
  },
}

function displayProducts() {
  document.getElementById('whiteCoffee').innerHTML =
    'WhiteCoffee : ' + products.whiteCoffee.stock
  document.getElementById('blackCoffee').innerHTML =
    'BlackCoffee : ' + products.blackCoffee.stock
  document.getElementById('muffin').innerHTML =
    'Muffin : ' + products.muffin.stock
  document.getElementById('eggs').innerHTML = 'Eggs : ' + products.eggs.stock
}

displayProducts()

//create order
let customer = { order: [] }
function createCustomerOrder() {
  let newOrder = []
  let minOrder = 1
  let maxOrder = 5
  let orderSize = getRandomInt(minOrder, maxOrder)
  let productNames = Object.keys(products)
  for (let i = 0; i < orderSize; i++) {
    //get random object name from object of object
    let productIndex = getRandomInt(0, productNames.length - 1)
    let productName = productNames[productIndex]
    newOrder.push(productName)
  }
  customer.order = newOrder
  displayCustomerOrder()
}
createCustomerOrder()
function displayCustomerOrder() {
  document.getElementById('customerOrder').innerHTML =
    'Customer Order: ' + customer.order.join(', ')
}
document.getElementById('customerOrderButton').onclick = createCustomerOrder

//fillOrder
//customer's stock-- cash++
//customer.order = name "string". change this to objects and go in th products
//use loop to see each array
let cash = 0
let minCustomerCash = 5
let maxCustomerCash = 50
let customerCash = getRandomInt(minCustomerCash, maxCustomerCash)
let previousOrder = []

function fillOrder() {
  let saleTotal = 0

  for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i]
    let product = products[productName]
    if (product.stock > 0) {
      saleTotal += product.price
      product.stock--
      if (customerCash <= 0) {
        alert(
          `You don't have enough money to order. out of $${(
            saleTotal - customerCash
          ).toFixed(2)}`
        )
        return
      }
    } else if (product.stock === 0) {
      let productElement = document.getElementById(productName)
      productElement.classList.add('product-runout')
      alert(`Sorry, Run out of ${productName}. You don't need to pay`)
      displayProducts()
      return
    }
  }
  cash += saleTotal
  customerCash -= saleTotal

  //previous order, once fill order, the treArray goes in prevOrder array
  previousOrder = [...customer.order]
  customer.order = []
  displayCash()
  displayProducts()
  displayCustomerCash()
  displayPreviousOrder()
  displayCustomerOrder()
}

document.getElementById('fillOrderButton').onclick = fillOrder

displayCash()
displayCustomerCash()
displayPreviousOrder()

function displayCash() {
  document.getElementById('cash').innerHTML = 'Cash : ' + cash.toFixed(2)
}

function displayCustomerCash() {
  document.getElementById('customerCash').innerHTML =
    'Customer cash : ' + customerCash.toFixed(2)
}

function displayPreviousOrder() {
  document.getElementById('previousOrder').innerHTML =
    'Previous Order : ' + previousOrder.join(', ')
}

//restock
//make 4 button
//they will take same function
//stock++ cash--

function restock(productName) {
  if (cash > 0) {
    cash -= products[productName].wholeSale
    products[productName].stock++
  } else {
    alert('No money to restock')
  }
  let productElement = document.getElementById(productName)
  productElement.classList.remove('product-runout')

  displayCash()
  displayProducts()
}

document.getElementById('whiteCoffeeButton').onclick = () =>
  restock('whiteCoffee')
document.getElementById('blackCoffeeButton').onclick = () =>
  restock('blackCoffee')
document.getElementById('muffinButton').onclick = () => restock('muffin')
document.getElementById('eggsButton').onclick = () => restock('eggs')

//refund. once onclick = see previousOrder if that matches with checkbox checked. if true = cash-- customerCash++ (products[productName].price), stock--
//what's checkBox[i].checked??

function getRefund() {
  let checkBox = document.getElementsByClassName('checkBox')
  let isChecked = false
  console.log(checkBox)
  for (let i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked) {
      isChecked = true
      let productName = checkBox[i].name
      let productPrice = products[productName].price
      products[productName].stock++
      cash -= productPrice
      customerCash += productPrice
    }
  }
  if (!isChecked) {
    alert('Please choose the check box')
    return
  } else if (cash <= 0) {
    alert('Not enough cash to get a refund.')
    return
  }

  displayCash()
  displayProducts()
  displayCustomerCash()
  displayCustomerOrder()
}
document.getElementById('getRefund').onclick = getRefund
//utils
function getRandomInt(min, max) {
  minNumber = Math.ceil(min)
  maxNumber = Math.floor(max)
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
}
