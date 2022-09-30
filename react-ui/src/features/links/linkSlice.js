import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  links: JSON.parse(localStorage.getItem("myLinks")) || [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const linksSlice = createSlice({
  name: "links",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addFolder: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.links.push(action.payload);
    },
    removeFolder: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const newState = {
      //   links: [],
      // };

      // state.links.forEach((link) => {
      //   if (link.id !== action.payload) {
      //     newState.links.push(link);
      //   }
      // });
      // state = newState;

      state.links = state.links.filter((link) => link.id !== action.payload);
    },
    addItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.links[action.payload.index].items.push(action.payload.item);
    },
    removeItem: (state, action) => {
      state.links[action.payload.folderIndex].items = state.links[
        action.payload.folderIndex
      ].items.filter((item, i) => i !== action.payload.itemIndex);
    },

    editItem: (state, action) => {
      state.links[action.payload.folderIndex].items[
        action.payload.itemIndex
      ].title = action.payload.title;
    },
    openFolder: (state, action) => {
      state.links[action.payload.index].isOpen =
        !state.links[action.payload.index].isOpen;
    },
    reArrangeFolders: (state, action) => {
      const [reorderedFolder] = state.links.splice(action.payload.index, 1);
      state.links.splice(action.payload.destination, 0, reorderedFolder);

      // const items = Array.from(characters);
      // const [reorderedItem] = items.splice(result.source.index, 1);
      // items.splice(result.destination.index, 0, reorderedItem);

      // updateCharacters(items);
    },
    editFolderName: (state, action) => {
      state.links[action.payload.index].name = action.payload.name;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});

export const {
  addFolder,
  removeFolder,
  incrementByAmount,
  addItem,
  removeItem,
  openFolder,
  reArrangeFolders,
  editItem,
  editFolderName,
} = linksSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLinks = (state) => state.links;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default linksSlice.reducer;
