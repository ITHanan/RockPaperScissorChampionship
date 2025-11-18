# Quick Start Guide

Get up and running with the RPS Tournament in 5 minutes!

## Installation

```bash
npm install
```

## Run the Tournament

```bash
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`)

## Run Tests

```bash
npm test
```

## Create Your Player

### 1. Copy the template

```bash
cp src/players/PlayerTemplate.ts.example src/players/MyPlayer.ts
```

### 2. Edit your player

Open `src/players/MyPlayer.ts` and implement your strategy:

```typescript
export class MyPlayer implements Player {
  readonly name = 'My Awesome Player';

  makeMove(opponentName: string, history: MatchHistory[]): Move {
    // Your strategy here!
    return 'rock';
  }
}
```

### 3. Export your player

In `src/players/index.ts`, add:

```typescript
export { MyPlayer } from './MyPlayer';
```

### 4. Add to tournament

In `src/App.tsx`, import and add:

```typescript
import { MyPlayer } from './players';

const [players] = useState<Player[]>([
  // ... existing players
  new MyPlayer(),
]);
```

### 5. Test it!

```bash
npm test
npm run dev
```

## What Next?

- Read [STUDENT_GUIDE.md](./STUDENT_GUIDE.md) for detailed instructions
- Study example players in `src/players/`
- Check out the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
- Submit your player via Pull Request!

## Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests once |
| `npm test -- --watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── players/          ← Your player goes here!
├── types/           ← Player interface
├── game/            ← Game logic
├── tournament/      ← Tournament system
├── components/      ← UI components
└── tests/           ← Test files
```

## Need Help?

- Check the [README.md](./README.md)
- Read the [STUDENT_GUIDE.md](./STUDENT_GUIDE.md)
- Look at example players
- Ask your instructor!

---

**Ready? Let's build some awesome players!** 🎮
