// mobile menu

function toggleMenu() {
    const navItems = document.querySelector('.nav-items');
    navItems.classList.toggle('hidden');
}


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





// debug 
// Function to get initial selections from the URL and log them
function getInitialSelection(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);  // Get the parameter value directly

  console.log('Param Value for ' + paramName + ':', paramValue);  // Log the value for each parameter
  return paramValue ? paramValue.split(',') : [];  // Split if it’s a comma-separated value, otherwise return as an array
}

// 

// Filter logic  
document.addEventListener('DOMContentLoaded', function () {
  const selectedStores = getInitialSelection('store');
  const selectedGenres = getInitialSelection('genre');
  const selectedKeywords = getInitialSelection('keywords');

  document.addEventListener('DOMContentLoaded', function () {
    // Retrieve initial selections from the URL and log them
    const selectedStores = getInitialSelection('store');
    const selectedGenres = getInitialSelection('genre');
    const selectedKeywords = getInitialSelection('keywords');

    // Handle explicit input separately
    const explicitValue = document.getElementById('explicitInput').value;
    console.log('Explicit Value:', explicitValue);

    // Populate hidden inputs with initial values (if needed)
    updateHiddenInputs();

});



  
  // Populate hidden inputs with initial values
  updateHiddenInputs();

  // Handle button selection for Store, Genre, and Keywords
  document.querySelectorAll('.store-button, .genre-button, .keyword-button').forEach(button => {
      const value = button.dataset.value;

      // Set initial state based on query parameters
      if (selectedStores.includes(value) || selectedGenres.includes(value) || selectedKeywords.includes(value)) {
          button.classList.add('bg-yellow-300', 'text-gray-800');
          button.classList.remove('bg-gray-300');
      }

      button.addEventListener('click', function () {
          // Toggle button color and update selection arrays
          if (button.classList.contains('bg-yellow-300')) {
              // Deselect the button (turn it back to gray)
              button.classList.remove('bg-yellow-300');
              button.classList.add('bg-gray-300');
              removeSelectedValue(value, button.classList.contains('store-button'), button.classList.contains('genre-button'), button.classList.contains('keyword-button'));
          } else {
              // Select the button (turn it yellow)
              button.classList.remove('bg-gray-300');
              button.classList.add('bg-yellow-300');
              addSelectedValue(value, button.classList.contains('store-button'), button.classList.contains('genre-button'), button.classList.contains('keyword-button'));
          }
      });
  });

  // Add selected value to the correct array
  function addSelectedValue(value, isStore, isGenre, isKeyword) {
      if (isStore) {
          if (!selectedStores.includes(value)) selectedStores.push(value);
      } else if (isGenre) {
          if (!selectedGenres.includes(value)) selectedGenres.push(value);
      } else if (isKeyword) {
          if (!selectedKeywords.includes(value)) selectedKeywords.push(value);
      }
      updateHiddenInputs();
  }

    // Remove deselected value from the correct array
    function removeSelectedValue(value, isStore, isGenre, isKeyword) {
      if (isStore) {
          // Modify the array instead of reassigning it
          const index = selectedStores.indexOf(value);
          if (index > -1) {
              selectedStores.splice(index, 1);  // Remove the value from the array
          }
      } else if (isGenre) {
          const index = selectedGenres.indexOf(value);
          if (index > -1) {
              selectedGenres.splice(index, 1);  // Remove the value from the array
          }
      } else if (isKeyword) {
          const index = selectedKeywords.indexOf(value);
          if (index > -1) {
              selectedKeywords.splice(index, 1);  // Remove the value from the array
          }
      }
      updateHiddenInputs();
    }


  // Get initial selections from the URL
  function getInitialSelection(paramName) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get(paramName);
      return paramValue ? paramValue.split(',') : [];
  }

  // Update hidden inputs based on selections
  function updateHiddenInputs() {
      document.getElementById('storeInput').value = selectedStores.join(',');
      document.getElementById('genreInput').value = selectedGenres.join(',');
      document.getElementById('keywordsInput').value = selectedKeywords.join(',');
  }

  // Toggle explicit content light switch
  const explicitSwitch = document.getElementById('explicitSwitch');
  const dot = document.querySelector('.dot');
  const switchBackground = explicitSwitch.nextElementSibling;

  // Set the initial state for explicit content
  const explicitValue = document.getElementById('explicitInput').value;
  if (explicitValue === '1') {
      explicitSwitch.checked = true;
      switchBackground.classList.add('bg-yellow-300');
      dot.classList.add('translate-x-5');
  } else {
      explicitSwitch.checked = false;
      switchBackground.classList.add('bg-gray-300');
      dot.classList.remove('translate-x-5');
  }

  // Toggle explicit content switch
  explicitSwitch.addEventListener('change', function () {
      if (this.checked) {
          document.getElementById('explicitInput').value = '1';
          switchBackground.classList.replace('bg-gray-300', 'bg-yellow-300');
          dot.classList.add('translate-x-5');
      } else {
          document.getElementById('explicitInput').value = '0';
          switchBackground.classList.replace('bg-yellow-300', 'bg-gray-300');
          dot.classList.remove('translate-x-5');
      }
  });


});


// show/hide form
document.addEventListener('DOMContentLoaded', function () {
  const filterToggle = document.getElementById('filterToggle');
  const filterDiv = document.getElementById('filterDiv');
  const filterForm = document.getElementById('filterForm');

  // Function to show the filter div with animation
  function showFilterDiv() {
      filterDiv.classList.remove('hidden');  // Ensure it's not hidden
      filterDiv.classList.remove('animate-slideUp');  // Remove the slide-up animation if present
      filterDiv.classList.add('animate-slideDown');   // Add the slide-down animation
  }

  // Function to hide the filter div with animation
  function hideFilterDiv() {
      filterDiv.classList.remove('animate-slideDown');  // Remove the slide-down animation
      filterDiv.classList.add('animate-slideUp');  // Add the slide-up animation
      // Delay adding hidden class until after animation completes (0.5s)
      setTimeout(() => {
          filterDiv.classList.add('hidden');
      }, 500);  // Matches the animation duration (0.5s)
  }

  // Toggle filter div visibility when the button is clicked
  filterToggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (filterDiv.classList.contains('hidden')) {
          showFilterDiv();
      } else {
          hideFilterDiv();
      }
  });

  // Hide filter div on form submission
  filterForm.addEventListener('submit', function () {
      hideFilterDiv();
  });
});

