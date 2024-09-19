import {configureStore} from '@reduxjs/toolkit'
import todReducer from '../Features/Todo/todoslice'

export const store = configureStore({
    reducer : todReducer
})
 