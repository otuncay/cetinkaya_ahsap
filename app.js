const products = [

    {
        name: "Ahşap Kürek",
        category: "Kürekler",
        material: "Doğal ahşap",
        detail: "Bahçe & tarım",
        image: "https://images.unsplash.com/photo-1599685315640-1e3f5e4f0a95?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Bahçe Masası",
        category: "Masalar",
        material: "Masif ahşap",
        detail: "Bahçe & yaşam",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Ahşap Dolap",
        category: "Dolaplar",
        material: "Doğal ahşap",
        detail: "Depolama",
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Atölye Ürünü",
        category: "Diğer",
        material: "Ahşap",
        detail: "Günlük kullanım",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Bahçe Küreği",
        category: "Kürekler",
        material: "Ahşap sap",
        detail: "Bahçe",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Ahşap Masa",
        category: "Masalar",
        material: "Masif ahşap",
        detail: "Yaşam alanları",
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85"
    }

];


let currentCategory = "Tümü";


function renderProducts(list) {

    const grid =
        document.getElementById("productGrid");

    if (!grid) return;

    if (list.length === 0) {

        grid.innerHTML = `
            <div class="empty">
                Aradığınız ürünü bulamadık.
            </div>
        `;

        return;
    }


    grid.innerHTML = list.map(product => `

        <article
            class="product-card"
            onclick="openProduct('${product.name}')">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">

            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <div class="product-meta">

                    <span>
                        ${product.material}
                    </span>

                    <span>
                        ${product.detail}
                    </span>

                </div>

            </div>

        </article>

    `).join("");

}


function filterCategory(category) {

    currentCategory = category;


    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.textContent.trim() === category
            );

        });


    const filtered =
        category === "Tümü"

        ? products

        : products.filter(
            product =>
                product.category === category
        );


    renderProducts(filtered);


    document
        .getElementById("urunler")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


function searchProducts() {

    const input =
        document.getElementById("searchInput");

    const query =
        input.value
            .toLowerCase()
            .trim();


    let result = products;


    if (currentCategory !== "Tümü") {

        result =
            result.filter(
                product =>
                    product.category === currentCategory
            );

    }


    if (query) {

        result =
            result.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)

                ||

                product.material
                    .toLowerCase()
                    .includes(query)

                ||

                product.detail
                    .toLowerCase()
                    .includes(query)

            );

    }


    renderProducts(result);

}


function openProduct(name) {

    const product =
        products.find(
            item => item.name === name
        );

    if (!product) return;


    alert(
        `${product.name}\n\n` +
        `${product.material}\n` +
        `${product.detail}\n\n` +
        `Ürün hakkında bilgi almak için ` +
        `bizimle iletişime geçebilirsiniz.`
    );

}


renderProducts(products);
