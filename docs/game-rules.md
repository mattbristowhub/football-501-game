# Football 501 - Game Rules

## Overview
Football 501 is a darts-inspired football trivia game where two players compete to reduce their score from 501 to exactly zero by naming football players whose statistics are subtracted from their total.

## Game Setup
1. Two players enter their names
2. Both players start with a score of **501 points**
3. Players select a category (e.g., "Premier League goals for Arsenal", "Chelsea appearances", etc.)

## How to Play

### Turn Structure
1. Player 1 names a football player that matches the category
2. The game retrieves that player's actual statistic from the football database
3. That statistic is **subtracted** from Player 1's current score
4. Player 2 takes their turn and names a different player
5. No player can be named twice in the same game
6. Repeat until someone reaches exactly zero or below

### Scoring Examples

**Example Game: "Premier League Goals for Arsenal"**

**Player 1's Turn:**
- Current score: 501
- Names: "Thierry Henry"
- Henry's Premier League goals for Arsenal: 175
- New score: 501 - 175 = **326**

**Player 2's Turn:**
- Current score: 501
- Names: "Ian Wright"
- Wright's Premier League goals for Arsenal: 113
- New score: 501 - 113 = **388**

**Player 1's Turn:**
- Current score: 326
- Names: "Robin van Persie"
- Van Persie's Premier League goals for Arsenal: 96
- New score: 326 - 96 = **230**

### Bust Rule

#### Over 180 = Bust
If a player's statistic is **over 180**, it is a **BUST**:
- Your turn is forfeited
- **No points are deducted** from your score
- Your score remains unchanged
- Turn passes to the next player

**Example:**
- Current score: 501
- Names: "Alan Shearer" (Premier League all-time top scorer)
- Shearer's Premier League goals: 260
- Result: **BUST!** Score remains at 501, turn ends

## Winning the Game
- First player to reach **exactly 0 or below** wins
- If both players go below 0 in the same round, the player closest to 0 wins
- If tied at exactly 0, the player who reached it first wins

## Invalid Moves
A turn is considered invalid if:
- The player named doesn't exist in the database
- The player doesn't match the category (e.g., naming a Chelsea player in an Arsenal category)
- The player has already been named in this game
- The player's statistic for that category is 0
- The player's statistic is over 180 (BUST)

When an invalid move occurs:
- The turn is skipped (no points deducted)
- The same player takes another turn to name a valid player

Note: A BUST (over 180) counts as an invalid move but still counts as that player's turn (turn passes to opponent)

## Categories

### Free Categories (Premier League)
1. **Premier League Goals for Arsenal** - Name Arsenal players, their PL goal tally is deducted
2. **Premier League Goals for Chelsea** - Name Chelsea players, their PL goal tally is deducted
3. **Premier League Goals for Manchester United** - Name Man United players, their PL goal tally is deducted
4. **Premier League Goals for Liverpool** - Name Liverpool players, their PL goal tally is deducted
5. **Premier League Appearances for Arsenal** - Name Arsenal players, their PL appearances deducted
6. **Premier League Appearances for Chelsea** - Name Chelsea players, their PL appearances deducted
7. **Premier League Appearances for Manchester United** - Name Man United players, their PL appearances deducted
8. **Premier League Appearances for Liverpool** - Name Liverpool players, their PL appearances deducted
9. **England National Team Caps** - Name England players, their caps deducted
10. **Premier League All-Time Top Scorers** - Name any PL player, their total PL goals deducted

### Paid League Packs
- **La Liga Pack** ($1.99) - Categories for Real Madrid, Barcelona, Atletico Madrid, etc.
- **Serie A Pack** ($1.99) - Categories for Juventus, AC Milan, Inter Milan, etc.
- **Bundesliga Pack** ($1.99) - Categories for Bayern Munich, Borussia Dortmund, etc.
- **Ligue 1 Pack** ($1.99) - Categories for PSG, Marseille, Lyon, etc.
- **Top 5 Leagues Bundle** ($4.99 - includes all above)

## Strategy Tips
- **Early Game (501-300):** Name high-scoring players (100-180 range) to reduce your score quickly
- **Mid Game (300-100):** Balance between reducing score and setting up for the finish
- **End Game (<100):** Name players with lower stats to get exactly to 0
- **Avoid Bust:** Never name players with over 180 in the stat - know the legends who will bust you
- **Know Your Players:** Memorize player statistics for different teams and categories
- **Block Opponents:** Use high-value players your opponent might need

## Game Flow
1. **Home Screen** → Start New Game or Resume saved game
2. **Setup Screen** → Enter player names, select category
3. **Gameplay Screen** →
   - See current scores
   - Active player enters a player name
   - Game validates and shows the player's statistic
   - Score is updated
   - Next player's turn
4. **Game Over Screen** → See winner, view game history, play again

## Example Full Game

**Category:** Premier League Goals for Arsenal
**Players:** Alice vs. Bob

| Turn | Player | Player Named | Goals | Alice Score | Bob Score |
|------|--------|--------------|-------|-------------|-----------|
| Start | - | - | - | 501 | 501 |
| 1 | Alice | Thierry Henry | 175 | 326 | 501 |
| 2 | Bob | Ian Wright | 113 | 326 | 388 |
| 3 | Alice | Robin van Persie | 96 | 230 | 388 |
| 4 | Bob | Dennis Bergkamp | 87 | 230 | 301 |
| 5 | Alice | Alexis Sánchez | 60 | 170 | 301 |
| 6 | Bob | Pierre-Emerick Aubameyang | 68 | 170 | 233 |
| 7 | Alice | Olivier Giroud | 73 | 97 | 233 |
| 8 | Bob | Freddie Ljungberg | 46 | 97 | 187 |
| 9 | Alice | Alexandre Lacazette | 54 | 43 | 187 |
| 10 | Bob | Robert Pires | 62 | 43 | 125 |
| 11 | Alice | Bukayo Saka | 22 | 21 | 125 |
| 12 | Bob | Marc Overmars | 25 | 21 | 100 |
| 13 | Alice | **Theo Walcott** | **21** | **0** ✓ | 100 |

**Winner: Alice!** (Reached exactly 0 points)
