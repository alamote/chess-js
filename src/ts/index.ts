import { Game } from './game/Game/Game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('.board');
  const game = new Game()
  let resizeTimer: any = null;
  document.addEventListener('click', e => game.onClick(e));
  window.addEventListener('resize', () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      if (game?.board) {
        game.board.setBoardSize();
        game.board.render(true);
      }
    }, 100);
  }, true);
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
