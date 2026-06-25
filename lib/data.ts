import type { Video, Plan, Badge, TeamMember, Profile } from '@/types'

export const VIDEOS: Video[] = [
  // Serving
  { id: 'v1', title: 'Underhand Serve Basics', category: 'Serving', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '8:24', description: 'Master the fundamentals of the underhand serve with proper form and contact point.', xp_reward: 15 },
  { id: 'v2', title: 'Overhand Float Serve', category: 'Serving', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '11:05', description: 'Learn the float serve technique — topspin-free contact for unpredictable movement.', xp_reward: 15 },
  { id: 'v3', title: 'Jump Serve Approach & Contact', category: 'Serving', skill_level: 'Advanced', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '14:30', description: 'Full breakdown of the jump serve: toss, approach, arm swing, and contact.', xp_reward: 15 },
  // Passing
  { id: 'v4', title: 'Forearm Pass (Bump) Technique', category: 'Passing & Receiving', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '9:15', description: 'Platform technique, arm position, and reading the ball for a perfect pass.', xp_reward: 15 },
  { id: 'v5', title: 'Serve Receive Positioning', category: 'Passing & Receiving', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '12:45', description: 'Court positioning, communication, and reading the server in serve receive.', xp_reward: 15 },
  { id: 'v6', title: 'Platform Control Drills', category: 'Passing & Receiving', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '10:20', description: 'Passing accuracy drills to build platform consistency and target precision.', xp_reward: 15 },
  // Setting
  { id: 'v7', title: 'Overhead Set Fundamentals', category: 'Setting', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '8:50', description: 'Hand position, footwork, and release for a clean overhead set.', xp_reward: 15 },
  { id: 'v8', title: 'Back Set & Setter Footwork', category: 'Setting', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '13:10', description: 'Master the back set and the footwork patterns every setter must have.', xp_reward: 15 },
  { id: 'v9', title: 'Quick Set & Tempo Setting', category: 'Setting', skill_level: 'Advanced', position: 'Setter', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '16:00', description: 'Running a fast offense with 1-sets, slides, and tempo changes.', xp_reward: 15 },
  // Attacking
  { id: 'v10', title: '4-Step Approach Footwork', category: 'Attacking', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '7:30', description: 'Left-right-left-right (or right-left-right-left) — the foundation of every attack.', xp_reward: 15 },
  { id: 'v11', title: 'Arm Swing Mechanics', category: 'Attacking', skill_level: 'Intermediate', position: 'Outside Hitter', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '11:45', description: 'Bow-and-arrow load, contact point, and wrist snap for a powerful arm swing.', xp_reward: 15 },
  { id: 'v12', title: 'Line vs Cross-Court Decision Making', category: 'Attacking', skill_level: 'Advanced', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '14:20', description: 'Reading the block and defense to attack line or angle at the right moment.', xp_reward: 15 },
  // Blocking
  { id: 'v13', title: 'Block Footwork & Timing', category: 'Blocking', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '9:00', description: 'Lateral shuffle, crossover step, and jump timing for beginners.', xp_reward: 15 },
  { id: 'v14', title: 'Reading the Hitter', category: 'Blocking', skill_level: 'Intermediate', position: 'Middle', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '12:30', description: 'Pre-read cues: shoulder, approach angle, and setter tendencies.', xp_reward: 15 },
  { id: 'v15', title: 'Sealing the Block', category: 'Blocking', skill_level: 'Advanced', position: 'Middle', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '13:50', description: 'Penetration, hand angle, and closing the seam at the net.', xp_reward: 15 },
  // Defense
  { id: 'v16', title: 'Dig Technique & Platform Control', category: 'Defense', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '10:05', description: 'Low ready position, movement to the ball, and platform angle for digs.', xp_reward: 15 },
  { id: 'v17', title: 'Reading the Play & Court Coverage', category: 'Defense', skill_level: 'Intermediate', position: 'Libero', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '14:00', description: 'Positioning based on setter location, hitter tendencies, and rotation.', xp_reward: 15 },
  { id: 'v18', title: 'Sprawls & Emergency Techniques', category: 'Defense', skill_level: 'Advanced', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '11:15', description: 'Pancake, sprawl, and collapse techniques for balls you "shouldn\'t get."', xp_reward: 15 },
  // Game IQ
  { id: 'v19', title: 'Rotational Systems 101', category: 'Game IQ', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '15:20', description: 'How rotations work, overlap rules, and basic serve receive formations.', xp_reward: 15 },
  { id: 'v20', title: 'Communication & Calling the Ball', category: 'Game IQ', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '8:40', description: 'Why communication wins games — what to say and when to say it.', xp_reward: 15 },
  { id: 'v21', title: 'Reading Opponent Tendencies', category: 'Game IQ', skill_level: 'Advanced', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '17:00', description: 'Scouting hitters, setters, and liberos in real match situations.', xp_reward: 15 },
  // Strength & Conditioning
  { id: 'v22', title: 'Plyometric Jump Training', category: 'Strength & Conditioning', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '20:00', description: 'Box jumps, depth drops, and approach jumps to maximize your vertical.', xp_reward: 15 },
  { id: 'v23', title: 'Core Stability for Volleyball', category: 'Strength & Conditioning', skill_level: 'Beginner', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '18:30', description: 'Anti-rotation planks, dead bugs, and Pallof press — no equipment needed.', xp_reward: 15 },
  { id: 'v24', title: 'Shoulder Health & Arm Care', category: 'Strength & Conditioning', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '16:45', description: 'Band exercises, external rotation, and scapular stability to keep your arm healthy.', xp_reward: 15 },
  { id: 'v25', title: 'Speed & Agility: T-Drill & Ladder', category: 'Strength & Conditioning', skill_level: 'Intermediate', youtube_id: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', duration: '14:10', description: 'T-drill, cone work, and ladder footwork patterns for defensive quickness.', xp_reward: 15 },
]

export const PLANS: Plan[] = [
  {
    id: 'plan-beginner',
    title: 'Beginner Fundamentals',
    tier: 'Beginner',
    duration_weeks: 4,
    days_per_week: 3,
    session_length: '20-30 min',
    focus: 'Fundamentals, fun, and form',
    description: 'A 4-week intro plan for players ages 8-12. Build your volleyball foundation with passing, serving, and movement basics.',
    sessions: [
      { week: 1, day: 1, title: 'Day 1: Serve & Pass Basics', video_ids: ['v1', 'v4'] },
      { week: 1, day: 3, title: 'Day 2: Footwork & Core', video_ids: ['v10', 'v23'] },
      { week: 1, day: 5, title: 'Day 3: Game IQ Intro', video_ids: ['v19', 'v20'] },
      { week: 2, day: 1, title: 'Day 4: Setting Basics', video_ids: ['v7', 'v4'] },
      { week: 2, day: 3, title: 'Day 5: Defense Foundations', video_ids: ['v16', 'v13'] },
      { week: 2, day: 5, title: 'Day 6: Serve Practice', video_ids: ['v1', 'v20'] },
    ],
  },
  {
    id: 'plan-intermediate',
    title: 'Intermediate Skill Builder',
    tier: 'Intermediate',
    duration_weeks: 8,
    days_per_week: 4,
    session_length: '30-45 min',
    focus: 'Skill depth, strength base, and volleyball IQ',
    description: 'An 8-week plan for club or school players ages 12-15. Elevate your game with position-specific drills and strength training.',
    sessions: [
      { week: 1, day: 1, title: 'Float Serve & Serve Receive', video_ids: ['v2', 'v5'] },
      { week: 1, day: 2, title: 'Back Set & Arm Swing', video_ids: ['v8', 'v11'] },
      { week: 1, day: 4, title: 'Plyometrics & Agility', video_ids: ['v22', 'v25'] },
      { week: 1, day: 5, title: 'Block Timing & Reading', video_ids: ['v14', 'v17'] },
    ],
  },
  {
    id: 'plan-advanced',
    title: 'Advanced Performance',
    tier: 'Advanced',
    duration_weeks: 12,
    days_per_week: 5,
    session_length: '45-60 min',
    focus: 'Competition prep, performance, position mastery',
    description: 'A 12-week plan for competitive players ages 15-18. High-intensity training for athletes eyeing college ball.',
    sessions: [
      { week: 1, day: 1, title: 'Jump Serve & Court Coverage', video_ids: ['v3', 'v18'] },
      { week: 1, day: 2, title: 'Quick Sets & Tempo Attack', video_ids: ['v9', 'v12'] },
      { week: 1, day: 3, title: 'Sealing & Reading Hitters', video_ids: ['v15', 'v21'] },
      { week: 1, day: 4, title: 'Shoulder Care & Plyos', video_ids: ['v24', 'v22'] },
      { week: 1, day: 5, title: 'Film Study & Opponent Read', video_ids: ['v21', 'v19'] },
    ],
  },
]

export const BADGES: Badge[] = [
  { id: 'b1', name: 'First Touch', description: 'Complete your first training session', icon: '🏐', category: 'milestone' },
  { id: 'b2', name: 'Serve Master', description: 'Complete all serving videos', icon: '💥', category: 'skill' },
  { id: 'b3', name: 'Iron Blocker', description: 'Complete all blocking videos', icon: '🧱', category: 'skill' },
  { id: 'b4', name: 'Floor General', description: 'Complete all defense videos', icon: '🦎', category: 'skill' },
  { id: 'b5', name: '7-Day Streak', description: 'Train 7 days in a row', icon: '🔥', category: 'streak' },
  { id: 'b6', name: '30-Day Streak', description: 'Train 30 days in a row', icon: '🔥🔥', category: 'streak' },
  { id: 'b7', name: 'Plan Finisher', description: 'Complete a full training plan', icon: '🏆', category: 'milestone' },
  { id: 'b8', name: 'Jump Lab', description: 'Complete all jump training videos', icon: '⬆️', category: 'skill' },
  { id: 'b9', name: 'Libero Life', description: 'Complete the Libero learning path', icon: '🟡', category: 'position' },
  { id: 'b10', name: 'Setter Vision', description: 'Complete the Setter learning path', icon: '👁️', category: 'position' },
]

export const DEMO_PROFILE: Profile = {
  user_id: 'demo',
  level: 5,
  xp: 1200,
  streak_count: 9,
  last_active: new Date().toISOString(),
  skill_ratings: {
    serve: 65,
    pass: 78,
    set: 45,
    attack: 70,
    block: 50,
    defense: 72,
    fitness: 60,
  },
}

export const DEMO_TEAM: TeamMember[] = [
  { id: 't1', display_name: 'Aaliyah Johnson', level: 6, xp: 1450, streak_count: 12, last_active: new Date().toISOString(), active_plan: 'Intermediate Skill Builder' },
  { id: 't2', display_name: 'Maya Chen', level: 4, xp: 820, streak_count: 3, last_active: new Date(Date.now() - 86400000).toISOString(), active_plan: 'Beginner Fundamentals' },
  { id: 't3', display_name: 'Sofia Rodriguez', level: 8, xp: 2100, streak_count: 21, last_active: new Date().toISOString(), active_plan: 'Advanced Performance' },
  { id: 't4', display_name: 'Brianna Williams', level: 3, xp: 450, streak_count: 0, last_active: new Date(Date.now() - 604800000).toISOString() },
  { id: 't5', display_name: 'Jasmine Park', level: 5, xp: 1100, streak_count: 5, last_active: new Date().toISOString(), active_plan: 'Intermediate Skill Builder' },
  { id: 't6', display_name: 'Emma Thompson', level: 7, xp: 1800, streak_count: 15, last_active: new Date(Date.now() - 172800000).toISOString(), active_plan: 'Advanced Performance' },
]
