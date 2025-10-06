# Football 501 - Complete Development To-Do List
## Tech Stack Option 3: Vue + API-Football Pro + Firebase + Netlify

**Launch Strategy:** Free Premier League categories with paid league expansion packs

---

## Phase 0: Pre-Development Planning & Setup

### 0.1 Repository & Environment Setup
- [ ] Install Node.js v18+ and npm/pnpm
- [ ] Create GitHub repository: `football-501-game`
- [ ] Initialize Git locally: `git init`
- [ ] Create `.gitignore` (include `node_modules`, `.env`, `dist/`, `.firebase/`)
- [ ] Set up code editor (VS Code recommended)
- [ ] Install VS Code extensions:
  - [ ] Volar (Vue Language Features)
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Tailwind CSS IntelliSense

### 0.2 API & Service Account Setup
- [ ] Sign up for API-Football Pro ($19/month) at https://www.api-football.com/pricing
- [ ] Get API key from API-Football dashboard
- [ ] Test API with Postman/curl: `GET https://v3.football.api-sports.io/players?search=messi`
- [ ] Document API endpoints needed:
  - [ ] Player search: `/players?search={name}`
  - [ ] Player statistics: `/players?id={player_id}&season={year}`
  - [ ] Team appearances: `/players/squads?team={team_id}`
- [ ] Sign up for Firebase (https://console.firebase.google.com)
- [ ] Create new Firebase project: "football-501"
- [ ] Enable Firebase Authentication (email/password + Google OAuth)
- [ ] Set up Firestore Database (start in test mode, secure later)
- [ ] Note Firebase config credentials (will add to `.env` later)
- [ ] Sign up for Netlify account (https://www.netlify.com)

### 0.3 Project Planning
- [ ] Review game rules document (save in `/docs/game-rules.md`)
- [ ] List Premier League categories for free tier (7-10 categories):
  - [ ] "Closest to 50 Premier League goals"
  - [ ] "Premier League appearances for Arsenal"
  - [ ] "Premier League appearances for Chelsea"
  - [ ] "Premier League appearances for Manchester United"
  - [ ] "Premier League appearances for Liverpool"
  - [ ] "England caps and goals combined"
  - [ ] "Premier League all-time top scorers"
- [ ] List paid league expansion packs:
  - [ ] La Liga Pack ($1.99)
  - [ ] Serie A Pack ($1.99)
  - [ ] Bundesliga Pack ($1.99)
  - [ ] Ligue 1 Pack ($1.99)
  - [ ] "Top 5 Leagues Bundle" ($4.99 - all above)
- [ ] Sketch basic wireframes (use Figma/Excalidraw or paper)

---

## Phase 1: Project Foundation & Core Setup

### 1.1 Vue Project Initialization
- [ ] Create Vue 3 project: `npm create vue@latest football-501`
  - [ ] Select TypeScript: Yes (recommended)
  - [ ] Select JSX Support: No
  - [ ] Select Vue Router: Yes
  - [ ] Select Pinia: Yes (state management)
  - [ ] Select Vitest: Yes (unit testing)
  - [ ] Select ESLint: Yes
  - [ ] Select Prettier: Yes
- [ ] Navigate to project: `cd football-501`
- [ ] Install dependencies: `npm install`
- [ ] Test dev server: `npm run dev` (should open on localhost:5173)

### 1.2 Tailwind CSS Setup
- [ ] Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Initialize Tailwind: `npx tailwindcss init -p`
- [ ] Configure `tailwind.config.js`:
```js
content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
],
```
- [ ] Add Tailwind directives to `src/assets/main.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- [ ] Test Tailwind (add `class="text-blue-500"` to App.vue and verify styling)

### 1.3 Project Structure Setup
- [ ] Create folder structure:
```
src/
├── components/         # Reusable UI components
│   ├── game/          # Game-specific components
│   ├── ui/            # Generic UI components (buttons, cards, etc.)
│   └── layout/        # Layout components (header, footer)
├── views/             # Page components (routed views)
├── stores/            # Pinia stores (state management)
├── services/          # API integration & business logic
│   ├── api/          # API calls (Football API, Firebase)
│   └── game/         # Game logic utilities
├── types/             # TypeScript type definitions
├── composables/       # Vue composables (reusable logic)
├── assets/            # Images, fonts, icons
├── styles/            # Global CSS
└── router/            # Vue Router configuration
```
- [ ] Create these folders manually

### 1.4 Environment Variables Setup
- [ ] Create `.env.local` file in project root
- [ ] Add API keys (DO NOT COMMIT THIS FILE):
```env
VITE_FOOTBALL_API_KEY=your_api_football_key_here
VITE_FOOTBALL_API_URL=https://v3.football.api-sports.io

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Document environment variables in `README.md`

### 1.5 Vue Router Setup
- [ ] Create routes in `src/router/index.ts`:
  - [ ] `/` - Home/Welcome screen
  - [ ] `/setup` - Game setup (player names, category selection)
  - [ ] `/game` - Main gameplay screen
  - [ ] `/game-over` - Game completion screen
  - [ ] `/store` - In-app purchase store (league packs)
  - [ ] `/settings` - Settings page
- [ ] Test navigation between routes

---

## Phase 2: Core Game State & Logic (Local Multiplayer)

### 2.1 Pinia Store Setup - Game State
- [ ] Create `src/stores/gameStore.ts`
- [ ] Define game state interface:
```typescript
interface Player {
  id: string
  name: string
  score: number
  isActive: boolean
}

interface Question {
  category: string
  questionText: string
  correctAnswer: number
  playerAnswer?: number
  isCorrect?: boolean
}

interface GameState {
  players: Player[]
  currentPlayerIndex: number
  questions: Question[]
  currentQuestionIndex: number
  gameStatus: 'setup' | 'playing' | 'paused' | 'finished'
  startingScore: number
  selectedCategory: string
  purchasedLeagues: string[] // Track which league packs user owns
}
```
- [ ] Implement Pinia store with:
  - [ ] State initialization
  - [ ] Getters (currentPlayer, currentQuestion, gameProgress)
  - [ ] Actions (startGame, submitAnswer, nextTurn, endGame, resetGame)
- [ ] Add localStorage persistence for game state (auto-save)

### 2.2 Game Logic Implementation
- [ ] Create `src/services/game/scoring.ts`:
  - [ ] `calculateScore(answer: number): number` - Basic scoring
  - [ ] `checkDoublePoints(score: number): boolean` - Check if score = 21
  - [ ] `checkBullseye(score: number): boolean` - Check if score = 50
  - [ ] `applyScoreModifiers(score: number, modifiers): number` - Apply 2x, 4x bonuses
  - [ ] `subtractFromTotal(currentScore: number, points: number): number`
- [ ] Create `src/services/game/gameRules.ts`:
  - [ ] `checkWinCondition(score: number): boolean` - Check if <= 0
  - [ ] `determineWinner(player1Score, player2Score): Player` - Handle ties
  - [ ] `validateAnswer(answer: string): boolean` - Validate user input
- [ ] Create `src/services/game/turnManager.ts`:
  - [ ] `switchTurn()` - Toggle active player
  - [ ] `recordAnswer(question, answer)` - Save answer history
  - [ ] `canContinuePlaying(): boolean` - Check if game should end
- [ ] Unit test all game logic functions with Vitest

### 2.3 localStorage Integration
- [ ] Create `src/services/storage/localStorage.ts`:
  - [ ] `saveGameState(state: GameState): void`
  - [ ] `loadGameState(): GameState | null`
  - [ ] `clearGameState(): void`
  - [ ] `savePurchasedLeagues(leagues: string[]): void` - Persist DLC purchases
  - [ ] `loadPurchasedLeagues(): string[]`
- [ ] Hook into Pinia store:
  - [ ] Auto-save on state changes (debounced)
  - [ ] Auto-load on app mount
  - [ ] Handle localStorage errors gracefully (quota exceeded, etc.)
- [ ] Add "Resume Game" functionality on home screen
- [ ] Add "New Game" confirmation dialog (warns about losing progress)

---

## Phase 3: Football API Integration

### 3.1 API Service Setup
- [ ] Install Axios: `npm install axios`
- [ ] Create `src/services/api/footballApi.ts`
- [ ] Set up Axios instance with base config:
```typescript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_FOOTBALL_API_URL,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_FOOTBALL_API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
})
```
- [ ] Implement API methods:
  - [ ] `searchPlayer(name: string): Promise<Player[]>`
  - [ ] `getPlayerStats(playerId: number, season: number): Promise<Statistics>`
  - [ ] `getPlayerCareerStats(playerId: number): Promise<CareerStats>`
  - [ ] `getTeamPlayers(teamId: number, season: number): Promise<Player[]>`
- [ ] Add request rate limiting (100 req/day = ~4/hour, track usage)
- [ ] Add response caching (cache player data for 24 hours)
- [ ] Create error handling wrapper:
  - [ ] Network errors
  - [ ] API rate limit errors (429)
  - [ ] Invalid player name errors (404)
  - [ ] API key errors (401)

### 3.2 Question Generation System
- [ ] Create `src/services/game/questionGenerator.ts`
- [ ] Define category types:
```typescript
interface Category {
  id: string
  name: string
  type: 'goals' | 'appearances' | 'combined' | 'specific_team'
  league: 'premier-league' | 'la-liga' | 'serie-a' | 'bundesliga' | 'ligue-1'
  isPremium: boolean // false for Premier League, true for paid leagues
  teamId?: number // for team-specific categories
}
```
- [ ] Implement Premier League free categories:
  - [ ] "Closest to 50 PL goals" - Generate player with ~40-60 goals
  - [ ] "Arsenal PL appearances" - Random Arsenal legend
  - [ ] "Chelsea PL appearances" - Random Chelsea player
  - [ ] "Man United PL appearances" - Random Man United player
  - [ ] "Liverpool PL appearances" - Random Liverpool player
  - [ ] "England combined stats" - Caps + goals for England player
  - [ ] "All-time PL top scorers" - Pick from top 50 scorers
- [ ] Create question templates:
  - [ ] `generateGoalsQuestion(category): Question`
  - [ ] `generateAppearancesQuestion(category): Question`
  - [ ] `generateCombinedStatsQuestion(category): Question`
- [ ] Add player pool system:
  - [ ] Curated list of ~100 famous players per league (to avoid API overuse)
  - [ ] Random selection from pool
  - [ ] Fallback to API search if needed
- [ ] Implement answer validation:
  - [ ] Exact match (player's actual stat)
  - [ ] Accept ±5 range (e.g., if answer is 52, accept 47-57)
  - [ ] Handle edge cases (player not found, incomplete data)

### 3.3 API Response Caching Strategy
- [ ] Create `src/services/cache/apiCache.ts`:
  - [ ] Use localStorage or IndexedDB for caching
  - [ ] Cache player stats for 24 hours
  - [ ] Cache search results for 1 hour
  - [ ] Implement cache invalidation
- [ ] Add cache middleware to API calls
- [ ] Display cached data indicator in UI (optional)
- [ ] Clear cache option in settings

---

## Phase 4: UI Components Development

### 4.1 Layout Components
- [ ] Create `src/components/layout/AppHeader.vue`:
  - [ ] Game logo
  - [ ] Navigation menu (Home, Store, Settings)
  - [ ] Current scores display (when in game)
  - [ ] Responsive hamburger menu for mobile
- [ ] Create `src/components/layout/AppFooter.vue`:
  - [ ] Copyright info
  - [ ] Links (Privacy, Terms, Contact)
- [ ] Create `src/components/layout/BaseLayout.vue`:
  - [ ] Wrapper component with header/footer
  - [ ] `<slot>` for page content

### 4.2 Generic UI Components
- [ ] Create `src/components/ui/BaseButton.vue`:
  - [ ] Props: variant (primary, secondary, danger), size, disabled
  - [ ] Tailwind styling with hover/active states
  - [ ] Loading state with spinner
- [ ] Create `src/components/ui/BaseCard.vue`:
  - [ ] Card container with shadow and padding
  - [ ] Responsive design
- [ ] Create `src/components/ui/BaseInput.vue`:
  - [ ] Text input with label
  - [ ] Error state styling
  - [ ] Number input validation
- [ ] Create `src/components/ui/Modal.vue`:
  - [ ] Overlay background
  - [ ] Close button
  - [ ] Transition animations
- [ ] Create `src/components/ui/LoadingSpinner.vue`:
  - [ ] CSS spinning animation
  - [ ] Multiple sizes (sm, md, lg)
- [ ] Create `src/components/ui/Toast.vue`:
  - [ ] Success, error, info variants
  - [ ] Auto-dismiss after 3 seconds
  - [ ] Position: top-right corner

### 4.3 Game-Specific Components
- [ ] Create `src/components/game/PlayerSetup.vue`:
  - [ ] Two input fields for player names
  - [ ] Validation (names required, not empty)
  - [ ] "Start Game" button
- [ ] Create `src/components/game/CategorySelector.vue`:
  - [ ] Grid/list of available categories
  - [ ] Show "Free" badge on Premier League categories
  - [ ] Show "Locked" icon on premium categories
  - [ ] Click locked category → redirect to Store
  - [ ] Visual indication of selected category
- [ ] Create `src/components/game/ScoreBoard.vue`:
  - [ ] Display both player names and scores
  - [ ] Highlight active player
  - [ ] Score difference indicator
  - [ ] Progress indicator (rounds completed)
  - [ ] Responsive: stack vertically on mobile, horizontal on desktop
- [ ] Create `src/components/game/QuestionDisplay.vue`:
  - [ ] Large text for question
  - [ ] Category badge/chip
  - [ ] Loading state while generating question
  - [ ] Error state if question generation fails
- [ ] Create `src/components/game/AnswerInput.vue`:
  - [ ] Number input field (large, centered)
  - [ ] "Submit Answer" button
  - [ ] Character limit (max 4 digits)
  - [ ] Enter key submits answer
  - [ ] Input validation feedback
- [ ] Create `src/components/game/AnswerFeedback.vue`:
  - [ ] Show if answer was correct/incorrect
  - [ ] Display correct answer
  - [ ] Show points earned (with 2x/4x modifiers if applicable)
  - [ ] Animation (confetti for correct, shake for wrong)
  - [ ] "Next Turn" button
- [ ] Create `src/components/game/TurnIndicator.vue`:
  - [ ] Banner showing "[Player Name]'s Turn"
  - [ ] Animated transition between turns
  - [ ] Countdown timer (optional, 30 seconds per turn)
- [ ] Create `src/components/game/GameOverScreen.vue`:
  - [ ] Winner announcement with animation
  - [ ] Final scores
  - [ ] Game statistics (total rounds, accuracy)
  - [ ] "Play Again" button
  - [ ] "Back to Home" button
  - [ ] Share score button (social media integration)

### 4.4 Monetization Components
- [ ] Create `src/components/store/LeaguePack.vue`:
  - [ ] Pack thumbnail (league logo)
  - [ ] League name and description
  - [ ] Price tag ($1.99)
  - [ ] "Purchase" button (or "Owned" badge if purchased)
  - [ ] Preview of categories included
- [ ] Create `src/components/store/BundleOffer.vue`:
  - [ ] "Top 5 Leagues Bundle" card
  - [ ] Show all included leagues
  - [ ] Original price ($9.95) crossed out
  - [ ] Bundle price ($4.99) highlighted
  - [ ] "Best Value" badge
  - [ ] "Buy Now" button
- [ ] Create `src/components/store/PurchaseModal.vue`:
  - [ ] Confirm purchase screen
  - [ ] Show what user is buying
  - [ ] Price confirmation
  - [ ] "Complete Purchase" button
  - [ ] "Cancel" button
  - [ ] Payment processing indicator
- [ ] Create `src/views/StoreView.vue`:
  - [ ] Page showing all league packs
  - [ ] Filter: "All" | "Owned" | "Available"
  - [ ] Feature bundle at top
  - [ ] Grid layout of individual packs
  - [ ] "Restore Purchases" button (for account sync)

---

## Phase 5: View/Page Components

### 5.1 Home View
- [ ] Create `src/views/HomeView.vue`:
  - [ ] Hero section with game title and tagline
  - [ ] "New Game" button (primary CTA)
  - [ ] "Resume Game" button (if saved game exists)
  - [ ] "How to Play" button (opens instructions modal)
  - [ ] "Browse League Packs" button → Store
  - [ ] Quick stats display (if available): games played, win rate
  - [ ] Responsive layout

### 5.2 Game Setup View
- [ ] Create `src/views/GameSetupView.vue`:
  - [ ] Page title: "Game Setup"
  - [ ] Step 1: Enter player names (PlayerSetup component)
  - [ ] Step 2: Select category (CategorySelector component)
  - [ ] "Start Game" button (disabled until both steps complete)
  - [ ] "Back" button → Home
  - [ ] Show loading state while initializing game

### 5.3 Game Play View
- [ ] Create `src/views/GamePlayView.vue`:
  - [ ] Header: ScoreBoard component (fixed at top)
  - [ ] Turn indicator banner
  - [ ] QuestionDisplay component
  - [ ] AnswerInput component
  - [ ] AnswerFeedback component (shown after answer submission)
  - [ ] "Pause Game" button (top-right corner)
  - [ ] Handle game flow:
    - [ ] Show question → accept answer → show feedback → next turn
  - [ ] Trigger game-over screen when someone reaches ≤0
  - [ ] Prevent navigation away without confirmation

### 5.4 Game Over View
- [ ] Create `src/views/GameOverView.vue`:
  - [ ] Full GameOverScreen component
  - [ ] Confetti animation for winner
  - [ ] Game summary statistics
  - [ ] "Play Again" → GameSetupView
  - [ ] "New Players" → GameSetupView (clear player names)
  - [ ] "Main Menu" → HomeView
  - [ ] Social share buttons (Twitter, Facebook - share score)
  - [ ] Clear saved game state when leaving

### 5.5 Settings View
- [ ] Create `src/views/SettingsView.vue`:
  - [ ] Sound effects toggle (on/off)
  - [ ] Music toggle (on/off)
  - [ ] Animation speed (slow/normal/fast)
  - [ ] Clear cache button
  - [ ] Clear saved game button (with confirmation)
  - [ ] About section (game version, credits)
  - [ ] "Contact Us" / "Report Bug" link
  - [ ] Privacy Policy link
  - [ ] Terms of Service link

---

## Phase 6: Responsive Design & Mobile Optimization

### 6.1 Mobile-First Responsive Design
- [ ] Define Tailwind breakpoints strategy:
  - [ ] `sm:` - Small devices (640px+) - phones landscape
  - [ ] `md:` - Medium devices (768px+) - tablets
  - [ ] `lg:` - Large devices (1024px+) - desktops
  - [ ] `xl:` - Extra large (1280px+) - large desktops
- [ ] Test all components at mobile size (375px width)
- [ ] Adjust layouts for mobile:
  - [ ] Scoreboard: Stack vertically
  - [ ] Category grid: 1 column on mobile, 2+ on tablet/desktop
  - [ ] Font sizes: Scale appropriately (text-lg → text-sm on mobile)
  - [ ] Buttons: Full-width on mobile, auto-width on desktop
  - [ ] Modal dialogs: Full-screen on mobile, centered on desktop

### 6.2 Touch-Friendly Interface
- [ ] Ensure all buttons are minimum 44px × 44px (tap target size)
- [ ] Add touch feedback (active state on tap)
- [ ] Increase spacing between interactive elements (no accidental taps)
- [ ] Test on actual mobile devices (iOS Safari, Android Chrome)
- [ ] Test in Chrome DevTools device emulation
- [ ] Handle orientation changes (portrait ↔ landscape)

### 6.3 Performance Optimization
- [ ] Lazy-load routes with Vue Router:
```typescript
const routes = [
  {
    path: '/store',
    component: () => import('./views/StoreView.vue')
  }
]
```
- [ ] Optimize images:
  - [ ] Convert to WebP format
  - [ ] Serve different sizes for mobile/desktop
  - [ ] Use lazy loading for images (`loading="lazy"`)
- [ ] Code splitting for large components
- [ ] Enable Vite build optimizations in `vite.config.ts`
- [ ] Minimize bundle size:
  - [ ] Remove unused Tailwind classes (purge CSS)
  - [ ] Tree-shake unused dependencies
  - [ ] Analyze bundle with `npm run build -- --report`
- [ ] Target: Initial load < 3 seconds on 3G connection

### 6.4 Cross-Browser Testing
- [ ] Test on Chrome (desktop + mobile)
- [ ] Test on Firefox (desktop + mobile)
- [ ] Test on Safari (desktop + iOS)
- [ ] Test on Edge (desktop)
- [ ] Check for CSS inconsistencies
- [ ] Verify all interactive elements work
- [ ] Test form inputs and validation
- [ ] Check animation performance

---

## Phase 7: In-App Purchase Implementation (Mock/Future-Ready)

### 7.1 Purchase Flow (Client-Side Mock)
For Phase 1 launch, implement a MOCK purchase system (no real payments):
- [ ] Create `src/services/payments/mockPayments.ts`:
  - [ ] `purchaseLeaguePack(packId: string): Promise<PurchaseResult>`
  - [ ] Simulate processing delay (2 seconds)
  - [ ] Always return success (for testing)
  - [ ] Store purchase in localStorage
- [ ] Create Pinia store `src/stores/purchaseStore.ts`:
  - [ ] State: `purchasedPacks: string[]`
  - [ ] Action: `purchasePack(packId)`
  - [ ] Getter: `isPurchased(packId): boolean`
  - [ ] Persist to localStorage
- [ ] Implement purchase flow:
  - [ ] User clicks "Buy" → show PurchaseModal
  - [ ] User confirms → show loading spinner
  - [ ] Mock payment processing (2 sec delay)
  - [ ] Success → show success toast, unlock league pack
  - [ ] Update UI immediately (show "Owned" badge)
  - [ ] Redirect to category selector with new pack available

### 7.2 Future Payment Gateway Integration (Documentation)
Document how to integrate real payments later:
- [ ] Create `docs/payment-integration.md` with notes:
  - [ ] Option 1: Stripe Checkout (easiest for web)
  - [ ] Option 2: PayPal
  - [ ] Option 3: Web Monetization API
  - [ ] Need backend to process payments securely
  - [ ] Store purchase receipts in Firebase
  - [ ] Implement server-side verification
  - [ ] Handle refunds and disputes
- [ ] Leave placeholder in code for real payment gateway:
```typescript
// TODO: Replace mockPayments with real Stripe integration
// import { purchaseWithStripe } from './stripePayments'
import { purchaseLeaguePack } from './mockPayments'
```

### 7.3 Purchase Restoration & Account Sync
- [ ] Create "Restore Purchases" button in Store view
- [ ] Implement restoration logic:
  - [ ] Check localStorage for purchases
  - [ ] In future: Query Firebase for user's purchase history
  - [ ] Sync purchases across devices (when Firebase Auth added)
- [ ] Handle edge cases:
  - [ ] User clears browser data → purchases lost (warn user)
  - [ ] Multiple purchases of same pack → prevent duplicates
  - [ ] Refund handling (future)

---

## Phase 8: Testing & Quality Assurance

### 8.1 Unit Testing (Vitest)
- [ ] Test game logic functions:
  - [ ] `scoring.ts` - All scoring calculations
  - [ ] `gameRules.ts` - Win conditions, validation
  - [ ] `turnManager.ts` - Turn switching logic
  - [ ] `questionGenerator.ts` - Question generation edge cases
- [ ] Test Pinia stores:
  - [ ] Game state mutations
  - [ ] Purchase state updates
- [ ] Test utility functions:
  - [ ] localStorage save/load
  - [ ] API response parsing
- [ ] Run tests: `npm run test:unit`
- [ ] Aim for 70%+ code coverage on business logic

### 8.2 Component Testing
- [ ] Test UI components render correctly:
  - [ ] BaseButton with different props
  - [ ] ScoreBoard with different player states
  - [ ] Modal open/close functionality
- [ ] Test user interactions:
  - [ ] Form submissions
  - [ ] Button clicks
  - [ ] Input validation
- [ ] Use Vue Testing Library or Vitest + Happy DOM

### 8.3 Integration Testing
- [ ] Test complete game flow:
  - [ ] Home → Setup → Game → Game Over → Home
  - [ ] Answer submission flow
  - [ ] Turn switching
  - [ ] Score updates
- [ ] Test purchase flow:
  - [ ] Browse store → select pack → purchase → unlock categories
- [ ] Test state persistence:
  - [ ] Start game → refresh page → game resumes
- [ ] Test error scenarios:
  - [ ] API failure → show error message
  - [ ] Invalid player name → show validation error
  - [ ] Network offline → use cached data

### 8.4 Manual Testing Checklist
- [ ] **Game Setup:**
  - [ ] Can enter player names
  - [ ] Can select category
  - [ ] Cannot start without both steps complete
- [ ] **Gameplay:**
  - [ ] Question displays correctly
  - [ ] Can submit answer
  - [ ] Score updates correctly
  - [ ] Double points (21) works
  - [ ] Turn switches properly
  - [ ] Game ends when player reaches ≤0
  - [ ] Correct winner declared
- [ ] **Navigation:**
  - [ ] All page transitions work
  - [ ] Back button works
  - [ ] Browser back/forward handled gracefully
- [ ] **Purchase Flow:**
  - [ ] Can browse league packs
  - [ ] Can "purchase" pack (mock)
  - [ ] Locked categories become available after purchase
  - [ ] "Owned" badge shows on purchased packs
  - [ ] Restore purchases works
- [ ] **Persistence:**
  - [ ] Game saves automatically
  - [ ] Can resume after refresh
  - [ ] Purchases persist after refresh
  - [ ] Can clear saved game
- [ ] **Error Handling:**
  - [ ] API errors show user-friendly message
  - [ ] Network offline → graceful fallback
  - [ ] Invalid input → validation error shown
  - [ ] Console has no critical errors

### 8.5 Performance Testing
- [ ] Run Lighthouse audit (target scores):
  - [ ] Performance: 90+
  - [ ] Accessibility: 90+
  - [ ] Best Practices: 90+
  - [ ] SEO: 90+
- [ ] Check bundle size: `npm run build`
  - [ ] Target: < 500KB total JavaScript
  - [ ] Target: < 200KB initial load
- [ ] Test on slow 3G connection (Chrome DevTools Network throttling)
  - [ ] Page should be interactive in < 5 seconds
- [ ] Check memory usage (Chrome DevTools Performance tab)
  - [ ] No memory leaks during extended gameplay

---

## Phase 9: Deployment & Launch Preparation

### 9.1 Production Build Optimization
- [ ] Update `vite.config.ts` for production:
```typescript
build: {
  minify: 'terser',
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['vue', 'vue-router', 'pinia'],
        'firebase': ['firebase/app', 'firebase/auth']
      }
    }
  }
}
```
- [ ] Enable CSS purging in Tailwind config
- [ ] Optimize images (use WebP, compress)
- [ ] Add meta tags for SEO in `index.html`:
  - [ ] `<title>Football 501 - Darts-Inspired Football Trivia Game</title>`
  - [ ] `<meta name="description" content="...">`
  - [ ] Open Graph tags for social sharing
  - [ ] Favicon and app icons
- [ ] Test production build locally: `npm run build && npm run preview`

### 9.2 Environment Configuration
- [ ] Create `.env.production` file:
  - [ ] Production API keys
  - [ ] Production Firebase config
  - [ ] Analytics tracking ID (if using)
- [ ] Verify environment variables are loaded correctly
- [ ] Document environment setup in `README.md`

### 9.3 Netlify Deployment Setup
- [ ] Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```
- [ ] Connect GitHub repository to Netlify:
  - [ ] Log into Netlify dashboard
  - [ ] "New site from Git" → select GitHub repo
  - [ ] Configure build settings (auto-detected from netlify.toml)
  - [ ] Add environment variables in Netlify dashboard
- [ ] Set up custom domain (optional):
  - [ ] Purchase domain (Namecheap, Cloudflare, etc.)
  - [ ] Add domain in Netlify DNS settings
  - [ ] Configure DNS records (A, CNAME)
  - [ ] Enable HTTPS (automatic with Netlify)
- [ ] Configure continuous deployment:
  - [ ] Auto-deploy on push to `main` branch
  - [ ] Deploy previews for pull requests
- [ ] Deploy to production:
  - [ ] Trigger initial deploy
  - [ ] Monitor build logs for errors
  - [ ] Visit live URL and test

### 9.4 Post-Deployment Verification
- [ ] Test production site end-to-end:
  - [ ] All pages load correctly
  - [ ] API calls work (check Football API key)
  - [ ] Assets load (images, fonts)
  - [ ] No console errors
  - [ ] Mobile responsive layout works
  - [ ] Purchase flow works (mock)
  - [ ] localStorage persistence works
- [ ] Check production performance:
  - [ ] Run Lighthouse on live URL
  - [ ] Test on real mobile device
  - [ ] Check load time from different locations (US, Europe, Asia)
- [ ] Set up monitoring (optional but recommended):
  - [ ] Netlify Analytics (built-in, paid)
  - [ ] Google Analytics 4 (free)
  - [ ] Sentry for error tracking (free tier available)

### 9.5 Launch Checklist
- [ ] Legal pages:
  - [ ] Privacy Policy (required if collecting data)
  - [ ] Terms of Service
  - [ ] Cookie Policy (if using cookies)
- [ ] Create landing page content:
  - [ ] Clear value proposition
  - [ ] "How to Play" instructions
  - [ ] Screenshots/GIFs of gameplay
  - [ ] Testimonials (if beta tested)
- [ ] Prepare marketing materials:
  - [ ] Social media posts (Twitter, Facebook, Reddit)
  - [ ] Product Hunt launch post
  - [ ] Email to friends/family for initial users
- [ ] Set up analytics goals:
  - [ ] Track game starts
  - [ ] Track game completions
  - [ ] Track store visits
  - [ ] Track (mock) purchases
- [ ] Launch! 🚀

---

## Phase 10: Post-Launch & Iteration

### 10.1 Monitor & Gather Feedback (Week 1-2)
- [ ] Monitor analytics:
  - [ ] Daily active users (DAU)
  - [ ] Game completion rate
  - [ ] Average session length
  - [ ] Store visit rate
  - [ ] Mock purchase rate
- [ ] Set up user feedback channel:
  - [ ] Feedback form on website
  - [ ] Email address for bug reports
  - [ ] Social media monitoring
- [ ] Track bugs and issues:
  - [ ] Create GitHub Issues for reported bugs
  - [ ] Prioritize by severity (critical, major, minor)
  - [ ] Fix critical bugs immediately
- [ ] Gather qualitative feedback:
  - [ ] What do users love?
  - [ ] What's confusing?
  - [ ] What features do they want?
  - [ ] What's the willingness to pay?

### 10.2 Optimization Phase (Week 3-4)
- [ ] Analyze user behavior:
  - [ ] Where do users drop off?
  - [ ] Which categories are most popular?
  - [ ] Are users visiting the store?
  - [ ] Are users attempting (mock) purchases?
- [ ] A/B testing ideas:
  - [ ] Test different DLC pricing ($1.99 vs $2.49)
  - [ ] Test bundle discount (40% vs 50%)
  - [ ] Test CTA button text ("Buy Now" vs "Unlock League")
  - [ ] Test store placement (top nav vs in-game prompt)
- [ ] Quick wins:
  - [ ] Fix any UX friction points
  - [ ] Add most-requested category
  - [ ] Improve onboarding if users are confused
  - [ ] Optimize slow-loading screens

### 10.3 Feature Expansion (Month 2-3)
- [ ] Implement most-requested features from feedback
- [ ] Add new Premier League categories (keep free tier valuable)
- [ ] Add first paid league pack (start with most popular league)
- [ ] Implement real payment processing:
  - [ ] Integrate Stripe Checkout
  - [ ] Set up Firebase Functions for payment webhook
  - [ ] Secure backend purchase verification
  - [ ] Test payment flow with real money (small amounts)
- [ ] Launch paid DLC:
  - [ ] Announce via email/social media
  - [ ] Offer launch discount (50% off first week)
  - [ ] Monitor conversion rate closely

---

## Phase 11: Future Features (Months 4-12)

### 11.1 Firebase Authentication & Online Multiplayer
- [ ] Implement Firebase Authentication:
  - [ ] Email/password signup
  - [ ] Google OAuth login
  - [ ] Profile page (username, avatar, stats)
- [ ] Set up Firestore collections:
```
users/
  {userId}/
    username, email, createdAt, stats, purchasedLeagues

games/
  {gameId}/
    player1Id, player2Id, status, scores, currentTurn, questions, createdAt

purchases/
  {purchaseId}/
    userId, leaguePackId, price, timestamp, stripePaymentId
```
- [ ] Implement online matchmaking:
  - [ ] "Find Opponent" button (random matchmaking)
  - [ ] Or "Create Room" with shareable code
  - [ ] Real-time game state sync via Firestore
- [ ] Handle disconnections gracefully:
  - [ ] Save game state to Firestore
  - [ ] Allow reconnection within 5 minutes
  - [ ] Award win to connected player if opponent abandons
- [ ] Add Firebase Cloud Functions for:
  - [ ] Purchase verification (Stripe webhooks)
  - [ ] Anti-cheat validation
  - [ ] Leaderboard calculations

### 11.2 Additional Monetization Features
- [ ] Add subscription tier ($2.99/month):
  - [ ] Access to all league packs
  - [ ] Ad-free experience (if ads added)
  - [ ] Exclusive cosmetics (themes, badges)
  - [ ] Weekly new categories
- [ ] Implement ad system (optional):
  - [ ] Google AdSense or AdMob
  - [ ] Banner ads (non-intrusive)
  - [ ] Rewarded video ads (watch ad for hint)
  - [ ] Interstitial ads (after game completion, max 1 per session)
- [ ] Add cosmetic purchases:
  - [ ] Custom themes ($0.99 each)
  - [ ] Player avatars ($0.99 each)
  - [ ] Celebration animations ($0.99 each)
- [ ] Create season pass ($4.99 per season):
  - [ ] Exclusive challenges
  - [ ] Limited-time categories
  - [ ] Cosmetic rewards
  - [ ] Leaderboard prizes

### 11.3 Engagement Features
- [ ] Daily challenges:
  - [ ] New challenge every 24 hours
  - [ ] Special rewards for completing
  - [ ] Streak tracking (consecutive days played)
- [ ] Leaderboards:
  - [ ] Global leaderboard (all-time)
  - [ ] Weekly leaderboard (resets every Monday)
  - [ ] Friends leaderboard (compare with friends)
  - [ ] Category-specific leaderboards
- [ ] Achievements system:
  - [ ] "First Win"
  - [ ] "Perfect Game" (all answers correct)
  - [ ] "League Champion" (play 100 games in a league)
  - [ ] "Hat Trick" (3 wins in a row)
  - [ ] Badge display on profile
- [ ] Social features:
  - [ ] Add friends
  - [ ] Challenge friend to match
  - [ ] Share results on social media
  - [ ] In-game chat (moderated)

### 11.4 Content Expansion
- [ ] Add more league packs:
  - [ ] Portuguese Primeira Liga ($1.99)
  - [ ] Dutch Eredivisie ($1.99)
  - [ ] Brazilian Serie A ($1.99)
  - [ ] Argentine Primera División ($1.99)
  - [ ] MLS (Major League Soccer) ($1.99)
- [ ] Special tournament packs:
  - [ ] Champions League Pack ($2.99)
  - [ ] World Cup Pack ($2.99)
  - [ ] Euro Championship Pack ($2.99)
- [ ] Historic player packs:
  - [ ] 1990s Legends ($1.99)
  - [ ] 2000s Icons ($1.99)
  - [ ] All-Time Greats ($2.99)
- [ ] Create themed bundles:
  - [ ] "European Elite Bundle" ($9.99 - Top 5 leagues + Champions League)
  - [ ] "World Football Bundle" ($12.99 - all leagues)
  - [ ] "Ultimate Pack" ($19.99 - everything)

---

## Tech Stack Summary

**Frontend:** Vue 3 + TypeScript + Tailwind CSS + Pinia  
**Football Data:** API-Football Pro ($19/month)  
**Backend (Future):** Firebase (Blaze Pay-as-you-go, est. $5-10/month)  
**Hosting:** Netlify (Free tier)  
**Payments (Future):** Stripe Checkout  
**Estimated Monthly Cost:** $19 initially, $24-29 with online multiplayer

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm run test:unit

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (after connecting to Netlify)
git push origin main
```

---

## Resources & Documentation

**Vue 3 Docs:** https://vuejs.org/guide/introduction.html  
**Pinia Docs:** https://pinia.vuejs.org/  
**Tailwind CSS Docs:** https://tailwindcss.com/docs  
**API-Football Docs:** https://www.api-football.com/documentation-v3  
**Firebase Docs:** https://firebase.google.com/docs  
**Netlify Docs:** https://docs.netlify.com/  
**Stripe Docs:** https://stripe.com/docs  

---

## Notes

- Start with local multiplayer and mock payments to validate concept
- Focus on Premier League content quality for free tier
- Monitor analytics closely to understand user behavior
- Test pricing with A/B tests before committing
- Real payment integration should wait until product-market fit is proven
- Prioritize performance - web games need fast load times
- Keep the core gameplay fun and engaging - monetization is secondary

---

**Last Updated:** October 6, 2025  
**Version:** 1.0 - Initial Launch Roadmap
