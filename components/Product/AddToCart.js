import React from 'react'
import Button from '~/components/Button'
import { ADD_TO_CART_MUTATION } from '~/components/Checkout/Cart/Cartgraphql';
import { useRouter } from 'next/router';
import { useCart } from '~/providers/context/CartContext';
import { useMutation } from '@apollo/client'
import { Box, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Product.module.css';

export const AddToCart = ({ selectedColor, selectedSize, error, setError, quantity, }) => {

  const router = useRouter();
  const { updateCartCount, setItemAdded } = useCart();
  const [addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);

  const handleAddToCart = async () => {

    if (!selectedColor) setError((prev) => ({ ...prev, color: 'Please select a color.' }));
    else setError((prev) => ({ ...prev, color: '' }));


    if (!selectedSize) {
      setError((prev) => ({ ...prev, size: 'Please select a size.' }));
    } else {
      setError((prev) => ({ ...prev, size: '' }));

    }

    if (quantity <= 0) {
      setError((prev) => ({ ...prev, quantity: 'Quantity must be greater than 0.' }));
    } else {
      setError((prev) => ({ ...prev, quantity: '' }));

    }


    if (selectedColor && selectedSize && quantity > 0) {
      try {
        const { data } = await addToCartMutation();

        console.log('GraphQL Response:', data);

        if (data && data.addProductsToCart) {
          const { cart, user_errors } = data.addProductsToCart;

          if (user_errors.length > 0) {
            console.error(user_errors);
            alert(`Failed to add item to the cart: ${user_errors[0].message}`);
          } else {

            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

            console.log('Cart Items:', cart.items[0].product.sku);
            console.log('Total Quantity:', totalQuantity);

            setItemAdded(cart.items);
            updateCartCount(totalQuantity);
            // alert('Item added to the cart successfully!');

            router.push({
              pathname: '/checkout/cart',
              query: { productId: cart.items[0].id, sku: cart.items[0].product.sku },
            });
            // router.push('/checkout/cart');
          }
        } else {
          console.error('Unexpected response format from the server:', data);
        }
      } catch (error) {
        console.error('Error adding to cart:', error.message);
      }
    }
  };

  return (
    <IconButton onClick={handleAddToCart} className={styles.button}>
      <AddShoppingCartIcon />
      <Box sx={{fontSize: '18px'}}>ADD TO CART</Box>
    </IconButton>
  );
}