Understood. We’ll redesign this as a **cloud-based web application** with AI features powered by the **Gemini API**, instead of a local desktop system.

Below is a clean, incremental build prompt you can give to your AI code editor.

---

# MASTER PROMPT

## Project: AI-Powered Cognitive Burnout Prevention Web App

### Goal

Build a full-stack web application that:

* Tracks user productivity and behavioral signals (via browser APIs only)
* Uses Gemini API for intelligent fatigue interpretation & recovery suggestions
* Applies progressive friction mechanisms
* Provides dashboards & predictive analytics
* Is privacy-conscious but cloud-based
* Uses secure authentication

---

# Recommended Stack

Frontend:

* Next.js (React)
* TailwindCSS
* Zustand or Redux (state management)

Backend:

* Node.js (Express or Next API routes)
* PostgreSQL (Supabase)
* Prisma ORM

AI Layer:

* Google Gemini API (for fatigue analysis + recommendations)

---

# PHASE 0 — Project Setup

### Prompt to AI Code Editor:

> Create a full-stack Next.js app with:
>
> * Authentication (email/password + OAuth optional)
> * PostgreSQL database via Prisma
> * Secure environment variable storage for GEMINI_API_KEY
> * Protected dashboard route
> * User settings table
>
> Create tables:
> User
> DailyMetrics
> FatigueScores
> RecoveryDebt
> Tasks
> InterventionsLog
>
> Use JWT-based auth.

---

# PHASE 1 — Browser-Based Detection Features

⚠ Since this is a web app, we cannot monitor system-wide activity.
We only track in-browser behavioral signals.

---

## 1.1 Keystroke Fatigue Detector

### Prompt:

> Implement a React hook that:
>
> * Tracks keypress timestamps inside the app
> * Measures inter-key latency
> * Tracks backspace frequency
> * Calculates rolling 5-minute averages
> * Sends anonymized metrics to backend every 60 seconds
>
> Backend:
>
> * Store in DailyMetrics table
> * Compute deviation from user baseline
>
> Return fatigue_score (0–100).

---

## 1.2 Tab Visibility & Focus Tracking

### Prompt:

> Implement:
>
> * Page Visibility API tracking
> * Detect tab switching frequency
> * Count focus/blur events
>
> If frequent switching:
> flag fragmented_attention_score.
>
> Store metrics server-side.

---

## 1.3 Scroll Behavior Monitoring

### Prompt:

> Track scroll depth + scroll frequency.
> If repeated scroll bursts without clicks:
>
> * Flag passive consumption pattern
>
> Send metrics to backend every minute.

---

# PHASE 2 — Gemini AI Integration

Now we introduce AI intelligence.

---

## 2.1 Fatigue Interpretation Layer

### Prompt:

> Create backend endpoint:
> POST /analyze-fatigue
>
> Send:
>
> * fatigue_score
> * fragmentation_score
> * passive_score
> * session_duration
> * task_completion_rate
>
> Call Gemini API with structured prompt:
>
> "Given these cognitive metrics, classify:
>
> 1. Mental State
> 2. Risk Level
> 3. Likely Fatigue Type
> 4. Immediate Recommendation"
>
> Return structured JSON response.
>
> Cache AI responses to avoid excess API calls.

---

## 2.2 Contextual Recovery Prescriptions

### Prompt:

> Use Gemini to generate:
>
> * Short actionable recovery prescription (2–3 sentences)
> * No generic advice
> * Must be specific to detected fatigue type
>
> Example:
> If visual fatigue detected → suggest analog break
> If cognitive overload → suggest breathing reset
>
> Store AI output in database.

---

## 2.3 Predictive "Digital Sunburn" Model

### Prompt:

> Build recovery_debt formula:
> recovery_debt += (high_load_minutes - baseline_capacity)
>
> Send to Gemini:
> "Given recovery_debt = X, estimate productivity drop tomorrow."
>
> Return predicted_drop_percentage.
>
> Store prediction.

---

# PHASE 3 — Intervention Engine (Web-Based)

Since this is web-only, interventions are UI-based.

---

## 3.1 Grayscale Mode (Web Version)

### Prompt:

> When risk_level = Critical:
>
> * Apply CSS filter: grayscale(100%)
> * Show overlay warning modal
> * Require user to confirm continuation
>
> Log event in InterventionsLog.

---

## 3.2 Artificial Latency

### Prompt:

> Wrap navigation events with:
> if risk_level >= Elevated:
> await delay(1000)
>
> Display message:
> "System slowing to match cognitive bandwidth."
>
> Make toggleable in settings.

---

## 3.3 Social PACT Feature

### Prompt:

> Allow user to add accountability partner email.
> If Critical state ignored 3 times:
>
> * Send email via SendGrid
> * Subject: Wellness Check
> * Log in database
>
> Include cooldown logic.

---

# PHASE 4 — Productivity & Task System

---

## 4.1 Energy-Based Task Manager

### Prompt:

> Create task CRUD.
> Each task has energy_level:
>
> * High
> * Medium
> * Low
>
> If fatigue detected:
>
> * Auto-sort low-energy tasks to top
>
> Allow manual override.

---

## 4.2 Weekly Post-Mortem Dashboard

### Prompt:

> Build analytics dashboard:
>
> * Session duration
> * AI risk levels over time
> * Task completion efficiency
> * Recovery debt accumulation
>
> Show:
> Overwork vs Efficiency chart (Recharts)
>
> Clean, minimal UI.

---

# PHASE 5 — Ethics & Consent System

---

## 5.1 Enforcement Levels

### Prompt:

> Add user setting:
> enforcement_level:
> 0 – Monitor only
> 1 – AI warnings
> 2 – UI friction
> 3 – Social PACT enabled
>
> Ensure features obey this flag.

---

## 5.2 Emergency Escape Hatch

### Prompt:

> Add:
> "Override for 15 Minutes"
>
> When clicked:
>
> * Disable interventions temporarily
> * Increase recovery_debt penalty
> * Log event
> * Auto-reactivate after 15 mins

---

# Gemini API Prompt Template (Use This)

Use this structured system prompt in backend:

```
You are a cognitive performance analyst AI.

Input:
- fatigue_score: {number}
- fragmentation_score: {number}
- passive_score: {number}
- session_duration: {minutes}
- recovery_debt: {number}

Return STRICT JSON:

{
  "mental_state": "",
  "risk_level": "Normal | Elevated | Critical",
  "fatigue_type": "",
  "recommendation": "",
  "predicted_productivity_drop": ""
}
```

Force JSON response only.

---

# Important Design Rules

* Never store raw keystrokes
* Only store metrics
* Use rate limiting for Gemini
* Add cost guardrails
* Encrypt sensitive fields
* Make AI optional (fallback to heuristic model)

---
