import axios from "axios";
import { userLocalStorage } from "./localService";
import { useSelector } from "react-redux";

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";
export const configHeaders = () => {
  return {
    TokenCybersoft: TOKEN,
  };
};
export const BASE_URL = "https://fiverrnew.cybersoft.edu.vn/";
export const https = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: configHeaders(),
});
