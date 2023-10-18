import { takeLatest, call, all, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';
import CATEGORIES_ACTION_TYPES from './categories.types';

const { FETCH_CATEGORIES_START } = CATEGORIES_ACTION_TYPES;


//generator functions are the basis for await so use yield instead
export function* fetchCategoriesAsync() {
    try {
        //now pass call a callable method with args as params
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        //now instead of dispatch, use put
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
       yield put(fetchCategoriesFailed(error));
    }
}

//generators respond to actions
export function* onFetchCategories() {
    //receive the latest action
    //two args, action type and what should happen
    yield takeLatest(FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    //all is a function that says run everything inside
    //and only complete when everything is done
    //all is essentially a listener for any events within the array
    yield all([call(onFetchCategories)]);
}

