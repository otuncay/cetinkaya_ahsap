/* =====================================================
   CETİNKAYA AHŞAP
   PRODUCT CATALOG
===================================================== */

console.log("Cetinkaya Ahşap uygulaması başlatıldı.");


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [

  {
    id: 1,

    name: "Ahşap Kürek",

    category: "Kürekler",

    material: "Çam ağacı",

    description:
      "Doğal ahşaptan üretilmiş, günlük kullanım için sade ve dayanıklı kürek.",

    images: [
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1599685315640-8f7a0d1c4e3b?auto=format&fit=crop&w=1200&q=85"
    ],

    options: {
      "Renk": [
        "Doğal",
        "Koyu Kahverengi"
      ],

      "Boyut": [
        "100 cm",
        "120 cm",
        "140 cm"
      ]
    }
  },


  {
    id: 2,

    name: "Ahşap Masa",

    category: "Masalar",

    material: "Masif çam",

    description:
      "Sade çizgilere sahip, günlük kullanıma uygun doğal ahşap masa.",

    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
    ],

    options: {
      "Renk": [
        "Doğal",
        "Ceviz"
      ],

      "Boyut": [
        "120 × 70 cm",
        "160 × 80 cm",
        "180 × 90 cm"
      ]
    }
  },


  {
    id: 3,

    name: "Ahşap Dolap",

    category: "Dolaplar",

    material: "Çam ağacı",

    description:
      "Sade tasarımlı, farklı kullanım alanlarına uyarlanabilen ahşap dolap.",

    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85"
    ],

    options: {
      "Renk": [
        "Doğal",
        "Beyaz",
        "Ceviz"
      ],

      "Boyut": [
        "80 cm",
        "120 cm",
        "160 cm"
      ]
    }
  },


  {
    id: 4,

    name: "Bahçe Küreği",

    category: "Kürekler",

    material: "Doğal ahşap",

    description:
      "Bahçe işleri ve günlük kullanım için tasarlanmış pratik ahşap kürek.",

    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85"
    ],

    options: {
      "Boyut": [
        "90 cm",
        "110 cm",
        "130 cm"
      ]
    }
  },


  {
    id: 5,

    name: "Ahşap Tabure",

    category: "Diğer",

    material: "Masif çam",

    description:
      "Minimal formu ve doğal ahşap dokusuyla çok amaçlı kullanılabilen tabure.",

    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85"
    ],

    options: {
      "Renk": [
        "Doğal",
        "Ceviz"
      ]
    }
  },


  {
    id: 6,

    name: "Ahşap Raf",

    category: "Diğer",

    material: "Çam ağacı",

    description:
      "Duvar kullanımına uygun sade ve işlevsel ahşap raf.",

    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=85"
    ],

    options: {
      "Boyut": [
        "60 cm",
        "80 cm",
        "100 cm"
      ]
    }
  }

];


/* =====================================================
   STATE
===================================================== */

let currentCategory = "Tümü";

let currentSearch = "";

let selectedProduct = null;

let selectedOptions = {};

let interestedProducts =
  JSON.parse(
    localStorage.getItem("cetinkaya_interest") || "[]"
  );


/* =====================================================
   DOM
===================================================== */

const productGrid =
  document.getElementById("productGrid");

const filterBar =
  document.getElementById("filterBar");

const categoryGrid =
  document.getElementById("categoryGrid");

const searchInput =
  document.getElementById("searchInput");

const sortSelect =
  document.getElementById("sortSelect");

const emptyProducts =
  document.getElementById("emptyProducts");

const interestCount =
  document.getElementById("interestCount");

const productModal =
  document.getElementById("productModal");

const interestModal =
  document.getElementById("interestModal");

const modalImage =
  document.getElementById("modalImage");

const thumbnailList =
  document.getElementById("thumbnailList");

const modalTitle =
  document.getElementById("modalTitle");

const modalCategory =
  document.getElementById("modalCategory");

const modalDescription =
  document.getElementById("modalDescription");

const modalOptions =
  document.getElementById("modalOptions");

const interestItems =
  document.getElementById("interestItems");

const toast =
  document.getElementById("toast");


/* =====================================================
   CATEGORIES
===================================================== */

const categories = [

  {
    name: "Kürekler",
    description: "Bahçe ve kullanım ürünleri"
  },

  {
    name: "Masalar",
    description: "Doğal ahşap masalar"
  },

  {
    name: "Dolaplar",
    description: "Sade depolama çözümleri"
  },

  {
    name: "Diğer",
    description: "Tamamlayıcı ahşap ürünler"
  }

];


/* =====================================================
   RENDER CATEGORIES
===================================================== */

function renderCategories() {

  categoryGrid.innerHTML = "";

  categories.forEach(category => {

    const button =
      document.createElement("button");

    button.className = "category-card";

    button.type = "button";

    button.dataset.category =
      category.name;

    button.innerHTML = `

      <strong>
        ${category.name}
      </strong>

      <span>
        ${category.description}
      </span>

    `;

    button.addEventListener(
      "click",
      () => {

        currentCategory =
          category.name;

        renderFilters();

        renderProducts();

        document
          .getElementById("urunler")
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

    categoryGrid.appendChild(button);

  });

}


/* =====================================================
   FILTER BAR
===================================================== */

function renderFilters() {

  filterBar.innerHTML = "";

  const allCategories =
    ["Tümü", ...categories.map(c => c.name)];


  allCategories.forEach(category => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "filter-chip" +
      (
        currentCategory === category
          ? " active"
          : ""
      );

    button.textContent =
      category;


    button.addEventListener(
      "click",
      () => {

        currentCategory =
          category;

        renderFilters();

        renderProducts();

      }
    );


    filterBar.appendChild(button);

  });

}


/* =====================================================
   FILTER PRODUCTS
===================================================== */

function getFilteredProducts() {

  let result =
    products.filter(product => {

      const categoryMatch =
        currentCategory === "Tümü" ||
        product.category === currentCategory;


      const searchText =
        currentSearch
          .toLowerCase()
          .trim();


      const searchMatch =
        !searchText ||

        product.name
          .toLowerCase()
          .includes(searchText) ||

        product.category
          .toLowerCase()
          .includes(searchText) ||

        product.material
          .toLowerCase()
          .includes(searchText) ||

        product.description
          .toLowerCase()
          .includes(searchText);


      return (
        categoryMatch &&
        searchMatch
      );

    });


  if (
    sortSelect &&
    sortSelect.value === "az"
  ) {

    result.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "tr"
        )
    );

  }


  if (
    sortSelect &&
    sortSelect.value === "za"
  ) {

    result.sort(
      (a, b) =>
        b.name.localeCompare(
          a.name,
          "tr"
        )
    );

  }


  return result;

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

  const result =
    getFilteredProducts();


  productGrid.innerHTML = "";


  if (result.length === 0) {

    emptyProducts.style.display =
      "block";

    return;

  }


  emptyProducts.style.display =
    "none";


  result.forEach(product => {

    const card =
      document.createElement("article");

    card.className =
      "product-card";


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.images[0]}"
          alt="${product.name}"
          loading="lazy"
        >

      </div>


      <div class="product-meta">

        <div>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.material} ·
            ${product.category}
          </p>

        </div>

        <span class="product-arrow">
          →
        </span>

      </div>

    `;


    card.addEventListener(
      "click",
      () => {

        openProduct(
          product.id
        );

      }
    );


    productGrid.appendChild(card);

  });

}


/* =====================================================
   OPEN PRODUCT
===================================================== */

function openProduct(productId) {

  const product =
    products.find(
      p => p.id === productId
    );


  if (!product) return;


  selectedProduct =
    product;


  selectedOptions = {};


  modalTitle.textContent =
    product.name;

  modalCategory.textContent =
    product.category;

  modalDescription.textContent =
    product.description;


  modalImage.src =
    product.images[0];

  modalImage.alt =
    product.name;


  renderThumbnails(product);

  renderOptions(product);


  productModal.classList.remove(
    "hidden"
  );

  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   PRODUCT THUMBNAILS
===================================================== */

function renderThumbnails(product) {

  thumbnailList.innerHTML = "";


  product.images.forEach(
    (image, index) => {

      const thumbnail =
        document.createElement("img");


      thumbnail.src =
        image;

      thumbnail.alt =
        `${product.name} ${index + 1}`;


      if (index === 0) {

        thumbnail.classList.add(
          "active"
        );

      }


      thumbnail.addEventListener(
        "click",
        () => {

          modalImage.src =
            image;


          document
            .querySelectorAll(
              ".thumbnail-list img"
            )
            .forEach(
              img =>
                img.classList.remove(
                  "active"
                )
            );


          thumbnail.classList.add(
            "active"
          );

        }
      );


      thumbnailList.appendChild(
        thumbnail
      );

    }
  );

}


/* =====================================================
   PRODUCT OPTIONS
===================================================== */

function renderOptions(product) {

  modalOptions.innerHTML = "";


  if (!product.options) {
    return;
  }


  Object.entries(
    product.options
  ).forEach(
    ([optionName, values]) => {


      const group =
        document.createElement(
          "div"
        );


      group.className =
        "option-group";


      group.innerHTML = `

        <h4>
          ${optionName}
        </h4>

        <div class="option-buttons">

        </div>

      `;


      const buttons =
        group.querySelector(
          ".option-buttons"
        );


      values.forEach(value => {

        const button =
          document.createElement(
            "button"
          );


        button.type = "button";

        button.className =
          "option-button";


        button.textContent =
          value;


        button.addEventListener(
          "click",
          () => {

            selectedOptions[
              optionName
            ] = value;


            buttons
              .querySelectorAll(
                ".option-button"
              )
              .forEach(
                item =>
                  item.classList.remove(
                    "active"
                  )
              );


            button.classList.add(
              "active"
            );

          }
        );


        buttons.appendChild(
          button
        );

      });


      modalOptions.appendChild(
        group
      );

    }
  );

}


/* =====================================================
   ADD TO INTEREST
===================================================== */

const addToInterest =
  document.getElementById(
    "addToInterest"
  );


addToInterest.addEventListener(
  "click",
  () => {

    if (!selectedProduct) {
      return;
    }


    const existing =
      interestedProducts.find(
        item =>
          item.productId ===
          selectedProduct.id
      );


    if (existing) {

      showToast(
        "Bu ürün zaten listenizde."
      );

      return;

    }


    interestedProducts.push({

      productId:
        selectedProduct.id,

      name:
        selectedProduct.name,

      image:
        selectedProduct.images[0],

      options:
        {
          ...selectedOptions
        }

    });


    saveInterest();

    updateInterestCount();


    showToast(
      "Ürün listenize eklendi."
    );


    closeModal(
      productModal
    );

  }
);


/* =====================================================
   SAVE INTEREST
===================================================== */

function saveInterest() {

  localStorage.setItem(
    "cetinkaya_interest",
    JSON.stringify(
      interestedProducts
    )
  );

}


/* =====================================================
   UPDATE INTEREST COUNT
===================================================== */

function updateInterestCount() {

  interestCount.textContent =
    interestedProducts.length;

}


/* =====================================================
   INTEREST MODAL
===================================================== */

document
  .getElementById("openInterest")
  .addEventListener(
    "click",
    () => {

      renderInterestItems();

      interestModal.classList.remove(
        "hidden"
      );

      document.body.style.overflow =
        "hidden";

    }
  );


/* =====================================================
   RENDER INTEREST ITEMS
===================================================== */

function renderInterestItems() {

  interestItems.innerHTML = "";


  if (
    interestedProducts.length === 0
  ) {

    interestItems.innerHTML = `

      <div class="empty-interest">

        <p>
          Henüz ilgilendiğiniz
          bir ürün bulunmuyor.
        </p>

      </div>

    `;

    return;

  }


  interestedProducts.forEach(
    (item, index) => {

      const element =
        document.createElement(
          "div"
        );


      element.className =
        "interest-item";


      const options =
        Object.entries(
          item.options || {}
        )
        .map(
          ([key, value]) =>
            `${key}: ${value}`
        )
        .join(" · ");


      element.innerHTML = `

        <img
          src="${item.image}"
          alt="${item.name}"
        >


        <div class="interest-item-info">

          <strong>
            ${item.name}
          </strong>

          <p>
            ${options || "Standart seçenek"}
          </p>

        </div>


        <button
          class="remove-interest"
          type="button"
          aria-label="Ürünü kaldır"
        >
          ×
        </button>

      `;


      element
        .querySelector(
          ".remove-interest"
        )
        .addEventListener(
          "click",
          () => {

            interestedProducts.splice(
              index,
              1
            );


            saveInterest();

            updateInterestCount();

            renderInterestItems();

          }
        );


      interestItems.appendChild(
        element
      );

    }
  );

}


/* =====================================================
   FORM
===================================================== */

document
  .getElementById("interestForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const form =
        event.target;


      const name =
        form.name.value.trim();


      const phone =
        form.phone.value.trim();


      if (!name || !phone) {

        showToast(
          "Lütfen adınızı ve telefon numaranızı girin."
        );

        return;

      }


      if (
        phone.replace(
          /\D/g,
          ""
        ).length < 10
      ) {

        showToast(
          "Lütfen geçerli bir telefon numarası girin."
        );

        return;

      }


      const note =
        form.note.value.trim();


      let message =
        "Merhaba, Cetinkaya Ahşap ürünleriyle ilgileniyorum.%0A%0A";


      interestedProducts.forEach(
        (item, index) => {

          message +=
            `${index + 1}. ${item.name}%0A`;


          Object.entries(
            item.options || {}
          ).forEach(
            ([key, value]) => {

              message +=
                `${key}: ${value}%0A`;

            }
          );


          message += "%0A";

        }
      );


      message +=
        `Ad Soyad: ${name}%0A`;

      message +=
        `Telefon: ${phone}%0A`;

      message +=
        `Not: ${note || "-"}`;


      /*
       * BURAYA GERÇEK WHATSAPP NUMARASI GELECEK.
       *
       * Örnek:
       *
       * const whatsappNumber = "905xxxxxxxxx";
       *
       */

      const whatsappNumber =
        "905000000000";


      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${message}`;


      window.open(
        whatsappUrl,
        "_blank"
      );


      showToast(
        "WhatsApp iletişim ekranı açılıyor."
      );

    }
  );


/* =====================================================
   CLOSE MODALS
===================================================== */

document
  .querySelectorAll(
    "[data-close]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const modal =
            document.getElementById(
              button.dataset.close
            );


          closeModal(modal);

        }
      );

    }
  );


function closeModal(modal) {

  if (!modal) return;


  modal.classList.add(
    "hidden"
  );

  document.body.style.overflow =
    "";

}


/* =====================================================
   CLOSE WHEN CLICKING OUTSIDE
===================================================== */

document
  .querySelectorAll(
    ".modal-overlay"
  )
  .forEach(
    overlay => {

      overlay.addEventListener(
        "click",
        event => {

          if (
            event.target ===
            overlay
          ) {

            closeModal(
              overlay
            );

          }

        }
      );

    }
  );


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      document
        .querySelectorAll(
          ".modal-overlay:not(.hidden)"
        )
        .forEach(
          modal =>
            closeModal(modal)
        );

    }

  }
);


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
  "input",
  event => {

    currentSearch =
      event.target.value;

    renderProducts();

  }
);


/* =====================================================
   SORT
===================================================== */

sortSelect.addEventListener(
  "change",
  () => {

    renderProducts();

  }
);


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuButton =
  document.getElementById(
    "mobileMenuButton"
  );

const mobileNav =
  document.getElementById(
    "mobileNav"
  );


mobileMenuButton.addEventListener(
  "click",
  () => {

    mobileNav.classList.toggle(
      "mobile-open"
    );

  }
);


mobileNav
  .querySelectorAll("a")
  .forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          mobileNav.classList.remove(
            "mobile-open"
          );

        }
      );

    }
  );


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* =====================================================
   ALL PRODUCTS BUTTON
===================================================== */

document
  .querySelector(
    ".all-products-button"
  )
  .addEventListener(
    "click",
    () => {

      currentCategory =
        "Tümü";

      renderFilters();

      renderProducts();

      document
        .getElementById(
          "urunler"
        )
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


/* =====================================================
   INITIALIZE
===================================================== */

renderCategories();

renderFilters();

renderProducts();

updateInterestCount();

console.log(
  `${products.length} ürün yüklendi.`
);
