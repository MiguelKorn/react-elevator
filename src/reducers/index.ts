import {combineReducers} from 'redux';
import * as elevator from './elevator';
import Elevator from '../models/Elevator';

export interface State {
    elevator: Elevator,
}

export const rootReducer = combineReducers({
    elevator: elevator.reducer
});
