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
      query: (payload) => {
        console.log("Payload", payload.id);
        
        return {
          url: `/rentals/${payload.id}`,
          method: "PUT",
          body: payload,
      }},
      invalidatesTags: ["rentalBike"],
    }),
  })
})

export const { 
  useCreateRentalMutation,
  useGetAllRentalQuery,
  useUpdateRentalMutation
 } = rentalBikeApi; 
