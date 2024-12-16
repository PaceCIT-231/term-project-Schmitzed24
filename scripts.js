document.addEventListener('DOMContentLoaded', () => {
  // Debugging to make sure the script runs at the start
  console.log('Document is ready.');

  // Constant Variables
  const meatsSection = document.getElementById('meats');
  const vegetablesSection = document.getElementById('vegetables');
  const vitaminsMineralsSection = document.getElementById('vitamins-minerals');
  const dogSizeSelect = document.getElementById('dogSize');
  const dogImage = document.getElementById('dog-image');
  const foodTypeSelect = document.getElementById('foodType');
  const addToCartButton = document.getElementById('add-to-cart');
  const checkoutModal = document.getElementById('checkout-modal');
  const closeModalButton = document.getElementById('close-modal');
  const checkoutButton = document.getElementById('checkout-button');
  const cartItemsList = document.getElementById('cart-items');




    // Change the image source based on dog size
    // I do not own any of these images, they all come from 101dogbreeds.com
    function updateDogImage() {
    const selectedSize = dogSizeSelect.value;
    const screenWidth = window.innerWidth;
    
    // Check if screen width is about 850px or less and hide the image
    if (screenWidth <= 850) {
      dogImage.src = '';
      dogImage.style.display = 'none';
    return;
    } else {
      dogImage.style.display = 'block';  // Ensure image is displayed for wider screens
    }

    // Determine image size based on screen resolution (mobile vs desktop)
    let imageSuffix = screenWidth <= 1300 ? '_Small' : ''; // 1300px offered the best visibility to operability ratio
    
    // Update image source based on dog size and screen resolution
    if (selectedSize === 'large') {
      dogImage.src = `Big-Dog-Breeds${imageSuffix}.jpg`;
      dogImage.alt = 'Large Dog';
    } else if (selectedSize === 'medium') {
      dogImage.src = `Medium-Dog-Breeds${imageSuffix}.jpg`;
      dogImage.alt = 'Medium Dog';
    } else if (selectedSize === 'small') {
      dogImage.src = `Small-Dog-Breeds${imageSuffix}.jpg`;
      dogImage.alt = 'Small Dog';
      }
    }

      // Event listener for changing dog size
      dogSizeSelect.addEventListener('change', updateDogImage);

      window.addEventListener('resize', updateDogImage);
  



  // Handle increment and decrement actions dynamically
  function handleItemChange(e) {
    const countSpan = e.target.parentElement.querySelector('span');
    let count = parseInt(countSpan.innerText);

    if (e.target.classList.contains('increment')) {
      // Only allow increment if count is less than 1
      if (count < 1) {
        countSpan.innerText = 1;
        e.target.disabled = true;
        e.target.parentElement.querySelector('.decrement').disabled = false;
      }
    } else if (e.target.classList.contains('decrement') && count > 0) {
      countSpan.innerText = 0;
      e.target.disabled = true;
      e.target.parentElement.querySelector('.increment').disabled = false;
    }

    console.log(`${e.target.classList.contains('increment') ? 'Incremented' : 'Decremented'}: New count is ${countSpan.innerText}`);
  }

  // Add event listeners to the meats, vegetables, and vitamins-minerals sections using event delegation
  function addItemEventListeners() {
    [meatsSection, vegetablesSection, vitaminsMineralsSection].forEach(section => {
      section.querySelectorAll('.increment').forEach(button => {
        // Remove previous event listeners and add a new listener
        button.removeEventListener('click', handleItemChange); 
        button.addEventListener('click', handleItemChange);
      });

      section.querySelectorAll('.decrement').forEach(button => {
        button.removeEventListener('click', handleItemChange);
        button.addEventListener('click', handleItemChange);
      });
    });
  }

  // Initialize event listeners for the items on page load
  addItemEventListeners();

  // Reset the counters when dog size is changed
  dogSizeSelect.addEventListener('change', () => {
    console.log('Dog size changed, resetting counters.');
    
    // Reset all counters
    document.querySelectorAll('[id$="-count"]').forEach(countSpan => {
      countSpan.innerText = '0';
    });

    // Disable all increment buttons
    document.querySelectorAll('.increment').forEach(button => {
      button.disabled = false;
    });
    
    // Disable all decrement buttons
    document.querySelectorAll('.decrement').forEach(button => {
      button.disabled = true;
    });

    // Update the food options based on the selected size
    updateFoodOptionsBasedOnSize(dogSizeSelect.value);

    // Re-attach event listeners after the size change
    addItemEventListeners();
  });

  // Update food options based on selected dog size
  function updateFoodOptionsBasedOnSize(size) {
    // Reset meat section to ensure it is clean
    meatsSection.innerHTML = `
      <div class="item">
        <label for="chicken">Chicken 🍗</label>
        <button class="decrement" disabled>-</button>
        <span id="chicken-count">0</span>
        <button class="increment">+</button>
      </div>
      <div class="item">
        <label for="beef">Beef 🥩</label>
        <button class="decrement" disabled>-</button>
        <span id="beef-count">0</span>
        <button class="increment">+</button>
      </div>
    `;
    
    // Add "Salmon" for large/medium dogs
    if (size === 'large' || size === 'medium') {
      meatsSection.innerHTML += `
        <div class="item">
          <label for="salmon">Salmon 🐟</label>
          <button class="decrement" disabled>-</button>
          <span id="salmon-count">0</span>
          <button class="increment">+</button>
        </div>
      `;
    }

    // Add "Spinach" for large/small dogs
    if (size === 'large' || size === 'small') {
      vegetablesSection.innerHTML += `
        <div class="item">
          <label for="spinach">Spinach 🥬</label>
          <button class="decrement" disabled>-</button>
          <span id="spinach-count">0</span>
          <button class="increment">+</button>
        </div>
      `;
    }

    // Add "Egg" for small dogs
    if (size === 'small') {
      meatsSection.innerHTML += `
        <div class="item">
          <label for="spinach">Egg 🥚</label>
          <button class="decrement" disabled>-</button>
          <span id="egg-count">0</span>
          <button class="increment">+</button>
        </div>
      `;
    }


    // Keep vegetables for small dogs
    if (size === 'small') {
      vegetablesSection.innerHTML = `
        <div class="item">
          <label for="carrots">Carrots 🥕</label>
          <button class="decrement" disabled>-</button>
          <span id="carrots-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="green-beans">Green Beans🌿</label>
          <button class="decrement" disabled>-</button>
          <span id="green-beans-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="sweet-potato">Sweet Potato 🍠</label>
          <button class="decrement" disabled>-</button>
          <span id="sweet-potato-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="spinach">Spinach 🥬</label>
          <button class="decrement" disabled>-</button>
          <span id="spinach-count">0</span>
          <button class="increment">+</button>
        </div>
      `;

    } else if (size === 'large') {
      // Remove "Carrots" for large dogs
      vegetablesSection.innerHTML = `
        <div class="item">
          <label for="green-beans">Green Beans 🌿</label>
          <button class="decrement" disabled>-</button>
          <span id="green-beans-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="sweet-potato">Sweet Potato 🍠</label>
          <button class="decrement" disabled>-</button>
          <span id="sweet-potato-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="spinach">Spinach 🥬</label>
          <button class="decrement" disabled>-</button>
          <span id="spinach-count">0</span>
          <button class="increment">+</button>
        </div>
      `;

    } else {
      // Remove spinach for medium dogs. Medium dogs is the default for vegetables
      vegetablesSection.innerHTML = `
        <div class="item">
          <label for="carrots">Carrots 🥕</label>
          <button class="decrement" disabled>-</button>
          <span id="carrots-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="green-beans">Green Beans 🌿</label>
          <button class="decrement" disabled>-</button>
          <span id="green-beans-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="sweet-potato">Sweet Potato 🍠</label>
          <button class="decrement" disabled>-</button>
          <span id="sweet-potato-count">0</span>
          <button class="increment">+</button>
        </div>
      `;
    }

    // Hide Omega-3 for large/medium dogs and show it for small dogs
    const omega3Element = document.getElementById('omega-3');
    if (size === 'small' && omega3Element) {
      omega3Element.parentElement.style.display = 'flex'; // Show Omega-3 for small dogs, substitute for salmon
    } else if (omega3Element) {
      omega3Element.parentElement.style.display = 'none'; // Hide Omega-3 for large and medium dogs
    }

    // Reset vitamins section for small dogs
    if (size === 'small') {
      vitaminsMineralsSection.innerHTML = `
        <div class="item">
          <label for="vitamin-a">Vitamin A</label>
          <button class="decrement" disabled>-</button>
          <span id="vitamin-a-count">0</span>
          <button class="increment">+</button>
        </div>
        <div class="item">
          <label for="omega-3">Omega-3</label>
          <button class="decrement" disabled>-</button>
          <span id="omega-3-count">0</span>
          <button class="increment">+</button>
        </div>
      `;
    } else {
      vitaminsMineralsSection.innerHTML = `
        <div class="item">
          <label for="vitamin-a">Vitamin A</label>
          <button class="decrement" disabled>-</button>
          <span id="vitamin-a-count">0</span>
          <button class="increment">+</button>
        </div>
      `;
    }
  }

  // Listener for dogSize, foodType, and increment values
  addToCartButton.addEventListener('click', () => {
    const dogSize = dogSizeSelect.value;
    const foodType = foodTypeSelect.value;
    const selectedItems = {
      dogSize,
      foodType,
      meats: {
        chicken: document.getElementById('chicken-count').innerText,
        beef: document.getElementById('beef-count').innerText,
        salmon: document.getElementById('salmon-count') ? document.getElementById('salmon-count').innerText : '0',
        egg: document.getElementById('egg-count') ? document.getElementById('egg-count').innerText : '0',
      },
      vegetables: {
        carrots: document.getElementById('carrots-count').innerText,
        greenBeans: document.getElementById('green-beans-count').innerText,
        sweetPotato: document.getElementById('sweet-potato-count').innerText,
        spinach: document.getElementById('spinach-count') ? document.getElementById('spinach-count').innerText : '0',
      },
      vitamins: {
        vitaminA: document.getElementById('vitamin-a-count').innerText,
        omega3: document.getElementById('omega-3-count') ? document.getElementById('omega-3-count').innerText : '0',
      }
    };
  
    // Log the selected items to console
    console.log('Selected Dog Size and Items:', selectedItems);
  
    // Clear any previous content in the modal
    cartItemsList.innerHTML = '';
  
    // Add selected items to the modal
    const createListItem = (name, count) => {
      const li = document.createElement('li');
      li.textContent = `${name}: ${count}`;
      cartItemsList.appendChild(li);
    };
  
    // Display items dynamically
    createListItem('Dog Size', selectedItems.dogSize);
    createListItem('Food Type', selectedItems.foodType);
    Object.keys(selectedItems.meats).forEach(meat => {
      createListItem(meat, selectedItems.meats[meat]);
    });
    Object.keys(selectedItems.vegetables).forEach(veg => {
      createListItem(veg, selectedItems.vegetables[veg]);
    });
    Object.keys(selectedItems.vitamins).forEach(vitamin => {
      createListItem(vitamin, selectedItems.vitamins[vitamin]);
    });
  
    // Open Checkout Modal
    checkoutModal.style.display = 'block';

  });
  
  // Close Checkout Modal
  closeModalButton.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
  });

  // Checkout button functionality (Close modal and show alert)
  checkoutButton.addEventListener('click', () => {
    //Get the values from the modal input
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;

    // Get the modal error message div
    const modalErrors = document.getElementById('modal-errors');
    
    // Check if any field is empty
    if (!firstName || !lastName || !address || !email) {
      // Show the error message inside the modal
      modalErrors.style.display = 'block';
  
      // Prevent the modal from closing
      return;
    }

    // If all fields are filled, hide the error message
    modalErrors.style.display = 'none';

    // Close modal
    checkoutModal.style.display = 'none';

    // Show successful order alert
    alert(`Thank you ${firstName}. Your order has been placed!`); 
    resetItems();
    clearForm();
  });
});


// Function to reset the item counts (meats, vegetables, vitamins)
function resetItems() {
  
  // Reset meat counts
  document.getElementById('chicken-count').innerText = '0';
  document.getElementById('beef-count').innerText = '0';
  if (document.getElementById('salmon-count')) {
    document.getElementById('salmon-count').innerText = '0';
  }
  if (document.getElementById('egg-count')) {
    document.getElementById('egg-count').innerText = '0';
  }

  // Reset vegetable counts
  document.getElementById('carrots-count').innerText = '0';
  document.getElementById('green-beans-count').innerText = '0';
  document.getElementById('sweet-potato-count').innerText = '0';
  document.getElementById('spinach-count').innerText = '0';

  // Reset vitamin counts
  document.getElementById('vitamin-a-count').innerText = '0';
  if (document.getElementById('omega-3-count')) {
    document.getElementById('omega-3-count').innerText = '0';
  }

  // Disable all increment buttons and enable decrement buttons where applicable
  resetButtonsState();
}

// Function to reset the buttons' state (enable/disable buttons)
function resetButtonsState() {
  // Disable all increment buttons and enable decrement buttons where applicable
  document.querySelectorAll('.increment').forEach(button => {
    button.disabled = false; // Enable increment buttons
  });
  document.querySelectorAll('.decrement').forEach(button => {
    button.disabled = true; // Disable decrement buttons
  });
}

// Function to clear the modal form fields
function clearForm() {
  document.getElementById('fname').value = '';
  document.getElementById('lname').value = '';
  document.getElementById('address').value = '';
  document.getElementById('email').value = '';
}


  // Function for handling contact.html inquiries
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting before content is filled

  // Get form data
  var firstName = document.getElementById('fname').value;
  var lastName = document.getElementById('lname').value;
  var email = document.getElementById('email').value;
  var subject = document.getElementById('subject').value;

  // Check if all required fields are filled
  if (firstName === "" || lastName === "" || email === "" || subject === "") {
     alert("Please fill in all the fields before submitting.");
      return;
  }

  // Simulate sending the email
  alert("Thank you, " + firstName + "! Your inquiry has been sent successfully. We will get back to you in 48 hours.");
    
  // Resets the form
  document.getElementById('contactForm').reset();
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}