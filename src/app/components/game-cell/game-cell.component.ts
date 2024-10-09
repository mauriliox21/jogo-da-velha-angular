import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import PlayerObservableService from '../../playerObservableService';
import { Player } from '../../model/player.model';
import { CoordinateType } from '../../model/coordinate.model';
import GameStateObservableService from '../../gameStateObservableService';

@Component({
  selector: 'app-game-cell',
  standalone: true,
  imports: [],
  templateUrl: './game-cell.component.html',
  styleUrl: './game-cell.component.scss'
})
export class GameCellComponent implements OnInit{
  public source = signal('');
  public actualPlayer = signal<'p1'|'p2'>('p1');
  public disabled = signal(false);
  public winCoordinate = signal(false);

  @Input()
  public coordinate:CoordinateType = 'a1';

  @Output()
  public onclick = new EventEmitter<{p:Player, c:CoordinateType}>();
  
  constructor(
    private playerObservableService: PlayerObservableService,
    private gameStateObservableService: GameStateObservableService  
  ){
  }

  ngOnInit(): void {
    this.playerObservableService.getPlayer().subscribe({
      next: (next) => {
        this.actualPlayer.set(next)
      }
    });
    this.gameStateObservableService.getGameState().subscribe({
      next: (next) => {
        if(next.onlyRefresh){
          this.source.set('');
          this.disabled.set(false);
        }
        if(!!next.winner){
          this.disabled.set(true);
        }
        if(next.winCoordinates && next.winCoordinates.includes(this.coordinate)){
          this.winCoordinate.set(true);
        } else {
          this.winCoordinate.set(false);
        }
      }
    });
  }

  handleClick(){
    if(this.source() === '' && !this.disabled()){
      const current = this.actualPlayer();
      if(this.actualPlayer() === 'p1'){
        this.source.set('/icons/x_icon.png')
        this.playerObservableService.setPlayer('p2')
      } else if(this.actualPlayer() === 'p2'){
        this.source.set('/icons/circle_icon.png')
        this.playerObservableService.setPlayer('p1')
      }
      this.onclick.emit({p:current, c:this.coordinate});
    }
  }
}
