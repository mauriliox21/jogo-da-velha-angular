import { CoordinateType } from "./coordinate.model";
import { Player } from "./player.model";

export type Moviment = {
    p: Player;
    c: CoordinateType;
}