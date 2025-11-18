# Contributing to RPS Tournament

Thank you for participating in the tournament! This guide will help you contribute your player.

## Getting Started

1. **Clone/Fork the repository**
   ```bash
   git clone <repository-url>
   cd tournamentRPS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Creating Your Player

### Step 1: Create Your Player File

Create a new file in `src/players/` following this naming convention:
- `YourNamePlayer.ts` (e.g., `JohnSmithPlayer.ts`)

You can use the template in `src/players/PlayerTemplate.ts.example` as a starting point.

### Step 2: Implement the Player Interface

```typescript
import { Player, Move, MatchHistory } from '../types/player';

export class YourNamePlayer implements Player {
  readonly name = 'Unique Player Name';
  readonly description = 'Your strategy description';

  makeMove(opponentName: string, history: MatchHistory[]): Move {
    // Your logic here
    return 'rock';
  }

  // Optional
  onMatchResult(...) {
    // Track results
  }
}
```

### Step 3: Export Your Player

Add your player to `src/players/index.ts`:

```typescript
export { YourNamePlayer } from './YourNamePlayer';
```

### Step 4: Register Your Player

Add your player to the tournament in `src/App.tsx`:

```typescript
import { YourNamePlayer } from './players';

// In the component
const [players] = useState<Player[]>([
  // ... existing players
  new YourNamePlayer(),
]);
```

### Step 5: Test Your Player

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

Your player must pass all interface compliance tests.

### Step 6: Test in Tournament

```bash
npm run dev
```

Open your browser and watch your player compete!

## Code Quality

### Requirements

1. **Type Safety**: All code must be TypeScript with proper types
2. **No Errors**: Code must compile without errors
3. **Tests Pass**: All tests must pass
4. **Valid Moves**: Always return 'rock', 'paper', or 'scissors'
5. **Handle Edge Cases**: Handle empty history gracefully

### Best Practices

- Use meaningful variable names
- Add comments for complex logic
- Keep methods focused and small
- Don't rely on external state
- Don't try to modify other players
- Be a good sport!

## Submitting Your Player

### Via Pull Request (Recommended)

1. **Create a branch**
   ```bash
   git checkout -b add-yourname-player
   ```

2. **Add your files**
   ```bash
   git add src/players/YourNamePlayer.ts
   git add src/players/index.ts
   git add src/App.tsx
   ```

3. **Commit with clear message**
   ```bash
   git commit -m "Add [Your Name] player with [strategy] strategy"
   ```

4. **Push to your fork**
   ```bash
   git push origin add-yourname-player
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Submit!

### What Happens Next?

1. Automated tests will run
2. Instructor will review your code
3. If approved, your player will be merged
4. Your player will compete in the next tournament!

## Common Issues

### Tests Failing

```bash
# Make sure all dependencies are installed
npm install

# Run tests to see specific failures
npm test
```

Common test failures:
- Returning invalid moves
- Crashing on empty history
- Missing required interface methods

### TypeScript Errors

```bash
# Check for type errors
npm run build
```

Fix any type errors before submitting.

### Player Not Showing Up

Make sure you:
1. Exported player in `src/players/index.ts`
2. Imported player in `src/App.tsx`
3. Added instance to players array in `src/App.tsx`
4. Restarted the dev server

## Strategy Tips

- **Study History**: Use the match history to detect patterns
- **Be Unpredictable**: Mix randomness with strategy
- **Adapt**: Change tactics based on performance
- **Test Often**: Run your player against different opponents
- **Learn**: Study the example players

## Need Help?

- Check `STUDENT_GUIDE.md` for detailed instructions
- Look at example players in `src/players/`
- Review the types in `src/types/player.ts`
- Ask your instructor
- Check test examples in `src/tests/`

## Tournament Rules

1. **One Player Per Student**: Submit only one player
2. **No Cheating**: Don't try to access other players' internals
3. **Be Original**: Create your own strategy (learning from examples is fine)
4. **Have Fun**: This is about learning and competition!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Good luck and may the best algorithm win! 🏆
