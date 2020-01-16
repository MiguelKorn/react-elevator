export enum ElevatorTypes {
    MOVE = '@Elevator/MOVE',
    TOGGLE_CONTROL = '@Elevator/TOGGLE_CONTROL',
    TOGGLE_ACTIVE_FLOOR = '@Elevator/TOGGLE_ACTIVE_FLOOR'
}

export interface MoveElevatorAction {
    type: ElevatorTypes.MOVE
}

export interface ToggleControlElevatorAction {
    type: ElevatorTypes.TOGGLE_CONTROL,
    payload: { level: number }
}

export interface ToggleActiveFloorElevatorAction {
    type: ElevatorTypes.TOGGLE_ACTIVE_FLOOR,
    payload: { level: number, isUpButton: boolean }
}

export function moveElevator(): MoveElevatorAction {
    return {
        type: ElevatorTypes.MOVE
    }
}

export function toggleControlElevator(level: number): ToggleControlElevatorAction {
    return {
        type: ElevatorTypes.TOGGLE_CONTROL,
        payload: {level}
    }
}

export function toggleActiveFloor(level: number, isUpButton: boolean): ToggleActiveFloorElevatorAction {
    return {
        type: ElevatorTypes.TOGGLE_ACTIVE_FLOOR,
        payload: {level, isUpButton}
    }
}

export type Action = MoveElevatorAction | ToggleControlElevatorAction | ToggleActiveFloorElevatorAction;
