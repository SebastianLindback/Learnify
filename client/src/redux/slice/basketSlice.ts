import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";

interface BasketState{
    basket: Basket | null;
}

const initialState: BasketState = {
    basket : null,
}

export const basketSlice = createSlice({
    name : "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        removeItem: (state, action) => {
            const {courseId} = action.payload;
            const ItemIndex = state?.basket?.items.findIndex(
                (i) => i.courseId === courseId
            );
            if (ItemIndex === undefined || ItemIndex === -1) return;
            state.basket?.items.splice(ItemIndex, 1); 

        },
    },
});

export const {setBasket, removeItem} = basketSlice.actions;