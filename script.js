const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const invadersContainer = document.getElementById("invaders");
const gameWidth = gameContainer.offsetWidth;

// Player properties
let playerSpeed = 10;
let playerPosition = gameWidth / 2 - 20;

// Invader properties
let invaders = [];
let invaderSpeed = 2;

// Projectile properties
let projectiles = [];

// Spawn invaders
function createInvaders() {
  for (let i = 0; i < 10; i++) {
    const invader = document.createElement("div");
    invader.classList.add("invader");
    invader.style.left = `${i * 50}px`;
    invader.style.top = "20px";
    invadersContainer.appendChild(invader);
    invaders.push(invader);
  }
}

// Move player
function movePlayer(direction) {
  if (direction === "left" && playerPosition > 0) {
    playerPosition -= playerSpeed;
  }
  if (direction === "right" && playerPosition < gameWidth - 40) {
    playerPosition += playerSpeed;
  }
  player.style.left = `${playerPosition}px`;
}

// Shoot projectile
function shootProjectile() {
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");
  projectile.style.left = `${playerPosition + 17}px`;
  projectile.style.bottom = "30px";
  gameContainer.appendChild(projectile);
  projectiles.push(projectile);
}

// Move projectiles
function updateProjectiles() {
  projectiles.forEach((projectile, index) => {
    let bottom = parseInt(projectile.style.bottom);
    projectile.style.bottom = `${bottom + 5}px`;

    // Check for collisions
    invaders.forEach((invader, i) => {
      const projectileRect = projectile.getBoundingClientRect();
      const invaderRect = invader.getBoundingClientRect();

      if (
        projectileRect.right > invaderRect.left &&
        projectileRect.left < invaderRect.right &&
        projectileRect.bottom > invaderRect.top &&
        projectileRect.top < invaderRect.bottom
      ) {
        invader.remove();
        projectile.remove();
        invaders.splice(i, 1);
        projectiles.splice(index, 1);
      }
    });

    // Remove if out of bounds
    if (bottom > gameContainer.offsetHeight) {
      projectile.remove();
      projectiles.splice(index, 1);
    }
  });
}

// Move invaders
function updateInvaders() {
  invaders.forEach((invader) => {
    let left = parseInt(invader.style.left);
    invader.style.left = `${left + invaderSpeed}px`;

    // Reverse direction at edges
    if (left + 40 >= gameWidth || left <= 0) {
      invaderSpeed = -invaderSpeed;
      invader.style.top = `${parseInt(invader.style.top) + 20}px`;
    }
  });
}

// Game loop
function gameLoop() {
  updateProjectiles();
  updateInvaders();
  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") movePlayer("left");
  if (event.key === "ArrowRight") movePlayer("right");
  if (event.key === " ") shootProjectile();
});

// Start the game
createInvaders();
gameLoop();
