import type { RootState } from '@/model/redux';
import type { Aroundme } from '@/hooks/useAroundMe';
import { createSlice } from '@reduxjs/toolkit';

type areaState = {
  areas: Aroundme[];
};

const initialState: areaState = {
  areas: [],
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    SET_REGISTER_AREA: (state, action) => {
      state.areas = action.payload.areas;
    },
  },
});

export const { SET_REGISTER_AREA } = areaSlice.actions;
export const selectArea = (state: RootState) => state.area.areas;

export default areaSlice.reducer;
