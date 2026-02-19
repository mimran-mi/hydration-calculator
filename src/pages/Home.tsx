import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectCustom } from "@/components/ui/select-custom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Activity, CloudSun, Weight, ArrowRight, History, GlassWater, Trash2 } from "lucide-react";
import { WaveBackground } from "@/components/WaveBackground";
import { formatDistanceToNow } from "date-fns";

// Types and schemas
const activityLevels = [
  { value: "sedentary", label: "Sedentary (Little or no exercise)" },
  { value: "light", label: "Lightly active (Light exercise/sports 1-3 days/week)" },
  { value: "moderate", label: "Moderately active (Moderate exercise/sports 3-5 days/week)" },
  { value: "active", label: "Very active (Hard exercise/sports 6-7 days/week)" },
  { value: "extra_active", label: "Extra active (Very hard exercise & physical job)" }
] as const;

const climates = [
  { value: "moderate", label: "Moderate" },
  { value: "cold_dry", label: "Cold & Dry (Nordic/Winter)" },
  { value: "dry_hot", label: "Dry & Hot" },
  { value: "humid", label: "Humid" }
] as const;

const calculationSchema = z.object({
  weight: z.number().min(1, "Weight must be at least 1").max(1000, "Weight seems too high"),
  activityLevel: z.string(),
  climate: z.string(),
});

type CalculationInput = z.infer<typeof calculationSchema>;

interface Calculation extends CalculationInput {
  id: string;
  dailyIntakeOz: number;
  dailyIntakeMl: number;
  createdAt: string;
  unit: 'kg' | 'lbs';
}

const calculateWaterNeeds = (weight: number, activity: string, climate: string, unit: 'kg' | 'lbs') => {
  // Convert kg to lbs if needed (formula uses lbs)
  const weightInLbs = unit === 'kg' ? weight * 2.20462 : weight;
  
  let totalOz = weightInLbs * 0.5;

  switch (activity) {
    case "light": totalOz += 12; break;
    case "moderate": totalOz += 24; break;
    case "active": totalOz += 30; break;
    case "extra_active": totalOz += 40; break;
    default: break;
  }

  switch (climate) {
    case "cold_dry": totalOz *= 1.10; break; // +10% for cold, dry air
    case "dry_hot": totalOz *= 1.12; break;
    case "humid": totalOz *= 1.07; break;
    default: break;
  }

  const totalMl = totalOz * 29.5735;
  
  return {
    oz: Math.round(totalOz),
    ml: Math.round(totalMl)
  };
};

export default function Home() {
  const [result, setResult] = useState<{ oz: number; ml: number } | null>(null);
  const [history, setHistory] = useState<Calculation[]>([]);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs');

  useEffect(() => {
    const stored = localStorage.getItem("hydration-history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  const form = useForm<CalculationInput>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      weight: undefined,
      activityLevel: undefined,
      climate: undefined,
    } as any,
  });

  const onSubmit = (data: CalculationInput) => {
    const { oz, ml } = calculateWaterNeeds(data.weight, data.activityLevel, data.climate, unit);
    setResult({ oz, ml });

    const newCalculation: Calculation = {
      ...data,
      id: Date.now().toString(),
      dailyIntakeOz: oz,
      dailyIntakeMl: ml,
      createdAt: new Date().toISOString(),
      unit: unit,
    };

    const updatedHistory = [newCalculation, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem("hydration-history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("hydration-history");
  };

  return (
    <div className="min-h-screen w-full relative">
      <WaveBackground />
      
      <main className="container max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <header className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-white/50 backdrop-blur rounded-2xl shadow-lg border border-blue-100 mb-4"
          >
            <Droplets className="w-8 h-8 text-primary mr-3 animate-bounce" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-500 font-display">
              HydroCalc
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-slate-800 dark:text-white tracking-tight"
          >
            Optimal Hydration <br/>
            <span className="text-primary">Made Simple</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Calculate exactly how much water your body needs based on your unique biology, activity level, and environment.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 space-y-8"
          >
            <Card className="border-0 shadow-2xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm overflow-hidden rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent border-b border-blue-100 p-8">
                <CardTitle className="text-2xl font-display text-slate-800">Your Details</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel className="text-base font-semibold text-slate-700 flex items-center gap-2">
                              <Weight className="w-4 h-4 text-primary" /> Weight
                            </FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder={unit === 'kg' ? "e.g., 73" : "e.g., 160"}
                                  {...field}
                                  onChange={e => field.onChange(e.target.valueAsNumber)}
                                  className="h-12 rounded-xl text-lg border-2 border-border/50 bg-white/50 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all flex-1 min-w-0"
                                />
                              </FormControl>
                              <div className="flex rounded-xl border-2 border-border/50 bg-white/50 overflow-hidden shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setUnit('lbs')}
                                  className={`px-4 h-12 text-sm font-semibold transition-all ${
                                    unit === 'lbs' 
                                      ? 'bg-primary text-white' 
                                      : 'bg-transparent text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  lbs
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setUnit('kg')}
                                  className={`px-4 h-12 text-sm font-semibold transition-all ${
                                    unit === 'kg' 
                                      ? 'bg-primary text-white' 
                                      : 'bg-transparent text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  kg
                                </button>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="climate"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel className="text-base font-semibold text-slate-700 flex items-center gap-2">
                              <CloudSun className="w-4 h-4 text-primary" /> Climate
                            </FormLabel>
                            <FormControl>
                              <SelectCustom
                                options={climates}
                                placeholder="Select climate"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-700 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" /> Activity Level
                          </FormLabel>
                          <FormControl>
                            <SelectCustom
                              options={activityLevels}
                              placeholder="How active are you?"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-cyan-500 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Calculate Intake
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2">
                  <History className="w-5 h-5 text-muted-foreground" />
                  Recent Calculations
                </h3>
                {history.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8 bg-white/40 rounded-2xl border border-white/50">
                    No history yet. Start calculating!
                  </p>
                ) : (
                  history.slice(0, 5).map((calc) => (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white/60 hover:bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">
                          {calc.weight} {calc.unit} • <span className="capitalize">{calc.activityLevel.replace('_', ' ')}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calc.createdAt && formatDistanceToNow(new Date(calc.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary font-bold text-lg">{calc.dailyIntakeOz} oz</div>
                        <div className="text-xs text-muted-foreground">{calc.dailyIntakeMl} ml</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 lg:sticky lg:top-8"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-br from-primary to-cyan-600 rounded-[2rem] p-1 shadow-2xl shadow-cyan-900/20 text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-[1.8rem] p-8 md:p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px] border border-white/20">
                    <div className="bg-white/20 p-6 rounded-full mb-8 shadow-inner shadow-black/5 ring-4 ring-white/10">
                      <GlassWater className="w-16 h-16 text-white drop-shadow-md" />
                    </div>
                    
                    <h3 className="text-blue-100 font-medium text-lg mb-2 uppercase tracking-widest">Daily Goal</h3>
                    
                    <div className="flex flex-col items-center mb-8">
                      <span className="text-7xl md:text-8xl font-bold font-display tracking-tighter drop-shadow-sm">
                        {result.oz}
                        <span className="text-3xl md:text-4xl text-blue-200 ml-2 font-normal">oz</span>
                      </span>
                      <div className="w-16 h-1 bg-white/30 rounded-full my-6"></div>
                      <span className="text-3xl md:text-4xl font-medium text-blue-100 font-display">
                        {result.ml}
                        <span className="text-xl text-blue-300 ml-2">ml</span>
                      </span>
                    </div>

                    <p className="text-blue-100/90 leading-relaxed max-w-xs">
                      Drink water consistently throughout the day. Listen to your body and adjust if you feel thirsty.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/40 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[2rem] p-12 min-h-[500px] flex flex-col items-center justify-center text-center text-muted-foreground"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Droplets className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Calculate</h3>
                  <p className="max-w-xs mx-auto">Fill out the form on the left to see your personalized hydration plan here.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}