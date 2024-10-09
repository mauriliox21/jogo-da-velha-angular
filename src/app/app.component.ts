import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameCellComponent } from './components/game-cell/game-cell.component';
import { HeaderComponent } from './components/header/header.component';
import { Player } from './model/player.model';
import { Moviment } from './model/moviment.model';
import { Board } from './model/board.model';
import ScoreboardObservableServable from './scoreboardObservableService';
import GameStateObservableServable from './gameStateObservableService';
import { CoordinateType } from './model/coordinate.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameCellComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'jogodavelha';
  public board = signal({} as Board);

  constructor(
    private scoreboardObservableService: ScoreboardObservableServable,
    private gameStateObservableService: GameStateObservableServable
  ){}

  public move({p, c}: Moviment){
    this.board.update(newBoard => {
      newBoard[c] = p;
      return newBoard;
    });

    this.verifyWin(p, c);
  }

  private verifyWin(p: Player, c: CoordinateType){
    const gm = this.board();
    let win = false;
    let winCoordinates: any[] = [];
    if(
      (!!gm.a1 && gm.a1 === gm.a2 && gm.a2 === gm.a3) || 
      (!!gm.b1 && gm.b1 === gm.b2 && gm.b2 === gm.b3) ||
      (!!gm.c1 && gm.c1 === gm.c2 && gm.c2 === gm.c3)
    ){
      win = true;
      if(c.startsWith('a')){
        winCoordinates = ['a1', 'a2', 'a3'];
      } else if(c.startsWith('b')){
        winCoordinates = ['b1', 'b2', 'b3'];
      } else if(c.startsWith('c')){
        winCoordinates = ['c1', 'c2', 'c3'];
      }
    } else if(
      (!!gm.a1 && gm.a1 === gm.b1 && gm.b1 === gm.c1) || 
      (!!gm.a2 && gm.a2 === gm.b2 && gm.b2 === gm.c2) ||
      (!!gm.a3 && gm.a3 === gm.b3 && gm.b3 === gm.c3)
    ){
      win = true;
      if(c.endsWith('1')){
        winCoordinates = ['a1', 'b1', 'c1'];
      } else if(c.endsWith('2')){
        winCoordinates = ['a2', 'b2', 'c2'];
      } else if(c.endsWith('3')){
        winCoordinates = ['a3', 'b3', 'c3'];
      }
    } else if(
      (!!gm.a1 && gm.a1 === gm.b2 && gm.b2 === gm.c3) || 
      (!!gm.a3 && gm.a3 === gm.b2 && gm.b2 === gm.c1) 
    ){
      win = true;
      if(gm.a1 === gm.b2 && gm.b2 === gm.c3){
        winCoordinates = ['a1', 'b2', 'c3'];
      }else{
        winCoordinates = ['a3', 'b2', 'c1'];
      }
    }

    if(win){
      this.scoreboardObservableService.update(p);
      this.gameStateObservableService.setGameState({winner:p, winCoordinates});
      this.board.set({});
    }
  }

  public handleRefresh(){
    this.gameStateObservableService.setGameState({onlyRefresh:true});
    this.board.set({});
  }
}
