// header show hidden add item
let shop = document.getElementById("shop");
let body = document.body;
let new_button = document.getElementById("new_button");
let button = document.createElement("button");
shop.addEventListener("click", () => {
    // show and hide button
    if (new_button.contains(button)) {
        button.remove();
    }
    else {
        new_button.appendChild(button);
        button.textContent = "Clear all";
        button.style.color = "red"
        button.style.border = "1px solid white";
        button.style.borderRadius = "12px";
        button.style.padding = "5px 12px";
        button.addEventListener("click", () => {
            number = 0;
            localStorage.setItem("number", number);
            span_value.textContent = number;
        })

    }
})


// new input search html
let search = document.getElementById("search");
let new_items = document.getElementById("new_items");
search.addEventListener("click", () => {
    if (new_items.children.length < 1) {
        let input = document.createElement("input")
        input.type = "text";
        input.placeholder = "Search...";
        input.style.border = "2px solid white";
        input.style.padding = "5px 15px";
        input.style.margin = "0px 22px";
        input.style.color = "black";
        input.style.backgroundColor = "white";
        input.style.borderRadius = "10px";
        new_items.appendChild(input);
    }
    else {
        new_items.innerHTML = "";
    }

});
let side_bar = document.getElementById("side_bar");
let span_value = document.getElementById("span_value");

let number = Number(localStorage.getItem("number")) || 0;
span_value.textContent = number;

let add = document.getElementById("add");
let par = document.getElementById("paragraph");
add.addEventListener("click", () => {
    number++;
    localStorage.setItem("number", number);
    span_value.textContent = number;

});
let add_items = document.getElementById("add_items");
add.addEventListener("click", () => {
    par.style.display = ""
    par.textContent = "Item added successfully!"
    par.style.color = "green";
    par.style.fontWeight = "600";
    par.style.textDecoration = "underline"

    setTimeout(() => {
        par.style.display = "none";
    }, 5000)
});