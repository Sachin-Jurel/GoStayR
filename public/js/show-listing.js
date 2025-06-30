// Show Listing Page JavaScript

// Global variables
let map;
let marker;
let listingLocation = null;
let listingCountry = null;
let infoPanel = null;
let legend = null;

// Initialize Google Maps
function initMap() {
  // Show loading state
  showMapLoading();
  
  // Get listing location from the page
  const locationElement = document.querySelector('.listing-location');
  if (locationElement) {
    const locationText = locationElement.nextElementSibling.textContent.trim();
    const locationParts = locationText.split(', ');
    listingLocation = locationParts[0];
    listingCountry = locationParts[1] || '';
  }

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 }, // Default to Delhi coordinates
    zoom: 12,
    styles: getCustomMapStyle(),
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  // Add custom zoom controls
  addCustomZoomControls();

  // Set up search box functionality
  const input = document.getElementById("search-box");
  if (input) {
    const searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // Add search result marker
      addSearchMarker(place);
    });
  }

  // Set the listing location as the destination
  if (listingLocation && listingCountry) {
    setListingDestination();
  }

  // Hide loading after map is ready
  map.addListener('tilesloaded', () => {
    hideMapLoading();
  });
}

// Custom map styling
function getCustomMapStyle() {
  return [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e3f2fd" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#64748b" }]
    }
  ];
}

// Set the listing destination on the map
function setListingDestination() {
  const fullAddress = `${listingLocation}, ${listingCountry}`;
  
  // Use Google Maps Geocoding service to get coordinates
  const geocoder = new google.maps.Geocoder();
  
  geocoder.geocode({ address: fullAddress }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const location = results[0].geometry.location;
      
      // Clear any existing marker
      if (marker) marker.setMap(null);
      
      // Create a custom marker for the listing
      marker = new google.maps.Marker({
        map: map,
        position: location,
        title: fullAddress,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="2"/>
              <path d="M20 8c-4.4 0-8 3.6-8 8 0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40)
        }
      });

      // Add custom marker class for styling
      marker.addListener('click', () => {
        showInfoPanel(location, fullAddress);
      });

      // Center map on the listing location
      map.setCenter(location);
      map.setZoom(15);

      // Show info panel by default
      setTimeout(() => {
        showInfoPanel(location, fullAddress);
      }, 1000);

      // Update search box placeholder
      const searchBox = document.getElementById("search-box");
      if (searchBox) {
        searchBox.placeholder = `Search near ${listingLocation}...`;
      }

      // Add map legend
      addMapLegend();

    } else {
      console.error('Geocoding failed:', status);
      showError('Unable to locate the listing address on the map', document.body);
    }
  });
}

// Show info panel with listing details
function showInfoPanel(location, address) {
  if (infoPanel) {
    infoPanel.remove();
  }

  const panel = document.createElement('div');
  panel.className = 'map-info-panel';
  panel.innerHTML = `
    <div class="map-info-header">
      <h4 class="map-info-title">
        <i class="fa fa-home me-2"></i>${getListingTitle()}
      </h4>
      <button class="map-info-close" onclick="hideInfoPanel()">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="map-info-content">
      <div class="map-info-item">
        <div class="map-info-icon">
          <i class="fa fa-map-marker-alt"></i>
        </div>
        <div class="map-info-text">
          <div class="map-info-label">Location</div>
          <div class="map-info-value">${address}</div>
        </div>
      </div>
      <div class="map-info-item">
        <div class="map-info-icon">
          <i class="fa fa-rupee-sign"></i>
        </div>
        <div class="map-info-text">
          <div class="map-info-label">Price</div>
          <div class="map-info-value">${getListingPrice()}</div>
        </div>
      </div>
      <div class="map-info-item">
        <div class="map-info-icon">
          <i class="fa fa-user"></i>
        </div>
        <div class="map-info-text">
          <div class="map-info-label">Owner</div>
          <div class="map-info-value">${getListingOwner()}</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('map').appendChild(panel);
  
  // Animate panel in
  setTimeout(() => {
    panel.classList.add('show');
  }, 100);

  infoPanel = panel;
}

// Hide info panel
function hideInfoPanel() {
  if (infoPanel) {
    infoPanel.classList.remove('show');
    setTimeout(() => {
      if (infoPanel && infoPanel.parentNode) {
        infoPanel.remove();
        infoPanel = null;
      }
    }, 300);
  }
}

// Add search marker
function addSearchMarker(place) {
  const searchMarker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    animation: google.maps.Animation.DROP,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#28a745" stroke="white" stroke-width="2"/>
          <path d="M15 8c-2.2 0-4 1.8-4 4 0 2.2 4 8 4 8s4-5.8 4-8c0-2.2-1.8-4-4-4zm0 6c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z" fill="white"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(30, 30),
      anchor: new google.maps.Point(15, 30)
    }
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; min-width: 200px;">
        <h6 style="color: #28a745; margin: 0 0 8px 0; font-weight: bold;">
          <i class="fa fa-search me-2"></i>${place.name}
        </h6>
        <p style="margin: 0; color: #666; font-size: 14px;">
          ${place.formatted_address || ''}
        </p>
      </div>
    `
  });

  searchMarker.addListener('click', () => {
    infoWindow.open(map, searchMarker);
  });

  infoWindow.open(map, searchMarker);

  // Remove search marker after 10 seconds
  setTimeout(() => {
    searchMarker.setMap(null);
  }, 10000);
}

// Add custom zoom controls
function addCustomZoomControls() {
  const zoomContainer = document.createElement('div');
  zoomContainer.className = 'map-zoom-controls';
  zoomContainer.innerHTML = `
    <button class="zoom-btn" onclick="zoomIn()" title="Zoom In">
      <i class="fa fa-plus"></i>
    </button>
    <button class="zoom-btn" onclick="zoomOut()" title="Zoom Out">
      <i class="fa fa-minus"></i>
    </button>
  `;

  document.getElementById('map').appendChild(zoomContainer);
}

// Add map legend
function addMapLegend() {
  if (legend) {
    legend.remove();
  }

  const legendDiv = document.createElement('div');
  legendDiv.className = 'map-legend';
  legendDiv.innerHTML = `
    <h5 class="map-legend-title">Map Legend</h5>
    <div class="map-legend-item">
      <div class="map-legend-marker legend-listing">
        <i class="fa fa-home"></i>
      </div>
      <span>Listing Location</span>
    </div>
    <div class="map-legend-item">
      <div class="map-legend-marker legend-user">
        <i class="fa fa-crosshairs"></i>
      </div>
      <span>Your Location</span>
    </div>
    <div class="map-legend-item">
      <div class="map-legend-marker legend-search">
        <i class="fa fa-search"></i>
      </div>
      <span>Search Results</span>
    </div>
  `;

  document.getElementById('map').appendChild(legendDiv);
  legend = legendDiv;
}

// Zoom functions
function zoomIn() {
  if (map) {
    map.setZoom(map.getZoom() + 1);
  }
}

function zoomOut() {
  if (map) {
    map.setZoom(map.getZoom() - 1);
  }
}

// Show map loading
function showMapLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'map-loading';
  loadingDiv.innerHTML = `
    <div class="map-loading-spinner"></div>
    <p class="map-loading-text">Loading map...</p>
  `;
  loadingDiv.id = 'map-loading';
  document.getElementById('map').appendChild(loadingDiv);
}

// Hide map loading
function hideMapLoading() {
  const loadingDiv = document.getElementById('map-loading');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// Get listing title from the page
function getListingTitle() {
  const titleElement = document.querySelector('.listing-title');
  return titleElement ? titleElement.textContent.trim() : 'Listing Location';
}

// Star Rating Functionality
function initializeStarRating() {
  const stars = document.querySelectorAll('.star-select');
  const ratingInput = document.getElementById('rating-value');
  
  if (stars.length > 0 && ratingInput) {
    let currentRating = 1;
    
    function setStars(rating) {
      stars.forEach((star, idx) => {
        if (idx < rating) {
          star.style.color = '#2563eb';
          star.classList.add('active');
        } else {
          star.style.color = '#e0e7ff';
          star.classList.remove('active');
        }
      });
    }
    
    setStars(currentRating);
    
    stars.forEach((star, idx) => {
      star.addEventListener('click', function() {
        currentRating = idx + 1;
        ratingInput.value = currentRating;
        setStars(currentRating);
      });
      
      star.addEventListener('mouseover', function() {
        setStars(idx + 1);
      });
      
      star.addEventListener('mouseout', function() {
        setStars(currentRating);
      });
    });
  }
}

// Form Validation
function initializeFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
}

// Review Delete Confirmation
function initializeReviewDeletion() {
  const deleteButtons = document.querySelectorAll('.delete-review-btn');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!confirm('Are you sure you want to delete this review?')) {
        e.preventDefault();
      }
    });
  });
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Loading States
function showLoading(element) {
  element.innerHTML = '<div class="loading-spinner"></div>';
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.alignItems = 'center';
}

function hideLoading(element, originalContent) {
  element.innerHTML = originalContent;
}

// Error Handling
function showError(message, container) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger alert-dismissible fade show';
  errorDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  container.insertBefore(errorDiv, container.firstChild);
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

// Success Messages
function showSuccess(message, container) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success alert-dismissible fade show';
  successDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  container.insertBefore(successDiv, container.firstChild);
  
  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.remove();
    }
  }, 3000);
}

// Map Utility Functions
function addMarkerToMap(lat, lng, title, content) {
  if (marker) marker.setMap(null);
  
  marker = new google.maps.Marker({
    map: map,
    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    title: title,
    animation: google.maps.Animation.DROP
  });

  if (content) {
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
    
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }

  map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
  map.setZoom(15);
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Add a temporary marker for user's location
        const userMarker = new google.maps.Marker({
          map: map,
          position: { lat, lng },
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="#dc3545" stroke="white" stroke-width="2"/>
                <circle cx="15" cy="15" r="6" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 30)
          }
        });

        const userInfoWindow = new google.maps.InfoWindow({
          content: '<div><strong>Your Current Location</strong></div>'
        });

        userMarker.addListener('click', () => {
          userInfoWindow.open(map, userMarker);
        });

        // Show distance to listing if listing marker exists
        if (marker) {
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(lat, lng),
            marker.getPosition()
          );
          
          const distanceKm = (distance / 1000).toFixed(1);
          userInfoWindow.setContent(`
            <div>
              <strong>Your Current Location</strong><br>
              <small>${distanceKm} km from listing</small>
            </div>
          `);
        }

        userInfoWindow.open(map, userMarker);
        
        // Remove user marker after 10 seconds
        setTimeout(() => {
          userMarker.setMap(null);
        }, 10000);
      },
      (error) => {
        console.error('Error getting location:', error);
        showError('Unable to get your current location', document.body);
      }
    );
  } else {
    showError('Geolocation is not supported by this browser', document.body);
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initializeStarRating();
  initializeFormValidation();
  initializeReviewDeletion();
  initializeSmoothScrolling();
  
  // Add map controls if map exists
  if (document.getElementById('map')) {
    addMapControls();
  }
});

// Add map controls
function addMapControls() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;
  
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'map-controls';
  controlsDiv.innerHTML = `
    <button class="map-control-btn" onclick="getCurrentLocation()" title="Get My Location">
      <i class="fa fa-crosshairs"></i>
    </button>
    <button class="map-control-btn" onclick="resetToListing()" title="Show Listing Location">
      <i class="fa fa-home"></i>
    </button>
    <button class="map-control-btn" onclick="resetMap()" title="Reset Map">
      <i class="fa fa-refresh"></i>
    </button>
  `;
  
  mapContainer.appendChild(controlsDiv);
}

// Reset map to listing location
function resetToListing() {
  if (listingLocation && listingCountry) {
    setListingDestination();
  }
}

// Reset map to default view
function resetMap() {
  if (map) {
    map.setCenter({ lat: 28.6139, lng: 77.2090 });
    map.setZoom(12);
    if (marker) marker.setMap(null);
    hideInfoPanel();
  }
}

// Export functions for global access
window.initMap = initMap;
window.getCurrentLocation = getCurrentLocation;
window.resetMap = resetMap;
window.resetToListing = resetToListing;
window.addMarkerToMap = addMarkerToMap;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.hideInfoPanel = hideInfoPanel; 