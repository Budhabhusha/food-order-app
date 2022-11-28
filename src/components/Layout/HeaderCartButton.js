import React, { useContext,useState,useEffect } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
  const [btnIsHighlited, setBtnIsHighlited] = useState(false)
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx
  const numberOfCartItem = items.reduce((curNumber, item) =>  {
    return curNumber + item.amount
  }, 0)
 
  const btnClasses = `${classes.button} ${btnIsHighlited ? classes.bump : ''}`

  useEffect(()=>{
    if(items.length === 0) {
      return
    }
    setBtnIsHighlited(true)
    const timer = setTimeout(()=>{
      setBtnIsHighlited(false)
    },300)

    return () => {
     clearTimeout(timer)
    }
  },[items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  )
}

export default HeaderCartButton