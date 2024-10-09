import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Player } from "./model/player.model";
@Injectable({
    providedIn: 'root'
  })
export default class PlayerObservableService{
    private player$ = new BehaviorSubject<Player>('p1');

    constructor(){
        this.player$.next('p1');
    }

    public setPlayer(newPlayer: Player) {
        this.player$.next(newPlayer);
    }

    public getPlayer(): Observable<Player> {
        return this.player$.pipe();
    }
}