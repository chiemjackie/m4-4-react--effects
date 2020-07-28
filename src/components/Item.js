import React from "react";

const Item = ({ id, name, cost, value, purchasedItems, setPurchasedItems, numCookies, setNumCookies }) => {

  const handlePurchase = () => {
    if (numCookies >= cost) {
      setPurchasedItems({
        ...purchasedItems,
        [id]: purchasedItems[id] + 1
      });
      setNumCookies(numCookies - cost);
    } else {
      window.alert('chill broke boi')
    }
  }

  return (
    <button
      onClick={handlePurchase}
      value={name}
    >
      <div>
        <p>{name}</p>
        <span>Cost: {cost} cookie{cost > 1 ? 's' : ''}.</span>
        <span>Produces {value} cookie{value > 1 ? 's' : ''}/sec.</span>
        <span>{purchasedItems[id]}</span>
      </div>
    </button>
  )
}

export default Item