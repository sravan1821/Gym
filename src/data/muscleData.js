/**
 * 3D Anatomy & Muscle Exercise Database (MuscleWiki-grade Reference)
 * Includes sub-muscles, equipment filters, activation percentages,
 * step-by-step cues, biomechanics (origin/insertion/actions), and 3D pin anchors.
 */

export const EXPERIENCE_LEVELS = {
  beginner: {
    id: 'beginner',
    name: 'Beginner',
    label: 'Beginner Level',
    icon: 'Sparkles',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    description: 'Focus on proper motor patterns, mind-muscle connection, guided machine safety, and building tendon endurance.',
    recommendedSets: '2 - 3 Sets',
    recommendedReps: '10 - 15 Reps',
    recommendedRest: '90s Rest',
    frequency: '3 Days / Week (Full Body)',
  },
  intermediate: {
    id: 'intermediate',
    name: 'Intermediate',
    label: 'Intermediate Level',
    icon: 'Zap',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Focus on progressive overload, free weight compound lifts, hypertrophy volume, and RPE 7-9 intensity.',
    recommendedSets: '3 - 4 Sets',
    recommendedReps: '8 - 12 Reps',
    recommendedRest: '75s Rest',
    frequency: '4 - 5 Days / Week (Upper / Lower / PPL)',
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced',
    label: 'Advanced / High Level',
    icon: 'Flame',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    description: 'High intensity mechanical tension, supramaximal loading, intensity techniques (drop sets, myo-reps, slow eccentrics).',
    recommendedSets: '4 - 5 Sets',
    recommendedReps: '6 - 10 Reps',
    recommendedRest: '120s Rest',
    frequency: '5 - 6 Days / Week (Push Pull Legs / Specialized Splits)',
  },
};

export const EQUIPMENT_TYPES = [
  { id: 'all', label: 'All Equipment', icon: 'Sparkles' },
  { id: 'barbell', label: 'Barbell', icon: 'Dumbbell' },
  { id: 'dumbbell', label: 'Dumbbell', icon: 'Dumbbell' },
  { id: 'cables', label: 'Cables', icon: 'Activity' },
  { id: 'bodyweight', label: 'Bodyweight', icon: 'User' },
  { id: 'machine', label: 'Machine / Smith', icon: 'Layers' },
];

export const MUSCLE_GROUPS = {
  chest: {
    id: 'chest',
    name: 'Chest / Pectorals',
    simpleName: 'Chest',
    category: 'Upper Body (Push)',
    burnRate: '480 kcal/hr',
    description: 'Primary pushing powerhouse of the upper body, responsible for horizontal adduction, flexion, and internal rotation of the arm.',
    cameraPosition: [0, 1.25, 2.3],
    cameraTarget: [0, 1.15, 0],
    accentColor: '#ff2a5f',
    pin3D: [0, 1.22, 0.18],
    biomechanics: {
      origin: 'Clavicular head: anterior medial clavicle; Sternal head: sternum, upper 6 costal cartilages, and external oblique aponeurosis.',
      insertion: 'Lateral lip of the bicipital groove of the humerus (crest of greater tubercle).',
      innervation: 'Medial and Lateral Pectoral Nerves (C5-T1).',
      jointActions: [
        'Horizontal Adduction (bringing arms together across chest)',
        'Shoulder Flexion (raising arms upward - Clavicular head)',
        'Internal Shoulder Rotation',
        'Shoulder Extension from flexed position (Costal head)',
      ],
      antagonists: 'Posterior Deltoids, Rhomboids, Middle Trapezius, Infraspinatus, Teres Minor.',
      stretches: [
        {
          name: 'Doorway 90/90 Pec Stretch',
          duration: '30 - 45s per side',
          steps: 'Place forearm against doorframe at 90° angle. Step forward gently until feeling deep stretch in chest. Breathe deeply without arching lower back.',
        },
        {
          name: 'Behind-the-Back Clasp & Lift',
          duration: '30s hold',
          steps: 'Clasp fingers behind hips, straighten elbows, retract shoulder blades, and gently lift hands away from lower back.',
        },
        {
          name: 'Foam Roller Thoracic & Pec Opener',
          duration: '60s continuous',
          steps: 'Lie lengthwise along foam roller from tailbone to head. Open arms wide into "T" or "W" position and let gravity stretch the pectoral fascia.',
        },
      ],
      injuryTips: 'Retract and depress scapulae during all pressing movements to prevent impingement of the rotator cuff (supraspinatus tendon). Flare elbows no more than 45-60° from torso.',
    },
    subMuscles: [
      {
        id: 'upper_chest',
        name: 'Upper Chest',
        scientificName: 'Pectoralis Major (Clavicular Head)',
        description: 'The upper fan of muscle fibers originating from the collarbone. Creates the thick "upper shelf" connecting the neck and chest.',
        levelWorkouts: {
          beginner: [
            {
              name: 'Incline Dumbbell Press (30°)',
              equipment: 'dumbbell',
              level: 'Beginner',
              target: 'Upper Pec Shelf',
              sets: '3 Sets',
              reps: '10 - 12 Reps',
              rest: '90s',
              tempo: '3-0-1-0',
              activation: { primary: 88, secondary: [{ name: 'Front Deltoids', percent: 60 }, { name: 'Triceps', percent: 45 }] },
              simpleGuide: 'Set bench to 30°. Press dumbbells straight up over upper chest, lower with elbows at 45° angle.',
              whyItWorks: '30° incline places maximum mechanical tension directly on the clavicular fibers while minimizing front delt takeover.',
              cues: {
                setup: 'Bench at 30° incline. Dumbbells held at shoulder height with neutral or semi-pronated grip.',
                execution: 'Drive dumbbells straight up in a gentle arc over the upper chest. Squeeze at top without clanking dumbbells.',
                focus: 'Think of driving your inner biceps toward your collarbone.',
                commonMistakes: ['Setting incline too steep (>45° turning it into a shoulder press)', 'Bouncing at the bottom', 'Flaring elbows at 90°'],
              },
            },
            {
              name: 'Incline Machine Chest Press',
              equipment: 'machine',
              level: 'Beginner',
              target: 'Upper Chest Activation',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-1-1-0',
              activation: { primary: 85, secondary: [{ name: 'Front Delts', percent: 50 }, { name: 'Triceps', percent: 40 }] },
              simpleGuide: 'Sit with back flat against pad. Push handles smoothly upward, squeezing upper pecs at peak.',
              whyItWorks: 'Fixed path of motion allows beginners to safely recruit upper chest fibers without balance instability.',
              cues: {
                setup: 'Adjust seat height so handles align with upper clavicle level.',
                execution: 'Press forward and slightly upward to full extension without locking elbows violently.',
                focus: 'Maintain tight scapular retraction against the pad.',
                commonMistakes: ['Rounding shoulders forward at top', 'Seat set too low'],
              },
            },
            {
              name: 'Incline Push-Ups (Hands on Bench)',
              equipment: 'bodyweight',
              level: 'Beginner',
              target: 'Clavicular Pec & Core',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-0-1-0',
              activation: { primary: 75, secondary: [{ name: 'Triceps', percent: 50 }, { name: 'Core', percent: 40 }] },
              simpleGuide: 'Hands placed on elevated bench or sturdy box, lower upper chest to touch box, press back up.',
              whyItWorks: 'Gentle bodyweight angle allows beginners to build pressing stamina and mind-muscle connection.',
              cues: {
                setup: 'Hands shoulder-width on bench, straight line from heels to crown of head.',
                execution: 'Lower chest until touching edge of bench, press back up maintaining rigid plank.',
                focus: 'Squeeze glutes and abs throughout.',
                commonMistakes: ['Sagging hips', 'Craning neck forward'],
              },
            },
          ],
          intermediate: [
            {
              name: 'Incline Barbell Bench Press',
              equipment: 'barbell',
              level: 'Intermediate',
              target: 'Clavicular Mass Overload',
              sets: '4 Sets',
              reps: '8 - 10 Reps',
              rest: '90s',
              tempo: '3-1-1-0',
              activation: { primary: 92, secondary: [{ name: 'Anterior Delts', percent: 65 }, { name: 'Triceps', percent: 55 }] },
              simpleGuide: 'Set bench to 30°. Lower bar under control to touch upper clavicle line, press up explosively.',
              whyItWorks: 'Heavy compound overload for maximum mechanical tension and upper chest hypertrophy.',
              cues: {
                setup: 'Eyes directly under bar. Grip 1.5x shoulder width with full thumb wrap.',
                execution: 'Unrack, lower bar to upper chest in 3 seconds, pause 1s on chest, drive bar up to eye level.',
                focus: 'Drive feet into floor and maintain arched upper back.',
                commonMistakes: ['Bouncing bar off collarbone', 'Lifting hips off the bench', 'Uneven grip'],
              },
            },
            {
              name: 'Low-to-High Cable Flye',
              equipment: 'cables',
              level: 'Intermediate',
              target: 'Upper Chest Contraction',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-1-1-1',
              activation: { primary: 90, secondary: [{ name: 'Anterior Delts', percent: 40 }, { name: 'Serratus', percent: 35 }] },
              simpleGuide: 'Set pulleys to bottom pin. Sweep handles up and together in front of eyes with pinkies slightly rotated inward.',
              whyItWorks: 'Constant cable tension directly matches the upward fiber angle of the clavicular head.',
              cues: {
                setup: 'Staggered stance, pulleys low behind you, slight forward torso lean.',
                execution: 'Scoop hands upward in an arc meeting at forehead level. Squeeze upper chest for 1 second.',
                focus: 'Imagine scooping water toward your chin with your biceps.',
                commonMistakes: ['Using excessive body swing', 'Bending elbows too much turning it into a curl'],
              },
            },
            {
              name: 'Decline Feet-Elevated Push-Ups',
              equipment: 'bodyweight',
              level: 'Intermediate',
              target: 'Upper Chest Power',
              sets: '4 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-1-1-0',
              activation: { primary: 86, secondary: [{ name: 'Front Delts', percent: 60 }, { name: 'Triceps', percent: 55 }] },
              simpleGuide: 'Place feet on elevated bench or box. Lower chest to floor, push back up explosively.',
              whyItWorks: 'Elevating feet shifts gravitational center directly onto upper pecs and shoulders.',
              cues: {
                setup: 'Toes on bench, hands on floor slightly wider than shoulders.',
                execution: 'Lower forehead/upper chest toward floor, press up without arching lumbar spine.',
                focus: 'Keep elbows tucked at 45° angle.',
                commonMistakes: ['Hyperextending spine', 'Incomplete range of motion'],
              },
            },
          ],
          advanced: [
            {
              name: 'Reverse-Grip Barbell Bench Press',
              equipment: 'barbell',
              level: 'Advanced',
              target: 'Clavicular Fiber Recruitment',
              sets: '4 Sets',
              reps: '6 - 8 Reps',
              rest: '120s',
              tempo: '3-1-1-0',
              activation: { primary: 95, secondary: [{ name: 'Triceps', percent: 60 }, { name: 'Front Delts', percent: 35 }] },
              simpleGuide: 'Supinated (underhand) grip on flat bench. Lower bar to lower sternum, press upward in arc.',
              whyItWorks: 'EMG studies prove reverse grip increases upper pec activation by up to 30% while reducing shoulder strain.',
              cues: {
                setup: 'Use a spotter or safety pins. Thumbs wrapped underhand, hands shoulder-width apart.',
                execution: 'Tuck elbows tight to sides, lower bar under strict control to sternum, press back over shoulders.',
                focus: 'Squeeze your upper pecs together as the bar travels upward.',
                commonMistakes: ['Using too wide a reverse grip which strains wrists', 'Dropping bar fast'],
              },
            },
            {
              name: 'Landmine Incline Chest Press',
              equipment: 'barbell',
              level: 'Advanced',
              target: 'Unilateral Upper Pec Peak',
              sets: '4 Sets per arm',
              reps: '10 - 12 Reps',
              rest: '75s',
              tempo: '2-1-1-1',
              activation: { primary: 90, secondary: [{ name: 'Serratus', percent: 55 }, { name: 'Core', percent: 50 }] },
              simpleGuide: 'Stand holding the end of landmine barbell at shoulder. Press upward and forward across midline.',
              whyItWorks: 'Arcing path matches natural scapulohumeral rhythm for superior upper chest and serratus development.',
              cues: {
                setup: 'Half-kneeling or athletic standing stance, barbell cupped in palm at collarbone.',
                execution: 'Press explosively along the arc, leaning slightly forward at peak contraction.',
                focus: 'Cross the barbell slightly across the body midline for maximum clavicular squeeze.',
                commonMistakes: ['Twisting spine excessively', 'Flaring elbow out'],
              },
            },
          ],
        },
      },
      {
        id: 'mid_chest',
        name: 'Mid Chest',
        scientificName: 'Pectoralis Major (Sternal Head)',
        description: 'The largest middle slab of the chest originating from the breastbone. Responsible for horizontal pushing power and overall chest thickness.',
        levelWorkouts: {
          beginner: [
            {
              name: 'Seated Machine Chest Press',
              equipment: 'machine',
              level: 'Beginner',
              target: 'Overall Mid Chest',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '90s',
              tempo: '2-1-1-0',
              activation: { primary: 90, secondary: [{ name: 'Triceps', percent: 50 }, { name: 'Front Delts', percent: 45 }] },
              simpleGuide: 'Sit with back flat against pad. Push handles forward until arms are almost straight, return slowly.',
              whyItWorks: 'Guided motion prevents shoulder injury while building mind-muscle connection and neuromuscular coordination.',
              cues: {
                setup: 'Handles level with mid-sternum. Feet flat on floor.',
                execution: 'Press forward smoothly, avoid locking elbows violently, return with 2-second eccentric.',
                focus: 'Keep chest puffed high and shoulders pinned back into the seat.',
                commonMistakes: ['Letting shoulders roll forward at full extension', 'Using momentum'],
              },
            },
            {
              name: 'Flat Dumbbell Press',
              equipment: 'dumbbell',
              level: 'Beginner',
              target: 'Sternal Pec Development',
              sets: '3 Sets',
              reps: '10 - 12 Reps',
              rest: '90s',
              tempo: '3-0-1-0',
              activation: { primary: 88, secondary: [{ name: 'Triceps', percent: 45 }, { name: 'Front Delts', percent: 40 }] },
              simpleGuide: 'Lie flat, press dumbbells up over mid-chest, lower with elbows at 45° angle.',
              whyItWorks: 'Allows natural wrist rotation and a deeper stretch than a fixed barbell.',
              cues: {
                setup: 'Plant feet, squeeze shoulder blades together onto bench.',
                execution: 'Lower dumbbells until level with chest, press straight up and inward.',
                focus: 'Feel the stretch in the mid pecs at the bottom before initiating the press.',
                commonMistakes: ['Bouncing weights off chest', 'Flaring elbows 90°'],
              },
            },
            {
              name: 'Standard Floor Push-Ups',
              equipment: 'bodyweight',
              level: 'Beginner',
              target: 'Mid Chest & Core Stability',
              sets: '3 Sets',
              reps: '10 - 15 Reps',
              rest: '60s',
              tempo: '2-0-1-0',
              activation: { primary: 80, secondary: [{ name: 'Triceps', percent: 55 }, { name: 'Core', percent: 45 }] },
              simpleGuide: 'Hands slightly wider than shoulders. Lower chest to 1 inch above floor, push back up.',
              whyItWorks: 'Foundational movement that builds relative body strength and core bracing.',
              cues: {
                setup: 'Hands beneath shoulders, fingers spread, body forming rigid plank.',
                execution: 'Lower chest to floor, drive through palms to return to top.',
                focus: 'Tuck elbows at 45° like an arrow shape.',
                commonMistakes: ['Dipping lower back', 'Flaring elbows wide'],
              },
            },
          ],
          intermediate: [
            {
              name: 'Barbell Flat Bench Press',
              equipment: 'barbell',
              level: 'Intermediate',
              target: 'Mid Chest Mass & Power',
              sets: '4 Sets',
              reps: '8 - 10 Reps',
              rest: '90s',
              tempo: '3-1-1-0',
              activation: { primary: 95, secondary: [{ name: 'Triceps', percent: 65 }, { name: 'Anterior Delts', percent: 60 }] },
              simpleGuide: 'Plant feet flat, grip bar slightly wider than shoulder-width. Lower to mid-chest and press up with power.',
              whyItWorks: 'The gold standard compound strength builder for overall upper body pressing mass.',
              cues: {
                setup: 'Retract scapulae, squeeze glutes, arch upper back, grip bar with white-knuckle firmness.',
                execution: 'Unrack, lower bar to nipple line in 3 seconds, touch lightly, drive bar up and slightly back toward eyes.',
                focus: 'Push yourself away from the bar into the bench using leg drive.',
                commonMistakes: ['Lifting butt off the bench', 'Flaring elbows 90° out', 'Bouncing off sternum'],
              },
            },
            {
              name: 'Standing Cable Crossover (Mid-Chest)',
              equipment: 'cables',
              level: 'Intermediate',
              target: 'Mid Chest Squeeze & Definition',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-1-1-1',
              activation: { primary: 92, secondary: [{ name: 'Anterior Delts', percent: 35 }, { name: 'Biceps Short Head', percent: 25 }] },
              simpleGuide: 'Set cables at chest height. Bring hands together in front of chest like hugging a giant barrel.',
              whyItWorks: 'Delivers maximum continuous tension at the fully shortened (peak contraction) position.',
              cues: {
                setup: 'Pulleys at mid-height, take one step forward into split stance.',
                execution: 'Bring hands together in front of sternum with slight bend in elbows. Cross hands slightly for extra squeeze.',
                focus: 'Concentrate on squeezing the inner pectoral cleavage.',
                commonMistakes: ['Bending and straightening elbows during the flye', 'Shrugging shoulders'],
              },
            },
            {
              name: 'Pec Deck Flye Machine',
              equipment: 'machine',
              level: 'Intermediate',
              target: 'Sternal Isolation',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-1-1-1',
              activation: { primary: 90, secondary: [{ name: 'Anterior Delts', percent: 30 }] },
              simpleGuide: 'Sit with back against pad. Sweep arms inward until pads meet in front of chest, hold 1s squeeze.',
              whyItWorks: 'Eliminates grip and triceps involvement for isolated pectoral recruitment.',
              cues: {
                setup: 'Seat adjusted so elbows are level with mid-chest.',
                execution: 'Bring arms together smoothly, squeeze for 1 second, control the stretch on the return.',
                focus: 'Think of pressing elbows together rather than just hands.',
                commonMistakes: ['Letting weight slam between reps', 'Over-stretching behind shoulder plane'],
              },
            },
          ],
          advanced: [
            {
              name: 'Heavy Bench Press (Pause & Wave Loading)',
              equipment: 'barbell',
              level: 'Advanced',
              target: 'Max Mechanical Tension & Density',
              sets: '5 Sets',
              reps: '5 - 6 Reps',
              rest: '150s',
              tempo: '3-2-X-0',
              activation: { primary: 98, secondary: [{ name: 'Triceps', percent: 70 }, { name: 'Anterior Delts', percent: 65 }] },
              simpleGuide: 'Tight scapula retraction, 2-second dead pause on chest, explosive press with leg drive.',
              whyItWorks: 'Dead pause eliminates stretch-shortening cycle (elastic rebound), forcing pure motor unit recruitment.',
              cues: {
                setup: 'Arch upper thoracic spine, clamp bar as hard as possible, plant heels firmly.',
                execution: 'Lower under 3s tempo, hold motionless on chest for 2s, explode up with maximal force.',
                focus: 'Drive the floor away with your legs as you initiate the press.',
                commonMistakes: ['Relaxing tightness during the pause', 'Uneven bar path'],
              },
            },
            {
              name: 'Dumbbell Squeeze Press (Hex Press)',
              equipment: 'dumbbell',
              level: 'Advanced',
              target: 'Peak Sternal & Inner Pec Contraction',
              sets: '4 Sets',
              reps: '10 - 12 Reps',
              rest: '75s',
              tempo: '3-1-1-1',
              activation: { primary: 94, secondary: [{ name: 'Triceps', percent: 50 }, { name: 'Front Delts', percent: 35 }] },
              simpleGuide: 'Press dumbbells together firmly throughout the entire repetition while pressing up and down.',
              whyItWorks: 'Combines horizontal isometric adduction with sagittal pressing for intense sternal fiber activation.',
              cues: {
                setup: 'Lie on flat bench with dumbbells pressed tightly together over chest.',
                execution: 'Lower dumbbells to touch chest while squeezing them together with 100% effort, press back up.',
                focus: 'Try to crush the dumbbells together between your palms.',
                commonMistakes: ['Letting dumbbells separate during the rep', 'Rushing the tempo'],
              },
            },
          ],
        },
      },
      {
        id: 'lower_chest',
        name: 'Lower Chest',
        scientificName: 'Pectoralis Major (Abdominal / Costal Head)',
        description: 'The bottom sweep of the pectoral muscle attaching along the lower ribs. Creates the sharp lower boundary and sculpted chest under-line.',
        levelWorkouts: {
          beginner: [
            {
              name: 'Incline Push-Up (Hands Elevated)',
              equipment: 'bodyweight',
              level: 'Beginner',
              target: 'Lower Chest Activation',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-0-1-0',
              activation: { primary: 80, secondary: [{ name: 'Triceps', percent: 50 }, { name: 'Core', percent: 35 }] },
              simpleGuide: 'Hands placed on high bench or bar. Push body upward focusing on lower chest contraction.',
              whyItWorks: 'Higher hand elevation naturally angles pressing force downward toward the costal fibers.',
              cues: {
                setup: 'Hands shoulder-width on bench, straight plank line.',
                execution: 'Lower lower chest to edge of bench, press back up.',
                focus: 'Drive downward into the bench through the heel of your palms.',
                commonMistakes: ['Piking hips', 'Flaring elbows'],
              },
            },
            {
              name: 'Decline Dumbbell Press (Light)',
              equipment: 'dumbbell',
              level: 'Beginner',
              target: 'Lower Pec Line',
              sets: '3 Sets',
              reps: '10 - 12 Reps',
              rest: '90s',
              tempo: '3-0-1-0',
              activation: { primary: 85, secondary: [{ name: 'Triceps', percent: 45 }, { name: 'Front Delts', percent: 30 }] },
              simpleGuide: 'Lie on -15° decline bench. Press dumbbells straight up over lower chest, lower with control.',
              whyItWorks: 'Decline angle minimizes shoulder strain while targeting the lower costal head directly.',
              cues: {
                setup: 'Lock legs securely into decline rollers. Keep head on pad.',
                execution: 'Press dumbbells up in a gentle inward arc, lower until elbows are at 90°.',
                focus: 'Feel the squeeze along the bottom edge of your pecs.',
                commonMistakes: ['Setting decline too steep causing blood rush', 'Loose leg lock'],
              },
            },
          ],
          intermediate: [
            {
              name: 'High-to-Low Cable Flye',
              equipment: 'cables',
              level: 'Intermediate',
              target: 'Lower Chest Underline',
              sets: '3 Sets',
              reps: '12 - 15 Reps',
              rest: '60s',
              tempo: '2-1-1-1',
              activation: { primary: 94, secondary: [{ name: 'Front Delts', percent: 30 }, { name: 'Serratus', percent: 40 }] },
              simpleGuide: 'Set pulleys high. Pull handles downward and together in front of hips like swooping downward.',
              whyItWorks: 'Downward movement arc directly aligns with the inferior fiber orientation of the costal head.',
              cues: {
                setup: 'High pulleys, staggered stance, chest upright with slight 15° forward lean.',
                execution: 'Sweep handles downward and across in front of pelvis, hold 1-second peak squeeze.',
                focus: 'Bring your hands together as low as your pockets.',
                commonMistakes: ['Bending over too far turning it into a row', 'Using too much tricep extension'],
              },
            },
            {
              name: 'Decline Barbell Bench Press',
              equipment: 'barbell',
              level: 'Intermediate',
              target: 'Costal Head Hypertrophy',
              sets: '4 Sets',
              reps: '8 - 10 Reps',
              rest: '90s',
              tempo: '3-1-1-0',
              activation: { primary: 92, secondary: [{ name: 'Triceps', percent: 60 }, { name: 'Anterior Delts', percent: 40 }] },
              simpleGuide: 'Set bench to -15° to -30°. Lower bar to bottom of ribcage, press up explosively.',
              whyItWorks: 'Allows the heaviest loading of the pectoral muscles with minimal anterior shoulder stress.',
              cues: {
                setup: 'Lock ankles under pads. Grip slightly narrower than flat bench.',
                execution: 'Lower bar to lowest point of sternum/ribs, press back up.',
                focus: 'Drive upward while keeping upper back firmly pinned.',
                commonMistakes: ['Racking the bar behind head instead of straight up', 'Dropping bar too high on chest'],
              },
            },
            {
              name: 'Parallel Bar Bodyweight Dips (Chest Lean)',
              equipment: 'bodyweight',
              level: 'Intermediate',
              target: 'Lower Pecs & Triceps',
              sets: '3 Sets',
              reps: '10 - 12 Reps',
              rest: '90s',
              tempo: '3-0-1-0',
              activation: { primary: 90, secondary: [{ name: 'Triceps', percent: 70 }, { name: 'Front Delts', percent: 55 }] },
              simpleGuide: 'Grip parallel bars, lean torso forward 30°, flare elbows slightly. Lower until upper arms are parallel to floor.',
              whyItWorks: 'Massive stretch on the lower pecs under full bodyweight load.',
              cues: {
                setup: 'Hold top of dip bars, cross ankles, lean chest forward 30°.',
                execution: 'Lower body under control until 90° elbow bend, drive through palms to return.',
                focus: 'Keep torso pitched forward throughout to prevent shifting load to triceps.',
                commonMistakes: ['Staying upright (which makes it purely triceps)', 'Going too deep and straining anterior shoulder capsule'],
              },
            },
          ],
          advanced: [
            {
              name: 'Weighted Chest Dips (Heavy Overload)',
              equipment: 'bodyweight',
              level: 'Advanced',
              target: 'Lower Pec Mass & Frame',
              sets: '4 Sets',
              reps: '6 - 8 Reps',
              rest: '120s',
              tempo: '3-1-1-0',
              activation: { primary: 96, secondary: [{ name: 'Triceps', percent: 75 }, { name: 'Front Delts', percent: 60 }] },
              simpleGuide: 'Attach weight belt. Lean forward 30°, lower slowly to full stretch, press up with maximal power.',
              whyItWorks: 'Loaded stretch under supramaximal weight produces extreme mechanical tension on costal fibers.',
              cues: {
                setup: 'Dip belt with plates between legs. Pitch torso forward.',
                execution: '3-second eccentric down to parallel, pause 1s at bottom, explode up to 95% lockout.',
                focus: 'Squeeze the lower pecs hard as you reach the top.',
                commonMistakes: ['Swinging weight plates', 'Bouncing out of the bottom position'],
              },
            },
            {
              name: 'Dumbbell Pullover (Decline Bench)',
              equipment: 'dumbbell',
              level: 'Advanced',
              target: 'Pec Minor, Costal Pec & Serratus',
              sets: '3 Sets',
              reps: '10 - 12 Reps',
              rest: '90s',
              tempo: '3-1-1-1',
              activation: { primary: 88, secondary: [{ name: 'Lats', percent: 65 }, { name: 'Serratus Anterior', percent: 60 }] },
              simpleGuide: 'Lie on decline bench with dumbbell overhead. Lower dumbbell back in an arc behind head, pull back over chest.',
              whyItWorks: 'Expands ribcage cavity and stretches pectoralis minor and costal heads under full extension.',
              cues: {
                setup: 'Lie back on decline, cup upper weight plate with both palms overhead.',
                execution: 'Lower dumbbell back behind head keeping arms slightly bent, pull back until directly over face.',
                focus: 'Squeeze chest to pull the dumbbell forward rather than using triceps.',
                commonMistakes: ['Bending elbows into a tricep extension', 'Over-arching lower back'],
              },
            },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Seated Machine Chest Press', equipment: 'machine', level: 'Beginner', target: 'Overall Mid Chest', sets: '3 Sets', reps: '12 - 15 Reps', rest: '90s', tempo: '2-1-1-0', activation: { primary: 90, secondary: [{ name: 'Triceps', percent: 50 }, { name: 'Front Delts', percent: 45 }] }, simpleGuide: 'Sit with back flat against pad. Push handles forward until arms are almost straight, return slowly.', whyItWorks: 'Guided motion prevents shoulder injury while building mind-muscle connection.' },
        { name: 'Incline Dumbbell Press (30°)', equipment: 'dumbbell', level: 'Beginner', target: 'Upper Pec Shelf', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '3-0-1-0', activation: { primary: 88, secondary: [{ name: 'Front Deltoids', percent: 60 }, { name: 'Triceps', percent: 45 }] }, simpleGuide: 'Set bench to 30°. Press dumbbells straight up over upper chest, lower with elbows at 45° angle.', whyItWorks: '30° incline places maximum mechanical tension directly on clavicular fibers.' },
        { name: 'Pec Deck Flye Machine', equipment: 'machine', level: 'Beginner', target: 'Inner Chest Squeeze', sets: '2 Sets', reps: '15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 85, secondary: [{ name: 'Front Delts', percent: 30 }] }, simpleGuide: 'Bring handles together in front like hugging a large tree. Squeeze for 1 second.', whyItWorks: 'Isolates chest fibers without straining elbows.' },
      ],
      intermediate: [
        { name: 'Barbell Flat Bench Press', equipment: 'barbell', level: 'Intermediate', target: 'Mid Chest Mass', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 95, secondary: [{ name: 'Triceps', percent: 65 }, { name: 'Anterior Delts', percent: 60 }] }, simpleGuide: 'Plant feet flat, grip bar slightly wider than shoulder-width. Lower to mid-chest and press up with power.', whyItWorks: 'The premier compound strength builder for chest mass.' },
        { name: 'Incline Barbell Bench Press', equipment: 'barbell', level: 'Intermediate', target: 'Upper Pec Mass', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 92, secondary: [{ name: 'Anterior Delts', percent: 65 }, { name: 'Triceps', percent: 55 }] }, simpleGuide: 'Set bench to 30°. Lower bar under control to touch upper clavicle line, press up explosively.', whyItWorks: 'Heavy compound overload for maximum mechanical tension and upper chest hypertrophy.' },
        { name: 'High-to-Low Cable Flye', equipment: 'cables', level: 'Intermediate', target: 'Lower Chest Underline', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 94, secondary: [{ name: 'Front Delts', percent: 30 }, { name: 'Serratus', percent: 40 }] }, simpleGuide: 'Set pulleys high. Pull handles downward and together in front of hips.', whyItWorks: 'Downward movement arc directly aligns with the inferior fiber orientation of the costal head.' },
      ],
      advanced: [
        { name: 'Heavy Bench Press (Pause & Wave Loading)', equipment: 'barbell', level: 'Advanced', target: 'Max Mechanical Tension', sets: '5 Sets', reps: '5 - 6 Reps', rest: '150s', tempo: '3-2-X-0', activation: { primary: 98, secondary: [{ name: 'Triceps', percent: 70 }, { name: 'Anterior Delts', percent: 65 }] }, simpleGuide: 'Tight scapula retraction, 2-second dead pause on chest, explosive press with leg drive.', whyItWorks: 'Dead pause eliminates stretch-shortening cycle, forcing pure motor unit recruitment.' },
        { name: 'Weighted Chest Dips', equipment: 'bodyweight', level: 'Advanced', target: 'Lower Pecs & Triceps', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 96, secondary: [{ name: 'Triceps', percent: 75 }, { name: 'Front Delts', percent: 60 }] }, simpleGuide: 'Attach weight belt. Lean forward 30°, lower slowly to full stretch, press up with maximal power.', whyItWorks: 'Loaded stretch under supramaximal weight produces extreme mechanical tension.' },
        { name: 'Reverse-Grip Barbell Bench Press', equipment: 'barbell', level: 'Advanced', target: 'Clavicular Fiber Recruitment', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 95, secondary: [{ name: 'Triceps', percent: 60 }, { name: 'Front Delts', percent: 35 }] }, simpleGuide: 'Supinated grip on flat bench. Lower to lower sternum, press while squeezing upper pec.', whyItWorks: 'EMG studies show 30% more upper pec activation vs standard grip.' },
      ],
    },
  },

  shoulders: {
    id: 'shoulders',
    name: 'Shoulders / Deltoids',
    simpleName: 'Shoulders',
    category: 'Upper Body (Push/Pull)',
    burnRate: '430 kcal/hr',
    description: 'The 3-headed muscular cap of the shoulder joint (Anterior, Lateral, Posterior) responsible for arm abduction, flexion, and rotational stability.',
    cameraPosition: [0, 1.35, 2.3],
    cameraTarget: [0, 1.25, 0],
    accentColor: '#ff623e',
    pin3D: [0.35, 1.34, 0.05],
    biomechanics: {
      origin: 'Anterior: lateral third of clavicle; Lateral: acromion process; Posterior: spine of scapula.',
      insertion: 'Deltoid tuberosity on the lateral surface of the humerus.',
      innervation: 'Axillary Nerve (C5-C6).',
      jointActions: [
        'Arm Abduction (0°-90° - Lateral head primarily)',
        'Shoulder Flexion & Horizontal Adduction (Anterior head)',
        'Horizontal Abduction & External Rotation (Posterior head)',
      ],
      antagonists: 'Latissimus Dorsi, Pectoralis Major (for abduction), Subscapularis (for external rotation).',
      stretches: [
        {
          name: 'Cross-Body Posterior Deltoid Stretch',
          duration: '30s per arm',
          steps: 'Bring arm across chest at shoulder level. Use opposite hand to gently press arm closer to torso without twisting spine.',
        },
        {
          name: 'Hands-Interlaced Shoulder Extension Stretch',
          duration: '30s hold',
          steps: 'Stand upright, interlace fingers behind hips, roll shoulders down and back, and lift hands upward gently.',
        },
      ],
      injuryTips: 'Never perform overhead pressing with a hyper-extended lower back. Always warm up the rotator cuff (infraspinatus, supraspinatus, teres minor) with light face pulls or internal/external rotations.',
    },
    subMuscles: [
      {
        id: 'front_delt',
        name: 'Front Delt',
        scientificName: 'Anterior Deltoid',
        description: 'The front cap of the shoulder. Heavily active in all overhead and horizontal pressing movements.',
        levelWorkouts: {
          beginner: [
            { name: 'Dumbbell Seated Shoulder Press', equipment: 'dumbbell', level: 'Beginner', target: 'Front & Side Delts', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-0-1-0', activation: { primary: 88, secondary: [{ name: 'Triceps', percent: 50 }, { name: 'Upper Chest', percent: 40 }] }, simpleGuide: 'Sit with back supported. Press dumbbells overhead, lower slowly to ear level.', whyItWorks: 'Seated position eliminates spinal compensation and isolates anterior deltoids safely.' },
            { name: 'Dumbbell Front Raise', equipment: 'dumbbell', level: 'Beginner', target: 'Front Delt Isolation', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 90, secondary: [{ name: 'Traps', percent: 35 }] }, simpleGuide: 'Raise dumbbell straight in front to eye level, lower slowly under control.', whyItWorks: 'Direct anterior delt isolation with minimal equipment.' },
          ],
          intermediate: [
            { name: 'Standing Overhead Barbell Press (OHP)', equipment: 'barbell', level: 'Intermediate', target: 'Anterior & Medial Delts', sets: '4 Sets', reps: '8 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Triceps', percent: 60 }, { name: 'Upper Chest', percent: 45 }] }, simpleGuide: 'Stand tight with core braced. Press barbell straight up past face to full lockout overhead.', whyItWorks: 'Full-body kinetic chain power and raw shoulder size builder.' },
            { name: 'Arnold Dumbbell Press', equipment: 'dumbbell', level: 'Intermediate', target: 'Front & Medial Delts', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-1-1-0', activation: { primary: 91, secondary: [{ name: 'Side Delts', percent: 60 }, { name: 'Triceps', percent: 45 }] }, simpleGuide: 'Start palms facing chest, rotate outwards as you press overhead, reverse on the way down.', whyItWorks: 'Continuous rotation recruits both anterior and lateral heads through the full movement arc.' },
          ],
          advanced: [
            { name: 'Push Press (Heavy Overhead)', equipment: 'barbell', level: 'Advanced', target: 'Max Anterior Delt Power', sets: '4 Sets', reps: '5 - 6 Reps', rest: '120s', tempo: '3-0-X-0', activation: { primary: 96, secondary: [{ name: 'Triceps', percent: 65 }] }, simpleGuide: 'Slight knee dip to drive heavy barbell overhead, lower slowly under strict control.', whyItWorks: 'Overloads the nervous system and shoulder complex with supramaximal weight.' },
          ],
        },
      },
      {
        id: 'side_delt',
        name: 'Side Delt',
        scientificName: 'Lateral Deltoid',
        description: 'The middle cap that creates shoulder width, roundness, and the classic V-taper silhouette.',
        levelWorkouts: {
          beginner: [
            { name: 'Standing Dumbbell Lateral Raise', equipment: 'dumbbell', level: 'Beginner', target: 'Side Delt Width', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 92, secondary: [{ name: 'Traps', percent: 35 }] }, simpleGuide: 'Raise dumbbells out to sides until parallel with floor, leading with elbows.', whyItWorks: 'Directly isolates the lateral deltoid to widen the upper body silhouette.' },
            { name: 'Machine Lateral Raise', equipment: 'machine', level: 'Beginner', target: 'Lateral Delt Isolation', sets: '3 Sets', reps: '15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 90, secondary: [{ name: 'Traps', percent: 25 }] }, simpleGuide: 'Sit in machine, press arms against pads, raise outward to shoulder height.', whyItWorks: 'Machine guides the exact path of motion for pure side delt isolation.' },
          ],
          intermediate: [
            { name: 'Cable Lean-Away Lateral Raise', equipment: 'cables', level: 'Intermediate', target: 'Constant Lateral Tension', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 95, secondary: [{ name: 'Traps', percent: 20 }] }, simpleGuide: 'Hold cable with one arm, lean outward 20°. Raise arm smooth without momentum.', whyItWorks: 'Maintains constant muscle tension through the entire movement arc, eliminating bottom dead zones.' },
          ],
          advanced: [
            { name: 'Cable Cross-Body Y-Raise', equipment: 'cables', level: 'Advanced', target: 'Lateral Delt Peak Contraction', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 96, secondary: [{ name: 'Rear Delts', percent: 35 }] }, simpleGuide: 'Cross cables in front, pull arms upward and outward into a wide "Y" shape.', whyItWorks: 'Matches the exact muscle fiber plane of the lateral deltoid for peak recruitment.' },
          ],
        },
      },
      {
        id: 'rear_delt',
        name: 'Rear Delt',
        scientificName: 'Posterior Deltoid',
        description: 'The back cap of the shoulder. Essential for shoulder joint health, 3D roundness, and upright posture.',
        levelWorkouts: {
          beginner: [
            { name: 'Machine Reverse Pec Deck Flye', equipment: 'machine', level: 'Beginner', target: 'Rear Delt & Posture', sets: '3 Sets', reps: '15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 90, secondary: [{ name: 'Rhomboids', percent: 45 }, { name: 'Traps', percent: 40 }] }, simpleGuide: 'Sit facing the machine pad. Pull handles outward and backward, squeezing rear shoulders.', whyItWorks: 'Improves upper back posture and balances heavy pushing exercises.' },
          ],
          intermediate: [
            { name: 'Cable Rope Face Pulls + External Rotation', equipment: 'cables', level: 'Intermediate', target: 'Rear Delts & Rotator Cuff', sets: '4 Sets', reps: '15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 94, secondary: [{ name: 'Infraspinatus', percent: 70 }, { name: 'Upper Traps', percent: 50 }] }, simpleGuide: 'Pull rope toward eyes while spreading hands apart and rotating thumbs backward.', whyItWorks: 'Builds bulletproof rotator cuffs, corrects rounded shoulders, and adds 3D rear depth.' },
            { name: 'Incline Chest-Supported Rear Delt Flye', equipment: 'dumbbell', level: 'Intermediate', target: 'Rear Delt Isolation', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 92, secondary: [{ name: 'Rhomboids', percent: 40 }] }, simpleGuide: 'Lie chest-down on incline bench. Raise dumbbells outward with soft elbow bend.', whyItWorks: 'Chest support eliminates body sway and forces pure posterior deltoid recruitment.' },
          ],
          advanced: [
            { name: 'Cable Cross-Body Rear Delt Flyes (No Handles)', equipment: 'cables', level: 'Advanced', target: 'Posterior Delt Stretch & Squeeze', sets: '4 Sets', reps: '15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 96, secondary: [{ name: 'Rhomboids', percent: 35 }] }, simpleGuide: 'Cross cables at eye level, grab bare cables, pull arms backward in a wide horizontal arc.', whyItWorks: 'Smooth continuous cable resistance throughout the full range of motion.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Dumbbell Seated Shoulder Press', equipment: 'dumbbell', level: 'Beginner', target: 'Front & Side Delts', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-0-1-0', activation: { primary: 88, secondary: [{ name: 'Triceps', percent: 50 }] }, simpleGuide: 'Sit with back supported. Press dumbbells overhead, lower slowly to ear level.', whyItWorks: 'Seated position eliminates spinal compensation.' },
        { name: 'Standing Dumbbell Lateral Raise', equipment: 'dumbbell', level: 'Beginner', target: 'Side Delt Width', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 92, secondary: [{ name: 'Traps', percent: 35 }] }, simpleGuide: 'Raise dumbbells out to sides until parallel with floor.', whyItWorks: 'Directly isolates the lateral deltoid.' },
      ],
      intermediate: [
        { name: 'Standing Overhead Barbell Press (OHP)', equipment: 'barbell', level: 'Intermediate', target: 'Anterior & Medial Delts', sets: '4 Sets', reps: '8 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Triceps', percent: 60 }] }, simpleGuide: 'Stand tight with core braced. Press barbell straight up past face to full lockout overhead.', whyItWorks: 'Full-body kinetic chain power and raw shoulder size builder.' },
      ],
      advanced: [
        { name: 'Push Press (Heavy Overhead)', equipment: 'barbell', level: 'Advanced', target: 'Max Anterior Delt Power', sets: '4 Sets', reps: '5 - 6 Reps', rest: '120s', tempo: '3-0-X-0', activation: { primary: 96, secondary: [{ name: 'Triceps', percent: 65 }] }, simpleGuide: 'Slight knee dip to drive heavy barbell overhead, lower slowly under strict control.', whyItWorks: 'Overloads the nervous system and shoulder complex with supramaximal weight.' },
      ],
    },
  },

  biceps: {
    id: 'biceps',
    name: 'Biceps & Forearms',
    simpleName: 'Biceps',
    category: 'Upper Body (Pull)',
    burnRate: '360 kcal/hr',
    description: 'Front arm flexors (Long Head peak, Short Head thickness, Brachialis) responsible for elbow flexion and forearm supination.',
    cameraPosition: [0.65, 1.25, 1.9],
    cameraTarget: [0.28, 1.15, 0],
    accentColor: '#ff2d55',
    pin3D: [0.38, 1.18, 0.08],
    biomechanics: {
      origin: 'Long Head: supraglenoid tubercle of scapula; Short Head: coracoid process of scapula.',
      insertion: 'Radial tuberosity and bicipital aponeurosis into deep fascia of forearm.',
      innervation: 'Musculocutaneous Nerve (C5-C7).',
      jointActions: [
        'Elbow Flexion (bending the elbow)',
        'Forearm Supination (turning palm face up)',
        'Weak Shoulder Flexion (assists front delt)',
      ],
      antagonists: 'Triceps Brachii, Anconeus.',
      stretches: [
        {
          name: 'Standing Wall Biceps & Chest Stretch',
          duration: '30s per arm',
          steps: 'Place palm flat against wall behind you at shoulder height, rotate torso away until feeling deep stretch through bicep and forearm.',
        },
      ],
      injuryTips: 'Avoid hyperextending elbows with heavy loads on preacher benches. Always warm up biceps before heavy back pulling exercises.',
    },
    subMuscles: [
      {
        id: 'long_head',
        name: 'Long Head (Peak)',
        scientificName: 'Biceps Brachii (Caput Longum)',
        description: 'The outer head of the biceps that creates the vertical "bicep peak" when flexing.',
        levelWorkouts: {
          beginner: [
            { name: 'Incline Dumbbell Curl', equipment: 'dumbbell', level: 'Beginner', target: 'Long Head Stretch', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-0-1-0', activation: { primary: 92, secondary: [{ name: 'Brachialis', percent: 45 }] }, simpleGuide: 'Sit on 45° incline bench. Let arms hang back, curl dumbbells up while supinating wrists.', whyItWorks: 'Stretches the long head over the shoulder joint for superior peak growth.' },
          ],
          intermediate: [
            { name: 'Close-Grip EZ Bar Curl', equipment: 'barbell', level: 'Intermediate', target: 'Bicep Peak Overload', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Forearms', percent: 50 }] }, simpleGuide: 'Grip inner curves of EZ bar. Keep elbows pinned to ribs, curl up and squeeze.', whyItWorks: 'Narrow grip internally rotates the arms and biases the outer long head fibers.' },
          ],
          advanced: [
            { name: 'Drag Curl (Barbell / Smith)', equipment: 'barbell', level: 'Advanced', target: 'Long Head Peak Isolation', sets: '4 Sets', reps: '10 - 12 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 96, secondary: [{ name: 'Brachialis', percent: 55 }] }, simpleGuide: 'Drag barbell straight up along torso by driving elbows backward. Squeeze hard at ribs.', whyItWorks: 'Eliminates front delt assistance, isolating pure bicep peak contraction.' },
          ],
        },
      },
      {
        id: 'short_head',
        name: 'Short Head (Inner)',
        scientificName: 'Biceps Brachii (Caput Breve)',
        description: 'The inner head of the biceps that creates arm thickness and width when viewed from the front.',
        levelWorkouts: {
          beginner: [
            { name: 'Standing Dumbbell Curl (Supinated)', equipment: 'dumbbell', level: 'Beginner', target: 'Short Head & Overall Bicep', sets: '3 Sets', reps: '10 - 12 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 88, secondary: [{ name: 'Brachialis', percent: 40 }] }, simpleGuide: 'Curl dumbbell up, turning pinky finger upward at the top for maximum squeeze.', whyItWorks: 'Supination directly activates the short head fibers.' },
          ],
          intermediate: [
            { name: 'Preacher Curl (Wide Grip)', equipment: 'barbell', level: 'Intermediate', target: 'Short Head Thickness', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-1-1-0', activation: { primary: 93, secondary: [{ name: 'Forearms', percent: 40 }] }, simpleGuide: 'Arms flat against preacher pad, wide grip on EZ bar. Curl upward smoothly.', whyItWorks: 'Preacher pad prevents shoulder momentum and places maximum load in the bottom stretch.' },
          ],
          advanced: [
            { name: 'High Cable Bicep Curl (Hercules Curl)', equipment: 'cables', level: 'Advanced', target: 'Peak Short Head Contraction', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 95, secondary: [{ name: 'Long Head', percent: 50 }] }, simpleGuide: 'Stand between high cables with arms extended. Curl handles inward toward ears.', whyItWorks: 'Elbows elevated at shoulder height maximizes shortened position contraction.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Standing Dumbbell Curl (Supinated)', equipment: 'dumbbell', level: 'Beginner', target: 'Overall Bicep Mass', sets: '3 Sets', reps: '10 - 12 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 88, secondary: [{ name: 'Brachialis', percent: 40 }] }, simpleGuide: 'Curl dumbbell up, turning pinky finger upward at the top for maximum squeeze.', whyItWorks: 'Supination directly activates the short head fibers.' },
        { name: 'Incline Dumbbell Curl', equipment: 'dumbbell', level: 'Beginner', target: 'Long Head Stretch', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-0-1-0', activation: { primary: 92, secondary: [{ name: 'Brachialis', percent: 45 }] }, simpleGuide: 'Sit on 45° incline bench. Let arms hang back, curl dumbbells up while supinating wrists.', whyItWorks: 'Stretches the long head over the shoulder joint for superior peak growth.' },
      ],
      intermediate: [
        { name: 'Close-Grip EZ Bar Curl', equipment: 'barbell', level: 'Intermediate', target: 'Bicep Peak Overload', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Forearms', percent: 50 }] }, simpleGuide: 'Grip inner curves of EZ bar. Keep elbows pinned to ribs, curl up and squeeze.', whyItWorks: 'Narrow grip internally rotates the arms and biases the outer long head fibers.' },
        { name: 'Preacher Curl (Wide Grip)', equipment: 'barbell', level: 'Intermediate', target: 'Short Head Thickness', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-1-1-0', activation: { primary: 93, secondary: [{ name: 'Forearms', percent: 40 }] }, simpleGuide: 'Arms flat against preacher pad, wide grip on EZ bar. Curl upward smoothly.', whyItWorks: 'Preacher pad prevents shoulder momentum and places maximum load in the bottom stretch.' },
        { name: 'Dumbbell Hammer Curls', equipment: 'dumbbell', level: 'Intermediate', target: 'Brachialis & Forearm Thickness', sets: '3 Sets', reps: '10 - 12 Reps', rest: '60s', tempo: '2-1-1-0', activation: { primary: 91, secondary: [{ name: 'Brachioradialis', percent: 80 }] }, simpleGuide: 'Neutral palms-facing grip, curl dumbbells upward with strict control.', whyItWorks: 'Pushes the biceps outward for maximum arm width.' },
      ],
      advanced: [
        { name: 'Drag Curl (Barbell / Smith)', equipment: 'barbell', level: 'Advanced', target: 'Long Head Peak Isolation', sets: '4 Sets', reps: '10 - 12 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 96, secondary: [{ name: 'Brachialis', percent: 55 }] }, simpleGuide: 'Drag barbell straight up along torso by driving elbows backward. Squeeze hard at ribs.', whyItWorks: 'Eliminates front delt assistance, isolating pure bicep peak contraction.' },
        { name: 'High Cable Bicep Curl (Hercules Curl)', equipment: 'cables', level: 'Advanced', target: 'Peak Short Head Contraction', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 95, secondary: [{ name: 'Long Head', percent: 50 }] }, simpleGuide: 'Stand between high cables with arms extended. Curl handles inward toward ears.', whyItWorks: 'Elbows elevated at shoulder height maximizes shortened position contraction.' },
        { name: 'Standing Barbell Curl', equipment: 'barbell', level: 'Advanced', target: 'Max Bicep Overload', sets: '4 Sets', reps: '6 - 8 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 95, secondary: [{ name: 'Forearms', percent: 60 }] }, simpleGuide: 'Strict upright posture, curl straight barbell with maximum power.', whyItWorks: 'Classic heavy mass builder.' },
      ],
    },
  },

  triceps: {
    id: 'triceps',
    name: 'Triceps',
    simpleName: 'Triceps',
    category: 'Upper Body (Push)',
    burnRate: '380 kcal/hr',
    description: 'The 3-headed muscle on the back of the upper arm (Lateral, Long, Medial) accounting for 60% of total upper arm volume.',
    cameraPosition: [0, 1.25, -2.4],
    cameraTarget: [0, 1.15, 0],
    accentColor: '#ff4b3e',
    pin3D: [0.38, 1.22, -0.08],
    biomechanics: {
      origin: 'Long Head: infraglenoid tubercle of scapula; Lateral Head: posterior humerus above radial groove; Medial Head: posterior humerus below radial groove.',
      insertion: 'Olecranon process of the ulna.',
      innervation: 'Radial Nerve (C6-C8).',
      jointActions: [
        'Elbow Extension (straightening the arm - all 3 heads)',
        'Shoulder Extension & Adduction (Long Head only - crosses shoulder joint)',
      ],
      antagonists: 'Biceps Brachii, Brachialis.',
      stretches: [
        {
          name: 'Overhead Triceps & Lat Stretch',
          duration: '30s per arm',
          steps: 'Reach one hand down upper back behind neck. Use other hand to gently pull elbow inward and backward.',
        },
      ],
      injuryTips: 'Do not lock out elbows with explosive snapping. Keep elbows tucked to prevent medial epicondylitis (golfer’s elbow).',
    },
    subMuscles: [
      {
        id: 'lateral_head',
        name: 'Lateral Head',
        scientificName: 'Triceps Brachii (Caput Laterale)',
        description: 'The outer horseshoe head that creates the visible tricep sweep from the side.',
        levelWorkouts: {
          beginner: [
            { name: 'Rope Tricep Cable Pushdown', equipment: 'cables', level: 'Beginner', target: 'Lateral Horseshoe', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 92, secondary: [{ name: 'Medial Head', percent: 60 }] }, simpleGuide: 'Push rope down, spread ends apart at bottom and squeeze outer triceps.', whyItWorks: 'Spreading the rope maximizes lateral head contraction.' },
          ],
          intermediate: [
            { name: 'Straight-Bar Cable Pushdown', equipment: 'cables', level: 'Intermediate', target: 'Lateral Head Power', sets: '4 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '2-1-1-0', activation: { primary: 95, secondary: [{ name: 'Medial Head', percent: 70 }] }, simpleGuide: 'Grip bar overhand, elbows tucked to ribs, press straight down to full lockout.', whyItWorks: 'Allows heavier loading on the lateral and medial heads.' },
          ],
          advanced: [
            { name: 'Close-Grip Barbell Bench Press', equipment: 'barbell', level: 'Advanced', target: 'Lateral & Medial Head Overload', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 96, secondary: [{ name: 'Chest', percent: 55 }] }, simpleGuide: 'Hands shoulder-width apart. Lower bar to lower sternum with elbows tucked, press explosively.', whyItWorks: 'The heaviest compound mass builder for overall tricep thickness.' },
          ],
        },
      },
      {
        id: 'long_head',
        name: 'Long Head',
        scientificName: 'Triceps Brachii (Caput Longum)',
        description: 'The largest tricep head running down the back of the arm. Creates the hanging meat and back arm mass.',
        levelWorkouts: {
          beginner: [
            { name: 'Overhead Dumbbell Tricep Extension', equipment: 'dumbbell', level: 'Beginner', target: 'Long Head Stretch', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-0-1-0', activation: { primary: 90, secondary: [{ name: 'Medial Head', percent: 50 }] }, simpleGuide: 'Hold dumbbell overhead with both hands. Lower behind neck, press straight up.', whyItWorks: 'Overhead arm position places the long head in maximum stretch.' },
          ],
          intermediate: [
            { name: 'Incline EZ-Bar Skullcrushers', equipment: 'barbell', level: 'Intermediate', target: 'Long Head Mass Overload', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Lateral Head', percent: 65 }] }, simpleGuide: 'Lie on bench, lower EZ bar to forehead or behind head, extend elbows back to top.', whyItWorks: 'Combines deep loaded stretch with heavy progressive overload.' },
          ],
          advanced: [
            { name: 'Cable Overhead Tricep Extension (Low Pulley)', equipment: 'cables', level: 'Advanced', target: 'Continuous Long Head Tension', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 96, secondary: [{ name: 'Lateral Head', percent: 55 }] }, simpleGuide: 'Facing away from low cable, extend rope overhead and forward to full lockout.', whyItWorks: 'Constant cable resistance through the entire stretched and shortened range.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Rope Tricep Cable Pushdown', equipment: 'cables', level: 'Beginner', target: 'Lateral Horseshoe', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 92, secondary: [{ name: 'Medial Head', percent: 60 }] }, simpleGuide: 'Push rope down, spread ends apart at bottom and squeeze outer triceps.', whyItWorks: 'Spreading the rope maximizes lateral head contraction.' },
        { name: 'Overhead Dumbbell Tricep Extension', equipment: 'dumbbell', level: 'Beginner', target: 'Long Head Stretch', sets: '3 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '3-0-1-0', activation: { primary: 90, secondary: [{ name: 'Medial Head', percent: 50 }] }, simpleGuide: 'Hold dumbbell overhead with both hands. Lower behind neck, press straight up.', whyItWorks: 'Overhead arm position places the long head in maximum stretch.' },
      ],
      intermediate: [
        { name: 'Incline EZ-Bar Skullcrushers', equipment: 'barbell', level: 'Intermediate', target: 'Long Head Mass Overload', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Lateral Head', percent: 65 }] }, simpleGuide: 'Lie on bench, lower EZ bar to forehead or behind head, extend elbows back to top.', whyItWorks: 'Combines deep loaded stretch with heavy progressive overload.' },
        { name: 'Straight-Bar Cable Pushdown', equipment: 'cables', level: 'Intermediate', target: 'Lateral Head Power', sets: '4 Sets', reps: '10 - 12 Reps', rest: '75s', tempo: '2-1-1-0', activation: { primary: 95, secondary: [{ name: 'Medial Head', percent: 70 }] }, simpleGuide: 'Grip bar overhand, elbows tucked to ribs, press straight down to full lockout.', whyItWorks: 'Allows heavier loading on the lateral and medial heads.' },
        { name: 'Overhead Cable Tricep Extension', equipment: 'cables', level: 'Intermediate', target: 'Long Head Stretch & Contraction', sets: '3 Sets', reps: '12 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 93, secondary: [{ name: 'Medial Head', percent: 55 }] }, simpleGuide: 'Extend rope overhead with constant cable tension.', whyItWorks: 'Maintains tension throughout full range.' },
      ],
      advanced: [
        { name: 'Close-Grip Barbell Bench Press', equipment: 'barbell', level: 'Advanced', target: 'Lateral & Medial Head Overload', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 96, secondary: [{ name: 'Chest', percent: 55 }] }, simpleGuide: 'Hands shoulder-width apart. Lower bar to lower sternum with elbows tucked, press explosively.', whyItWorks: 'The heaviest compound mass builder for overall tricep thickness.' },
        { name: 'Cable Overhead Tricep Extension (Low Pulley)', equipment: 'cables', level: 'Advanced', target: 'Continuous Long Head Tension', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 96, secondary: [{ name: 'Lateral Head', percent: 55 }] }, simpleGuide: 'Facing away from low cable, extend rope overhead and forward to full lockout.', whyItWorks: 'Constant cable resistance through the entire stretched and shortened range.' },
        { name: 'Skull Crushers (Lying EZ Bar Extension)', equipment: 'barbell', level: 'Advanced', target: 'Long & Medial Head Density', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Lateral Head', percent: 65 }] }, simpleGuide: 'Lower EZ bar to forehead or behind head with strict control.', whyItWorks: 'Heavy tricep mass overload.' },
      ],
    },
  },

  back: {
    id: 'back',
    name: 'Back & Lats',
    simpleName: 'Back',
    category: 'Upper Body (Pull)',
    burnRate: '520 kcal/hr',
    description: 'The wide muscular complex of the upper, middle, and lower back (Lats, Traps, Rhomboids, Erector Spinae) driving pulling strength and the V-taper.',
    cameraPosition: [0, 1.3, -2.5],
    cameraTarget: [0, 1.2, 0],
    accentColor: '#3b82f6',
    pin3D: [0, 1.25, -0.16],
    biomechanics: {
      origin: 'Lats: spinous processes of T7-L5, thoracolumbar fascia, iliac crest, lower 3-4 ribs; Traps: occipital bone, ligamentum nuchae, spinous processes of C7-T12.',
      insertion: 'Lats: floor of bicipital groove of humerus; Traps: clavicle, acromion, and spine of scapula.',
      innervation: 'Thoracodorsal Nerve (Lats, C6-C8); Spinal Accessory Nerve (Traps, CN XI).',
      jointActions: [
        'Shoulder Adduction (pulling arms down to sides - Lats)',
        'Shoulder Extension (pulling elbows back)',
        'Scapular Retraction & Depression (Rhomboids & Mid/Lower Traps)',
        'Spinal Extension & Stability (Erector Spinae)',
      ],
      antagonists: 'Pectoralis Major, Anterior Deltoids, Rectus Abdominis.',
      stretches: [
        {
          name: 'Hanging Bar Lat Stretch',
          duration: '30 - 45s',
          steps: 'Hang from pull-up bar with relaxed shoulder blades, breathe into back ribcage, feeling deep stretch down sides of torso.',
        },
      ],
      injuryTips: 'Never round lumbar spine on heavy deadlifts or bent-over rows. Initiate all pulling with scapular depression before elbow flexion.',
    },
    subMuscles: [
      {
        id: 'lats',
        name: 'Lats (Width)',
        scientificName: 'Latissimus Dorsi',
        description: 'The wide wing muscles of your back that build the dramatic V-taper from waist to shoulders.',
        levelWorkouts: {
          beginner: [
            { name: 'Wide-Grip Lat Pulldown', equipment: 'machine', level: 'Beginner', target: 'Lat Width', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-1-1-1', activation: { primary: 90, secondary: [{ name: 'Biceps', percent: 55 }] }, simpleGuide: 'Grip bar wider than shoulders. Pull bar down to upper chest, squeeze shoulder blades.', whyItWorks: 'Safely develops lat recruitment before progressing to full bodyweight pull-ups.' },
          ],
          intermediate: [
            { name: 'Overhand Barbell Bent-Over Row', equipment: 'barbell', level: 'Intermediate', target: 'Back Thickness & Lats', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Rhomboids', percent: 70 }] }, simpleGuide: 'Hinge at hips to 45°, pull bar to navel keeping core braced and spine neutral.', whyItWorks: 'Premier compound exercise for complete back density and pulling strength.' },
            { name: 'Pull-Ups (Bodyweight)', equipment: 'bodyweight', level: 'Intermediate', target: 'Lat Wings & Upper Back', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '2-1-1-0', activation: { primary: 95, secondary: [{ name: 'Biceps', percent: 65 }] }, simpleGuide: 'Hang with full arm extension, pull chest to bar leading with elbows.', whyItWorks: 'The ultimate vertical pull for lat wing expansion and relative strength.' },
          ],
          advanced: [
            { name: 'Heavy Barbell Deadlift (Conventional)', equipment: 'barbell', level: 'Advanced', target: 'Full Posterior Chain & Traps', sets: '4 Sets', reps: '5 Reps', rest: '180s', tempo: '2-1-X-0', activation: { primary: 98, secondary: [{ name: 'Glutes', percent: 85 }] }, simpleGuide: 'Feet hip-width, grip bar tight, brace core, drive floor away through heels.', whyItWorks: 'The king of posterior chain strength, loading the entire back and traps under maximum weight.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Wide-Grip Lat Pulldown', equipment: 'machine', level: 'Beginner', target: 'Lat Width', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-1-1-1', activation: { primary: 90, secondary: [{ name: 'Biceps', percent: 55 }] }, simpleGuide: 'Grip bar wider than shoulders. Pull bar down to upper chest, squeeze shoulder blades.', whyItWorks: 'Safely develops lat recruitment before progressing to full bodyweight pull-ups.' },
        { name: 'Seated Cable Row (V-Bar Close Grip)', equipment: 'cables', level: 'Beginner', target: 'Mid-Back Thickness', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-1-1-0', activation: { primary: 91, secondary: [{ name: 'Biceps', percent: 50 }, { name: 'Rhomboids', percent: 65 }] }, simpleGuide: 'Sit upright with knees slightly bent. Pull handle to lower abdomen while driving elbows back.', whyItWorks: 'Guided horizontal pulling builds mid-back thickness with minimal lower back strain.' },
      ],
      intermediate: [
        { name: 'Overhand Barbell Bent-Over Row', equipment: 'barbell', level: 'Intermediate', target: 'Back Thickness & Lats', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 94, secondary: [{ name: 'Rhomboids', percent: 70 }] }, simpleGuide: 'Hinge at hips to 45°, pull bar to navel keeping core braced and spine neutral.', whyItWorks: 'Premier compound exercise for complete back density and pulling strength.' },
        { name: 'Pull-Ups (Bodyweight)', equipment: 'bodyweight', level: 'Intermediate', target: 'Lat Wings & Upper Back', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '2-1-1-0', activation: { primary: 95, secondary: [{ name: 'Biceps', percent: 65 }] }, simpleGuide: 'Hang with full arm extension, pull chest to bar leading with elbows.', whyItWorks: 'The ultimate vertical pull for lat wing expansion and relative strength.' },
        { name: 'Wide-Grip Lat Pulldown', equipment: 'machine', level: 'Intermediate', target: 'Lat Width', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-1-1-1', activation: { primary: 90, secondary: [{ name: 'Biceps', percent: 55 }] }, simpleGuide: 'Grip bar wider than shoulders. Pull bar down to upper chest, squeeze shoulder blades.', whyItWorks: 'Safely develops lat recruitment.' },
      ],
      advanced: [
        { name: 'Heavy Barbell Deadlift (Conventional)', equipment: 'barbell', level: 'Advanced', target: 'Full Posterior Chain & Traps', sets: '4 Sets', reps: '5 Reps', rest: '180s', tempo: '2-1-X-0', activation: { primary: 98, secondary: [{ name: 'Glutes', percent: 85 }] }, simpleGuide: 'Feet hip-width, grip bar tight, brace core, drive floor away through heels.', whyItWorks: 'The king of posterior chain strength, loading the entire back and traps under maximum weight.' },
        { name: 'Overhand Barbell Bent-Over Row', equipment: 'barbell', level: 'Advanced', target: 'Back Thickness & Lats', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 96, secondary: [{ name: 'Rhomboids', percent: 75 }] }, simpleGuide: 'Hinge to 45°, pull barbell explosively to lower ribcage.', whyItWorks: 'Heavy progressive overload for dense upper and middle back.' },
        { name: 'Pull-Ups (Bodyweight)', equipment: 'bodyweight', level: 'Advanced', target: 'Lat Wings & Upper Back', sets: '4 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-1-1-0', activation: { primary: 95, secondary: [{ name: 'Biceps', percent: 65 }] }, simpleGuide: 'Pull chest to bar with strict form.', whyItWorks: 'Vertical pulling powerhouse.' },
      ],
    },
  },

  abs: {
    id: 'abs',
    name: 'Abs & Core',
    simpleName: 'Abs / Core',
    category: 'Core & Trunk',
    burnRate: '340 kcal/hr',
    description: 'The midsection core corset (Rectus Abdominis 6-pack, Obliques, Transverse Abdominis) providing spinal stability, rotation, and flexion.',
    cameraPosition: [0, 0.95, 2.3],
    cameraTarget: [0, 0.85, 0],
    accentColor: '#e11d48',
    pin3D: [0, 0.92, 0.16],
    biomechanics: {
      origin: 'Rectus Abdominis: pubic crest and pubic symphysis; Obliques: external surfaces of ribs 5-12.',
      insertion: 'Xiphoid process of sternum and costal cartilages of ribs 5-7; iliac crest.',
      innervation: 'Intercostal Nerves (T7-T11) and Subcostal Nerve (T12).',
      jointActions: [
        'Trunk Flexion (curling ribs to hips)',
        'Pelvic Posterior Tilt',
        'Lateral Flexion & Rotation (Obliques)',
        'Intra-Abdominal Pressure Generation (Core bracing)',
      ],
      antagonists: 'Erector Spinae, Multifidus.',
      stretches: [
        {
          name: 'Cobra / Upward Dog Abdominal Stretch',
          duration: '30s hold',
          steps: 'Lie face down, press palms into floor under shoulders, extend elbows gently while keeping hips on floor to stretch abdominal wall.',
        },
      ],
      injuryTips: 'Do not pull on neck during crunches. Always brace core 360° as if preparing for a punch rather than sucking stomach in.',
    },
    subMuscles: [
      {
        id: 'upper_abs',
        name: 'Upper 6-Pack',
        scientificName: 'Rectus Abdominis (Superior)',
        description: 'The top four blocks of the 6-pack responsible for spinal flexion.',
        levelWorkouts: {
          beginner: [
            { name: 'Floor Plank Hold', equipment: 'bodyweight', level: 'Beginner', target: 'Deep Core & Stability', sets: '3 Sets', reps: '30 - 45 Seconds', rest: '60s', tempo: 'Isometric', activation: { primary: 85, secondary: [{ name: 'Obliques', percent: 60 }] }, simpleGuide: 'Hold body straight on elbows and toes, squeezing glutes and bracing abs.', whyItWorks: 'Builds foundational endurance and prevents spinal hyperextension.' },
          ],
          intermediate: [
            { name: 'Kneeling Cable Crunch', equipment: 'cables', level: 'Intermediate', target: 'Upper 6-Pack Hypertrophy', sets: '4 Sets', reps: '15 - 20 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 94, secondary: [{ name: 'Obliques', percent: 45 }] }, simpleGuide: 'Kneel holding rope at head level. Curl ribs down toward hips like a shrimp.', whyItWorks: 'Allows weighted progressive overload just like any other muscle group.' },
          ],
          advanced: [
            { name: 'Standing Ab Wheel Rollouts', equipment: 'bodyweight', level: 'Advanced', target: 'Full Rectus Abdominis', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 98, secondary: [{ name: 'Lats', percent: 60 }] }, simpleGuide: 'Roll ab wheel out into full horizontal extension, pull back with core.', whyItWorks: 'Extreme anti-extension tension under long lever arm.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Floor Plank Hold', equipment: 'bodyweight', level: 'Beginner', target: 'Deep Core & Stability', sets: '3 Sets', reps: '30 - 45 Seconds', rest: '60s', tempo: 'Isometric', activation: { primary: 85, secondary: [{ name: 'Obliques', percent: 60 }] }, simpleGuide: 'Hold body straight on elbows and toes, squeezing glutes and bracing abs.', whyItWorks: 'Builds foundational endurance.' },
      ],
      intermediate: [
        { name: 'Kneeling Cable Crunch', equipment: 'cables', level: 'Intermediate', target: 'Upper 6-Pack Hypertrophy', sets: '4 Sets', reps: '15 - 20 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 94, secondary: [{ name: 'Obliques', percent: 45 }] }, simpleGuide: 'Kneel holding rope at head level. Curl ribs down toward hips like a shrimp.', whyItWorks: 'Allows weighted progressive overload.' },
      ],
      advanced: [
        { name: 'Standing Ab Wheel Rollouts', equipment: 'bodyweight', level: 'Advanced', target: 'Full Rectus Abdominis', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 98, secondary: [{ name: 'Lats', percent: 60 }] }, simpleGuide: 'Roll ab wheel out into full horizontal extension, pull back with core.', whyItWorks: 'Extreme anti-extension tension under long lever arm.' },
      ],
    },
  },

  quads: {
    id: 'quads',
    name: 'Quadriceps / Thighs',
    simpleName: 'Quads',
    category: 'Lower Body (Push)',
    burnRate: '600 kcal/hr',
    description: 'The massive 4-part muscle group on the front of the thigh (Rectus Femoris, Vastus Lateralis, Vastus Medialis, Vastus Intermedius) powering knee extension and squatting.',
    cameraPosition: [0, 0.45, 2.5],
    cameraTarget: [0, 0.25, 0],
    accentColor: '#ff2442',
    pin3D: [0.18, 0.38, 0.16],
    biomechanics: {
      origin: 'Rectus Femoris: anterior inferior iliac spine (AIIS); Vastus muscles: greater trochanter, intertrochanteric line, and linea aspera of femur.',
      insertion: 'Tibial tuberosity via the patellar tendon/ligament.',
      innervation: 'Femoral Nerve (L2-L4).',
      jointActions: [
        'Knee Extension (straightening the leg)',
        'Hip Flexion (Rectus Femoris only)',
      ],
      antagonists: 'Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus), Popliteus.',
      stretches: [
        {
          name: 'Standing Quad Stretch',
          duration: '30s per leg',
          steps: 'Stand on one leg, grab opposite ankle behind glutes, tuck pelvis under gently without arching lower back.',
        },
      ],
      injuryTips: 'Always track knees in line with toes during squats. Avoid excessive forward knee travel without adequate ankle dorsiflexion.',
    },
    subMuscles: [
      {
        id: 'rectus_femoris',
        name: 'Rectus Femoris (Center)',
        scientificName: 'Rectus Femoris',
        description: 'The center quad muscle running down the thigh that also crosses the hip joint.',
        levelWorkouts: {
          beginner: [
            { name: 'Goblet Squat (Dumbbell)', equipment: 'dumbbell', level: 'Beginner', target: 'Overall Quad + Core', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '3-0-1-0', activation: { primary: 90, secondary: [{ name: 'Glutes', percent: 65 }] }, simpleGuide: 'Hold dumbbell vertically at chest. Squat between knees keeping torso upright, drive up.', whyItWorks: 'Counterbalance dumbbell helps beginners maintain perfect upright posture.' },
          ],
          intermediate: [
            { name: 'Barbell High-Bar Back Squat', equipment: 'barbell', level: 'Intermediate', target: 'Overall Quad Mass', sets: '4 Sets', reps: '8 - 10 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 95, secondary: [{ name: 'Glutes', percent: 75 }] }, simpleGuide: 'Bar on traps. Squat below parallel with knees tracking over toes, explode up.', whyItWorks: 'The ultimate mass and strength builder for the lower body.' },
          ],
          advanced: [
            { name: 'Barbell Front Squat (Deep ATG)', equipment: 'barbell', level: 'Advanced', target: 'Pure Quad Overload', sets: '4 Sets', reps: '6 - 8 Reps', rest: '150s', tempo: '3-1-X-0', activation: { primary: 98, secondary: [{ name: 'Core', percent: 75 }] }, simpleGuide: 'Rest bar on front delts with clean grip, upright torso, squat deep.', whyItWorks: 'Upright torso shifts mechanical load almost entirely onto quadriceps.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Goblet Squat (Dumbbell)', equipment: 'dumbbell', level: 'Beginner', target: 'Overall Quad + Core', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '3-0-1-0', activation: { primary: 90, secondary: [{ name: 'Glutes', percent: 65 }] }, simpleGuide: 'Hold dumbbell vertically at chest. Squat between knees keeping torso upright, drive up.', whyItWorks: 'Counterbalance dumbbell helps beginners maintain perfect upright posture.' },
      ],
      intermediate: [
        { name: 'Barbell High-Bar Back Squat', equipment: 'barbell', level: 'Intermediate', target: 'Overall Quad Mass', sets: '4 Sets', reps: '8 - 10 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 95, secondary: [{ name: 'Glutes', percent: 75 }] }, simpleGuide: 'Bar on traps. Squat below parallel with knees tracking over toes, explode up.', whyItWorks: 'The ultimate mass and strength builder for the lower body.' },
      ],
      advanced: [
        { name: 'Barbell Front Squat (Deep ATG)', equipment: 'barbell', level: 'Advanced', target: 'Pure Quad Overload', sets: '4 Sets', reps: '6 - 8 Reps', rest: '150s', tempo: '3-1-X-0', activation: { primary: 98, secondary: [{ name: 'Core', percent: 75 }] }, simpleGuide: 'Rest bar on front delts with clean grip, upright torso, squat deep.', whyItWorks: 'Upright torso shifts mechanical load almost entirely onto quadriceps.' },
      ],
    },
  },

  glutes_hamstrings: {
    id: 'glutes_hamstrings',
    name: 'Glutes & Hamstrings',
    simpleName: 'Glutes & Hams',
    category: 'Lower Body (Pull)',
    burnRate: '560 kcal/hr',
    description: 'The posterior chain powerhouse (Gluteus Maximus, Medius, Biceps Femoris, Semitendinosus) generating explosive hip extension and knee flexion.',
    cameraPosition: [0, 0.45, -2.5],
    cameraTarget: [0, 0.35, 0],
    accentColor: '#2563eb',
    pin3D: [0.18, 0.45, -0.16],
    biomechanics: {
      origin: 'Glute Max: posterior ilium, sacrum, and coccyx; Hamstrings: ischial tuberosity (sit bones).',
      insertion: 'Glute Max: iliotibial tract and gluteal tuberosity of femur; Hamstrings: head of fibula and medial condyle of tibia.',
      innervation: 'Inferior Gluteal Nerve (Glute Max, L5-S2); Sciatic Nerve (Tibial & Common Peroneal branches, L5-S2).',
      jointActions: [
        'Hip Extension (driving hips forward - Glutes & Hamstrings)',
        'Knee Flexion (curling heel toward butt - Hamstrings)',
        'Hip Abduction & External Rotation (Gluteus Medius & Maximus)',
      ],
      antagonists: 'Quadriceps, Iliopsoas (Hip Flexors).',
      stretches: [
        {
          name: 'Seated Single-Leg Hamstring Stretch',
          duration: '30s per leg',
          steps: 'Sit on floor, extend one leg forward, fold other leg inward, reach chest toward toes with flat back.',
        },
      ],
      injuryTips: 'Do not hyperextend lower spine during hip thrusts or deadlifts; lock out by squeezing glutes, not arching the back.',
    },
    subMuscles: [
      {
        id: 'glutes',
        name: 'Gluteus Maximus',
        scientificName: 'Gluteus Maximus',
        description: 'The largest and strongest muscle in the human body responsible for hip extension.',
        levelWorkouts: {
          beginner: [
            { name: 'Dumbbell Romanian Deadlift (RDL)', equipment: 'dumbbell', level: 'Beginner', target: 'Hamstring Stretch & Glutes', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 88, secondary: [{ name: 'Hamstrings', percent: 85 }] }, simpleGuide: 'Hold dumbbells at thighs. Push hips backward with soft knee bend until deep stretch in hamstrings.', whyItWorks: 'Teaches proper hip hinge pattern and protects the lower back.' },
          ],
          intermediate: [
            { name: 'Barbell Hip Thrust', equipment: 'barbell', level: 'Intermediate', target: 'Glute Max Peak Contraction', sets: '4 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-2-1-0', activation: { primary: 98, secondary: [{ name: 'Hamstrings', percent: 45 }] }, simpleGuide: 'Upper back against bench, bar padded across hips. Drive hips to ceiling and squeeze hard for 2s.', whyItWorks: 'Highest direct glute activation exercise in exercise science.' },
          ],
          advanced: [
            { name: 'Heavy Barbell Hip Thrust (3s Pause)', equipment: 'barbell', level: 'Advanced', target: 'Max Glute Power & Density', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-3-X-0', activation: { primary: 99, secondary: [{ name: 'Hamstrings', percent: 50 }] }, simpleGuide: 'Heavy barbell, lock hips into flat bridge, pause 3 full seconds at top.', whyItWorks: 'Forces maximum motor unit recruitment under peak contraction.' },
          ],
        },
      },
      {
        id: 'hamstrings',
        name: 'Hamstrings (Biceps Femoris)',
        scientificName: 'Biceps Femoris / Semitendinosus',
        description: 'The posterior upper thigh muscles responsible for knee flexion and sprinting speed.',
        levelWorkouts: {
          beginner: [
            { name: 'Lying Leg Curls (Hamstrings)', equipment: 'machine', level: 'Beginner', target: 'Hamstrings Isolation', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 95, secondary: [{ name: 'Calves', percent: 35 }] }, simpleGuide: 'Lie face down, curl pad to glutes, squeeze for 1 second, lower slowly.', whyItWorks: 'Direct knee flexion isolation without lower back fatigue.' },
          ],
          intermediate: [
            { name: 'Romanian Deadlift (RDL)', equipment: 'barbell', level: 'Intermediate', target: 'Hamstrings & Glutes Mass', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 96, secondary: [{ name: 'Glutes', percent: 80 }] }, simpleGuide: 'Hold bar with overhand grip, push hips backward with soft knees, lower to mid-shin, drive hips forward.', whyItWorks: 'Massive loaded stretch stimulus produces maximal hamstring hypertrophy.' },
          ],
          advanced: [
            { name: 'Glute-Ham Raise (GHR)', equipment: 'bodyweight', level: 'Advanced', target: 'Eccentric Hamstring Strength', sets: '4 Sets', reps: '8 - 10 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 98, secondary: [{ name: 'Glutes', percent: 75 }] }, simpleGuide: 'Hook feet into GHR station, lower torso under strict control, pull back using hamstrings.', whyItWorks: 'High eccentric overload across both knee and hip joints.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Dumbbell Romanian Deadlift (RDL)', equipment: 'dumbbell', level: 'Beginner', target: 'Hamstring Stretch & Glutes', sets: '3 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 88, secondary: [{ name: 'Hamstrings', percent: 85 }] }, simpleGuide: 'Hold dumbbells at thighs. Push hips backward with soft knee bend until deep stretch in hamstrings.', whyItWorks: 'Teaches proper hip hinge pattern and protects the lower back.' },
        { name: 'Lying Leg Curls (Hamstrings)', equipment: 'machine', level: 'Beginner', target: 'Hamstrings Isolation', sets: '3 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '2-1-1-1', activation: { primary: 95, secondary: [{ name: 'Calves', percent: 35 }] }, simpleGuide: 'Lie face down, curl pad to glutes, squeeze for 1 second, lower slowly.', whyItWorks: 'Direct knee flexion isolation without lower back fatigue.' },
      ],
      intermediate: [
        { name: 'Barbell Hip Thrust', equipment: 'barbell', level: 'Intermediate', target: 'Glute Max Peak Contraction', sets: '4 Sets', reps: '10 - 12 Reps', rest: '90s', tempo: '2-2-1-0', activation: { primary: 98, secondary: [{ name: 'Hamstrings', percent: 45 }] }, simpleGuide: 'Upper back against bench, bar padded across hips. Drive hips to ceiling and squeeze hard for 2s.', whyItWorks: 'Highest direct glute activation exercise in exercise science.' },
        { name: 'Romanian Deadlift (RDL)', equipment: 'barbell', level: 'Intermediate', target: 'Hamstrings & Glutes Mass', sets: '4 Sets', reps: '8 - 10 Reps', rest: '90s', tempo: '3-1-1-0', activation: { primary: 96, secondary: [{ name: 'Glutes', percent: 80 }] }, simpleGuide: 'Hold bar with overhand grip, push hips backward with soft knees, lower to mid-shin, drive hips forward.', whyItWorks: 'Massive loaded stretch stimulus produces maximal hamstring hypertrophy.' },
      ],
      advanced: [
        { name: 'Heavy Barbell Hip Thrust (3s Pause)', equipment: 'barbell', level: 'Advanced', target: 'Max Glute Power & Density', sets: '4 Sets', reps: '6 - 8 Reps', rest: '120s', tempo: '3-3-X-0', activation: { primary: 99, secondary: [{ name: 'Hamstrings', percent: 50 }] }, simpleGuide: 'Heavy barbell, lock hips into flat bridge, pause 3 full seconds at top.', whyItWorks: 'Forces maximum motor unit recruitment under peak contraction.' },
        { name: 'Glute-Ham Raise (GHR)', equipment: 'bodyweight', level: 'Advanced', target: 'Eccentric Hamstring Strength', sets: '4 Sets', reps: '8 - 10 Reps', rest: '120s', tempo: '3-1-1-0', activation: { primary: 98, secondary: [{ name: 'Glutes', percent: 75 }] }, simpleGuide: 'Hook feet into GHR station, lower torso under strict control, pull back using hamstrings.', whyItWorks: 'High eccentric overload across both knee and hip joints.' },
      ],
    },
  },

  calves: {
    id: 'calves',
    name: 'Calves / Lower Legs',
    simpleName: 'Calves',
    category: 'Lower Body (Extension)',
    burnRate: '320 kcal/hr',
    description: 'Lower leg plantar flexors (Gastrocnemius diamond and deep Soleus) driving jumping, sprinting, and ankle stability.',
    cameraPosition: [0, -0.35, 2.2],
    cameraTarget: [0, -0.55, 0],
    accentColor: '#10b981',
    pin3D: [0.15, -0.42, -0.12],
    biomechanics: {
      origin: 'Gastrocnemius: medial and lateral condyles of femur; Soleus: posterior surface of head of fibula and soleal line of tibia.',
      insertion: 'Posterior calcaneus (heel bone) via the Achilles tendon.',
      innervation: 'Tibial Nerve (S1-S2).',
      jointActions: [
        'Ankle Plantarflexion (pointing toes / pushing off ground)',
        'Knee Flexion assist (Gastrocnemius only - crosses knee)',
      ],
      antagonists: 'Tibialis Anterior (dorsiflexor).',
      stretches: [
        {
          name: 'Wall Calf Stretch',
          duration: '30s per leg',
          steps: 'Place hands on wall, step one leg back, press heel into floor with straight knee.',
        },
      ],
      injuryTips: 'Always pause 2-3 seconds in the deep bottom stretch to eliminate the elastic recoil of the Achilles tendon, forcing pure calf fiber contraction.',
    },
    subMuscles: [
      {
        id: 'gastrocnemius',
        name: 'Gastrocnemius (Diamond)',
        scientificName: 'Gastrocnemius',
        description: 'The upper diamond-shaped calf muscle that creates visible calf definition when knees are straight.',
        levelWorkouts: {
          beginner: [
            { name: 'Standing Machine Calf Raise', equipment: 'machine', level: 'Beginner', target: 'Calf Diamond', sets: '3 Sets', reps: '15 Reps', rest: '60s', tempo: '2-2-1-1', activation: { primary: 94, secondary: [{ name: 'Soleus', percent: 60 }] }, simpleGuide: 'Stand on balls of feet, lower heels for deep stretch, press up onto big toes, hold 1s.', whyItWorks: 'Full stretch and peak squeeze build calf definition.' },
          ],
          intermediate: [
            { name: 'Standing Barbell Calf Raise', equipment: 'barbell', level: 'Intermediate', target: 'Gastrocnemius Mass', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '3-2-1-1', activation: { primary: 96, secondary: [{ name: 'Soleus', percent: 65 }] }, simpleGuide: 'Bar on traps, stand on step, 2s pause at bottom stretch, explosive press to toes.', whyItWorks: 'Heavy loaded stretch produces superior calf growth.' },
          ],
          advanced: [
            { name: 'Single-Leg Dumbbell Calf Raise (3s Pause)', equipment: 'dumbbell', level: 'Advanced', target: 'Unilateral Calf Peak', sets: '4 Sets per leg', reps: '15 Reps', rest: '60s', tempo: '3-3-1-1', activation: { primary: 98, secondary: [{ name: 'Soleus', percent: 70 }] }, simpleGuide: 'Hold heavy dumbbell, pause 3 full seconds in deep stretch at bottom to kill Achilles rebound.', whyItWorks: 'Forces pure muscular contraction over tendon rebound.' },
          ],
        },
      },
      {
        id: 'soleus',
        name: 'Soleus (Deep Calf)',
        scientificName: 'Soleus',
        description: 'The broad, slow-twitch muscle underneath the gastrocnemius, best targeted with knees bent at 90°.',
        levelWorkouts: {
          beginner: [
            { name: 'Seated Calf Raises (Soleus Focus)', equipment: 'machine', level: 'Beginner', target: 'Soleus Muscle', sets: '3 Sets', reps: '15 - 20 Reps', rest: '60s', tempo: '2-2-1-1', activation: { primary: 95, secondary: [{ name: 'Gastrocnemius', percent: 40 }] }, simpleGuide: 'Sit with knees at 90°, lower heels for deep stretch, press up onto toes, hold 2s squeeze.', whyItWorks: 'Bent knee slackens gastrocnemius, isolating the soleus muscle.' },
          ],
          intermediate: [
            { name: 'Seated Dumbbell Calf Raise', equipment: 'dumbbell', level: 'Intermediate', target: 'Soleus Hypertrophy', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '3-2-1-1', activation: { primary: 96, secondary: [{ name: 'Gastrocnemius', percent: 45 }] }, simpleGuide: 'Rest heavy dumbbells on knees with balls of feet on block. Full stretch and squeeze.', whyItWorks: 'High-rep time under tension matches slow-twitch soleus fiber composition.' },
          ],
          advanced: [
            { name: 'Heavy Seated Machine Calf Raise (3s Pause)', equipment: 'machine', level: 'Advanced', target: 'Max Soleus Density', sets: '4 Sets', reps: '12 - 15 Reps', rest: '90s', tempo: '3-3-1-1', activation: { primary: 98, secondary: [{ name: 'Gastrocnemius', percent: 45 }] }, simpleGuide: 'Heavy loading, 3-second bottom pause, 2-second peak contraction.', whyItWorks: 'Maximizes tendon-free muscular mechanical tension.' },
          ],
        },
      },
    ],
    levelWorkouts: {
      beginner: [
        { name: 'Standing Machine Calf Raise', equipment: 'machine', level: 'Beginner', target: 'Calf Diamond', sets: '3 Sets', reps: '15 Reps', rest: '60s', tempo: '2-2-1-1', activation: { primary: 94, secondary: [{ name: 'Soleus', percent: 60 }] }, simpleGuide: 'Stand on balls of feet, lower heels for deep stretch, press up onto big toes, hold 1s.', whyItWorks: 'Full stretch and peak squeeze build calf definition.' },
      ],
      intermediate: [
        { name: 'Standing Barbell Calf Raise', equipment: 'barbell', level: 'Intermediate', target: 'Gastrocnemius Mass', sets: '4 Sets', reps: '12 - 15 Reps', rest: '60s', tempo: '3-2-1-1', activation: { primary: 96, secondary: [{ name: 'Soleus', percent: 65 }] }, simpleGuide: 'Bar on traps, stand on step, 2s pause at bottom stretch, explosive press to toes.', whyItWorks: 'Heavy loaded stretch produces superior calf growth.' },
      ],
      advanced: [
        { name: 'Single-Leg Dumbbell Calf Raise (3s Pause)', equipment: 'dumbbell', level: 'Advanced', target: 'Unilateral Calf Peak', sets: '4 Sets per leg', reps: '15 Reps', rest: '60s', tempo: '3-3-1-1', activation: { primary: 98, secondary: [{ name: 'Soleus', percent: 70 }] }, simpleGuide: 'Hold heavy dumbbell, pause 3 full seconds in deep stretch at bottom to kill Achilles rebound.', whyItWorks: 'Forces pure muscular contraction over tendon rebound.' },
      ],
    },
  },
};

// Aliases for seamless backward-compatibility across all views
MUSCLE_GROUPS.glutes = MUSCLE_GROUPS.glutes_hamstrings;
MUSCLE_GROUPS.hamstrings = MUSCLE_GROUPS.glutes_hamstrings;

export const QUICK_FILTERS = [
  { id: 'chest', label: 'Chest', icon: 'Shield' },
  { id: 'shoulders', label: 'Shoulders', icon: 'Flame' },
  { id: 'biceps', label: 'Biceps', icon: 'Zap' },
  { id: 'triceps', label: 'Triceps', icon: 'Target' },
  { id: 'back', label: 'Back & Lats', icon: 'Layers' },
  { id: 'abs', label: 'Abs & Core', icon: 'Activity' },
  { id: 'quads', label: 'Quads', icon: 'Crosshair' },
  { id: 'glutes_hamstrings', label: 'Glutes & Hams', icon: 'Sparkles' },
  { id: 'calves', label: 'Calves', icon: 'Gauge' },
];
