import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  console.log(meals)
  // Fetch meals from database
  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch(
        'https://my-test-696e5-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );
      const resData = await res.json();
      const mealsData = [];
      for (const key in resData) {
        mealsData.push({
          id: key,
          ...resData[key]
        });
      }
      setMeals(mealsData)
    }
    fetchMeals();
  }, []);
  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
