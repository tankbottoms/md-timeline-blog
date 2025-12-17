<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let gameRunning = $state(false);
	let gameOver = $state(false);
	let score = $state(0);
	let highScore = $state(0);

	// Game constants
	const GRAVITY = 0.6;
	const JUMP_STRENGTH = -12;
	const GROUND_HEIGHT = 20;
	const GAME_SPEED = 6;

	// T-Rex
	let trex = {
		x: 50,
		y: 0,
		width: 40,
		height: 43,
		velocityY: 0,
		jumping: false
	};

	// Obstacles
	let obstacles: Array<{ x: number; width: number; height: number }> = [];
	let obstacleTimer = 0;
	const OBSTACLE_INTERVAL = 100;

	// Load high score from localStorage
	onMount(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('trex_high_score');
			if (saved) highScore = parseInt(saved);
		}

		if (canvas) {
			ctx = canvas.getContext('2d')!;
			canvas.width = 600;
			canvas.height = 200;
			trex.y = canvas.height - GROUND_HEIGHT - trex.height;

			// Draw initial state
			draw();
		}

		// Keyboard controls
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.code === 'Space' || e.code === 'ArrowUp') {
				e.preventDefault();
				if (!gameRunning && !gameOver) {
					startGame();
				} else if (gameOver) {
					resetGame();
				} else {
					jump();
				}
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	});

	function startGame() {
		gameRunning = true;
		gameOver = false;
		score = 0;
		obstacles = [];
		obstacleTimer = 0;
		trex.y = canvas.height - GROUND_HEIGHT - trex.height;
		trex.velocityY = 0;
		gameLoop();
	}

	function jump() {
		if (!trex.jumping) {
			trex.velocityY = JUMP_STRENGTH;
			trex.jumping = true;
		}
	}

	function resetGame() {
		gameOver = false;
		startGame();
	}

	function handleClick() {
		if (!gameRunning && !gameOver) {
			startGame();
		} else if (gameOver) {
			resetGame();
		} else {
			jump();
		}
	}

	function gameLoop() {
		if (!gameRunning || gameOver) return;

		update();
		draw();
		requestAnimationFrame(gameLoop);
	}

	function update() {
		// Update T-Rex physics
		trex.velocityY += GRAVITY;
		trex.y += trex.velocityY;

		// Ground collision
		const groundY = canvas.height - GROUND_HEIGHT - trex.height;
		if (trex.y >= groundY) {
			trex.y = groundY;
			trex.velocityY = 0;
			trex.jumping = false;
		}

		// Update obstacles
		obstacleTimer++;
		if (obstacleTimer > OBSTACLE_INTERVAL) {
			const height = 20 + Math.random() * 30;
			obstacles.push({
				x: canvas.width,
				width: 20,
				height: height
			});
			obstacleTimer = 0;
		}

		// Move obstacles
		for (let i = obstacles.length - 1; i >= 0; i--) {
			obstacles[i].x -= GAME_SPEED;

			// Check collision
			if (
				trex.x < obstacles[i].x + obstacles[i].width &&
				trex.x + trex.width > obstacles[i].x &&
				trex.y + trex.height > canvas.height - GROUND_HEIGHT - obstacles[i].height
			) {
				endGame();
				return;
			}

			// Remove off-screen obstacles and increment score
			if (obstacles[i].x + obstacles[i].width < 0) {
				obstacles.splice(i, 1);
				score++;
			}
		}
	}

	function draw() {
		if (!ctx) return;

		// Clear canvas
		ctx.fillStyle = 'var(--color-bg, #ffffff)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw ground
		ctx.strokeStyle = 'var(--color-text, #333333)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, canvas.height - GROUND_HEIGHT);
		ctx.lineTo(canvas.width, canvas.height - GROUND_HEIGHT);
		ctx.stroke();

		// Draw T-Rex (simple rectangle for now, you can enhance this)
		ctx.fillStyle = 'var(--color-text, #333333)';
		ctx.fillRect(trex.x, trex.y, trex.width, trex.height);

		// Draw T-Rex eye
		ctx.fillStyle = 'var(--color-bg, #ffffff)';
		ctx.fillRect(trex.x + 30, trex.y + 5, 5, 5);

		// Draw obstacles (cacti)
		ctx.fillStyle = 'var(--color-text, #333333)';
		for (const obstacle of obstacles) {
			ctx.fillRect(
				obstacle.x,
				canvas.height - GROUND_HEIGHT - obstacle.height,
				obstacle.width,
				obstacle.height
			);
		}

		// Draw score
		ctx.font = '16px monospace';
		ctx.fillStyle = 'var(--color-text-muted, #666666)';
		ctx.textAlign = 'right';
		ctx.fillText(`Score: ${score}`, canvas.width - 10, 25);

		// Draw high score
		if (highScore > 0) {
			ctx.fillText(`High: ${highScore}`, canvas.width - 10, 45);
		}

		// Draw start message
		if (!gameRunning && !gameOver) {
			ctx.font = '14px monospace';
			ctx.fillStyle = 'var(--color-text-muted, #666666)';
			ctx.textAlign = 'center';
			ctx.fillText('Press SPACE or CLICK to start', canvas.width / 2, canvas.height / 2);
		}

		// Draw game over message
		if (gameOver) {
			ctx.font = '20px monospace';
			ctx.fillStyle = 'var(--color-text, #333333)';
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
			ctx.font = '14px monospace';
			ctx.fillStyle = 'var(--color-text-muted, #666666)';
			ctx.fillText('Press SPACE or CLICK to restart', canvas.width / 2, canvas.height / 2 + 10);
		}
	}

	function endGame() {
		gameRunning = false;
		gameOver = true;

		// Update high score
		if (score > highScore) {
			highScore = score;
			if (typeof window !== 'undefined') {
				localStorage.setItem('trex_high_score', highScore.toString());
			}
		}

		draw();
	}
</script>

<div class="trex-game">
	<canvas bind:this={canvas} onclick={handleClick}></canvas>
</div>

<style>
	.trex-game {
		display: flex;
		justify-content: center;
		margin: 2rem 0;
	}

	canvas {
		border: 2px solid var(--color-border);
		border-radius: 8px;
		cursor: pointer;
		max-width: 100%;
		height: auto;
		background: var(--color-bg);
	}

	canvas:hover {
		border-color: var(--color-text);
	}

	@media (max-width: 640px) {
		canvas {
			width: 100%;
		}
	}
</style>
