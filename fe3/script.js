 // بيانات المنيو
    const menuData = {
        "كيك": [
            { name: "كيك تي سي", price: 4800 },
            { name: "كيك تشالكس", price: 4800 },
            { name: "ماتيلدا كيك", price: 5300 },
            { name: "كيك مارس", price: 6300 },
            { name: "كيك فيروشي", price: 5300 },
            { name: "كيك كيت كات", price: 4800 },
            { name: "كيك أوريو", price: 4800 },
            { name: "كيك لوست", price: 3500 }
        ],
        "تشيز كيك": [
            { name: "تشيز كيك فراولة", price: 5800 },
            { name: "تشيز كيك بستاشيو", price: 4500 },
            { name: "تشيز كيك أوريو", price: 6300 },
            { name: "تشيز كيك تي سي", price: 6300 }
        ],
        "حلى": [
            { name: "براونيز", price: 3000 },
            { name: "وافل", price: 3000 },
            { name: "كريب", price: 3000 },
            { name: "دونات محشي", price: 2800 }
        ],
        "بيتزا": [
            { name: "بيتزا تي سي", price: 10000 },
            { name: "بيتزا دجاج", price: 6300 },
            { name: "بيتزا مكس", price: 7500 }
        ],
        "مشروبات باردة": [
            { name: "كواد برو", price: 5500 },
            { name: "موكا بارد", price: 4800 },
            { name: "ميلك شيك", price: 5000 }
        ],
        "قهوة ساخنة": [
            { name: "اسبرسو", price: 2500 },
            { name: "كابتشينو", price: 4000 },
            { name: "قهوة تركية", price: 2500 }
        ]
    };

    let cart = [];
    let activeTab = "كيك";

    function showNotification(msg) {
        let n = document.createElement("div");
        n.className = "notification";
        n.innerHTML = msg;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 2000);
    }

    function addToCart(name, price) {
        let existing = cart.find(i => i.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
        showNotification("✅ تم إضافة " + name);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        let count = 0, total = 0;
        let itemsHtml = "";
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            count += item.quantity;
            total += item.price * item.quantity;
            itemsHtml += `<li class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${(item.price * item.quantity)} >ر.ي</span>
                <button onclick="removeFromCart(${i})">✖</button>
            </li>`;
        }
        document.getElementById("cartCount").innerHTML = count;
        document.getElementById("cartItemsList").innerHTML = itemsHtml;
        document.getElementById("cartTotal").innerHTML = total;
    }

    window.removeFromCart = removeFromCart;

    function sendOrder() {
        if (cart.length === 0) {
            showNotification("⚠️ السلة فارغة");
            return;
        }
        let msg = "🛍️ طلب جديد من T/C Coffee:\n\n";
        let total = 0;
        for (let item of cart) {
            msg += `• ${item.name} ×${item.quantity} = ${item.price * item.quantity} >ر.ي\n`;
            total += item.price * item.quantity;
        }
        msg += `\n💰 الإجمالي: ${total} >ر.ي`;
        let phone = "963123456789";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    }

    function renderTabs() {
        let container = document.getElementById("tabsContainer");
        container.innerHTML = "";
        for (let cat in menuData) {
            let btn = document.createElement("button");
            btn.innerHTML = cat;
            btn.className = "tab-btn";
            if (activeTab === cat) btn.classList.add("active");
            btn.onclick = (function(c) {
                return function() {
                    activeTab = c;
                    renderTabs();
                    renderMenu();
                };
            })(cat);
            container.appendChild(btn);
        }
    }

    function renderMenu() {
        let grid = document.getElementById("menuGrid");
        let items = menuData[activeTab];
        grid.innerHTML = "";
        for (let item of items) {
            let div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <div class="menu-img">🍽️</div>
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <div class="price">${item.price} >ر.ي</div>
                    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">➕ أضف للسلة</button>
                </div>
            `;
            grid.appendChild(div);
        }
        document.querySelectorAll(".add-to-cart").forEach(btn => {
            btn.onclick = function() {
                addToCart(this.getAttribute("data-name"), parseInt(this.getAttribute("data-price")));
            };
        });
    }

    // تشغيل السلة الجانبية
    document.getElementById("cartIcon").onclick = () => {
        document.getElementById("cartSidebar").classList.add("open");
    };
    document.getElementById("closeCartBtn").onclick = () => {
        document.getElementById("cartSidebar").classList.remove("open");
    };
    document.getElementById("checkoutBtn").onclick = sendOrder;
    document.getElementById("whatsappBtn").onclick = () => {
        window.open("https://wa.me/963123456789?text=أهلاً أرغب بالطلب", "_blank");
    };
    document.getElementById("instagramBtn").onclick = () => {
        window.open("https://www.instagram.com/tc.coffee1", "_blank");
    };

    renderTabs();
    renderMenu();