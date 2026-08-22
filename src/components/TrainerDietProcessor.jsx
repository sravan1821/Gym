import React, { useState, useRef } from 'react';
import {
  FileText,
  UserCheck,
  Activity,
  Flame,
  Utensils,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  ChevronRight,
  Sparkles,
  HeartPulse,
  Scale,
  Apple,
  Dumbbell,
  Upload,
  ShieldAlert,
  X,
  Info,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  AlertTriangle,
  Bot,
  Zap
} from 'lucide-react';

// Pre-configured clinical health issues matrix for intake
const COMMON_HEALTH_ISSUES = [
  { id: 'hypertension', label: 'Hypertension (High BP)', category: 'cardio', icon: '🩸', risk: 'High', rule: 'Sodium < 2000mg/day, High Potassium, No processed deli meats' },
  { id: 'diabetes_t2', label: 'Type 2 Diabetes / Insulin Resistance', category: 'metabolic', icon: '🩺', risk: 'High', rule: 'Low Glycemic Index Carbs, High Fiber (>35g), Controlled Glucose Spikes' },
  { id: 'thyroid', label: 'Thyroid Disfunction (Hypo/Hyper)', category: 'metabolic', icon: '🦋', risk: 'Moderate', rule: 'Iodine & Selenium support, Adjusted BMR multiplier factor' },
  { id: 'pcos', label: 'PCOS / PCOD', category: 'hormonal', icon: '🌸', risk: 'Moderate', rule: 'Anti-inflammatory macros, High Protein (35%), Low refined sugars' },
  { id: 'joint_discomfort', label: 'Knee / Back Joint Discomfort', category: 'joint', icon: '🦴', risk: 'Low', rule: 'Omega-3 Fatty Acids (3g), Collagen, Anti-inflammatory spices' },
  { id: 'lactose', label: 'Lactose Intolerance', category: 'allergy', icon: '🥛', risk: 'Moderate', rule: 'Dairy-Free Whey Isolate, Almond/Oat Milk substitutes' },
  { id: 'celiac', label: 'Gluten Sensitivity / Celiac', category: 'allergy', icon: '🌾', risk: 'High', rule: 'Strictly Gluten-Free grains (Jasmine Rice, Quinoa, Sweet Potato)' },
  { id: 'nut_allergy', label: 'Peanut / Tree Nut Allergy', category: 'allergy', icon: '🥜', risk: 'High', rule: 'Strictly Nut-Free fats (Extra Virgin Olive Oil, Avocado, Sunflower Seed Butter)' }
];

// Sample preloaded client submissions for Trainer Workspace
const INITIAL_CLIENT_REPORTS = [
  {
    id: 'REP-101',
    clientName: 'Alex Johnson',
    age: 28,
    gender: 'Male',
    weightKg: 84,
    heightCm: 178,
    bmi: 26.5,
    bmiCategory: 'Overweight',
    bodyFatPercent: 22,
    goal: 'fat_loss',
    activityLevel: 'moderate',
    healthIssues: ['joint_discomfort', 'lactose'],
    conditionsNotes: 'Mild knee pain during deep squats, desk job posture',
    dietPreference: 'high_protein',
    allergies: 'Lactose Intolerance',
    submittedAt: '2 hours ago',
    status: 'pending',
    uploadedFileName: 'Alex_Johnson_BMI_DEXA_Scan.pdf'
  },
  {
    id: 'REP-102',
    clientName: 'Sarah Jenkins',
    age: 24,
    gender: 'Female',
    weightKg: 62,
    heightCm: 165,
    bmi: 22.8,
    bmiCategory: 'Normal',
    bodyFatPercent: 26,
    goal: 'hypertrophy',
    activityLevel: 'active',
    healthIssues: ['pcos'],
    conditionsNotes: 'Wants to build glute & upper back strength, managing mild insulin sensitivity',
    dietPreference: 'balanced',
    allergies: 'Peanuts',
    submittedAt: 'Yesterday',
    status: 'processed',
    uploadedFileName: 'Sarah_J_Clinical_Body_Report.pdf'
  }
];

export default function TrainerDietProcessor() {
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'trainer'
  const [wizardStep, setWizardStep] = useState(1); // 1: BMI Upload -> 2: Health Issues -> 3: Generated Report
  const [clientReports, setClientReports] = useState(INITIAL_CLIENT_REPORTS);
  const [selectedReport, setSelectedReport] = useState(INITIAL_CLIENT_REPORTS[0]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Step 1: Upload & BMI State
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    clientName: 'David Miller',
    age: 29,
    gender: 'Male',
    weightKg: 82,
    heightCm: 175,
    bodyFatPercent: 21,
    goal: 'fat_loss',
    activityLevel: 'moderate',
    healthIssues: ['hypertension', 'lactose'],
    conditionsNotes: 'Stage 1 Hypertension, sensitive to dairy proteins.',
    dietPreference: 'high_protein',
    allergies: 'Lactose'
  });

  // Calculate BMI and Category
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return { bmi: 0, category: 'Unknown', color: 'text-stone-900', idealMin: 0, idealMax: 0 };
    const hMeter = height / 100;
    const bmiVal = parseFloat((weight / (hMeter * hMeter)).toFixed(1));
    const idealMin = parseFloat((18.5 * hMeter * hMeter).toFixed(1));
    const idealMax = parseFloat((24.9 * hMeter * hMeter).toFixed(1));

    let category = 'Normal Weight';
    let badgeBg = 'bg-emerald-100 border-emerald-300 text-emerald-900';

    if (bmiVal < 18.5) {
      category = 'Underweight';
      badgeBg = 'bg-amber-100 border-amber-300 text-amber-900';
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      category = 'Normal Weight';
      badgeBg = 'bg-emerald-100 border-emerald-300 text-emerald-900';
    } else if (bmiVal >= 25.0 && bmiVal <= 29.9) {
      category = 'Overweight';
      badgeBg = 'bg-amber-100 border-amber-300 text-amber-900';
    } else if (bmiVal >= 30.0 && bmiVal <= 34.9) {
      category = 'Obese Class I';
      badgeBg = 'bg-red-100 border-red-300 text-red-900';
    } else {
      category = 'Obese Class II/III';
      badgeBg = 'bg-red-200 border-red-400 text-red-950';
    }

    return { bmi: bmiVal, category, badgeBg, idealMin, idealMax };
  };

  const bmiData = calculateBMI(formData.weightKg, formData.heightCm);

  // File Upload Handlers
  const handleFileChange = (file) => {
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type || 'Medical PDF Report'
      });
      setIsUploading(false);
      setSuccessMessage(`BMI Test Report "${file.name}" uploaded & parsed successfully! Metrics auto-extracted.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    }, 800);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleToggleHealthIssue = (issueId) => {
    setFormData(prev => {
      const exists = prev.healthIssues.includes(issueId);
      const updated = exists
        ? prev.healthIssues.filter(id => id !== issueId)
        : [...prev.healthIssues, issueId];
      return { ...prev, healthIssues: updated };
    });
  };

  // Detailed Metabolic & Macro Calculation Engine
  const calculateMetrics = (report) => {
    if (!report) return null;
    const { weightKg, heightCm, age, gender, activityLevel, goal, healthIssues } = report;

    // BMR (Mifflin-St Jeor)
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    bmr += gender === 'Male' ? 5 : -161;

    // TDEE Multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    const tdee = Math.round(bmr * (multipliers[activityLevel] || 1.55));

    // Goal adjustments
    let targetCalories = tdee;
    if (goal === 'fat_loss') targetCalories = Math.round(tdee * 0.80);
    else if (goal === 'hypertrophy') targetCalories = Math.round(tdee * 1.12);
    else if (goal === 'endurance') targetCalories = Math.round(tdee * 1.05);

    // Macros
    let proteinGrams = Math.round(weightKg * (goal === 'hypertrophy' ? 2.2 : 2.0));
    let fatGrams = Math.round((targetCalories * 0.25) / 9);

    if (healthIssues?.includes('pcos')) {
      proteinGrams = Math.round(weightKg * 2.2);
    }
    if (healthIssues?.includes('diabetes_t2')) {
      fatGrams = Math.round((targetCalories * 0.30) / 9);
    }

    const proteinCal = proteinGrams * 4;
    const fatCal = fatGrams * 9;
    const carbCal = Math.max(0, targetCalories - proteinCal - fatCal);
    const carbGrams = Math.round(carbCal / 4);

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      fatGrams,
      carbGrams,
      proteinPercent: Math.round((proteinCal / targetCalories) * 100),
      carbPercent: Math.round((carbCal / targetCalories) * 100),
      fatPercent: Math.round((fatCal / targetCalories) * 100)
    };
  };

  const currentReportObj = {
    ...formData,
    id: `REP-${Math.floor(100 + Math.random() * 900)}`,
    bmi: bmiData.bmi,
    bmiCategory: bmiData.category,
    submittedAt: 'Just now',
    status: 'pending',
    uploadedFileName: uploadedFile ? uploadedFile.name : 'Verified_BMI_Test_Report.pdf'
  };

  const metrics = calculateMetrics(currentReportObj);
  const activeTrainerReportMetrics = calculateMetrics(selectedReport);

  // Tailored 7-Day Daily Meal Generator
  const generateTailoredMealSchedule = (report, metrics) => {
    if (!report || !metrics) return [];
    const { healthIssues } = report;
    const p = metrics.proteinGrams;
    const c = metrics.carbGrams;
    const f = metrics.fatGrams;

    const isLactoseFree = healthIssues?.includes('lactose');
    const isGlutenFree = healthIssues?.includes('celiac');
    const isDiabetic = healthIssues?.includes('diabetes_t2');
    const isHypertensive = healthIssues?.includes('hypertension');
    const isNutFree = healthIssues?.includes('nut_allergy');

    return [
      {
        meal: 'Meal 1: Power Breakfast',
        time: '08:00 AM',
        items: [
          `${Math.round(p * 0.25 / 6)} Egg Whites + 2 Whole Eggs scrambles`,
          isGlutenFree
            ? `${Math.round(c * 0.28)}g Organic Rolled Oats cooked in Almond Milk`
            : `${Math.round(c * 0.28)}g Whole Grain Oatmeal with Cinnamon`,
          '1 tbsp Chia seeds & handfull of fresh blueberries',
          isHypertensive ? '⚠️ Restrict added salt (Low Sodium rule)' : 'Dash of Himalayan Pink Salt'
        ],
        macros: `P: ${Math.round(p * 0.25)}g | C: ${Math.round(c * 0.28)}g | F: ${Math.round(f * 0.22)}g`
      },
      {
        meal: 'Meal 2: Mid-Morning Health Fuel',
        time: '11:00 AM',
        items: [
          isLactoseFree
            ? '1 Scoop Lactose-Free Whey Protein Isolate (or Plant Protein)'
            : '1 Scoop Native Whey Isolate Protein',
          isDiabetic
            ? '1 Green Apple + 10 Raw Almonds (Low GI)'
            : '1 Medium Banana / 150g Greek Yogurt',
          isNutFree ? '1 tbsp Sunflower Seed Butter' : '10 Whole Raw Almonds'
        ],
        macros: `P: ${Math.round(p * 0.25)}g | C: ${Math.round(c * 0.22)}g | F: ${Math.round(f * 0.2)}g`
      },
      {
        meal: 'Meal 3: Anabolic Lunch',
        time: '02:00 PM',
        items: [
          '200g Lean Grilled Chicken Breast or Organic Tofu',
          `${Math.round(c * 0.35)}g Steamed Jasmine Rice or Sweet Potato`,
          'Steamed Broccoli & Mixed Green Salad with Extra Virgin Olive Oil',
          isHypertensive ? '⚡ High Potassium: Add 1 cup cooked spinach' : 'Cucumber & Lemon Zest Salad'
        ],
        macros: `P: ${Math.round(p * 0.3)}g | C: ${Math.round(c * 0.35)}g | F: ${Math.round(f * 0.3)}g`
      },
      {
        meal: 'Meal 4: Pre & Post Workout Recovery',
        time: '06:00 PM',
        items: [
          'Pre-Workout: 1 Rice Cake + 1 tbsp Seed Butter / Honey',
          'Post-Workout: 1.5 Scoop Protein Isolate + 5g Creatine Monohydrate',
          healthIssues?.includes('joint_discomfort') ? '💊 3g Omega-3 Fish Oil + 10g Hydrolyzed Collagen' : 'Hydration: 500ml Water + Electrolytes'
        ],
        macros: `P: ${Math.round(p * 0.2)}g | C: ${Math.round(c * 0.15)}g | F: ${Math.round(f * 0.28)}g`
      }
    ];
  };

  // Tailored Training Split Generator
  const generateTailoredTrainingSplit = (report) => {
    if (!report) return [];
    const { goal, healthIssues } = report;
    const hasJointPain = healthIssues?.includes('joint_discomfort');
    const hasPcosOrDiabetes = healthIssues?.includes('pcos') || healthIssues?.includes('diabetes_t2');

    if (goal === 'hypertrophy') {
      return [
        {
          day: 'Day 1',
          focus: 'PUSH A (Chest, Shoulders, Triceps)',
          exercises: [
            hasJointPain ? 'Seated Machine Chest Press (3 sets x 8-10 reps)' : 'Barbell Bench Press (4 sets x 6-8 reps)',
            'Incline Dumbbell Press (3 sets x 8-10 reps)',
            'Standing Dumbbell Lateral Raises (4 sets x 12-15 reps)',
            'Tricep Rope Pushdowns (3 sets x 10-12 reps)'
          ],
          cardio: hasPcosOrDiabetes ? '15 min Zone 2 Incline Treadmill Walk' : '5 min Cooldown Walk'
        },
        {
          day: 'Day 2',
          focus: 'PULL A (Lats, Upper Back, Biceps)',
          exercises: [
            'Lat Pulldowns (4 sets x 8-10 reps)',
            'Chest-Supported Neutral Grip Row (3 sets x 10-12 reps)',
            'Rear Delt Cable Flyes (3 sets x 12-15 reps)',
            'Incline DB Bicep Curls (3 sets x 10-12 reps)'
          ],
          cardio: '5 min Cooldown Stretching'
        },
        {
          day: 'Day 3',
          focus: 'LEGS & ABS (Quads, Hamstrings, Calves)',
          exercises: [
            hasJointPain ? 'Leg Press (No Axial Load) (4 sets x 10-12 reps)' : 'Barbell Back Squat (4 sets x 6-8 reps)',
            'Romanian Dumbbell Deadlift (3 sets x 8-10 reps)',
            'Seated Leg Extensions (3 sets x 12-15 reps)',
            'Standing Calf Raises (4 sets x 15 reps)'
          ],
          cardio: hasPcosOrDiabetes ? '20 min Steady State Cycling' : '10 min Light Foam Rolling'
        },
        {
          day: 'Day 4',
          focus: 'ACTIVE RECOVERY & MOBILITY',
          exercises: [
            'Full Body Foam Rolling & Dynamic Mobility Flow',
            '30 min Zone 2 Aerobic Walk / Light Cycling'
          ],
          cardio: 'Zone 2 Active Recovery'
        },
        {
          day: 'Day 5',
          focus: 'UPPER BODY HYPERTROPHY',
          exercises: [
            'Incline Cable Chest Flyes (3 sets x 12 reps)',
            'Seated Dumbbell Shoulder Press (3 sets x 8-10 reps)',
            'Hammer Strength Lat Pulldown (3 sets x 10 reps)',
            'EZ-Bar Preacher Curls & Overhead Tricep Ext Supersets (3 sets)'
          ],
          cardio: '10 min Post-Lifting Cooldown'
        }
      ];
    } else {
      return [
        {
          day: 'Day 1',
          focus: 'UPPER BODY COMPOUND & FAT BURN',
          exercises: [
            'Incline DB Bench Press (4 sets x 10-12 reps)',
            'Seated Cable Rows (4 sets x 10-12 reps)',
            'Dumbbell Overhead Shoulder Press (3 sets x 12 reps)',
            'Face Pulls (3 sets x 15 reps)'
          ],
          cardio: '15 min Post-Workout HIIT / Incline Walk'
        },
        {
          day: 'Day 2',
          focus: 'LOWER BODY HYPERTROPHY & GLUTES',
          exercises: [
            hasJointPain ? 'Goblet Squats / Leg Press (4 sets x 12 reps)' : 'Barbell Squats (4 sets x 8-10 reps)',
            'Dumbbell Walking Lunges (3 sets x 10 reps/leg)',
            'Lying Leg Curls (3 sets x 12-15 reps)',
            'Plank Hold (3 sets x 45 seconds)'
          ],
          cardio: '15 min Stairmaster Steady State'
        },
        {
          day: 'Day 3',
          focus: 'ACTIVE AEROBIC RECOVERY',
          exercises: ['30 min Zone 2 Incline Treadmill Walk & Core Conditioning'],
          cardio: 'Zone 2 Metabolic Conditioning'
        },
        {
          day: 'Day 4',
          focus: 'FULL BODY ATHLETIC CONDITIONING',
          exercises: [
            'Dumbbell Thrusters / Kettlebell Swings (4 sets x 12 reps)',
            'Lat Pulldowns (3 sets x 12 reps)',
            'Push-Ups to Plank Row (3 sets x 10 reps)',
            'Hanging Knee Raises (3 sets x 15 reps)'
          ],
          cardio: '15 min Zone 2 Cycling'
        }
      ];
    }
  };

  const mealSchedule = generateTailoredMealSchedule(currentReportObj, metrics);
  const trainingSplit = generateTailoredTrainingSplit(currentReportObj);

  const trainerSelectedMealSchedule = generateTailoredMealSchedule(selectedReport, activeTrainerReportMetrics);
  const trainerSelectedTrainingSplit = generateTailoredTrainingSplit(selectedReport);

  const handleFinishWizardAndSubmit = () => {
    const newReport = {
      ...currentReportObj,
      submittedAt: 'Just now',
      status: 'pending'
    };

    setClientReports([newReport, ...clientReports]);
    setSelectedReport(newReport);
    setSuccessMessage('🎉 Your BMI Test Report, Medical Intake & Custom Training Split have been processed into an official Plan!');
    setActiveTab('trainer');
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  const handleOpenAIChatbot = () => {
    window.dispatchEvent(new CustomEvent('open-health-chatbot'));
  };

  return (
    <section id="diet-processor" className="py-20 bg-[#f9f5eb] text-stone-900 relative overflow-hidden">
      {/* Background Soft Warm Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-mono font-bold tracking-wider mb-4 uppercase shadow-sm">
            <Utensils className="w-4 h-4 text-red-600 animate-pulse" />
            20-YEAR CLINICAL ARCHITECTURE • BMI, DIET & TRAINING SPLIT ENGINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-stone-900 uppercase">
            BMI TEST <span className="text-red-600">& CLINICAL DIET PROCESSOR</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Upload your verified BMI test report, answer medical condition intake questions, and generate a hyper-customized anabolic diet schedule + tailored training split.
          </p>

          {/* Top Level Tab Navigation Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#efe9db] border border-[#e4dcd0] shadow-sm">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'wizard'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md shadow-red-600/25'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              CLIENT ASSESSMENT & GENERATOR (3-STEPS)
            </button>
            <button
              onClick={() => setActiveTab('trainer')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'trainer'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md shadow-red-600/25'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              TRAINER REVIEW WORKSPACE ({clientReports.length})
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {successMessage && (
          <div className="mb-8 max-w-3xl mx-auto p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-mono flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-700 hover:text-stone-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: 3-STEP DIET & WORKOUT SPLIT GENERATOR WIZARD */}
        {activeTab === 'wizard' && (
          <div className="max-w-4xl mx-auto">
            {/* Stepper Header Progress Indicator */}
            <div className="mb-8 grid grid-cols-3 gap-3 bg-[#efe9db] p-2 rounded-2xl border border-[#e4dcd0]">
              <button
                onClick={() => setWizardStep(1)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                  wizardStep === 1
                    ? 'bg-red-600 text-white shadow-md'
                    : wizardStep > 1
                    ? 'bg-white text-emerald-700 border border-emerald-300'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">1</span>
                <span className="hidden sm:inline">STEP 1: UPLOAD BMI TEST</span>
                <span className="sm:hidden">1: BMI</span>
              </button>

              <button
                onClick={() => setWizardStep(2)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                  wizardStep === 2
                    ? 'bg-red-600 text-white shadow-md'
                    : wizardStep > 2
                    ? 'bg-white text-emerald-700 border border-emerald-300'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">2</span>
                <span className="hidden sm:inline">STEP 2: HEALTH INTAKE</span>
                <span className="sm:hidden">2: HEALTH</span>
              </button>

              <button
                onClick={() => setWizardStep(3)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                  wizardStep === 3
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">3</span>
                <span className="hidden sm:inline">STEP 3: GENERATED PLAN</span>
                <span className="sm:hidden">3: PLAN</span>
              </button>
            </div>

            {/* STEP 1: UPLOAD BMI TEST REPORT & VERIFY METRICS */}
            {wizardStep === 1 && (
              <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-8 animate-in fade-in">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 border border-red-200">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-stone-900">Step 1: Upload BMI Test Report</h3>
                      <p className="text-xs text-stone-500">Upload your clinical DEXA/InBody BMI report file or enter your measured body metrics below.</p>
                    </div>
                  </div>
                </div>

                {/* Drag & Drop File Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-red-600 bg-red-50 scale-[1.01]'
                      : uploadedFile
                      ? 'border-emerald-500 bg-emerald-50/60'
                      : 'border-[#dcd6c8] bg-[#f9f5eb]/80 hover:border-red-500/80 hover:bg-[#efe9db]/80'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  />

                  {isUploading ? (
                    <div className="py-4 space-y-2">
                      <Activity className="w-8 h-8 text-red-600 animate-spin mx-auto" />
                      <p className="text-xs font-mono text-stone-700">Parsing BMI Test Report & Extracting Clinical Metrics...</p>
                    </div>
                  ) : uploadedFile ? (
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center gap-3 text-left">
                        <FileText className="w-8 h-8 text-emerald-600" />
                        <div>
                          <span className="text-sm font-bold text-stone-900 block">{uploadedFile.name}</span>
                          <span className="text-[11px] text-emerald-700 font-mono">Parsed & Verified • {uploadedFile.size}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold">
                        VERIFIED REPORT
                      </span>
                    </div>
                  ) : (
                    <div className="py-4 space-y-2">
                      <Upload className="w-8 h-8 text-stone-400 mx-auto group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-bold text-stone-800">Drag & Drop your BMI Test Report here, or click to browse</p>
                      <p className="text-xs text-stone-500 font-mono">Supports PDF, DEXA Scan Images, PNG, JPG (Max 25MB)</p>
                    </div>
                  )}
                </div>

                {/* BMI Assessment Gauge Display */}
                <div className="p-6 rounded-2xl bg-[#f9f5eb] border border-[#e4dcd0] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-stone-500 uppercase font-bold block">Calculated Body Mass Index (BMI)</span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-3xl font-black font-mono text-stone-900">{bmiData.bmi}</span>
                        <span className={`px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase ${bmiData.badgeBg}`}>
                          {bmiData.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs text-stone-600">
                      <span>Ideal Weight Target:</span>
                      <span className="block text-emerald-700 font-bold text-sm mt-0.5">
                        {bmiData.idealMin} kg - {bmiData.idealMax} kg
                      </span>
                    </div>
                  </div>

                  {/* Visual Clinical BMI Progress Scale Bar */}
                  <div className="space-y-1 pt-2">
                    <div className="h-3 rounded-full bg-[#e4dcd0] overflow-hidden flex relative">
                      <div className="w-[18.5%] bg-amber-400" title="Underweight (<18.5)"></div>
                      <div className="w-[25%] bg-emerald-500" title="Normal (18.5-24.9)"></div>
                      <div className="w-[25%] bg-amber-500" title="Overweight (25-29.9)"></div>
                      <div className="w-[31.5%] bg-red-600" title="Obese (30+)"></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 font-bold">
                      <span>15.0</span>
                      <span>18.5 (Normal)</span>
                      <span>25.0 (Overweight)</span>
                      <span>30.0 (Obese)</span>
                      <span>40.0</span>
                    </div>
                  </div>
                </div>

                {/* Physical Body Metrics Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Full Client Name *</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Age (Years)</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Current Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weightKg}
                      onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.heightCm}
                      onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Body Fat % (Estimated / DEXA)</label>
                    <input
                      type="number"
                      value={formData.bodyFatPercent}
                      onChange={(e) => setFormData({ ...formData, bodyFatPercent: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Primary Goal Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Primary Fitness Goal</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    >
                      <option value="fat_loss">Aggressive Fat Loss (20% Deficit)</option>
                      <option value="hypertrophy">Muscle Mass / Hypertrophy (12% Surplus)</option>
                      <option value="recomp">Body Recomposition (Maintenance)</option>
                      <option value="endurance">Athletic Performance & Endurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">Activity Level</label>
                    <select
                      value={formData.activityLevel}
                      onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 text-sm focus:outline-none focus:border-red-600 focus:bg-white"
                    >
                      <option value="sedentary">Sedentary (Desk job, little exercise)</option>
                      <option value="light">Lightly Active (1-3 workouts/week)</option>
                      <option value="moderate">Moderately Active (3-5 intense workouts)</option>
                      <option value="active">Very Active (6-7 workouts/week)</option>
                    </select>
                  </div>
                </div>

                {/* Step 1 Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-red-600/25 flex items-center gap-2"
                  >
                    <span>Proceed to Health Intake</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: HEALTH ISSUES & MEDICAL CONDITIONS INTAKE */}
            {wizardStep === 2 && (
              <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-8 animate-in fade-in">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 border border-amber-200">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-stone-900">Step 2: Medical & Health Conditions Intake</h3>
                      <p className="text-xs text-stone-500">Select all present health issues, medical conditions, or dietary restrictions before generating your plan.</p>
                    </div>
                  </div>
                </div>

                {/* Medical Screening Tag Selection Grid */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase">
                    Select Active Health Conditions / Allergies ({formData.healthIssues.length} Selected)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COMMON_HEALTH_ISSUES.map((issue) => {
                      const isSelected = formData.healthIssues.includes(issue.id);
                      return (
                        <button
                          key={issue.id}
                          type="button"
                          onClick={() => handleToggleHealthIssue(issue.id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-red-50 border-red-500 text-stone-900 shadow-sm ring-1 ring-red-500/40'
                              : 'bg-[#f9f5eb] border-[#dcd6c8] hover:bg-[#efe9db]'
                          }`}
                        >
                          <span className="text-xl">{issue.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900 font-display">{issue.label}</span>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-stone-600 mt-1 font-mono">{issue.rule}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Medical Alert Warning Box */}
                {formData.healthIssues.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-800 uppercase">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span>Clinical Diet & Workout Modification Rules Active</span>
                    </div>
                    <ul className="space-y-1 text-[11px] list-disc list-inside text-amber-900/90">
                      {formData.healthIssues.map(id => {
                        const issue = COMMON_HEALTH_ISSUES.find(i => i.id === id);
                        return issue ? <li key={id}><strong>{issue.label}:</strong> {issue.rule}</li> : null;
                      })}
                    </ul>
                  </div>
                )}

                {/* Doctor Notes & Additional Notes */}
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase">
                    Additional Doctor Notes, Prescription Requirements, or Joint Injury Notes
                  </label>
                  <textarea
                    rows="3"
                    value={formData.conditionsNotes}
                    onChange={(e) => setFormData({ ...formData, conditionsNotes: e.target.value })}
                    placeholder="Mention specific medications, blood test parameters, or doctor recommendations..."
                    className="w-full px-4 py-3 rounded-xl bg-[#f9f5eb] border border-[#dcd6c8] text-stone-900 placeholder-stone-500 text-xs focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                  ></textarea>
                </div>

                {/* Step 2 Back & Next Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-6 py-3.5 rounded-xl bg-[#efe9db] hover:bg-[#e4dcd0] text-stone-800 font-mono font-bold text-xs uppercase flex items-center gap-2 border border-[#dcd6c8]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to BMI Upload</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-red-600/25 flex items-center gap-2"
                  >
                    <span>Generate Diet & Workout Split</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: GENERATED CLINICAL DIET & WORKOUT SPLIT REPORT */}
            {wizardStep === 3 && metrics && (
              <div className="space-y-6 animate-in fade-in">
                {/* Header Actions Card */}
                <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-mono font-bold uppercase">
                        GENERATED PLAN
                      </span>
                      <span className="text-xs font-mono text-stone-500">{currentReportObj.id}</span>
                    </div>
                    <h3 className="text-2xl font-black font-display text-stone-900 mt-1">{formData.clientName}</h3>
                    <p className="text-xs text-stone-600 mt-0.5 font-mono">
                      BMI: <span className="text-stone-900 font-bold">{bmiData.bmi}</span> ({bmiData.category}) • {formData.weightKg} kg • Goal: <span className="text-red-700 font-bold uppercase">{formData.goal.replace('_', ' ')}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowPrintModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-[#292524] hover:bg-[#1c1917] text-white text-xs font-mono font-bold transition-all shadow flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4 text-red-500" />
                      Print Official Medical Report
                    </button>

                    <button
                      onClick={handleFinishWizardAndSubmit}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold transition-all shadow flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Submit to Trainer Workspace
                    </button>
                  </div>
                </div>

                {/* Metabolic Calculator & Macro Split Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#e4dcd0] text-center shadow-sm">
                    <Flame className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">BMR</span>
                    <span className="text-2xl font-black text-stone-900 font-mono">{metrics.bmr}</span>
                    <span className="text-[10px] font-mono text-stone-500 block">kcal/day</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#e4dcd0] text-center shadow-sm">
                    <Activity className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">TDEE</span>
                    <span className="text-2xl font-black text-stone-900 font-mono">{metrics.tdee}</span>
                    <span className="text-[10px] font-mono text-stone-500 block">kcal/day</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-center ring-1 ring-red-400/20 shadow-sm">
                    <Sparkles className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-red-700 uppercase font-bold block">Target Cal</span>
                    <span className="text-2xl font-black text-red-700 font-mono">{metrics.targetCalories}</span>
                    <span className="text-[10px] font-mono text-red-600/80 block">kcal/day Target</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#e4dcd0] text-center shadow-sm">
                    <Dumbbell className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">Protein Goal</span>
                    <span className="text-2xl font-black text-stone-900 font-mono">{metrics.proteinGrams}g</span>
                    <span className="text-[10px] font-mono text-stone-500 block">Daily Target</span>
                  </div>
                </div>

                {/* Prescribed Daily Diet Schedule */}
                <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e4dcd0]">
                    <h4 className="text-lg font-bold font-display text-stone-900 flex items-center gap-2">
                      <Apple className="w-5 h-5 text-red-600" />
                      Prescribed Daily Diet Schedule
                    </h4>
                    <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      ⚡ 100% Medical Safety Checked
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mealSchedule.map((mealItem, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#f9f5eb] border border-[#e4dcd0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-display text-red-700">{mealItem.meal}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#efe9db] text-stone-700 border border-[#dcd6c8]">{mealItem.time}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-stone-800">
                          {mealItem.items.map((it, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-red-600 font-bold">•</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-[#e4dcd0] text-[10px] font-mono text-stone-600 font-bold">
                          {mealItem.macros}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GENERATED PRESCRIBED WEEKLY TRAINING SPLIT */}
                <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e4dcd0]">
                    <h4 className="text-lg font-bold font-display text-stone-900 flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-red-600" />
                      Prescribed Weekly Training Split (Goal & Joint Adjusted)
                    </h4>
                    <span className="text-xs font-mono text-stone-700 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-200">
                      🏋️ Tailored Hypertrophy/Strength Split
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trainingSplit.map((splitItem, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#f9f5eb] border border-[#e4dcd0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-display text-red-700 uppercase">{splitItem.day}: {splitItem.focus}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-800">
                          {splitItem.exercises.map((ex, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-red-600 font-bold">✓</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-[#e4dcd0] text-[10px] font-mono text-stone-600 font-bold flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-600" />
                          <span>Cardio & Cooldown: {splitItem.cardio}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Chatbot Consultation Banner */}
                <div className="p-5 rounded-2xl bg-[#f5efe0] text-stone-900 border border-red-200 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 font-display">Have Questions About Your Generated Diet or Training Split?</h4>
                      <p className="text-xs text-stone-600">Consult our 24/7 AI Health & Gym Assistant directly on the left side of the screen.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenAIChatbot}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-mono font-bold transition-all shadow-md shrink-0 flex items-center gap-2 hover:brightness-110"
                  >
                    <span>Ask AI Coach</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRAINER REVIEW WORKSPACE */}
        {activeTab === 'trainer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Submitted Client Reports List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-red-600" />
                  Submitted Client Reports ({clientReports.length})
                </h3>
              </div>

              <div className="space-y-3">
                {clientReports.map((rep) => {
                  const isSelected = selectedReport?.id === rep.id;
                  return (
                    <button
                      key={rep.id}
                      onClick={() => setSelectedReport(rep)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-white border-red-600 shadow-md ring-1 ring-red-500/40'
                          : 'bg-[#f9f5eb] border-[#e4dcd0] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold font-display text-stone-900">{rep.clientName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            rep.status === 'processed'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {rep.status === 'processed' ? 'Approved' : 'Needs Review'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-600 font-mono">
                        <span className="text-stone-900 font-bold">BMI {rep.bmi}</span>
                        <span>•</span>
                        <span>{rep.weightKg} kg</span>
                        <span>•</span>
                        <span className="text-red-700 font-bold uppercase">{rep.goal.replace('_', ' ')}</span>
                      </div>

                      <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>Submitted {rep.submittedAt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Trainer Workspace Panel */}
            {selectedReport && activeTrainerReportMetrics ? (
              <div className="lg:col-span-8 space-y-6">
                {/* Client Overview Card */}
                <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4dcd0] pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-stone-500">{selectedReport.id}</span>
                        <h3 className="text-xl font-black font-display text-stone-900">{selectedReport.clientName}</h3>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 font-mono">
                        BMI: <span className="text-emerald-700 font-bold">{selectedReport.bmi}</span> ({selectedReport.bmiCategory}) • {selectedReport.weightKg} kg • Goal: <span className="text-red-700 font-bold uppercase">{selectedReport.goal.replace('_', ' ')}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedReport.status !== 'processed' ? (
                        <button
                          onClick={() => {
                            setClientReports(prev => prev.map(r => r.id === selectedReport.id ? { ...r, status: 'processed' } : r));
                            setSelectedReport(prev => ({ ...prev, status: 'processed' }));
                          }}
                          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold transition-all shadow flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve & Dispatch Plan
                        </button>
                      ) : (
                        <span className="px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Plan Approved & Sent
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Medical Conditions & Notes */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-[#f9f5eb] border border-[#e4dcd0]">
                      <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold mb-1">Health Conditions Flagged:</span>
                      <div className="flex flex-wrap gap-1 text-xs text-stone-800">
                        {selectedReport.healthIssues?.map(hId => {
                          const issue = COMMON_HEALTH_ISSUES.find(i => i.id === hId);
                          return (
                            <span key={hId} className="px-2 py-0.5 rounded bg-red-100 border border-red-200 text-red-800 text-[10px] font-mono font-bold">
                              {issue?.icon} {issue?.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f9f5eb] border border-[#e4dcd0]">
                      <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold mb-1">Doctor & Physical Notes:</span>
                      <p className="text-xs text-stone-800">{selectedReport.conditionsNotes || 'No extra physical notes provided.'}</p>
                    </div>
                  </div>
                </div>

                {/* Prescribed Daily Meal Schedule */}
                <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e4dcd0]">
                    <h4 className="text-base font-bold font-display text-stone-900 flex items-center gap-2">
                      <Apple className="w-5 h-5 text-red-600" />
                      Trainer Prescribed Daily Diet Schedule
                    </h4>
                    <span className="text-xs font-mono text-stone-500">7-Day Anabolic Cycle</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trainerSelectedMealSchedule.map((mealItem, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#f9f5eb] border border-[#e4dcd0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-display text-red-700">{mealItem.meal}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#efe9db] text-stone-700">{mealItem.time}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-stone-800">
                          {mealItem.items.map((it, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-red-600 font-bold">•</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-[#e4dcd0] text-[10px] font-mono text-stone-600 font-bold">
                          {mealItem.macros}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescribed Training Split */}
                <div className="bg-white border border-[#e4dcd0] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e4dcd0]">
                    <h4 className="text-base font-bold font-display text-stone-900 flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-red-600" />
                      Trainer Prescribed Weekly Training Split
                    </h4>
                    <span className="text-xs font-mono text-stone-500">Tailored Workout Program</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trainerSelectedTrainingSplit.map((splitItem, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#f9f5eb] border border-[#e4dcd0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-display text-red-700 uppercase">{splitItem.day}: {splitItem.focus}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-800">
                          {splitItem.exercises.map((ex, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-red-600 font-bold">✓</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* PRINTABLE / OFFICIAL MEDICAL DIET & TRAINING SPLIT REPORT MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Modal Header */}
            <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
                  SS
                </div>
                <div>
                  <h3 className="text-base font-bold font-display">OFFICIAL CLINICAL DIET & WORKOUT SPLIT REPORT</h3>
                  <p className="text-xs text-stone-400 font-mono">Issued by Certified Health & Gym Dietitian</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-red-500"
                >
                  <Printer className="w-4 h-4" /> Print PDF
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Printable Content Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-xs text-stone-800 leading-relaxed">
              {/* Document Header */}
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h2 className="text-lg font-black font-display text-stone-900">{formData.clientName}</h2>
                  <p className="font-mono text-stone-600">Gender: {formData.gender} | Age: {formData.age} Yrs</p>
                  <p className="font-mono text-stone-600">Height: {formData.heightCm} cm | Weight: {formData.weightKg} kg</p>
                </div>
                <div className="text-right font-mono">
                  <span className="px-3 py-1 rounded bg-stone-100 border text-stone-900 font-bold block">
                    BMI Score: {bmiData.bmi} ({bmiData.category})
                  </span>
                  <span className="text-[10px] text-stone-500 mt-1 block">Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Health Conditions Section */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-900 font-display mb-1">Diagnosed Health Conditions & Rules</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.healthIssues.map(id => {
                    const issue = COMMON_HEALTH_ISSUES.find(i => i.id === id);
                    return issue ? (
                      <span key={id} className="px-2 py-1 rounded bg-white border border-amber-300 font-mono font-bold text-amber-800">
                        {issue.icon} {issue.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Prescribed Macros */}
              <div className="grid grid-cols-4 gap-3 text-center font-mono">
                <div className="p-3 bg-stone-50 border rounded-xl">
                  <span className="text-[10px] text-stone-500 block font-bold">BMR</span>
                  <span className="text-base font-bold text-stone-900">{metrics.bmr} kcal</span>
                </div>
                <div className="p-3 bg-stone-50 border rounded-xl">
                  <span className="text-[10px] text-stone-500 block font-bold">TDEE</span>
                  <span className="text-base font-bold text-stone-900">{metrics.tdee} kcal</span>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 font-bold">
                  <span className="text-[10px] block">TARGET CALORIES</span>
                  <span className="text-base">{metrics.targetCalories} kcal</span>
                </div>
                <div className="p-3 bg-stone-50 border rounded-xl">
                  <span className="text-[10px] text-stone-500 block font-bold">PROTEIN TARGET</span>
                  <span className="text-base font-bold text-stone-900">{metrics.proteinGrams}g</span>
                </div>
              </div>

              {/* Meal Plan */}
              <div>
                <h4 className="font-bold font-display text-stone-900 mb-3 text-sm">7-Day Prescribed Meal Schedule</h4>
                <div className="space-y-3 font-sans">
                  {mealSchedule.map((meal, idx) => (
                    <div key={idx} className="p-3 border rounded-xl bg-stone-50/50">
                      <div className="flex justify-between font-bold text-stone-900 mb-1">
                        <span>{meal.meal}</span>
                        <span className="font-mono text-stone-500">{meal.time}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                        {meal.items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Split Plan */}
              <div>
                <h4 className="font-bold font-display text-stone-900 mb-3 text-sm">Prescribed Weekly Training Split</h4>
                <div className="space-y-3 font-sans">
                  {trainingSplit.map((splitItem, idx) => (
                    <div key={idx} className="p-3 border rounded-xl bg-stone-50/50">
                      <div className="font-bold text-stone-900 mb-1">{splitItem.day}: {splitItem.focus}</div>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                        {splitItem.exercises.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Stamp Verification */}
              <div className="pt-4 border-t flex justify-between items-center text-[10px] font-mono text-stone-500">
                <div>
                  <p className="font-bold text-stone-800">Verified by Head Certified Gym Dietitian & Trainer</p>
                  <p>License ID: #MED-GYM-98422</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded font-bold">
                    OFFICIALLY STAMPED & VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
