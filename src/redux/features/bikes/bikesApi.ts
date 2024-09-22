import { baseApi } from "../../api/baseApi";

const bikesApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllBikes: builder.query({
      query: () => ({
          url: '/bikes',
          method: 'GET',
        }),
        providesTags: ["data"]
      }
    ),
    getSingleBikes: builder.query({
      query: (id) => {
        return {
          url: `/bikes/${id}`,
          method: "GET",
        };
      },
      providesTags: ["data"],
    }),
    deleteBikes: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),
    addBikes: builder.mutation({
      query: (newBike) => ({
        url: "/bikes",
        method: "POST",
        body: newBike,
      }),
      invalidatesTags: ["data"],
    }),
    updateBike: builder.mutation({
      query: ({ id, updatedBike }) => ({
          url: `/bikes/${id}`,
          method: "PUT",
          body: updatedBike,
      }),
      invalidatesTags: ["data"],
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
