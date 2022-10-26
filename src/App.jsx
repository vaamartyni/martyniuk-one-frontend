import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {authMe} from "./store/slices/authSlice";
import {AnimatePresence} from "framer-motion";

function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(authMe())
    },[])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
          <AnimatePresence >
              <Routes>
                  <Route path="/" element={ <Home/> } />
                  <Route path="/posts/:id" element={ <FullPost/> } />
                  <Route path="/posts/:id/edit" element={ <AddPost/> } />
                  <Route path="/create" element={ <AddPost/> } />
                  <Route path="/login" element={ <Login/> } />
                  <Route path="/register" element={ <Registration/> } />
              </Routes>
          </AnimatePresence>
      </Container>
    </>
  );
}

export default App;
