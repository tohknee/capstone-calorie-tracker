import "./ExampleMeals.css"; // Import the CSS file for styling

const ExampleMeals = () => {
  return (
    <div className="example-meals-container">
      <h2>Example Dog Daily Calorie Goals</h2>
      <div className="example-meal">
        <h3>Dog Weight &lt; 20 lbs</h3>
        <p>Calorie Goal: 300-400 calories per day</p>
      </div>
      <div className="example-meal">
        <h3>Dog Weight 20-40 lbs</h3>
        <p>Calorie Goal: 400-600 calories per day</p>
      </div>
      <div className="example-meal">
        <h3>Dog Weight &gt; 40 lbs</h3>
        <p>Calorie Goal: 600-800 calories per day</p>
      </div>
    </div>
  );
};

export default ExampleMeals;
