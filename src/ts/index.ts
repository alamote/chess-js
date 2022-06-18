import { Game } from './game/Game/Game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('.board');
  const game = new Game();
  document.addEventListener('click', e => game.onClick(e));
  window.addEventListener('resize', () => game.board.setBoardSize());
  if (canvas) {
    canvas.addEventListener('mousemove', e => {
      if (game.onMouseMove(e as MouseEvent)) {
        canvas.classList.add('pointer');
      } else {
        canvas.classList.remove('pointer');
      }
    });
    canvas.addEventListener('mouseout', () => game.onMouseLeave());
  }
});
