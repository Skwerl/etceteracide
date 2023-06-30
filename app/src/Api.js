import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reducerPath = "api";
const { REACT_APP_API_ENDPOINT } = process.env;

const endpoints = (builder) => ({
    getPosts: builder.query({
        query: () => `/items`,
        providesTags: ['Post']
    }),
    getPost: builder.query({
        query: (postid) => `/items/${postid}`,
        providesTags: (res, err, postid) => [{ type: 'Post', id: postid }]
    })
})

export const apiSvc = createApi({
    reducerPath,
    tagTypes: ["Post"],
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_APP_API_ENDPOINT
    }),
    endpoints
});

export const {
    useGetPostsQuery,
    useGetPostQuery
} = apiSvc;