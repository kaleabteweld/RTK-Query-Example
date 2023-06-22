import tempapi from ".";
import { IBank, IBankUpdate } from "../types";

const bankApi = tempapi.injectEndpoints({

    endpoints: (builder) => ({

        getBank: builder.query<IBank, string>({
            query: (id = "") => ({
                url: `/bank/${id}`,
                method: "GET",
            }),
            providesTags: (result) => {
                if (result) {
                    return [{ type: "bank", id: result.id }];
                }
                return [{ type: "bank" }];
            },

        }),
        getBanks: builder.query<IBank[], void>({
            query: () => ({
                url: `/bank/all`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'bank' as const, id })),
                    { type: 'bank', id: 'LIST' },
                ]
                    : [{ type: 'bank', id: 'LIST' }],

        }),
        createBank: builder.mutation({
            query: (bank) => ({
                url: `/bank/new`,
                method: "POST",
                body: bank,
            }),
            invalidatesTags: (result, error, bank) => result ? [{ type: "bank", id: bank.id }] : [],
        }),
        updateBank: builder.mutation<IBank, { bank: IBankUpdate, id: number }>({
            query: ({ bank, id = -1 }: { bank: IBankUpdate, id: number }) => ({
                url: `/bank/${id}`,
                method: "PUT",
                body: bank,
            }),
            invalidatesTags: (result, error, bank) => result && bank ? [{ type: "bank", id: bank.id }] : [],
        }),

        deleteBank: builder.mutation({
            query: (id) => ({
                url: `/bank/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: (result, error, id) => [{ type: "bank", id: id }],
        }),

    }),
})


export const {
    useGetBankQuery,
    useGetBanksQuery,
    useCreateBankMutation,
    useUpdateBankMutation,
    useDeleteBankMutation,
} = bankApi