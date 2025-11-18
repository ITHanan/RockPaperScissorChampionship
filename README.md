# Rock Paper Scissors Tournament

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A complete, production-ready Rock Paper Scissors tournament system built for educational purposes. Students create AI players that compete against each other in a round-robin tournament with beautiful live visualization.

## Features

- **Round-Robin Tournament** - Everyone plays everyone
- **Real-Time Visualization** - Watch matches unfold live
- **Beautiful UI** - Glass morphism 3D design with animations
- **Comprehensive Testing** - 54 automated tests ensure quality
- **Type-Safe** - Full TypeScript coverage
- **Educational** - Learn strategy patterns, TypeScript, React, and testing
- **5 Example Players** - From simple to advanced strategies
- **Easy to Extend** - Clear interfaces and documentation

## Quick Start

Get up and running in 5 minutes!

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tournamentRPS

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173` and watch the tournament!

**New to the project?** Check out the [Quick Start Guide](./QUICK_START.md) for detailed setup instructions.

## Documentation

### For Students

- **[Quick Start Guide](./QUICK_START.md)** - Get running in 5 minutes
- **[Student Guide](./STUDENT_GUIDE.md)** - Detailed guide to creating your player
- **[Contributing Guide](./CONTRIBUTING.md)** - How to submit your player

### For Instructors

- **[Project Summary](./PROJECT_SUMMARY.md)** - Complete overview of the system
- **[Architecture](./ARCHITECTURE.md)** - Technical architecture and design patterns
- **[Contributing Guide](./CONTRIBUTING.md)** - Student submission workflow

## Creating Your First Player

### 1. Copy the Template

```bash
cp src/players/PlayerTemplate.ts.example src/players/MyPlayer.ts
```

### 2. Implement Your Strategy

```typescript
import { Player, Move, MatchHistory } from '../types/player';

export class MyPlayer implements Player {
  readonly name = 'My Awesome Player';
  readonly description = 'Describe your strategy here';

  makeMove(opponentName: string, history: MatchHistory[]): Move {
    // Your brilliant strategy here!
    return 'rock';
  }

  // Optional: Track results to improve your strategy
  onMatchResult(opponentName: string, myMove: Move, opponentMove: Move, result: MatchResult): void {
    // Learn from each match
  }
}
```

### 3. Register Your Player

**Export in `src/players/index.ts`:**
```typescript
export { MyPlayer } from './MyPlayer';
```

**Add to tournament in `src/App.tsx`:**
```typescript
import { MyPlayer } from './players';

const [players] = useState<Player[]>([
  // ... existing players
  new MyPlayer(),
]);
```

### 4. Test and Run

```bash
# Run tests
npm test

# Watch your player compete
npm run dev
```

**Need more help?** See the [Student Guide](./STUDENT_GUIDE.md) for detailed instructions and strategy ideas.

## Example Players

The project includes 5 example players demonstrating different strategies:

| Player | Strategy | Complexity |
|--------|----------|------------|
| **RandomPlayer** | Chooses random moves | Simple |
| **RockPlayer** | Always plays rock | Simple |
| **CyclePlayer** | Cycles through moves | Simple |
| **CounterPlayer** | Counters opponent's most common move | Medium |
| **AdaptivePlayer** | Adapts strategy based on performance | Advanced |

Study these examples to learn different approaches!

## Tournament Scoring

- **Win**: 3 points
- **Draw**: 1 point
- **Loss**: 0 points

Players are ranked by:
1. Total points
2. Number of wins (tiebreaker)
3. Name (alphabetically)

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run all tests once |
| `npm test -- --watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with visual UI |

## Project Structure

```
tournamentRPS/
├── .github/
│   └── pull_request_template.md    # PR template for submissions
├── src/
│   ├── components/                  # React UI components
│   │   ├── Leaderboard.tsx
│   │   ├── MatchDisplay.tsx
│   │   ├── PlayerList.tsx
│   │   └── TournamentControls.tsx
│   ├── game/
│   │   └── gameLogic.ts            # Core RPS game logic
│   ├── players/                     # Player implementations
│   │   ├── RandomPlayer.ts
│   │   ├── RockPlayer.ts
│   │   ├── CyclePlayer.ts
│   │   ├── CounterPlayer.ts
│   │   ├── AdaptivePlayer.ts
│   │   ├── PlayerTemplate.ts.example
│   │   └── index.ts
│   ├── tests/                       # Comprehensive test suite
│   │   ├── gameLogic.test.ts
│   │   ├── player.test.ts
│   │   └── tournament.test.ts
│   ├── tournament/
│   │   └── Tournament.ts            # Tournament orchestration
│   ├── types/
│   │   └── player.ts                # TypeScript interfaces
│   ├── App.tsx                      # Main application
│   └── main.tsx                     # Entry point
├── QUICK_START.md                   # 5-minute setup guide
├── STUDENT_GUIDE.md                 # Detailed student instructions
├── CONTRIBUTING.md                  # Contribution guidelines
├── ARCHITECTURE.md                  # Technical architecture
├── PROJECT_SUMMARY.md               # Complete project overview
├── LICENSE                          # MIT License
├── package.json
└── README.md                        # This file
```

## Tech Stack

- **[React 18](https://react.dev/)** - UI framework with modern hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vite.dev/)** - Lightning-fast build tool and dev server
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[jsdom](https://github.com/jsdom/jsdom)** - DOM testing environment

## Learning Objectives

This project teaches students:

- **TypeScript Interfaces** - Implementing well-defined contracts
- **Strategy Pattern** - Different algorithms behind the same interface
- **State Management** - Tracking and using historical data
- **Algorithm Design** - Creating effective decision-making logic
- **Testing Practices** - Understanding test-driven development
- **Git Workflow** - Forking, branching, and pull requests
- **Modern React** - Hooks, components, and state management

## Testing

The project includes a comprehensive test suite that automatically validates:

- Game logic correctness (all RPS combinations)
- Player interface compliance (works for ANY player)
- Tournament mechanics (round-robin, stats, events)
- Move validation
- Points calculation
- Leaderboard sorting

**Students don't need to write tests** - the generic tests automatically validate any player!

```bash
# Run all tests
npm test

# Watch mode for development
npm test -- --watch

# Visual test UI
npm run test:ui
```

## Contributing

We welcome student submissions! Here's how to contribute your player:

1. **Fork** the repository
2. **Create** your player following the [Student Guide](./STUDENT_GUIDE.md)
3. **Test** your player locally (`npm test`)
4. **Submit** a Pull Request using our template

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions.

## Design Highlights

### Architecture
- **Separation of Concerns** - Game logic, tournament, and UI are separate
- **Pure Functions** - Testable, deterministic game logic
- **Interface-Driven** - Students implement a standard interface
- **Event-Driven** - Tournament emits events for UI updates
- **Type-Safe** - Full TypeScript coverage

### UI/UX
- **Glass Morphism** - Modern translucent glass effects
- **3D Effects** - Floating animations and glowing elements
- **Responsive Design** - Works on all screen sizes
- **Live Updates** - Real-time match and leaderboard updates
- **Smooth Animations** - CSS transitions and GPU-accelerated animations

## Screenshots

<p align="center">
  <em>Beautiful glass morphism UI with real-time tournament visualization</em>
</p>

## For Instructors

### Setup for Your Class

1. **Clone and verify:**
   ```bash
   npm install
   npm test  # All 54 tests should pass
   npm run dev
   ```

2. **Share with students:**
   - Point them to the [Quick Start Guide](./QUICK_START.md) or [Student Guide](./STUDENT_GUIDE.md)
   - Have them fork/clone the repository
   - Students create players and submit PRs

3. **Review submissions:**
   - PRs include player file and necessary updates
   - Automated tests verify player compliance
   - Merge approved players and watch them compete!

### Customization

- **Add new tournament modes** - See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Modify scoring** - Edit `src/game/gameLogic.ts`
- **Change match delay** - Adjust in `src/App.tsx`
- **Add statistics** - Extend `PlayerStats` type

## Troubleshooting

### Tests Failing

```bash
npm install  # Ensure dependencies are installed
npm test     # Check specific failures
```

Common issues:
- Player returning invalid moves
- Not handling empty history
- Missing required interface methods

### Player Not Showing

Verify you've:
1. Exported in `src/players/index.ts`
2. Imported in `src/App.tsx`
3. Added to players array in `src/App.tsx`
4. Restarted dev server

### TypeScript Errors

```bash
npm run build  # Check for type errors
```

Fix any type errors before running the tournament.

## Future Enhancements

Potential features to add:

- [ ] Elimination tournament brackets
- [ ] Best-of-N matches
- [ ] Match replay system
- [ ] ELO rating system
- [ ] Tournament history tracking
- [ ] Player statistics export
- [ ] Multiple tournament modes
- [ ] Real-time multiplayer mode

## License

MIT License - Free for educational use

Copyright (c) 2025 Tournament RPS Contributors

See [LICENSE](./LICENSE) for full details.

## Support

### Students

- Read the [Quick Start Guide](./QUICK_START.md)
- Check the [Student Guide](./STUDENT_GUIDE.md) for detailed instructions
- Study example players in `src/players/`
- Look at tests to understand expected behavior
- Ask your instructor for help

### Instructors

- Review [Architecture Documentation](./ARCHITECTURE.md)
- Check [Project Summary](./PROJECT_SUMMARY.md)
- Use PR template for student submissions
- Customize for your specific needs

## Acknowledgments

Built with modern web technologies and best practices for educational purposes. Special thanks to all students who participate and make the tournament exciting!

---

<p align="center">
  <strong>Ready to compete?</strong><br>
  Follow the <a href="./QUICK_START.md">Quick Start Guide</a> and create your winning strategy!
</p>

<p align="center">
  <strong>May the best algorithm win!</strong>
</p>
