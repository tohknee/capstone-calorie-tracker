import "./ExampleMeals.css"; // Import the CSS file for styling

const ExampleMeals = () => {
  return (
    <div className="example-meals-container">
      <h2>Example Dog Meal Ideas</h2>
      <div className="example-meal">
        <h3>Meal 1</h3>
        <p>Calories: 500</p>
        <p>Portion Size: 1 cup</p>
        <p>Category: Dinner</p>
        <p>Ingredients: Chicken, Rice, Vegetables</p>
      </div>
      <div className="example-meal">
        <h3>Meal 2</h3>
        <p>Calories: 400</p>
        <p>Portion Size: 0.75 cups</p>
        <p>Category: Breakfast</p>
        <p>Ingredients: Salmon, Sweet Potato, Spinach</p>
      </div>
    </div>
  );
};

export default ExampleMeals;
