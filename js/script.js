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
function displayProducts(products, container) {
 
  container.innerHTML = "";

  products.forEach(function (product) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      '<img src="' + product.image + '" alt="' + product.name + '">' +
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
