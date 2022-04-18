let myLeads = []

// Button Dom variables
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
//input Dom variable
const inputBtn = document.getElementById("input-btn")

//ul Dom variable
const ulEl = document.getElementById("ul-el")

//store in a variable myLeads to an array again and get the setItem in the locaStorage in addeventlistener 
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

// if leadsFromLocalStorage is truthy then prints myLeads items from local storage in render() to keep them in the li even after I reload the page
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//function addeventlistener when I click the button it pushes the value in input in my render function (so in the li)
inputBtn.addEventListener("click", function() {
    // push the input into myLeads array
    myLeads.push(inputEl.value)
    //empty the input once button is clicked
    inputEl.value = ""
    //set an the item I got from input when I clicked the button in localStorage and change myLeads into a string
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log(myLeads)
    // call the render function to print the list item in my ulEl
    render(myLeads)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // push the input into myLeads array
    myLeads.push(tabs[0].url)
    //set an the item I got from input when I clicked the button in localStorage and change myLeads into a string
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // call the render function to print the list item in my ulEl
    render(myLeads)
     });
})

// function addeventlistener to delete the item in the li, dom and in the localStorage
deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// function to create a temple string of my li to print the list item in my ulEl
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
