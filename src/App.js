import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./page/Login/LoginPage";
import RegPage from "./page/Register/RegPage";
import Layout from "./template/Layout";
import HomePage from "./page/Home/HomePage";
import Title from "./page/Title/Title";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <RegPage />
              </Layout>
            }
          />
          <Route
            path="/title"
          >
            <Route
              path=":id"
              element={
                <Layout>
                  <Title />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
