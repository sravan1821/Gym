import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Dumbbell,
  ShieldAlert,
  Flame,
  Apple,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

const FITNESS_KEYWORDS = [
  'gym', 'workout', 'diet', 'protein', 'macro', 'calorie', 'calories', 'muscle',
  'hypertrophy', 'fat loss', 'weight', 'squat', 'bench', 'deadlift', 'bicep', 'tricep',
  'chest', 'back', 'abs', 'quads', 'hamstring', 'cardio', 'creatine', 'supplement',
  'nutrition', 'body', 'health', 'fitness', 'exercise', 'training', 'sets', 'reps',
  'recovery', 'sleep', 'hydration', 'water', 'tdee', 'bmr', 'fat', 'carb', 'keto',
  'vegan', 'stretching', 'flexibility', 'warmup', 'cooldown', 'posture', 'biomechanics',
  'bmi', 'health issue', 'hypertension', 'diabetes', 'pcos', 'thyroid', 'allergies'
];

const QUICK_PROMPTS = [
  '📋 Analyze uploaded BMI report',
  '🥗 Custom diet for health issues',
  '🔥 Fat loss deficit based on BMI',
  '🏋️ Muscle hypertrophy macro targets'
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hello! I am your 24/7 Health & Gym AI Assistant. 🏋️‍♂️\n\nI can answer questions regarding BMI test reports, custom health issue diets (Diabetes, BP, PCOS, Allergies), macro calculations, hypertrophy splits, and exercise biomechanics.\n\nHow can I assist your health and fitness journey today?',
    timestamp: 'Just now'
  }
];

export default function HealthGymChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-health-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-health-chatbot', handleOpenChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Check if query is related to gym/health
  const isHealthRelated = (query) => {
    const qLower = query.toLowerCase();
    return FITNESS_KEYWORDS.some(keyword => qLower.includes(keyword));
  };

  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    // STRICT GUARDRAIL CHECK
    if (!isHealthRelated(userQuery)) {
      return {
        text: '⚠️ **Scope Restriction**: I am your specialized Health & Gym AI Assistant. I am programmed to ONLY answer questions regarding fitness, gym workouts, nutrition, body condition analysis, hypertrophy, and health.\n\nPlease ask me anything related to your fitness journey, workout routines, or diet planning!',
        isWarning: true
      };
    }

    // Dynamic fitness response generator based on query intent
    if (q.includes('bmi') || q.includes('report') || q.includes('analyze')) {
      return {
        text: '📋 **BMI & Body Condition Assessment Protocol**:\n\n• **BMI Ranges**: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+).\n• **Medical Intake Note**: Before generating a diet, we screen for medical conditions (Hypertension, Diabetes, Thyroid, Joint Pain, Allergies).\n• **Action Plan**: Upload your BMI test report in the Trainer Diet section to automatically calculate your BMR, TDEE, and therapeutic meal schedule!'
      };
    }

    if (q.includes('health') || q.includes('bp') || q.includes('diabetes') || q.includes('pcos') || q.includes('thyroid') || q.includes('allergy') || q.includes('issue')) {
      return {
        text: '🩺 **Medical & Clinical Diet Adjustments**:\n\n• **Hypertension**: Restrict sodium (<2000mg/day), boost potassium (spinach, bananas), eliminate processed deli meats.\n• **Diabetes / Insulin Resistance**: High fiber, low glycemic index carbs (oats, sweet potatoes), balanced protein timing.\n• **Lactose Intolerance**: Use Whey Isolate (ultra-low lactose), Plant protein, almond/oat milk substitutes.\n• **Joint Pain**: Incorporate Omega-3 fatty acids (fish oil), Collagen peptides, and reduce high-impact axial loads.'
      };
    }

    if (q.includes('protein') || q.includes('post-workout') || q.includes('meals')) {
      return {
        text: '🍗 **High-Protein Post-Workout Recommendation**:\n\n1. **Whey Protein Isolate + Banana** (Fast digesting protein + glycogen replenishment).\n2. **200g Grilled Chicken / Tofu + Jasmine Rice** (35g-45g protein + complex carbs).\n3. **Greek Yogurt with Honey & Chia Seeds** (25g slow-release casein protein).\n\n**Rule of Thumb**: Aim for 1.8g - 2.2g of protein per kg of total body weight daily for maximum hypertrophy.'
      };
    }

    if (q.includes('fat loss') || q.includes('caloric deficit') || q.includes('lose fat')) {
      return {
        text: '🔥 **Science-Based Fat Loss Protocol**:\n\n1. **Target Deficit**: Maintain a 15-20% caloric deficit below your TDEE (approx 300-500 kcal/day).\n2. **Keep Protein High**: 2.0g-2.4g per kg to preserve lean muscle tissue during deficit.\n3. **Resistance Training**: Continue heavy progressive overload so your body retains muscle.\n4. **Daily Step Count**: Aim for 8,000 - 12,000 steps for NEAT (Non-Exercise Activity Thermogenesis).'
      };
    }

    if (q.includes('sets') || q.includes('volume') || q.includes('week') || q.includes('rep')) {
      return {
        text: '📊 **Optimal Hypertrophy Training Volume**:\n\n• **Direct Sets per Muscle Group**: 10 to 20 hard sets per week (split across 2-3 sessions).\n• **Rep Range**: 6 - 12 reps per set taken close to failure (RIR 1-2).\n• **Rest Intervals**: 2 - 3 minutes on compound lifts (squats/bench), 60-90s on isolation exercises.'
      };
    }

    if (q.includes('bulk') || q.includes('macro') || q.includes('ratio') || q.includes('surplus')) {
      return {
        text: '🥗 **Lean Hypertrophy Macro Guidelines**:\n\n• **Caloric Surplus**: TDEE + 250 to 350 kcal/day (aim for ~1% body weight gain per month).\n• **Protein**: 2.0g per kg of body weight.\n• **Carbohydrates**: 4.0g - 5.0g per kg (fuels high-intensity lifting).\n• **Fats**: 0.8g - 1.0g per kg (supports hormone synthesis & testosterone production).'
      };
    }

    if (q.includes('squat') || q.includes('bench') || q.includes('deadlift') || q.includes('technique')) {
      return {
        text: '🏋️ **Compound Lift Biomechanics Tip**:\n\n• **Setup**: Ensure proper foot width, brace core intra-abdominally (Valsalva maneuver).\n• **Eccentric Control**: Control the descent for 2-3 seconds to maximize eccentric mechanical tension.\n• **Concentric Drive**: Explode upward through the mid-foot while keeping joint alignment intact.'
      };
    }

    return {
      text: `🏋️ **Fitness & Health Insight for "${userQuery}"**:\n\nTo achieve optimal performance and body composition:\n1. Ensure progressive overload in your resistance workouts.\n2. Prioritize 7-9 hours of deep sleep for central nervous system recovery.\n3. Keep daily hydration at ~35-40ml of water per kg of body weight.\n\nFeel free to ask for specific diet calculations or exercise breakdowns!`
    };
  };

  const handleSendMessage = (textToSend = inputQuery) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        isWarning: response.isWarning || false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="health-bot" className="fixed bottom-6 left-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-2xl shadow-red-950/60 hover:scale-105 transition-all duration-300 flex items-center justify-center ring-4 ring-red-600/20"
        >
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-stone-900 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-stone-900"></span>
        </button>
      )}

      {/* Expandable Chat Drawer Window (Left Aligned) */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Chat Window Header */}
          <div className="p-4 bg-gray-800/80 border-b border-gray-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-gray-900 rounded-[14px] flex items-center justify-center text-red-500">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold font-display text-white">HEALTH & GYM AI</h3>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-mono font-bold uppercase">
                    Fitness Only
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-mono">Restricted to Gym & Health Queries</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Selector Pills */}
          <div className="px-3 py-2 bg-gray-950/60 border-b border-gray-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none">
            {QUICK_PROMPTS.map((promptText, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(promptText)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-800/80 hover:bg-gray-800 border border-gray-700/60 text-gray-300 text-[11px] font-mono hover:text-red-400 hover:border-red-500/40 transition-all shrink-0"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none shadow-md font-medium'
                      : msg.isWarning
                      ? 'bg-amber-950/40 border border-amber-500/40 text-amber-200 rounded-bl-none'
                      : 'bg-gray-800/90 border border-gray-700/60 text-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] font-mono text-gray-500">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-gray-300 transition-colors"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 text-xs font-mono p-2">
                <Bot className="w-4 h-4 text-red-500 animate-spin" />
                <span>AI Coach is analyzing health parameters...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-gray-800/90 border-t border-gray-700/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask gym, health, diet or workout queries..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
