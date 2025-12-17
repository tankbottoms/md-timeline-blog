# Dockerfile for SvelteKit Blog - Size Optimized Multi-Stage Build

# Stage 1: Install dependencies
FROM oven/bun:1-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies (including devDependencies for build)
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Build the application
RUN bun run build

# Stage 3: Production runner
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4173
ENV HOST=0.0.0.0

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S sveltekit -u 1001

# Copy built application and necessary files
COPY --from=builder --chown=sveltekit:nodejs /app/build ./build
COPY --from=builder --chown=sveltekit:nodejs /app/.svelte-kit ./.svelte-kit
COPY --from=builder --chown=sveltekit:nodejs /app/package.json ./
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=sveltekit:nodejs /app/static ./static
COPY --from=builder --chown=sveltekit:nodejs /app/svelte.config.js ./svelte.config.js
COPY --from=builder --chown=sveltekit:nodejs /app/remark.config.js ./remark.config.js
COPY --from=builder --chown=sveltekit:nodejs /app/src ./src
COPY --from=builder --chown=sveltekit:nodejs /app/vite.config.ts ./vite.config.ts

# Switch to non-root user
USER sveltekit

# Expose the port
EXPOSE 4173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD bun --eval "fetch('http://localhost:4173').then(() => process.exit(0)).catch(() => process.exit(1))"

# Start the preview server with --host flag for external access
CMD ["bun", "run", "preview", "--host"]
