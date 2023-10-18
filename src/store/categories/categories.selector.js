import {createSelector} from 'reselect';
//create input selectors with parameters
//and output selectors based on pure function flow

//input selector getting the slice of state to memoize
//gets the categories reducer state from the store
const selectCategoryReducer = (state) => state.categories;

//this selector is saying HEY only when the categories state objects changes
//do I wan yoou to pull the actual categoriesArray off the state object
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

//now this create selector is doing the same thing
//HEY only run the reduce function over the categories that have come
//from the state object when the array has changed.
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
    categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);