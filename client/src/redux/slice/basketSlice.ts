import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
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
function getCookie(name: string) {
    return (
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
      ''
    );
  }

export const fetchBasketAsync = createAsyncThunk<Basket>(
    "basket/fetchBasketAsync",
    async (_, trunkAPI) => {
        try {
            return await agent.Baskets.get();
        } catch (error) {
            return trunkAPI.rejectWithValue({error:error})
        }
    },
    {
        condition: () => {
            if(!getCookie("clientId")) return false;
        }
    }
)
export const addBasketItemAsync = createAsyncThunk<Basket | undefined, {courseId : string}>(
    "baket/addBasketItemAsync",
   async ({courseId}, trunkAPI) => {
    try {
        return await agent.Baskets.addItem(courseId);
    } catch (error) {
        return trunkAPI.rejectWithValue({error:error})
    }
   }
);
export const removeBasketItemAsync = createAsyncThunk<void, {courseId : string}>(
    "baket/removeBasketItemAsync",
   async ({courseId}, trunkAPI) => {
        try {
            await agent.Baskets.removeItem(courseId);
        } catch (error) {
            return trunkAPI.rejectWithValue({error:error})
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
        removeBasket: (state) => {
            state.basket = null; 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state) => {
            state.status = "pending"
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
        builder.addMatcher(isAnyOf( addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = "idle";
        });
        builder.addMatcher(isAnyOf( addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state) => {
            state.status = "idle";
        });
    },
});

export const {setBasket, removeBasket} = basketSlice.actions;