// Function to search for makeup products based on the brand
function searchBrand() {
    var searchTerm = document.getElementById('brand-search').value;
    const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchTerm}`
  
    // Fetch data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => displaySearchResults(data))
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Function to display search results in a table
  function displaySearchResults(products) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';
  
    // Check if there are any products to display
    if (products.length > 0) {
        const table = document.createElement('table');
        const headerRow = table.insertRow(0);
        const headers = ['Name', 'Description', 'Image', 'Website'];
  
        // Create table headers
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
  
        // Populate table rows with product data
        products.forEach(product => {
            const row = table.insertRow();
            row.insertCell(0).textContent = product.name;
            row.insertCell(1).textContent = product.description;
  
            // Inserting image
            const cellImage = row.insertCell(2);
            const img = document.createElement('img');
            img.src = product.image_link;
            img.alt = product.name;
            img.style.maxWidth = '100px';
            img.style.maxHeight = '100px';
            cellImage.appendChild(img);
  
            // Inserting product link
            const cellWebsite = row.insertCell(3);
            const link = document.createElement('a');
            link.href = product.product_link;
            link.textContent = 'Click here for more detail';
            link.target = '_blank';
            cellWebsite.appendChild(link);
        });
  
        // Append the table to the search results container
        searchResultsContainer.appendChild(table);
    } else {
        searchResultsContainer.innerHTML = '<p>No products found for the specified brand.</p>';
    }
  }
  
  // Function to send the product name to the main process via IPC
  function sendProductName(productName) {
    window.api.send("toMain", productName);
  }