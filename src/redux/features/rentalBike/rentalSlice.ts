import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  bookingId: '', 
  selectedTime: '',
}

export const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    addBookingDetail: (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.selectedTime = action.payload.selectedTime;
    },
    clearBookingDetail:( state) =>{
      state.bookingId = '',
      state.selectedTime = ''
    }
  },
})

export const { addBookingDetail, clearBookingDetail } = rentalSlice.actions

export default rentalSlice.reducer