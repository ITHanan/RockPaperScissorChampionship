# Student Guide: Creating Your RPS Player

Welcome! This guide will help you create your own Rock Paper Scissors player and submit it to the tournament.

## Step 1: Understand the Player Interface

Every player must implement the `Player` interface:

```typescript
export interface Player {
  // Your player's unique name
  readonly name: string;

  // Optional: describe your strategy
  readonly description?: string;

  // Required: make a move based on opponent and history
  makeMove(
    opponentName: string,
    history: MatchHistory[]
  ): Move;

  // Optional: receive feedback after each match
  onMatchResult?(
    opponentName: string,
    myMove: Move,
    opponentMove: Move,
    result: MatchResult
  ): void;
}
```

### Types

- `Move`: `'rock' | 'paper' | 'scissors'`
- `MatchResult`: `'win' | 'lose' | 'draw'`
- `MatchHistory`: Contains your previous moves and results against this opponent

## Step 2: Create Your Player File

Create a new file in `src/players/` with your name or player name:

```typescript
// src/players/YourNamePlayer.ts

import { Player, Move, MatchHistory } from '../types/player';

export class YourNamePlayer implements Player {
  readonly name = 'Your Unique Name';
  readonly description = 'Brief description of your strategy';

  makeMove(opponentName: string, history: MatchHistory[]): Move {
    // Your strategy here!
    // You have access to:
    // - opponentName: who you're playing against
    // - history: array of previous matches against this opponent

    return 'rock'; // Replace with your logic
  }

  // Optional: track results to improve your strategy
  onMatchResult(
    opponentName: string,
    myMove: Move,
    opponentMove: Move,
    result: MatchResult
  ): void {
    // Store data, update strategy, etc.
  }
}
```

## Step 3: Strategy Ideas

Here are some strategy ideas to get you started:

### Simple Strategies
- **Always Rock**: Simple but predictable
- **Random**: Unpredictable but not optimal
- **Cycle**: Rotate through moves

### Advanced Strategies
- **Counter**: Analyze opponent's most common move and counter it
- **Pattern Detection**: Look for patterns in opponent's history
- **Adaptive**: Change strategy based on performance
- **Meta**: Try to predict what strategy opponent is using

### Using History

```typescript
makeMove(opponentName: string, history: MatchHistory[]): Move {
  // No history? Play safe
  if (history.length === 0) {
    return 'rock';
  }

  // Get opponent's last move
  const lastMatch = history[history.length - 1];
  const theirLastMove = lastMatch.opponentMove;

  // Counter it
  if (theirLastMove === 'rock') return 'paper';
  if (theirLastMove === 'paper') return 'scissors';
  return 'rock';
}
```

### Counting Opponent Moves

```typescript
makeMove(opponentName: string, history: MatchHistory[]): Move {
  const counts = { rock: 0, paper: 0, scissors: 0 };

  history.forEach(match => {
    counts[match.opponentMove]++;
  });

  // Find most common and counter it
  const mostCommon = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0][0] as Move;

  return this.counter(mostCommon);
}

private counter(move: Move): Move {
  if (move === 'rock') return 'paper';
  if (move === 'paper') return 'scissors';
  return 'rock';
}
```

## Step 4: Test Your Player

Run the test suite to ensure your player is valid:

```bash
npm test
```

The tests will automatically check that your player:
- Has a name
- Has a `makeMove` method
- Always returns valid moves ('rock', 'paper', or 'scissors')
- Handles empty history
- Handles history with previous matches

## Step 5: Add Your Player to the Tournament

### 5.1: Export your player

In `src/players/index.ts`, add:

```typescript
export { YourNamePlayer } from './YourNamePlayer';
```

### 5.2: Add to App.tsx

In `src/App.tsx`, import and add your player:

```typescript
// At the top
import { YourNamePlayer } from './players';

// Inside the component
const [players] = useState<Player[]>([
  new RandomPlayer(),
  new RockPlayer(),
  // ... other players
  new YourNamePlayer(), // Add your player here
]);
```

## Step 6: Run the Tournament

```bash
npm run dev
```

Watch your player compete against others in real-time!

## Step 7: Submit Your Player (GitHub)

Once you're happy with your player:

1. **Fork the repository** (if not already done)
2. **Create a new branch**:
   ```bash
   git checkout -b add-yourname-player
   ```

3. **Add your files**:
   ```bash
   git add src/players/YourNamePlayer.ts
   git add src/players/index.ts
   git add src/App.tsx
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "Add YourName player"
   ```

5. **Push to your fork**:
   ```bash
   git push origin add-yourname-player
   ```

6. **Create a Pull Request** on GitHub

## Tips for Success

1. **Start Simple**: Get a basic player working first, then improve
2. **Test Often**: Run tests frequently to catch bugs early
3. **Study Opponents**: Look at example players to learn strategies
4. **Use History**: The match history is powerful - use it!
5. **Be Unpredictable**: Mix randomness with strategy
6. **Adapt**: React to what opponents are doing

## Common Pitfalls

- ❌ Returning invalid moves (must be 'rock', 'paper', or 'scissors')
- ❌ Crashing when history is empty
- ❌ Not handling edge cases
- ❌ Being too predictable
- ❌ Over-fitting to specific opponents

## Example: Simple Counter Player

Here's a complete example:

```typescript
import { Player, Move, MatchHistory } from '../types/player';

export class SmartCounterPlayer implements Player {
  readonly name = 'Smart Counter';
  readonly description = 'Counters most common opponent move';

  makeMove(opponentName: string, history: MatchHistory[]): Move {
    if (history.length < 3) {
      // Not enough data, play randomly
      const moves: Move[] = ['rock', 'paper', 'scissors'];
      return moves[Math.floor(Math.random() * moves.length)];
    }

    // Count opponent moves
    const counts = { rock: 0, paper: 0, scissors: 0 };
    history.forEach(match => counts[match.opponentMove]++);

    // Find and counter most common
    const mostCommon = (Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0][0]) as Move;

    return this.counter(mostCommon);
  }

  private counter(move: Move): Move {
    const counters: Record<Move, Move> = {
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock',
    };
    return counters[move];
  }
}
```

## Need Help?

- Check the example players in `src/players/`
- Read the type definitions in `src/types/player.ts`
- Look at the tests in `src/tests/player.test.ts`
- Ask your instructor!

## Good Luck!

May the best algorithm win! 🏆
