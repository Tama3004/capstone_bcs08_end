import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./page/Login/LoginPage";
import RegPage from "./page/Register/RegPage";
import Layout from "./template/Layout";
import HomePage from "./page/Home/HomePage";
import Title from "./page/Title/Title";
import Categories from "./page/Categories/Categories";
import JobDetail from "./page/JobDetail/JobDetail";
import ProfilePage from "./page/Profile/ProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
          <Route path="/title">
            <Route
              path=":id"
              element={
                <Layout>
                  <Title />
                </Layout>
              }
            />
          </Route>
          <Route path="/profile">
            <Route
              path=":id"
              element={
                <Layout>
                  <ProfilePage />
                </Layout>
              }
            />
          </Route>
          <Route path="/categories">
            <Route
              path=":id"
              element={
                <Layout>
                  <Categories />
                </Layout>
              }
            />
          </Route>
          <Route path="/jobDetail">
            <Route
              path=":id"
              element={
                <Layout>
                  <JobDetail />
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
