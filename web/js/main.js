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





function getInitialSelection(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  return paramValue ? paramValue.split(',') : [];
}

// 

// Filter logic  
document.addEventListener('DOMContentLoaded', function () {
  const selectedStores = getInitialSelection('store');
  const selectedGenres = getInitialSelection('genre');
  const selectedKeywords = getInitialSelection('keywords');
  const searchInput = document.getElementById('searchQuery');
  const clearSearchButton = document.getElementById('clearSearchButton');
  const clearFiltersButton = document.getElementById('clearFiltersButton');
  const filterState = document.getElementById('filterState');
  const explicitSwitch = document.getElementById('explicitSwitch');
  const explicitInput = document.getElementById('explicitInput');
  const dot = document.querySelector('.dot');
  const switchBackground = explicitSwitch ? explicitSwitch.nextElementSibling : null;

  function updateHiddenInputs() {
      const storeInput = document.getElementById('storeInput');
      const genreInput = document.getElementById('genreInput');
      const keywordsInput = document.getElementById('keywordsInput');
      if (storeInput) storeInput.value = selectedStores.join(',');
      if (genreInput) genreInput.value = selectedGenres.join(',');
      if (keywordsInput) keywordsInput.value = selectedKeywords.join(',');
  }

  function updateSearchClearButton() {
      if (!clearSearchButton || !searchInput) return;
      if (searchInput.value.trim() === '') {
          clearSearchButton.classList.add('hidden');
      } else {
          clearSearchButton.classList.remove('hidden');
      }
  }

  function resetFilterButtons() {
      document.querySelectorAll('.store-button, .genre-button, .keyword-button').forEach(button => {
          button.classList.remove('bg-yellow-300');
          button.classList.add('bg-gray-300');
      });
  }

  function setExplicitState(isOn) {
      if (!explicitSwitch) return;
      explicitSwitch.checked = isOn;
      if (switchBackground) {
          switchBackground.classList.remove('bg-yellow-300', 'bg-gray-300');
          switchBackground.classList.add(isOn ? 'bg-yellow-300' : 'bg-gray-300');
      }
      if (dot) {
          if (isOn) {
              dot.classList.add('translate-x-5');
          } else {
              dot.classList.remove('translate-x-5');
          }
      }
      if (filterState) {
          filterState.textContent = isOn ? 'on' : 'off';
      }
      if (explicitInput) {
          explicitInput.value = isOn ? '1' : '0';
      }
  }

  function toggleButtonState(event) {
      event.preventDefault();
      const button = event.currentTarget;
      const value = button.dataset.value;

      if (button.classList.contains('bg-yellow-300')) {
          button.classList.remove('bg-yellow-300');
          button.classList.add('bg-gray-300');
          removeSelectedValue(value, button.classList.contains('store-button'), button.classList.contains('genre-button'), button.classList.contains('keyword-button'));
      } else {
          button.classList.remove('bg-gray-300');
          button.classList.add('bg-yellow-300');
          addSelectedValue(value, button.classList.contains('store-button'), button.classList.contains('genre-button'), button.classList.contains('keyword-button'));
      }
  }

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

  function removeSelectedValue(value, isStore, isGenre, isKeyword) {
      if (isStore) {
          const index = selectedStores.indexOf(value);
          if (index > -1) {
              selectedStores.splice(index, 1);
          }
      } else if (isGenre) {
          const index = selectedGenres.indexOf(value);
          if (index > -1) {
              selectedGenres.splice(index, 1);
          }
      } else if (isKeyword) {
          const index = selectedKeywords.indexOf(value);
          if (index > -1) {
              selectedKeywords.splice(index, 1);
          }
      }
      updateHiddenInputs();
  }

  updateHiddenInputs();
  updateSearchClearButton();

  if (explicitSwitch) {
      const initialExplicit = explicitInput && explicitInput.value === '1';
      setExplicitState(initialExplicit);
      explicitSwitch.addEventListener('change', function () {
          setExplicitState(this.checked);
      });
  }

  document.querySelectorAll('.store-button, .genre-button, .keyword-button').forEach(button => {
      const value = button.dataset.value;
      if (selectedStores.includes(value) || selectedGenres.includes(value) || selectedKeywords.includes(value)) {
          button.classList.add('bg-yellow-300', 'text-gray-800');
          button.classList.remove('bg-gray-300');
      }
      button.addEventListener('click', toggleButtonState);
      button.addEventListener('touchstart', toggleButtonState, { passive: false });
  });

  if (clearSearchButton && searchInput) {
      clearSearchButton.addEventListener('click', function (event) {
          event.preventDefault();
          searchInput.value = '';
          updateSearchClearButton();
          searchInput.focus();
      });
      searchInput.addEventListener('input', updateSearchClearButton);
  }

  if (clearFiltersButton) {
      clearFiltersButton.addEventListener('click', function (event) {
          event.preventDefault();
          selectedStores.length = 0;
          selectedGenres.length = 0;
          selectedKeywords.length = 0;
          resetFilterButtons();
          if (searchInput) {
              searchInput.value = '';
          }
          setExplicitState(true);
          updateHiddenInputs();
          updateSearchClearButton();
      });
  }
});


// show/hide form
document.addEventListener('DOMContentLoaded', function () {
  const filterToggle = document.getElementById('filterToggle');
  const filterDiv = document.getElementById('filterDiv');
  const filterForm = document.getElementById('filterForm');
  const filterOverlay = document.getElementById('filterOverlay');
  const mainContainer = document.getElementById('mainContainer');
  const siteFooter = document.getElementById('siteFooter');

  function applyBlur() {
      if (mainContainer) {
          mainContainer.classList.add('blur-sm', 'pointer-events-none');
      }
      if (siteFooter) {
          siteFooter.classList.add('blur-sm', 'pointer-events-none');
      }
  }

  function removeBlur() {
      if (mainContainer) {
          mainContainer.classList.remove('blur-sm', 'pointer-events-none');
      }
      if (siteFooter) {
          siteFooter.classList.remove('blur-sm', 'pointer-events-none');
      }
  }

  function showFilterDiv() {
      filterDiv.classList.remove('hidden');
      filterDiv.classList.remove('animate-slideUp');
      filterDiv.classList.add('animate-slideDown');
      if (filterOverlay) {
          filterOverlay.classList.remove('hidden');
          requestAnimationFrame(() => {
              filterOverlay.classList.remove('opacity-0', 'pointer-events-none');
          });
      }
      applyBlur();
  }

  function hideFilterDiv() {
      filterDiv.classList.remove('animate-slideDown');
      filterDiv.classList.add('animate-slideUp');
      if (filterOverlay) {
          filterOverlay.classList.add('opacity-0', 'pointer-events-none');
      }
      setTimeout(() => {
          filterDiv.classList.add('hidden');
          if (filterOverlay) {
              filterOverlay.classList.add('hidden');
          }
          removeBlur();
      }, 500);
  }

  filterToggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (filterDiv.classList.contains('hidden')) {
          showFilterDiv();
      } else {
          hideFilterDiv();
      }
  });

  filterForm.addEventListener('submit', function () {
      hideFilterDiv();
  });

  if (filterOverlay) {
      filterOverlay.addEventListener('click', hideFilterDiv);
  }
});
