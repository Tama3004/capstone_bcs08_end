import { Button, ConfigProvider, Dropdown, Modal, Space } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { userLocalStorage } from "../api/localService";
import { DownOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  // Get info from State and useState
  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });
  //---------- END -------------
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    const updatePosition = () => {
      if (location.pathname === "/") {
        setScrollPosition(window.pageYOffset);
      } else if (location.pathname !== "/") {
        setScrollPosition(0);
      }
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [location.pathname]);

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  //Mobile Dropdown
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };
  //---------- END -------------
  let handleLogOut = () => {
    userLocalStorage.remove();
    window.location.href = "/";
  };

  // Render Nav
  let renderUserNav = () => {
    if (userLogin) {
      // User Options
      const items = [
        {
          label: (
            <NavLink to={`/profile/${userLogin.user.id}`}>
              <button>Profile</button>
            </NavLink>
          ),
          key: "0",
        },
        {
          label: (
            <NavLink to="/" onClick={handleLogOut}>
              <button>Sign Out</button>
            </NavLink>
          ),
          key: "2",
        },
      ];
      // END
      return (
        <div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userLogin.user.avatar !== "" ? (
                  <button>
                    <img
                      className="h-16 w-16 rounded-full"
                      src={userLogin.user.avatar}
                      alt=""
                    />
                  </button>
                ) : (
                  <button>{userLogin.user.name}</button>
                )}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <div className="space-x-10">
          <NavLink to="/login">
            <button>Sign in</button>
          </NavLink>
          <NavLink to="/register">
            <button>Join</button>
          </NavLink>
        </div>
      );
    }
  };
  //---------- END -------------

  return (
    <header
      className={
        scrollPosition > 0 || location.pathname !== "/"
          ? " header-active "
          : " header"
      }
    >
      <div className="container header-content">
        <div className="left_h space-x-5">
          <div className="mobile-active flex space-x-2">
            <div className="modal-headers">
              <Space>
                <Button type="primary" onClick={() => toggleModal(0, true)}>
                  <span className="icon_modal text-2xl">
                    <AiOutlineMenu></AiOutlineMenu>
                  </span>
                </Button>
              </Space>
              <Modal
                title={
                  userLogin !== null && userLogin.user !== "" ? (
                    <div className="flex items-center space-x-2">
                      <div>
                        {userLogin.user.avatar !== "" ? (
                          <img
                            className="w-16 h-16 rounded-full"
                            src={userLogin.user.avatar}
                            alt=""
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <p>{userLogin.user.name}</p>
                        <p>{userLogin.user.email}</p>
                        <div className="space-x-4">
                          <NavLink>
                            <button onClick={handleLogOut}>Sign Out</button>
                          </NavLink>
                          <NavLink to={`/profile/${userLogin.user.id}`}>
                            <button>Profile</button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-5">
                      <NavLink to="/login">
                        <button>Sign In</button>
                      </NavLink>
                      <NavLink to="/register">
                        <button>Sign Up</button>
                      </NavLink>
                    </div>
                  )
                }
                open={isModalOpen[0]}
                onCancel={() => toggleModal(0, false)}
                footer=""
              >
                <div className="text_modal">
                  <p className="text-green-500">Fiverr Pro</p>
                  <hr />
                  <p>Explore</p>
                  <hr />
                  <p>Message</p>
                  <hr />
                  <p>List</p>
                  <hr />
                  <p>Order</p>
                  <hr />
                  <p>Help & Resource</p>
                </div>
              </Modal>
            </div>
            <a className="" href="/">
              fiverr<span className="text-green-500 text-5xl">.</span>
            </a>
          </div>
          {scrollPosition > 0 || location.pathname !== "/" ? (
            <Search
              className="search-header"
              placeholder="input search text"
              allowClear
              enterButton={
                <Button
                  style={{ backgroundColor: "green", borderColor: "green" }}
                  type="primary"
                >
                  Search
                </Button>
              }
              size="large"
              onSearch={onSearch}
            />
          ) : null}
        </div>
        <div className="right_h space-x-10 flex items-center md:text-sm lg:text-lg font-bold">
          <div className="flex gap-5 rh-content">
            <NavLink href="">
              <button className="fiveR">Fiverr Business</button>
            </NavLink>
            <NavLink href="">
              <button>Explore</button>
            </NavLink>
            <NavLink href="">
              <button>English</button>
            </NavLink>
            <NavLink href="">
              <button>US$ USD</button>
            </NavLink>
            <NavLink href="">
              <button>Become a Seller</button>
            </NavLink>
          </div>
          <div className="avatarIcon">{renderUserNav()}</div>
        </div>
      </div>
    </header>
  );
}
