import { baseApi } from "../../api/baseApi";

const rentalBikeApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllRental: builder.query({
      query: () => ({
          url: '/rentals',
          method: 'GET',
        }),
        providesTags: ["rentalBike"]
      }
    ),
    createRental: builder.mutation({
      query: (newRental) => ({
        url: "/rentals",
        method: "POST",
        body: newRental,
      }),
      invalidatesTags: ["rentalBike"],
    }),
    updateRental: builder.mutation({
      query: ({ id, updatedRental }) => ({
          url: `/rentals/${id}`,
          method: "PUT",
          body: updatedRental,
      }),
      invalidatesTags: ["rentalBike"],
    }),
  })
})

export const { 
  useCreateRentalMutation,
  useGetAllRentalQuery
 } = rentalBikeApi; 
