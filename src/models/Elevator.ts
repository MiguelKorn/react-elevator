export enum Direction {
    UP,
    DOWN,
    IDLE
}

export interface ElevatorPostion {
    current: number,
    to: number,
    percentage: number
}

export default interface Elevator {
    floors: Floor[],
    isMoving: boolean,
    direction: Direction,
    position: ElevatorPostion,
    controls: boolean[]
    doorsOpen: boolean
}

export interface CallButtons {
    upIsActive: boolean,
    downIsActive: boolean
}

export interface Floor {
    id: number,
    level: number,
    callButtons: CallButtons
}
