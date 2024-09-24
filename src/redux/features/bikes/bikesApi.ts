import { baseApi } from "../../api/baseApi";

const bikesApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllBikes: builder.query({
      query: () => ({
          url: '/bikes',
          method: 'GET',
        }),
        providesTags: ["bikes"]
      }
    ),
    getSingleBikes: builder.query({
      query: (id) => {
        return {
          url: `/bikes/${id}`,
          method: "GET",
        };
      },
      providesTags: ["bikes"],
    }),
    deleteBikes: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bikes"],
    }),
    addBikes: builder.mutation({
      query: (newBike) => ({
        url: "/bikes",
        method: "POST",
        body: newBike,
      }),
      invalidatesTags: ["bikes"],
    }),
    updateBike: builder.mutation({
      query: ({ id, updatedBike }) => ({
          url: `/bikes/${id}`,
          method: "PUT",
          body: updatedBike,
      }),
      invalidatesTags: ["bikes"],
    }),
  })
})

export const { 
  useGetAllBikesQuery,
  useGetSingleBikesQuery,
  useAddBikesMutation,
  useUpdateBikeMutation,
  useDeleteBikesMutation
 } = bikesApi; 
