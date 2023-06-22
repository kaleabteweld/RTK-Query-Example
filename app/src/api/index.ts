import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const tempapi = createApi({
    reducerPath: 'tempapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5000'
    }),
    tagTypes: ["bank"],
    endpoints: () => ({
    }),
})

export default tempapi