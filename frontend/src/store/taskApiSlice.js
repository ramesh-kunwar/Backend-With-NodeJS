import { apiSlice } from "./apiSlice";
import { TASKS_URL } from "./constants";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: TASKS_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTasksQuery } = taskApiSlice;
