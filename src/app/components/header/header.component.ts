import { Component, OnInit, signal } from '@angular/core';
import PlayerObservableService from '../../playerObservableService';
import ScoreboardObservableServable from '../../scoreboardObservableService';
import GameStateObservableService from '../../gameStateObservableService';
import { Player } from '../../model/player.model';
import Scoreboard from '../../model/scoreboard.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public actualPlayer = signal<Player|null>(null);
  public scoreboard = signal<Scoreboard>(new Scoreboard());
  public winner = signal<Player|undefined>(undefined);

  constructor(
    private playerObservableService: PlayerObservableService,
    private scoreboardObservableService: ScoreboardObservableServable,
    private gameStateObservableService: GameStateObservableService
  ){}

  ngOnInit(): void {
    this.playerObservableService.getPlayer().subscribe({
      next: (next) => {
        this.actualPlayer.set(next)
      }
    });
    this.scoreboardObservableService.getScoreboard().subscribe({
      next: (next) => {
        this.scoreboard.set(next)
      }
    })
    this.gameStateObservableService.getGameState().subscribe({
      next: (next) => {
        this.winner.set(next.winner)
      }
    })
  }
}
