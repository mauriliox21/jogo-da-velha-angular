import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import Scoreboard from "./model/scoreboard.model";
import { Player } from "./model/player.model";
@Injectable({
    providedIn: 'root'
  })
export default class ScoreboardObservableServable{
    private player$ = new BehaviorSubject<Scoreboard>(new Scoreboard());

    constructor(){
        this.player$.next(new Scoreboard());
    }

    public setScoreboard(newScoreboar: Scoreboard) {
        this.player$.next(newScoreboar);
    }

    public getScoreboard(): Observable<Scoreboard> {
        return this.player$.pipe();
    }

    public update(p: Player){
        const current = this.player$.value;
        if(p === 'p1'){
            this.player$.next({...current, p1: current.p1 + 1});
        } else if(p === 'p2') {
            this.player$.next({...current, p2: current.p2 + 1});
        }
    }
}