import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { redux } from './Store';

const reducerPath = "api";
const { REACT_APP_API_ENDPOINT } = process.env;

const endpoints = (builder) => ({
    getToken: builder.query({
        query: ({ email, code }) => ({
            url: `/auth`,
            method: 'POST',
            body: { email, code }
        })
    }),
    getPosts: builder.query({
        query: () => `/items`,
        providesTags: ['Post']
    }),
    getPost: builder.query({
        query: (id) => `/items/${id}`,
        providesTags: (res, err, id) => [{ type: 'Post', id }]
    }),
    savePost: builder.mutation({
        query: (postObject) => ({
            url: `/items`,
            method: 'PUT',
            body: postObject
        }),
        invalidatesTags: (res, err, { id }) => [{ type: 'Post', id }]
    })
});

export const apiSvc = createApi({
    reducerPath,
    tagTypes: ["Post"],
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_APP_API_ENDPOINT,
        prepareHeaders: async (headers) => {
            const { token, sessionId } = redux.getState().tokenReducer;
            headers.set('Authorization', token);
            headers.set('SessionId', sessionId);
            return headers;
        }
    }),
    endpoints
});

export const {
    useLazyGetTokenQuery,
    useGetPostsQuery,
    useGetPostQuery,
    useSavePostMutation
} = apiSvc;