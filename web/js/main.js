


// lazy loading
let page = 1;
let isLoading = false;

window.addEventListener('scroll', function() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
    isLoading = true;
    loadMoreEntries();
  }
});

function loadMoreEntries() {
  page++;
  const loadingElement = document.getElementById('loading');
  loadingElement.style.display = 'block';

  fetch(`/search?page=${page}`)
    .then(response => response.text())
    .then(data => {
      const entriesElement = document.getElementById('entries');
      entriesElement.innerHTML += data;
      loadingElement.style.display = 'none';
      isLoading = false;
    })
    .catch(() => {
      loadingElement.style.display = 'none';
      isLoading = false;
    });
}


// pause the dropdown

function toggleMenu() {
    const navItems = document.querySelector('.nav-items');
    navItems.classList.toggle('active');
  }
  let dropdownTimeout;

    document.querySelector('.nav-item').addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      document.querySelector('.dropdown').style.display = 'block';
      document.querySelector('.dropdown').style.opacity = '1';
    });

    document.querySelector('.nav-item').addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(function() {
        document.querySelector('.dropdown').style.display = 'none';
        document.querySelector('.dropdown').style.opacity = '0';
      }, 200); // 200ms delay before hiding the dropdown
    });





// Lightswitch 
document.addEventListener('DOMContentLoaded', function () {
  const selectedStores = getInitialSelection('store');
  const selectedGenres = getInitialSelection('genre');
  const selectedKeywords = getInitialSelection('keywords');

  // Populate hidden inputs with initial values
  updateHiddenInputs();

  // Handle button selection for Store, Genre, and Keywords
  document.querySelectorAll('.store-button, .genre-button, .keyword-button').forEach(button => {
      const value = button.dataset.value;

      // Set initial state based on query parameters
      if (selectedStores.includes(value) || selectedGenres.includes(value) || selectedKeywords.includes(value)) {
          button.classList.add('bg-yellow-300', 'text-gray-800');
          button.classList.remove('bg-gray-300', 'text-gray-800');
      }

      button.addEventListener('click', function () {
          // Toggle button color and update selection arrays
          if (button.classList.contains('bg-yellow-300')) {
              // Deselect the button (turn it back to gray)
              button.classList.remove('bg-yellow-300', 'text-gray-800');
              button.classList.add('bg-gray-300', 'text-gray-800');
              removeSelectedValue(value, button.classList.contains('store-button'), button.classList.contains('genre-button'));
          } else {
              // Select the button (turn it yellow)
              button.classList.remove('bg-gray-300', 'text-gray-800');
              button.classList.add('bg-yellow-300', 'text-gray-800');
              addSelectedValue(value, button.classList.contains('store-button'), button.classList.contains('genre-button'));
          }
      });
  });

  // Add selected value to the correct array
  function addSelectedValue(value, isStore, isGenre) {
      if (isStore) {
          if (!selectedStores.includes(value)) selectedStores.push(value);
      } else if (isGenre) {
          if (!selectedGenres.includes(value)) selectedGenres.push(value);
      } else {
          if (!selectedKeywords.includes(value)) selectedKeywords.push(value);
      }
      updateHiddenInputs();
  }

  // Remove deselected value from the correct array
  function removeSelectedValue(value, isStore, isGenre) {
      if (isStore) {
          selectedStores = selectedStores.filter(item => item !== value);
      } else if (isGenre) {
          selectedGenres = selectedGenres.filter(item => item !== value);
      } else {
          selectedKeywords = selectedKeywords.filter(item => item !== value);
      }
      updateHiddenInputs();
  }

  // Get initial selections from the URL
  function getInitialSelection(paramName) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.getAll(paramName + '[]');
      return paramValue.length ? paramValue : [];
  }

  // Update hidden inputs based on selections
  function updateHiddenInputs() {
      document.getElementById('storeInput').value = selectedStores.join(',');
      document.getElementById('genreInput').value = selectedGenres.join(',');
      document.getElementById('keywordsInput').value = selectedKeywords.join(',');
  }

  // Toggle explicit content light switch
  const explicitSwitch = document.getElementById('explicitSwitch');
  explicitSwitch.addEventListener('change', function () {
      const dot = document.querySelector('.dot');
      if (this.checked) {
          document.getElementById('explicitInput').value = '1';
          this.nextElementSibling.classList.replace('bg-gray-300', 'bg-yellow-300');
          dot.classList.add('translate-x-5');
      } else {
          document.getElementById('explicitInput').value = '0';
          this.nextElementSibling.classList.replace('bg-yellow-300', 'bg-gray-300');
          dot.classList.remove('translate-x-5');
      }
  });
});
