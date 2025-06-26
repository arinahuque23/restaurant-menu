// src/shared/services/base-query.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});
