# Architecture Overview

This document provides a technical overview of the RPS Tournament system architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         React App                            │
│                        (App.tsx)                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Leaderboard │  │MatchDisplay  │  │  Controls     │      │
│  │  Component   │  │  Component   │  │  Component    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Tournament System                         │
│                   (Tournament.ts)                            │
│                                                               │
│  • Round-robin match scheduling                              │
│  • Stats tracking & leaderboard                              │
│  • Event emission (start, match, complete)                   │
│  • Match history management                                  │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      Game Logic                              │
│                   (gameLogic.ts)                             │
│                                                               │
│  • Determine winner (rock/paper/scissors rules)              │
│  • Move validation                                           │
│  • Points calculation                                        │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Player Interface                          │
│                    (player.ts)                               │
│                                                               │
│  interface Player {                                          │
│    name: string                                              │
│    makeMove(opponent, history): Move                         │
│    onMatchResult?(...): void                                 │
│  }                                                            │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                  Player Implementations                      │
│                    (players/)                                │
│                                                               │
│  • RandomPlayer                                              │
│  • RockPlayer                                                │
│  • CyclePlayer                                               │
│  • CounterPlayer                                             │
│  • AdaptivePlayer                                            │
│  • [Student Players...]                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Player Interface (`src/types/player.ts`)

The foundation of the system. All players must implement this interface.

**Key Types:**
- `Player` - Main interface for all players
- `Move` - 'rock' | 'paper' | 'scissors'
- `MatchResult` - 'win' | 'lose' | 'draw'
- `MatchHistory` - Record of previous matches
- `PlayerStats` - Tournament statistics
- `Match` - Single match record

**Design Pattern:** Interface Segregation
- Players only need to implement what they use
- `onMatchResult` is optional for stateless players

### 2. Game Logic (`src/game/gameLogic.ts`)

Pure functions implementing RPS rules.

**Functions:**
- `determineWinner(move1, move2): MatchResult` - Core RPS logic
- `isValidMove(move): boolean` - Move validation
- `calculatePoints(result): number` - Scoring (3/1/0)
- `getMoveEmoji(move): string` - UI helper

**Design Pattern:** Pure Functions
- No side effects
- Easily testable
- Deterministic results

### 3. Tournament System (`src/tournament/Tournament.ts`)

Orchestrates the entire tournament.

**Key Features:**
- Round-robin scheduling (everyone plays everyone)
- Real-time stats tracking
- Event emission for UI updates
- Match history per opponent pair
- Async execution with delays

**Design Patterns:**
- Observer Pattern (event listeners)
- State Machine (running/stopped states)
- Strategy Pattern (different player implementations)

**Event Types:**
- `start` - Tournament begins
- `match` - Match completed
- `complete` - Tournament ends

### 4. React Components (`src/components/`)

#### Leaderboard
- Displays sorted player stats
- Animated stats bars
- Trophy indicators for top 3

#### MatchDisplay
- Shows current match
- Animated move displays
- Winner highlighting

#### TournamentControls
- Start/Reset buttons
- Progress tracking
- Status messages

#### PlayerList
- Shows registered players
- Player descriptions
- Scrollable list

### 5. Main Application (`src/App.tsx`)

**Responsibilities:**
- Initialize tournament
- Manage tournament state
- Listen to tournament events
- Update UI components
- Coordinate player registration

**State Management:**
- React hooks (useState, useEffect)
- Tournament instance
- Leaderboard state
- Current match state

## Data Flow

```
User Action (Start)
  ↓
Tournament.runTournament()
  ↓
For each pair of players:
  ↓
  player1.makeMove(player2, history)
  player2.makeMove(player1, history)
  ↓
  determineWinner(move1, move2)
  ↓
  Update stats
  Update history
  ↓
  Emit 'match' event
  ↓
  player1.onMatchResult?(...)
  player2.onMatchResult?(...)
  ↓
App receives event
  ↓
Update React state
  ↓
UI re-renders
```

## Testing Strategy

### Unit Tests (`src/tests/`)

1. **Game Logic Tests** (`gameLogic.test.ts`)
   - Test all move combinations
   - Validate move checking
   - Points calculation

2. **Player Interface Tests** (`player.test.ts`)
   - Generic tests for any Player implementation
   - Validates interface compliance
   - Tests all example players

3. **Tournament Tests** (`tournament.test.ts`)
   - Round-robin correctness
   - Stats tracking accuracy
   - Event emission
   - Leaderboard sorting

**Design Pattern:** Test-Driven Development
- Tests define the contract
- New players automatically tested
- Ensures consistency

## Styling Architecture

### TailwindCSS + Glass Morphism

**Key Classes:**
- `.glass` - Basic glass effect
- `.glass-intense` - Stronger glass effect
- `.animate-float` - Floating animation
- `.animate-glow` - Glowing effect

**Design System:**
- Purple/Blue/Pink gradient background
- Floating colored orbs for depth
- Transparent glass containers
- White borders with low opacity
- Backdrop blur for glass effect

## Extension Points

### Adding New Players

1. Create file in `src/players/`
2. Implement `Player` interface
3. Export in `src/players/index.ts`
4. Add to `App.tsx` players array

### Adding New Statistics

1. Extend `PlayerStats` in `src/types/player.ts`
2. Update tracking in `Tournament.ts`
3. Display in `Leaderboard.tsx`

### Adding New Match Types

1. Create new tournament class extending base
2. Override `runTournament()` method
3. Implement custom scheduling

### Adding Replay System

1. Store match sequence in Tournament
2. Add replay controls component
3. Implement time-travel state

## Performance Considerations

1. **Tournament Execution**
   - Async with configurable delays
   - Non-blocking UI updates
   - Cancellable execution

2. **State Updates**
   - Batched React updates
   - Immutable data structures
   - Minimal re-renders

3. **Styling**
   - CSS animations (GPU accelerated)
   - TailwindCSS purging
   - Lazy loading considerations

## Security Considerations

1. **Player Sandboxing**
   - Players can't access other players' state
   - Players can't modify tournament state
   - Players can't break out of interface

2. **Input Validation**
   - Move validation before processing
   - Type safety via TypeScript
   - Test coverage for edge cases

## Future Enhancements

Potential features to add:

- [ ] Elimination tournaments
- [ ] Best-of-N matches
- [ ] Player vs Player mode
- [ ] Replay system
- [ ] Match visualization
- [ ] Statistics export
- [ ] Player leaderboard history
- [ ] ELO rating system
- [ ] Tournament brackets
- [ ] Real-time multiplayer

## Tech Stack Summary

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| TailwindCSS | Styling |
| Vitest | Testing |
| jsdom | Test Environment |

## Development Workflow

```bash
# Development
npm run dev          # Start dev server with HMR

# Testing
npm test             # Run tests once
npm test -- --watch  # Watch mode
npm run test:ui      # Visual test runner

# Building
npm run build        # Production build
npm run preview      # Preview production build
```

## Code Organization

```
src/
├── types/           # TypeScript interfaces & types
│   └── player.ts
├── game/            # Pure game logic
│   └── gameLogic.ts
├── tournament/      # Tournament orchestration
│   └── Tournament.ts
├── players/         # Player implementations
│   ├── index.ts     # Exports
│   └── [Players].ts
├── components/      # React components
│   ├── Leaderboard.tsx
│   ├── MatchDisplay.tsx
│   ├── TournamentControls.tsx
│   └── PlayerList.tsx
├── tests/           # Test files
│   ├── gameLogic.test.ts
│   ├── player.test.ts
│   └── tournament.test.ts
├── App.tsx          # Main application
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Conclusion

This architecture provides:
- **Extensibility** - Easy to add new players
- **Testability** - Comprehensive test coverage
- **Maintainability** - Clear separation of concerns
- **Type Safety** - Full TypeScript coverage
- **Performance** - Optimized React rendering
- **UX** - Beautiful, responsive UI

The system is designed specifically for educational purposes, making it easy for students to understand, extend, and compete!
