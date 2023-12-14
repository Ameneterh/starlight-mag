import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SLAdmin from "./Pages/SLAdmin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import AuthorBio from "./Pages/AuthorBio";
import SearchArticles from "./Pages/SearchArticles";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";
import ScrollToTop from "./ScrollToTop";
import Listing from "./Pages/Listing";
import Articles from "./Pages/Articles";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/about" element={<About />} />
        <Route path="/sl-admin" element={<SLAdmin />} />
        <Route path="/author-bio" element={<AuthorBio />} />
        <Route path="/search" element={<SearchArticles />} />
        <Route path="/articles" element={<Articles />} />
        <Route element={<PrivateRoute />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
