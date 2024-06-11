import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CocktailList from "./pages/CocktailList";
import CocktailDetail from "./pages/CocktailDetail";
import YourTable from "./pages/YourTable";
import AddCocktail from "./pages/AddCocktail"; 
import EditCocktail from "./pages/EditCocktail";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";
import GetRandomCocktail from "./pages/GetRandomCocktail";
import { API_URL } from "./config";
import { useNavigate } from "react-router-dom";


function App() {
  const [cocktails, setCocktails] = useState([]); // Initialize state
  const [orderedCocktails, setOrderedCockails] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/drinks`);
        setCocktails(data.reverse());
      } catch (error) {
        console.log("HERE?")
        console.log(error);
      }
    };
    fetchCocktails();
  }, []);

  function handleOrder(cocktail) {
    setOrderedCockails([...orderedCocktails, cocktail]);
  }

  // const handleDelete = (id) => {
  //   nav("/cocktails");
  //   setCocktails(cocktails.filter(cocktail => cocktail.id !== id));
  // }
  const handleDelete = async (id) => {
    try {  
      await axios.delete(`${API_URL}/drinks/${id}`);
      setCocktails(cocktails.filter(cocktail => cocktail.id !== id));
      nav("/cocktails");
    } catch (error) {
      console.log( error);
      
    }
  }

  return (
    <>
      <Navbar />
      <div className="body-page">
        <SideBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cocktails"
            element={
              <CocktailList cocktails={cocktails} setCocktails={setCocktails} />
            }
          />
          <Route
            path="/cocktails/:cocktailId"
            element={
              <CocktailDetail cocktails={cocktails} handleOrder={handleOrder} handleDelete={handleDelete} orderedCocktails={orderedCocktails}/>
            }
          />
          <Route
            path="/your-table"
            element={<YourTable orderedCocktails={orderedCocktails} />}
          />
          <Route
            path="/add-cocktail"
            element={
              <AddCocktail cocktails={cocktails} setCocktails={setCocktails} />
            }
          />
          <Route path="/random-cocktail" element={<GetRandomCocktail />} />
          <Route path="/edit-cocktail/:cocktailId" element={<EditCocktail cocktails={cocktails} setCocktails={setCocktails}/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
