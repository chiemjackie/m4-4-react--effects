import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item"
import useInterval from "../hooks/use-interval.hook"

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {

  const [ numCookies, setNumCookies ] = React.useState(10000);
  const [ purchasedItems, setPurchasedItems ] = React.useState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    }
  );

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    console.log('mount');
    return () => {
      console.log('UNMOUNT');
      document.title = `Cookie Clicker Workshop`;
    }
  }, [numCookies])

  const handleClick = () => {
    setNumCookies(numCookies + 1)
  }

  const calculateCookiesPerTick = () => {
    let cookieIncome = 0;

    for (let i = 0; i < items.length; i++) {
      let itemValue = items[i].value;
      let amountPurchased = Object.values(purchasedItems)[i];

      cookieIncome = cookieIncome + (itemValue * amountPurchased);
    }

    return cookieIncome;
  };

  useInterval(() => {
    setNumCookies(numCookies + calculateCookiesPerTick())
  }, 1000);


  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button onClick={handleClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => {
          return(
            <Item
            key={item.id}
            id={item.id}
            name={item.name}
            cost={item.cost}
            value={item.value}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            >
          </Item>
          )
        })}
          
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
