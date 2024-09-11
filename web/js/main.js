


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