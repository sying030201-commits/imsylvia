/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Database, 
  Cpu, 
  TrendingUp, 
  ExternalLink, 
  Mail, 
  Phone, 
  Check, 
  Copy,
  ChevronRight,
  Sparkles,
  Zap,
  BarChart3,
  ArrowRight
} from 'lucide-react';

import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

// --- Components ---

const MacWindow = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl flex flex-col ${className}`}>
    <div className="bg-white/40 px-4 py-3 flex items-center gap-2 border-b border-white/10 shrink-0">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex-1 text-center text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">
        {title}
      </div>
    </div>
    <div className="p-6 font-mono text-[12px] leading-relaxed text-black/60 flex-1 overflow-y-auto">
      {children}
    </div>
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-black/5">
    <div className="text-xl font-bold tracking-tighter font-display text-black">SYLVIA<span className="text-brand-purple">.</span></div>
    <div className="hidden md:flex gap-8 text-sm font-semibold text-black/40">
      <a href="#how" className="hover:text-black transition-colors">方法论</a>
      <a href="#experience" className="hover:text-black transition-colors">经历</a>
      <a href="#projects" className="hover:text-black transition-colors">项目</a>
      <a href="#skills" className="hover:text-black transition-colors">技能</a>
    </div>
    <a href="#contact" className="px-6 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-brand-purple transition-all">
      联系我
    </a>
  </nav>
);

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "当我开始用AI做内容，\n然后...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter leading-[0.9] mb-12 text-black relative whitespace-pre-wrap"
          >
            {typedText}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-12 lg:h-20 bg-brand-purple ml-2 align-middle"
            />
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-2 bg-brand-purple/20 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h1>
          
          <div className="flex flex-col items-center gap-6 mb-16">
            <p className="text-2xl md:text-4xl text-black/60 font-semibold tracking-tight">
              「AI × 内容 × 数据」
            </p>
            <p className="text-lg md:text-xl text-black/30 font-medium max-w-2xl leading-relaxed">
              从品牌营销到 AI ，我开始用它搭建自己的方法论
            </p>
          </div>
          
          <motion.a
            href="#chat"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex px-12 py-6 bg-black text-white text-xl font-bold rounded-[32px] items-center gap-4 group transition-all hover:bg-brand-purple shadow-2xl shadow-brand-purple/10"
          >
            欢迎来到我的系统
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// --- Chat Module ---

const ChatModule = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string, isTyping?: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const script = [
    { role: 'user', text: '你在用 AI 做什么？' },
    { role: 'ai', text: '做内容。' },
    { role: 'user', text: '就这些？' },
    { role: 'ai', text: '不止，\n我在用它优化表达，也在加快决策。' },
    { role: 'user', text: '听起来像工具？' },
    { role: 'ai', text: '更像一种新的工作方式和兴趣探索' },
  ];

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const runScript = async () => {
      for (let i = 0; i < script.length; i++) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1200));
        setIsTyping(false);
        
        const fullText = script[i].text;
        let currentText = "";
        
        // Add message placeholder
        setMessages(prev => [...prev, { ...script[i], text: "", isTyping: true } as any]);
        
        // Typewriter effect
        for (let j = 0; j < fullText.length; j++) {
          currentText += fullText[j];
          setMessages(prev => {
            const last = [...prev];
            last[last.length - 1] = { ...last[last.length - 1], text: currentText };
            return last;
          });
          await new Promise(r => setTimeout(r, 30));
        }
        
        // Mark typing as complete
        setMessages(prev => {
          const last = [...prev];
          last[last.length - 1] = { ...last[last.length - 1], isTyping: false };
          return last;
        });
        
        await new Promise(r => setTimeout(r, 800));
      }
    };

    runScript();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <section id="chat" className="py-24 bg-transparent container mx-auto px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white/40 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-2xl border border-white/20">
          {/* Header */}
          <div className="bg-white/40 p-8 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold text-xl">S</div>
              <div>
                <div className="text-lg font-bold text-black">Sylvia</div>
                <div className="text-xs text-brand-green font-bold flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  Online
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef}
            className="h-[500px] overflow-y-auto p-8 flex flex-col gap-6 scroll-smooth bg-white/10"
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`max-w-[85%] p-5 rounded-3xl text-[15px] leading-relaxed font-medium whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'self-end bg-black text-white rounded-tr-none' 
                      : 'self-start bg-white/80 backdrop-blur-md text-black shadow-sm border border-white/20 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start bg-white/80 backdrop-blur-md p-5 rounded-3xl rounded-tl-none shadow-sm border border-white/20 flex gap-1.5"
                >
                  <div className="w-2 h-2 bg-black/20 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-black/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-black/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-8 bg-white/40 border-t border-white/10">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-4 text-sm text-black/30 font-bold flex justify-between items-center border border-white/10">
              Type a message...
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Methodology = () => {
  const steps = [
    {
      icon: <Database className="w-8 h-8 text-brand-blue" />,
      title: "① 数据洞察",
      desc: "用 SQL 和数据分析找到真正驱动用户行为的因素"
    },
    {
      icon: <Cpu className="w-8 h-8 text-brand-purple" />,
      title: "② AI 工作流",
      desc: "用 Prompt 和自动化流程放大内容与决策效率"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-green" />,
      title: "③ 增长转化",
      desc: "从投放到优化，专注能带来结果的执行"
    }
  ];

  return (
    <section id="how" className="py-32 bg-transparent container mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 text-black">How I Work</h2>
        <div className="w-24 h-2 bg-brand-purple mx-auto rounded-full" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white/40 backdrop-blur-xl p-12 rounded-[48px] flex flex-col items-center text-center group border border-white/20 shadow-sm"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/60 backdrop-blur-md flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform border border-white/20">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold mb-6 text-black">{step.title}</h3>
            <p className="text-black/40 font-medium leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const cases = [
    {
      title: "AI内容工作流优化",
      company: "Hourglass",
      quote: "我不是在用AI写内容，我在用AI重构内容生产方式",
      tasks: [
        "设计结构化Prompt体系（品牌调性 × 产品卖点 × 用户偏好）",
        "搭建AI辅助脚本生成流程",
        "适配不同达人风格进行内容微调"
      ],
      results: [
        "生成40+脚本初稿",
        "支持30+内容上线",
        "显著提升内容生产效率与一致性"
      ],
      core: "将“内容创作”升级为“可规模化生产系统”",
      color: "purple"
    },
    {
      title: "Campaign内容与投放",
      company: "Internship",
      tasks: [
        "统筹15+ Campaign投放节奏",
        "搭建素材版本与发布流程管理机制",
        "优化跨团队协作（agency × 海外 × 内部）"
      ],
      data: [
        "使用SQL清洗与分析投放数据",
        "输出16份复盘报告",
        "识别不同内容形式与达人类型的效果差异"
      ],
      core: "在复杂协作环境中，实现内容与投放的系统化",
      color: "blue"
    },
    {
      title: "数据驱动增长优化",
      company: "Dior",
      problem: "内容以产品功能为主，转化较低",
      tasks: [
        "分析30+达人内容与用户互动数据",
        "挖掘评论区真实用户反馈",
        "对比不同内容表达方式"
      ],
      insight: "“场景感 / 氛围感内容”显著优于“功能型内容”",
      results: [
        "调整达人brief方向",
        "内容整体互动提升约30%"
      ],
      core: "从数据中提炼内容增长逻辑，并反向指导创作",
      color: "green"
    }
  ];

  return (
    <section id="experience" className="py-32 bg-transparent container mx-auto px-6">
      <div className="mb-24">
        <h2 className="text-4xl md:text-6xl font-bold font-display text-black">Case Studies</h2>
      </div>

      <div className="grid gap-16">
        {cases.map((c, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[60px] relative overflow-hidden shadow-xl border border-white/20"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-16 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <span className={`text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                    c.color === 'purple' ? 'bg-brand-purple/10 text-brand-purple' : 
                    c.color === 'blue' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-green/10 text-brand-green'
                  }`}>
                    {c.company}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-10 text-black leading-tight">{c.title}</h3>
                
                {c.quote && <p className="text-2xl font-semibold text-black/60 mb-12 leading-relaxed">"{c.quote}"</p>}
                {c.problem && (
                  <div className="mb-10">
                    <div className="text-xs font-black text-black/20 uppercase mb-3 tracking-widest">Problem</div>
                    <p className="text-xl font-medium text-black/80">{c.problem}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="text-xs font-black text-black/20 uppercase mb-6 tracking-widest">What I Did</div>
                    <ul className="space-y-4">
                      {c.tasks.map((t, i) => (
                        <li key={i} className="flex gap-4 text-base font-semibold text-black/60">
                          <Check className="w-5 h-5 text-brand-green shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-xs font-black text-black/20 uppercase mb-6 tracking-widest">
                      {c.data ? 'Data Capabilities' : 'Results'}
                    </div>
                    <ul className="space-y-4">
                      {(c.results || c.data || []).map((r, i) => (
                        <li key={i} className="flex gap-4 text-base font-semibold text-black/60">
                          <Zap className="w-5 h-5 text-brand-purple shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-8">
                  {c.insight && (
                    <div className="bg-brand-green/10 backdrop-blur-md p-8 rounded-[32px] border border-brand-green/20">
                      <div className="text-xs font-black text-brand-green uppercase mb-3 tracking-widest">Key Insight</div>
                      <p className="text-lg font-bold text-black/80">{c.insight}</p>
                    </div>
                  )}
                  <div className="bg-white/20 backdrop-blur-md p-8 rounded-[32px] border border-white/10">
                    <div className="text-xs font-black text-black/20 uppercase mb-3 tracking-widest">Core Competency</div>
                    <p className="text-lg font-bold text-black">{c.core}</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 flex flex-col justify-start gap-8 min-h-[400px]">
                {idx === 0 && (
                  <div className="space-y-6">
                    <MacWindow title="PROMPT_ENGINEER.TXT" className="h-[320px]">
                      <div className="flex flex-col h-full">
                        <div className="text-brand-purple mb-2 font-black"># Role: Brand Content Strategist</div>
                        <div className="text-black/40 mb-4 text-[10px]"># Task: Generate structured script</div>
                        <div className="space-y-3 flex-1">
                          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/10">
                            <div className="flex gap-2 mb-1"><span className="text-brand-blue font-black">INPUT:</span> <span className="text-black/60">Product_Features</span></div>
                            <div className="text-[10px] text-black/30">"Minimalist design, sustainable materials, premium texture"</div>
                          </div>
                          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/10">
                            <div className="flex gap-2 mb-1"><span className="text-brand-blue font-black">TONE:</span> <span className="text-black/60">Aesthetic_Minimalist</span></div>
                            <div className="text-[10px] text-black/30">"Sophisticated, calm, high-end editorial feel"</div>
                          </div>
                          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/10">
                            <div className="flex gap-2 mb-1"><span className="text-brand-blue font-black">OUTPUT:</span> <span className="text-black/60">Hook + Body + CTA</span></div>
                            <div className="text-[10px] text-black/30">"Structured social media post format"</div>
                          </div>
                        </div>
                      </div>
                    </MacWindow>
                  </div>
                )}
                {idx === 1 && (
                  <div className="space-y-6">
                    <MacWindow title="CAMPAIGN_FUNNEL.SQL" className="h-[320px]">
                      <div className="flex flex-col h-full">
                        <div className="text-brand-blue font-black mb-2">SELECT</div>
                        <div className="pl-4 text-black/60">
                          stage, <br/>
                          COUNT(DISTINCT user_id) as users, <br/>
                          ROUND(conversion_rate, 2) as cr
                        </div>
                        <div className="text-brand-blue font-black my-2">FROM</div>
                        <div className="pl-4 text-black/60">campaign_funnel_metrics</div>
                        <div className="text-brand-blue font-black my-2">WHERE</div>
                        <div className="pl-4 text-black/60">campaign_id = 'C_2024_03'</div>
                        <div className="text-brand-blue font-black mt-2">ORDER BY</div>
                        <div className="pl-4 text-black/60">stage_index ASC;</div>
                      </div>
                    </MacWindow>
                  </div>
                )}
                {idx === 2 && (
                  <div className="space-y-6">
                    <MacWindow title="LIVE_ANALYTICS.UI" className="h-[420px]">
                      <div className="flex flex-col h-full">
                        {/* Header Stats */}
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <div className="text-[10px] text-black/20 uppercase font-black mb-1">Real-time Engagement</div>
                            <div className="text-3xl font-bold text-black tracking-tighter">4.82%</div>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                              <span className="text-[10px] text-brand-green font-bold">LIVE UPDATING</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-[10px] text-black/20 font-black uppercase mb-1">Benchmark</div>
                            <div className="text-sm font-bold text-black/40">2.40%</div>
                          </div>
                        </div>
                        
                        {/* Main Chart Area */}
                        <div className="flex-1 w-full flex items-end gap-3 pb-6 border-b border-black/5 mb-6 min-h-[220px]">
                          {[
                            { label: '场景', val: 85, color: '#9333ea' },
                            { label: '氛围', val: 95, color: '#9333ea' },
                            { label: '功能', val: 45, color: '#e5e7eb' },
                            { label: '硬广', val: 30, color: '#e5e7eb' },
                            { label: '测评', val: 70, color: '#9333ea' },
                            { label: '穿搭', val: 55, color: '#9333ea' }
                          ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                              <motion.div 
                                initial={{ height: 0 }}
                                whileInView={{ height: `${item.val}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: "circOut" }}
                                className="w-full rounded-t-xl relative group cursor-pointer"
                                style={{ backgroundColor: item.color }}
                              >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl whitespace-nowrap z-30">
                                  {item.val}% Rate
                                </div>
                              </motion.div>
                              <div className="text-[9px] font-black text-black/20 uppercase tracking-tighter">{item.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Legend / Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-brand-purple" />
                              <span className="text-[9px] font-bold text-black/40 uppercase">High</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-gray-200" />
                              <span className="text-[9px] font-bold text-black/40 uppercase">Low</span>
                            </div>
                          </div>
                          <div className="text-[9px] font-black text-black/20">UPDATED 2M AGO</div>
                        </div>
                      </div>
                    </MacWindow>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 container mx-auto px-6 bg-transparent">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-bold font-display text-black">Independent Projects</h2>
      </div>

      <div className="grid gap-12">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/40 backdrop-blur-xl p-8 md:p-16 rounded-[60px] border border-white/20 shadow-sm"
        >
          <div className="flex flex-col gap-16">
            {/* Top Row: Info and Role */}
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <div className="inline-block px-5 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-8 uppercase tracking-widest">
                  VIBE-CODING 实现
                </div>
                <h3 className="text-4xl font-bold mb-6 text-black">营销热点洞察工具</h3>
                <p className="text-xl text-black/40 font-medium mb-12 leading-relaxed">
                  “我不想再一直刷了，所以我试着做点什么...”
                </p>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-xs font-black text-black/20 uppercase mb-4 tracking-widest">业务痛点</h4>
                    <p className="text-black/70 leading-relaxed text-lg">
                      在消费品与美妆行业，内容选题长期依赖人工经验与分散的信息检索，导致热点捕捉效率低、筛选成本高，且决策容易受到主观偏好影响，难以及时识别真正具备传播潜力的趋势。
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-black text-black/20 uppercase mb-4 tracking-widest">目标用户</h4>
                      <p className="text-base text-black/60 font-medium">品牌社媒运营、内容策划及PR操盘手等。</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-black/20 uppercase mb-4 tracking-widest">产品目标</h4>
                      <p className="text-base text-black/60 font-medium">以“选题决策效率”为核心，构建AI驱动的热点洞察系统。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="bg-white/20 backdrop-blur-md p-10 rounded-[40px] border border-white/10 h-full">
                  <h4 className="text-xs font-black text-brand-blue uppercase mb-8 tracking-widest">我的角色</h4>
                  <ul className="space-y-5">
                    {[
                      "将AI能力（文本生成 / 分类 / 语义理解）转化为具体产品功能",
                      "设计Prompt结构，使非结构化内容可被稳定归类与复用",
                      "将“热点信息”抽象为可筛选的数据维度",
                      "从“信息工具”重新定义为“选题决策辅助产品”"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 text-base font-semibold text-black/60">
                        <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Row: Enlarged Project Image */}
            <div className="w-full">
              <MacWindow title="HOT_TOPIC_INSIGHT.APP" className="w-full bg-white/40 shadow-2xl">
                <div className="-m-6">
                  <img 
                    src="/projects.png" 
                    alt="营销热点洞察工具" 
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </MacWindow>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "增长",
      skills: ["A-B测试", "漏斗分析", "用户增长", "留存优化"]
    },
    {
      title: "数据",
      skills: ["SQL", "数据分析", "Tableau", "Python"]
    },
    {
      title: "AI",
      skills: ["Prompt设计", "工作流搭建"]
    }
  ];

  return (
    <section id="skills" className="py-32 bg-transparent container mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 text-black">Skills</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-20">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center">
            <h3 className="text-xs font-black text-black/20 uppercase mb-10 tracking-[0.3em]">{cat.title}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cat.skills.map((skill, i) => (
                <span key={i} className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-base font-bold text-black/60 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTA = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-40 bg-transparent container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white/40 backdrop-blur-xl max-w-6xl mx-auto p-12 md:p-20 rounded-[80px] relative overflow-hidden shadow-2xl border border-white/20"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-left">
            <h2 className="text-5xl md:text-7xl font-bold font-display mb-12 text-black leading-tight">
              Let’s build something meaningful.
            </h2>
            
            <div className="mb-16">
              <p className="text-black/40 text-xl font-semibold mb-8">If you're looking for someone who:</p>
              <div className="flex flex-col items-start gap-4 text-2xl font-bold text-black/80">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-green" />
                  turns complexity into structure
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-green" />
                  connects ideas with execution
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-green" />
                  and uses AI to make things work
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap justify-start gap-4 md:gap-8">
              <button 
                onClick={() => copyToClipboard('im.sylvia@outlook.com', 'email')}
                className="flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-6 bg-white/20 backdrop-blur-md rounded-[24px] md:rounded-[32px] hover:bg-white/40 transition-all group border border-white/10 shrink-0"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-brand-purple" />
                <div className="text-left">
                  <div className="text-[8px] md:text-[10px] text-black/20 uppercase font-black tracking-widest">Email</div>
                  <div className="font-bold text-sm md:text-lg text-black">im.sylvia@outlook.com</div>
                </div>
                {copied === 'email' ? <Check className="w-4 h-4 md:w-5 md:h-5 text-brand-green" /> : <Copy className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-20 transition-opacity" />}
              </button>

              <button 
                onClick={() => copyToClipboard('195 3329 6523', 'phone')}
                className="flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-6 bg-white/20 backdrop-blur-md rounded-[24px] md:rounded-[32px] hover:bg-white/40 transition-all group border border-white/10 shrink-0"
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
                <div className="text-left">
                  <div className="text-[8px] md:text-[10px] text-black/20 uppercase font-black tracking-widest">Phone</div>
                  <div className="font-bold text-sm md:text-lg text-black">195 3329 6523</div>
                </div>
                {copied === 'phone' ? <Check className="w-4 h-4 md:w-5 md:h-5 text-brand-green" /> : <Copy className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-20 transition-opacity" />}
              </button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-blue/5 rounded-[60px] blur-2xl" />
              <img 
                src="/me.jpg" 
                alt="Sylvia" 
                className="relative w-full rounded-[40px] shadow-xl object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 bg-white/30 backdrop-blur-md border-t border-white/10 text-center text-black/10 text-xs font-black tracking-[0.4em] uppercase">
    © 2026 Sylvia Portfolio • Built with AI & Passion
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="selection:bg-brand-purple/30">
      <Navbar />
      <Hero />
      <ChatModule />
      <Methodology />
      <Experience />
      <Projects />
      <Skills />
      <CTA />
      <Footer />
    </div>
  );
}
