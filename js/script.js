// Nav
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

function loadProducts(targetElementId, limit) {
  const productContainer = document.getElementById(targetElementId);

  if (!productContainer) {
    return;
  }

  // check product data has actually loaded
  if (typeof PRODUCTS === "undefined") {
    productContainer.innerHTML = "<p>Sorry, products could not be loaded right now.</p>";
    console.log("Error: PRODUCTS array not found. Make sure data/products.js is linked before script.js.");
    return;
  }

  let productsToShow = PRODUCTS;
  if (limit) {
    productsToShow = PRODUCTS.slice(0, limit);
  }

  displayProducts(productsToShow, productContainer);
}

// This function builds the HTML for each product card.

function createResponsiveImage(product) {
  const src = product.image;
  const alt = product.name.replace(/"/g, '&quot;');
  const remote = src.match(/^(https:\/\/loremflickr\.com\/)\d+\/\d+\/(.+)$/);

  if (remote) {
    const base = remote[1];
    const rest = remote[2];
    return '<picture>' +
      '<source media="(max-width: 39.99em)" srcset="' + base + '480/360/' + rest + ' 480w" sizes="94vw">' +
      '<source media="(max-width: 63.99em)" srcset="' + base + '768/540/' + rest + ' 768w" sizes="46vw">' +
      '<img src="' + src + '" srcset="' + base + '400/400/' + rest + ' 400w, ' + base + '768/540/' + rest + ' 768w" sizes="(max-width: 63.99em) 46vw, 23vw" alt="' + alt + '" loading="lazy">' +
      '</picture>';
  }

  const match = src.match(/^images\/(.+)\.jpg$/);
  if (match) {
    const stem = match[1];
    return '<picture>' +
      '<source type="image/webp" srcset="images/' + stem + '-240w.webp 240w, images/' + stem + '-480w.webp 480w, images/' + stem + '-768w.webp 768w" sizes="(max-width: 39.99em) 94vw, (max-width: 63.99em) 46vw, 23vw">' +
      '<img src="' + src + '" srcset="' + src + ' 480w" sizes="(max-width: 39.99em) 94vw, (max-width: 63.99em) 46vw, 23vw" alt="' + alt + '" loading="lazy">' +
      '</picture>';
  }

  return '<img src="' + src + '" alt="' + alt + '" loading="lazy">';
}

function displayProducts(products, container) {
 
  container.innerHTML = "";

  products.forEach(function (product) {
    const card = document.createElement("div");
    card.className = "card";

    const imageMarkup = createResponsiveImage(product);
    card.innerHTML =
      imageMarkup +
      '<div class="card-body">' +
      '<span class="category-tag">' + product.category + "</span>" +
      "<h3>" + product.name + "</h3>" +
      "<p>" + product.description + "</p>" +
      '<p class="price">R' + product.price + "</p>" +
      "</div>";

    container.appendChild(card);
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove "active" style from all buttons, then add it to the clicked one.
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      const selectedCategory = button.getAttribute("data-category");
      const productContainer = document.getElementById("productGrid");

      if (typeof PRODUCTS === "undefined") {
        return;
      }

      if (selectedCategory === "All") {
        displayProducts(PRODUCTS, productContainer);
      } else {
        const filtered = PRODUCTS.filter(function (product) {
          return product.category === selectedCategory;
        });
        displayProducts(filtered, productContainer);
      }
    });
  });
}


// Enquiry Form 
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    // Stop the form from actually submitting/reloading the page.
    event.preventDefault();

    const messageBox = document.getElementById("enquiryMessage");
    messageBox.textContent = "Thank you! Your enquiry has been received. We will get back to you soon.";
    messageBox.classList.add("success");

    // Clear the form fields.
    enquiryForm.reset();
  });
}


// Contact Form 
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const messageBox = document.getElementById("contactMessage");
    messageBox.textContent = "Thank you for contacting Babeboy Fashion & Lifestyle! We will respond shortly.";
    messageBox.classList.add("success");

    contactForm.reset();
  });
}

const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
