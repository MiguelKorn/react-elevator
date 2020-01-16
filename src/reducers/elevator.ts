import Elevator, {Direction, Floor} from '../models/Elevator';
import {Action, ElevatorTypes} from '../actions/elevator';
import {defaultCallButtons, defaultPosition, numFloors} from '../data';
import {isEmpty} from 'lodash';

export const initialState: Elevator = {
    floors: Array(numFloors).fill({}).map((f: Floor, index) => ({
        id: index + 1,
        level: index,
        callButtons: {...defaultCallButtons}
    })),
    isMoving: false,
    direction: Direction.IDLE,
    position: defaultPosition,
    controls: Array(numFloors).fill(false),
    doorsOpen: true
};

const callButtonIsActive = (floor: Floor) => (floor.callButtons.upIsActive || floor.callButtons.downIsActive);

export function reducer(state: Elevator = initialState, action: Action) {
    switch (action.type) {
        case ElevatorTypes.MOVE: {
            const prevState = {...state};
            const level = prevState.position.current;
            const setDoneMoving = () => {
                prevState.isMoving = false;
                prevState.doorsOpen = true;
                prevState.direction = Direction.IDLE;
                floorIsVisited();
            };
            const floorIsVisited = () => {
                prevState.controls[level] = false;
                prevState.floors = prevState.floors.map(floor => {
                    if (floor.level === level) floor.callButtons = {...defaultCallButtons};
                    return floor;
                });
            };
            const closestFloorReducer = (prev: Floor, curr: Floor) => (Math.abs(curr.level - level) < Math.abs(prev.level - level) ? curr : prev);
            const findClosestFloor = () => {
                if (prevState.direction === Direction.IDLE) {
                    const filtered = prevState.floors.filter(callButtonIsActive);
                    if (isEmpty(filtered)) return null;
                    return filtered.reduce(closestFloorReducer)
                } else {
                    const goingUp = prevState.direction === Direction.UP;
                    return prevState.floors
                        .filter(floor => goingUp ? floor.level > level : floor.level > level)
                        .find((floor: Floor) => {
                            return goingUp ? floor.callButtons.upIsActive : floor.callButtons.downIsActive;
                        });
                }
            };

            if (prevState.doorsOpen) {
                prevState.isMoving = true;
                prevState.doorsOpen = false;

                if (prevState.controls.includes(true)) {
                    prevState.position.to = prevState.controls.indexOf(true);
                } else {
                    // Find closest level if Direction is IDLE
                    // Else Find closest in the same direction
                    const next = findClosestFloor();

                    if (next) {
                        prevState.position.to = next.level;
                        prevState.position.percentage = 0;
                        prevState.direction = (next.level > level) ? Direction.UP : Direction.DOWN;
                    } else {
                        setDoneMoving();
                    }
                }
            } else {
                const {current, to} = prevState.position;
                if (prevState.position.percentage !== 100) {
                    prevState.position.percentage += 50;
                    // check if there is an closer floor on the route
                    // by comparing closest with currentClosest
                    const closest = findClosestFloor();
                    if (closest && closest.level !== to && Math.abs(to - current) > Math.abs(closest.level - current)) {
                        prevState.position.to = closest.level;
                    }
                } else {
                    if (current !== to) {
                        prevState.position.current += (current > to) ? -1 : 1;
                        prevState.position.percentage = 0;
                    } else {
                        setDoneMoving();
                    }
                }
            }
            return {...prevState};
        }
        case ElevatorTypes.TOGGLE_CONTROL: {
            const {controls} = {...state};
            const {level} = action.payload;
            controls[level] = !controls[level];
            return {...state, controls}
        }
        case ElevatorTypes.TOGGLE_ACTIVE_FLOOR: {
            const floors = [...state.floors];
            const floor = floors.find((floor: Floor) => floor.level === action.payload.level);
            if (floor != null) {
                const btnType = action.payload.isUpButton ? 'upIsActive' : 'downIsActive';
                floor.callButtons[btnType] = !floor.callButtons[btnType];
                return {...state, floors};
            }
            break;
        }
        default:
            return state;
    }
}
