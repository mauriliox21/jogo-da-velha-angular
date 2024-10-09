import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { GameState } from "./model/gameState.model";
@Injectable({
    providedIn: 'root'
  })
export default class GameStateObservableServable{
    private player$ = new BehaviorSubject<GameState>({});

    constructor(){
        this.player$.next({});
    }

    public setGameState(newState: GameState) {
        this.player$.next(newState);
    }

    public getGameState(): Observable<GameState> {
        return this.player$.pipe();
    }
}