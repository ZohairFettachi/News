import Navbar from "./components/Navbar";
import NewsBoard from "./components/NewsBoard";
import NewsItem from "./components/NewsItem";
import { useState, useEffect } from 'react';

const App = () => {
  const [category,setCategory]=useState("general");
  return (
    <div>
      <Navbar setCategory={setCategory}/>
      <NewsBoard category={category}/>
    </div>
  );
}

export default App;
