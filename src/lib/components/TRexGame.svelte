<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement | undefined;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationId: number | null = null;

	let gameRunning = $state(false);
	let gameOver = $state(false);
	let score = $state(0);
	let highScore = $state(0);

	// Game constants
	const CANVAS_WIDTH = 800;
	const CANVAS_HEIGHT = 300;
	const GRAVITY = 0.8;
	const JUMP_STRENGTH = -15;
	const GROUND_HEIGHT = 30;
	const GAME_SPEED = 7;

	// T-Rex
	let trex = {
		x: 80,
		y: 0,
		width: 44,
		height: 47,
		velocityY: 0,
		jumping: false
	};

	// Obstacles
	let obstacles: Array<{ x: number; width: number; height: number }> = [];
	let obstacleTimer = 0;
	const OBSTACLE_INTERVAL = 90;

	onMount(() => {
		if (!browser) return;

		// Load high score
		try {
			const saved = localStorage.getItem('trex_high_score');
			if (saved) highScore = parseInt(saved);
		} catch (e) {
			console.error('Failed to load high score:', e);
		}

		if (canvas) {
			ctx = canvas.getContext('2d');
			if (!ctx) return;

			canvas.width = CANVAS_WIDTH;
			canvas.height = CANVAS_HEIGHT;
			trex.y = CANVAS_HEIGHT - GROUND_HEIGHT - trex.height;

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

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
			if (animationId) cancelAnimationFrame(animationId);
		};
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
	});

	function startGame() {
		gameRunning = true;
		gameOver = false;
		score = 0;
		obstacles = [];
		obstacleTimer = 0;
		trex.y = CANVAS_HEIGHT - GROUND_HEIGHT - trex.height;
		trex.velocityY = 0;
		trex.jumping = false;
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
		animationId = requestAnimationFrame(gameLoop);
	}

	function update() {
		// Update T-Rex physics
		trex.velocityY += GRAVITY;
		trex.y += trex.velocityY;

		// Ground collision
		const groundY = CANVAS_HEIGHT - GROUND_HEIGHT - trex.height;
		if (trex.y >= groundY) {
			trex.y = groundY;
			trex.velocityY = 0;
			trex.jumping = false;
		}

		// Update obstacles
		obstacleTimer++;
		if (obstacleTimer > OBSTACLE_INTERVAL) {
			const height = 30 + Math.random() * 40;
			obstacles.push({
				x: CANVAS_WIDTH,
				width: 25,
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
				trex.y + trex.height > CANVAS_HEIGHT - GROUND_HEIGHT - obstacles[i].height
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
		if (!ctx || !canvas) return;

		// Get computed colors from CSS variables
		const bgColor = getComputedStyle(canvas).getPropertyValue('--color-bg').trim() || '#ffffff';
		const textColor = getComputedStyle(canvas).getPropertyValue('--color-text').trim() || '#333333';
		const mutedColor = getComputedStyle(canvas).getPropertyValue('--color-text-muted').trim() || '#666666';

		// Clear canvas
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		// Draw ground line
		ctx.strokeStyle = textColor;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, CANVAS_HEIGHT - GROUND_HEIGHT);
		ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT);
		ctx.stroke();

		// Draw ground dots for effect
		ctx.fillStyle = mutedColor;
		for (let i = 0; i < CANVAS_WIDTH; i += 20) {
			ctx.fillRect(i, CANVAS_HEIGHT - GROUND_HEIGHT + 5, 2, 2);
		}

		// Draw T-Rex
		ctx.fillStyle = textColor;
		// Body
		ctx.fillRect(trex.x, trex.y, trex.width, trex.height);
		// Eye
		ctx.fillStyle = bgColor;
		ctx.fillRect(trex.x + 32, trex.y + 8, 6, 6);
		// Arm
		ctx.fillStyle = textColor;
		ctx.fillRect(trex.x + 10, trex.y + 20, 8, 3);
		// Legs (animate based on position)
		const legAnimation = Math.floor(Date.now() / 100) % 2;
		if (!trex.jumping) {
			ctx.fillRect(trex.x + 10, trex.y + trex.height, 6, 8 + legAnimation * 2);
			ctx.fillRect(trex.x + 25, trex.y + trex.height, 6, 8 + (1 - legAnimation) * 2);
		} else {
			ctx.fillRect(trex.x + 15, trex.y + trex.height, 8, 4);
		}

		// Draw obstacles (cacti)
		ctx.fillStyle = textColor;
		for (const obstacle of obstacles) {
			const obstacleY = CANVAS_HEIGHT - GROUND_HEIGHT - obstacle.height;
			// Main cactus body
			ctx.fillRect(obstacle.x, obstacleY, obstacle.width, obstacle.height);
			// Cactus arms
			if (obstacle.height > 35) {
				ctx.fillRect(obstacle.x - 6, obstacleY + 10, 6, 15);
				ctx.fillRect(obstacle.x + obstacle.width, obstacleY + 15, 6, 12);
			}
		}

		// Draw score
		ctx.font = '20px monospace';
		ctx.fillStyle = mutedColor;
		ctx.textAlign = 'right';
		ctx.fillText(`Score: ${score}`, CANVAS_WIDTH - 20, 35);

		// Draw high score
		if (highScore > 0) {
			ctx.fillText(`High: ${highScore}`, CANVAS_WIDTH - 20, 60);
		}

		// Draw start message
		if (!gameRunning && !gameOver) {
			ctx.font = '18px monospace';
			ctx.fillStyle = mutedColor;
			ctx.textAlign = 'center';
			ctx.fillText('Press SPACE or CLICK to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		}

		// Draw game over message
		if (gameOver) {
			ctx.font = '32px monospace';
			ctx.fillStyle = textColor;
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
			ctx.font = '18px monospace';
			ctx.fillStyle = mutedColor;
			ctx.fillText('Press SPACE or CLICK to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
		}
	}

	function endGame() {
		gameRunning = false;
		gameOver = true;

		// Update high score
		if (score > highScore) {
			highScore = score;
			if (browser) {
				try {
					localStorage.setItem('trex_high_score', highScore.toString());
				} catch (e) {
					console.error('Failed to save high score:', e);
				}
			}
		}

		draw();
	}
</script>

<div class="trex-game-wrapper">
	<canvas
		bind:this={canvas}
		onclick={handleClick}
		style="width: 100%; max-width: 800px; height: auto;"
	></canvas>
</div>

<style>
	.trex-game-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0;
		margin: 0;
	}

	canvas {
		cursor: pointer;
		display: block;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}

	@media (max-width: 820px) {
		canvas {
			width: 100%;
		}
	}
</style>
