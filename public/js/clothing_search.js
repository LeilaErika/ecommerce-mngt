function searchResources() {
    const filter = document
      .getElementById("searchInput")
      .value.toUpperCase();
    const items = document.querySelectorAll(".product-item");
    items.forEach((item) => {
      const name = item.querySelector("h3").textContent;
      item.style.display = name.toUpperCase().includes(filter)
        ? ""
        : "none";
    });
  }
  