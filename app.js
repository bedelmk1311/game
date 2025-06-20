const player = document.getElementById('player');
let x = 100;
let y = 100;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') x += 10;
  if (e.key === 'ArrowLeft') x -= 10;
  if (e.key === 'ArrowUp') y -= 10;
  if (e.key === 'ArrowDown') y += 10;
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