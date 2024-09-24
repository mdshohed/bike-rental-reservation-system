import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getProfile: builder.query({
      query: () => {
        return{
          url: '/users/me',
          method: 'GET',
        }},
        providesTags: ["user"]
      }
    ),
    updateProfile: builder.mutation({
      query: ( data ) => {        
        return {
          url: '/users/me',
          method: 'PUT',
          body: data, 
        }
      },
      invalidatesTags: ["user"],
    })
  })
})

export const { useGetProfileQuery, useUpdateProfileMutation } = authApi; 