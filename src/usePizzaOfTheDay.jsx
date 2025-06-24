import { useEffect, useState, useDebugValue } from "react";

//This is a custom hook to fetch the pizza of the day
export const usePizzaOfTheDay = () => {
  const [PizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(
    PizzaOfTheDay
      ? `${PizzaOfTheDay.id} : ${PizzaOfTheDay.name}`
      : "Loading...",
  );

  useEffect(() => {
    //useEffect is used to fetch data when the component mounts
    async function fetchPizzaOfTheDay() {
      //await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }
    fetchPizzaOfTheDay();
  }, []);

  return PizzaOfTheDay;
};
