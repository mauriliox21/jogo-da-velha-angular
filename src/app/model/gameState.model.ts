import { Player } from "./player.model"

export type GameState = {
    winner?: Player,
    onlyRefresh?: Boolean,
    winCoordinates?: any[]
}