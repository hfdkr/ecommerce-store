// cart state (saved in localStorage)
let shop = document.getElementById("shop");
let span_value = document.getElementById("span_value");
let new_button = document.getElementById("new_button");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    span_value.textContent = cart.reduce((total, item) => total + item.qty, 0);
}
saveCart();

// mini card of added items
let mini_card = document.createElement("div");
mini_card.className = "fixed top-[80px] right-[20px] z-50 w-[300px] bg-[#121C2A] border border-white/20 rounded-[12px] p-[16px] text-white shadow-lg";

function renderMiniCard() {
    mini_card.innerHTML = "";

    let title = document.createElement("h3");
    title.className = "font-grotesk font-bold text-[16px] mb-[12px]";
    title.textContent = "YOUR CART";
    mini_card.appendChild(title);

    if (cart.length === 0) {
        let empty = document.createElement("p");
        empty.className = "text-[14px] text-orange-600";
        empty.textContent = "Your cart is empty.";
        mini_card.appendChild(empty);
        return;
    }

    let list = document.createElement("div");
    list.className = "space-y-[10px] max-h-[300px] overflow-y-auto";
    cart.forEach((item) => {
        let row = document.createElement("div");
        row.className = "flex items-center gap-[10px] bg-[#050F1C] p-[8px] rounded-[8px]";

        let img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        img.className = "w-[48px] h-[48px] object-contain";

        let info = document.createElement("div");
        info.className = "flex-1";
        let name = document.createElement("p");
        name.className = "font-bold text-[13px]";
        name.textContent = item.name;
        let details = document.createElement("p");
        details.className = "text-[12px] text-orange-600";
        details.textContent = `x${item.qty} • $${item.price * item.qty}`;
        info.append(name, details);

        let remove = document.createElement("button");
        remove.className = "text-red-500 text-[18px] px-[6px]";
        remove.textContent = "×";
        remove.addEventListener("click", (e) => {
            e.stopPropagation();
            cart = cart.filter((c) => c.name !== item.name);
            saveCart();
            renderMiniCard();
        });

        row.append(img, info, remove);
        list.appendChild(row);
    });
    mini_card.appendChild(list);

    let total = document.createElement("p");
    total.className = "font-bold text-[14px] mt-[12px]";
    total.textContent = `Total: $${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}`;
    mini_card.appendChild(total);

    let clear = document.createElement("button");
    clear.textContent = "Clear all";
    clear.className = "mt-[10px] w-full text-red-500 border border-white rounded-[12px] py-[5px]";
    clear.addEventListener("click", (e) => {
        e.stopPropagation();
        cart = [];
        saveCart();
        renderMiniCard();
    });
    mini_card.appendChild(clear);
}

// show / hide mini card when clicking the cart icon (or span_value)
shop.addEventListener("click", (e) => {
    e.stopPropagation();
    if (new_button.contains(mini_card)) {
        mini_card.remove();
    } else {
        renderMiniCard();
        new_button.appendChild(mini_card);
    }
});

// close mini card when clicking outside
mini_card.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("click", () => mini_card.remove());

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
//  Add item && text of succes
["add", "add_2", "add_3"].forEach((id) => {
    let add = document.getElementById(id);
    if (!add) return;

    add.addEventListener("click", () => {
        let product = add.closest(".p-\\[24px\\]");
        let name = product.querySelector("h2").textContent.trim();
        let price = Number(add.textContent.split("$")[1]) || 0;
        let img = product.querySelector("img").getAttribute("src");

        let existing = cart.find((item) => item.name === name);
        if (existing) {
            cart = cart.map((item) => item.name === name ? { ...item, qty: item.qty + 1 } : item);
        } else {
            cart = [...cart, { name, price, img, qty: 1 }];
        }
        saveCart();
        if (new_button.contains(mini_card)) renderMiniCard();
        // style par tag
        let par = add.nextElementSibling;
        par.style.display = "";
        par.textContent = "Item added successfully!";
        par.style.color = "green";
        par.style.fontWeight = "600";
        par.style.textDecoration = "underline";
        setTimeout(() => {
            par.style.display = "none";
        }, 5000);
    });
});
