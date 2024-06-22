document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('button[id^="btn"]').forEach(button => {
        button.addEventListener('click', (event) => {
            console.log('Button clicked:', event.target.id);
            event.preventDefault(); // Prevenir cualquier comportamiento por defecto
            
            // Intentar abrir el modal directamente aquí
            if (sizeModal) {
                sizeModal.style.display = 'block';
            } else {
                console.error('Size modal not found');
            }
        });
    });


    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartIcon = document.getElementById('cart-icon');

    // Modal elements
    const sizeModal = document.getElementById('size-modal');
    const sizeForm = document.getElementById('size-form');
    const closeModal = document.getElementsByClassName('close')[0];

    // New: Cart modal elements
    const cartModal = document.getElementById('cart-modal');
    const cartItemsModalContainer = document.getElementById('cart-items-modal');
    const closeCartModal = document.getElementsByClassName('close-cart')[0];
    const checkoutBtnModal = document.getElementById('checkout-btn-modal');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Function to show cart modal
    const showCartModal = () => {
        cartModal.style.display = 'block';
        renderCartItemsModal();
    };

    // Event listener to open cart modal when clicking cart icon
    cartIcon.addEventListener('click', () => {
        showCartModal();
    });

    // Event listener to close cart modal when clicking close button
    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Event listener to close cart modal if clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Function to render cart items in modal
    const renderCartItemsModal = () => {
        cartItemsModalContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.color} - Talla ${item.size} - Cantidad: ${item.quantity}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Eliminar';
            removeBtn.addEventListener('click', () => {
                removeFromCart(index);
            });

            li.appendChild(removeBtn);
            cartItemsModalContainer.appendChild(li);
        });
    };

    // Function to show confirmation message
    const showConfirmationMessage = () => {
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
            confirmationMessage.style.display = 'none';
        }, 3000); // 3 seconds before hiding
    };

    // Event listener for adding to cart from size modal form
    sizeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const product = JSON.parse(sizeForm.dataset.product);
        const size = document.getElementById('shoe-size').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        product.size = size;
        product.quantity = quantity;
        sizeModal.style.display = 'none';
        showConfirmationMessage();
        addToCart(product);
    });

    // Function to add item to cart
    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    };

    // Function to render cart items on main page
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.color} - Talla ${item.size} - Cantidad: ${item.quantity}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Eliminar';
            removeBtn.addEventListener('click', () => {
                removeFromCart(index);
            });

            li.appendChild(removeBtn);
            cartItemsContainer.appendChild(li);

        });
    };

        // Event listener for checkout button in modal (you can customize this)
        checkoutBtnModal.addEventListener('click', () => {
            // Prepare message for WhatsApp
            const phoneNumber = '3319749527';
            let message = 'Hola, estoy interesado en comprar los siguientes productos:\n\n';
            cart.forEach((item, index) => {
                message += ` Modelo: ${item.name} - Color: ${item.color} - Talla: ${item.size} - Cantidad: ${item.quantity}\n`;
            });
    
            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
    
            // Construct WhatsApp URL
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
            // Open WhatsApp with prefilled message
            window.open(whatsappURL);
        });

    const removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItemsModal(); 
        renderCartItems();
        cartModal.style.display = 'none'; 
        showCartModal(); 
    };

  // Reemplaza los dos bloques de event listeners con este único bloque
  document.querySelectorAll('.btn1, .btn2, .btn3, .btn4, .btn5, .btn6, .btn7, .btn8, .btn9, .btn10, .btn11, .btn12, .btn13, .btn14, .btn15, .btn16, #btn17, #btn18').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Button clicked:', button.id);
        const product = {
            name: button.getAttribute('data-name'),
            color: button.getAttribute('data-color'),
        };
        sizeForm.dataset.product = JSON.stringify(product);
        sizeModal.style.display = 'block';
    });
});

    closeModal.addEventListener('click', () => {
        sizeModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === sizeModal) {
            sizeModal.style.display = 'none';
        }
    });

    // Render stored items on page load
    renderCartItems();
});


