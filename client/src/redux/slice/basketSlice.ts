import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../actions/agent";
import { Basket } from "../../models/basket";

interface BasketState{
    basket: Basket | null | undefined;
    status: string;
}

const initialState: BasketState = {
    basket : null,
    status: "idle",
}
export const addBasketItemAsync = createAsyncThunk<Basket | undefined, {courseId : string}>(
    "baket/addBasketItemAsync",
   async ({courseId}) => {
    try {
        return await agent.Baskets.addItem(courseId);
    } catch (error) {
        console.log(error);
    }
   }
);
export const removeBasketItemAsync = createAsyncThunk<void, {courseId : string}>(
    "baket/removeBasketItemAsync",
   async ({courseId}) => {
        try {
            await agent.Baskets.removeItem(courseId);
        } catch (error) {
            console.log(error);
        }
    
   }
);
export const basketSlice = createSlice({
    name : "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state) => {
            state.status = "pending"
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = "idle";
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(removeBasketItemAsync.pending, (state) => {
            state.status = "pending"
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {courseId} = action.meta.arg;
            const ItemIndex = state?.basket?.items.findIndex(
                (i) => i.courseId === courseId
            );
            if (ItemIndex === undefined || ItemIndex === -1) return;
            state.basket?.items.splice(ItemIndex, 1); 

            state.status = "idle";
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = "idle";
        });
    },
});

export const {setBasket} = basketSlice.actions;