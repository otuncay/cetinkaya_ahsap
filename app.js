const products = [

    {
        name: "Ahşap Kürek",
        category: "Kürekler",
        material: "Çam",
        size: "120 cm",
        image: ""
    },

    {
        name: "Bahçe Masası",
        category: "Masalar",
        material: "Çam",
        size: "4 kişilik",
        image: ""
    },

    {
        name: "Ahşap Dolap",
        category: "Dolaplar",
        material: "Kayın",
        size: "Standart",
        image: ""
    },

    {
        name: "Ahşap Sap",
        category: "Diğer",
        material: "Çam",
        size: "100 cm",
        image: ""
    }

];


let currentCategory = "Tümü";


function renderProducts(list = products) {

    const grid = document.getElementById("productGrid");

    if (!grid) return;

    grid.innerHTML = "";

    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div
                class="product-image"
                style="
                    background-image:
                    ${product.image
                        ? `url('${product.image}')`
                        : "linear-gradient(135deg,#e5dfd7,#b29a7e)"
                    };
                "
            ></div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <div class="product-meta">

                    <span>
                        ${product.material}
                    </span>

                    <span>
                        ${product.size}
                    </span>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });

}


function filterCategory(category) {

    currentCategory = category;

    const filters =
        document.querySelectorAll(".filter");

    filters.forEach(filter => {

        filter.classList.remove("active");

        if (
            filter.textContent.trim() === category ||
            (category === "Tümü" &&
             filter.textContent.trim() === "Tümü")
        ) {

            filter.classList.add("active");

        }

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


    let filtered = products;


    if (currentCategory !== "Tümü") {

        filtered =
            filtered.filter(
                product =>
                    product.category === currentCategory
            );

    }


    if (query) {

        filtered =
            filtered.filter(product =>

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

            );

    }


    renderProducts(filtered);

}


renderProducts();
