import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Store } from './Store';

const reducerPath = "api";
const { VITE_API_ENDPOINT } = import.meta.env;

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
        providesTags: ['Documents']
    }),
    getPost: builder.query({
        query: (id) => `/items/${id}`,
        providesTags: (res, err, id) => [{ type: 'Document', id }]
    }),
    getAttachment: builder.query({
        query: (id) => `/images/${id}`,
        providesTags: (res, err, id) => [{ type: 'AQFile', id }]
    }),
    findLegacy: builder.query({
        query: (url) => ({
            url: `/legacy/find`,
            method: 'POST',
            body: { url }
        })
    }),
    savePost: builder.mutation({
        query: (postObject) => ({
            url: `/items`,
            method: 'PUT',
            body: postObject
        }),
        invalidatesTags: (res, err, { id }) => ['Documents', { type: 'Document', id }]
    }),
    indexPosts: builder.query({
        query: () => `/items/index`
    }),
    getPostsByPage: builder.query({
        query: (id) => `/items/page/${id}`,
        serializeQueryArgs: ({ endpointName }) => {
            return endpointName
        },
        merge: (currentCache, newItems) => {
            currentCache.push(...newItems)
        },
        forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
        }
    })
});

export const apiSvc = createApi({
    reducerPath,
    tagTypes: ['Documents', 'Document', 'AQFile'],
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_API_ENDPOINT,
        prepareHeaders: async (headers) => {
            const { token, sessionId } = Store.getState().tokenReducer;
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
    useGetPostsByPageQuery,
    useGetPostQuery,
    useGetAttachmentQuery,
    useFindLegacyQuery,
    useSavePostMutation,
    useLazyIndexPostsQuery
} = apiSvc;