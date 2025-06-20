const player = document.getElementById('player');
let x = 100;
let y = 100;

// playerの動き
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') x += 20;
  if (e.key === 'ArrowLeft') x -= 20;
  if (e.key === 'ArrowUp') y -= 20;
  if (e.key === 'ArrowDown') y += 20;
  player.style.left = x + 'px';
  player.style.top = y + 'px';
});

// 敵・アイテムを出現させる
function createItem() {
  const item = document.createElement('div');
  item.classList.add('item');
  item.style.left = Math.random() * window.innerWidth + 'px';
  item.style.top = '-40px';
  document.body.appendChild(item);
}
setInterval(createItem, 1000); // 1秒ごとに生成

// アイテムを落下させる
function moveItems() {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    let top = parseInt(item.style.top || 0);
    item.style.top = (top + 5) + 'px';
    if (top > window.innerHeight) item.remove(); // 画面外で削除
  });
}
setInterval(moveItems, 50);

//  衝突判定
function checkCollision(player, item) {
  const p = player.getBoundingClientRect();
  const i = item.getBoundingClientRect();

  return !(
    p.bottom < i.top ||
    p.top > i.bottom ||
    p.right < i.left ||
    p.left > i.right
  );
}

// ライフ管理・ゲームオーバー処理

let life = 3;
const lifeDisplay = document.getElementById('life');
const gameOverDisplay = document.getElementById('gameOver');
let isGameOver = false;

// moveItems 関数に衝突処理を組み込む
function moveItems() {
  if (isGameOver) return; // 終了状態なら何もしない

  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    let top = parseInt(item.style.top || 0);
    item.style.top = (top + 5) + 'px';

    if (checkCollision(player, item)) {
      item.remove();
      life--;
      lifeDisplay.textContent = 'ライフ: ' + life;
      if (life <= 0) {
        gameOver();
      }
    } else if (top > window.innerHeight) {
      item.remove();
    }
  });
}

// ゲームオーバー処理

function gameOver() {
  isGameOver = true;
  gameOverDisplay.style.display = 'block';
}

