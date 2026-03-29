/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Globe, 
  Download, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight,
  Lock,
  Server,
  Cpu,
  Smartphone,
  Monitor,
  Play
} from 'lucide-react';

const COUNTRIES = [
  { name: 'США', code: 'US', lat: 37, lng: -95, load: '42%', latency: '110ms', status: 'Online' },
  { name: 'Россия', code: 'RU', lat: 61, lng: 105, load: '68%', latency: '15ms', status: 'Online' },
  { name: 'Беларусь', code: 'BY', lat: 53, lng: 27, load: '31%', latency: '25ms', status: 'Online' },
  { name: 'Казахстан', code: 'KZ', lat: 48, lng: 66, load: '45%', latency: '40ms', status: 'Online' },
  { name: 'Украина', code: 'UA', lat: 48, lng: 31, load: '52%', latency: '35ms', status: 'Online' },
  { name: 'Япония', code: 'JP', lat: 36, lng: 138, load: '28%', latency: '180ms', status: 'Online' },
  { name: 'Германия', code: 'DE', lat: 51, lng: 10, load: '55%', latency: '45ms', status: 'Online' },
  { name: 'Великобритания', code: 'GB', lat: 55, lng: -3, load: '48%', latency: '50ms', status: 'Online' },
  { name: 'Франция', code: 'FR', lat: 46, lng: 2, load: '41%', latency: '55ms', status: 'Online' },
  { name: 'Нидерланды', code: 'NL', lat: 52, lng: 5, load: '72%', latency: '42ms', status: 'Online' },
  { name: 'Турция', code: 'TR', lat: 38, lng: 35, load: '63%', latency: '65ms', status: 'Online' },
  { name: 'ОАЭ', code: 'AE', lat: 23, lng: 53, load: '19%', latency: '95ms', status: 'Online' },
  { name: 'Сингапур', code: 'SG', lat: 1, lng: 103, load: '34%', latency: '160ms', status: 'Online' },
  { name: 'Канада', code: 'CA', lat: 56, lng: -106, load: '25%', latency: '125ms', status: 'Online' },
  { name: 'Австралия', code: 'AU', lat: -25, lng: 133, load: '15%', latency: '240ms', status: 'Online' },
  { name: 'Бразилия', code: 'BR', lat: -14, lng: -51, load: '22%', latency: '210ms', status: 'Online' },
  { name: 'Индия', code: 'IN', lat: 20, lng: 78, load: '58%', latency: '145ms', status: 'Online' },
  { name: 'Южная Корея', code: 'KR', lat: 35, lng: 127, load: '39%', latency: '175ms', status: 'Online' },
  { name: 'Испания', code: 'ES', lat: 40, lng: -3, load: '44%', latency: '60ms', status: 'Online' },
  { name: 'Италия', code: 'IT', lat: 41, lng: 12, load: '47%', latency: '58ms', status: 'Online' },
  { name: 'Швейцария', code: 'CH', lat: 46, lng: 8, load: '12%', latency: '48ms', status: 'Online' },
  { name: 'Швеция', code: 'SE', lat: 60, lng: 18, load: '29%', latency: '65ms', status: 'Online' },
  { name: 'Норвегия', code: 'NO', lat: 60, lng: 10, load: '18%', latency: '70ms', status: 'Online' },
  { name: 'Финляндия', code: 'FI', lat: 61, lng: 25, load: '21%', latency: '68ms', status: 'Online' },
  { name: 'Польша', code: 'PL', lat: 51, lng: 20, load: '53%', latency: '38ms', status: 'Online' },
  { name: 'Чехия', code: 'CZ', lat: 49, lng: 15, load: '37%', latency: '42ms', status: 'Online' },
  { name: 'Грузия', code: 'GE', lat: 42, lng: 43, load: '49%', latency: '52ms', status: 'Online' },
];

const REVIEWS = [
  { user: 'jerakic03', text: 'Наконец-то ютуб летает в 4К без тормозов! Перепробовал кучу впн, но морковка реально тащит.', rating: 5 },
  { user: 'koshtanov', text: 'Жирафий охват это не шутки. Подключился к Японии, пинг в играх минимальный. Рекомендую!', rating: 5 },
  { user: 'VerchikovM_', text: 'Инста и дискорд работают идеально. Забыл что такое вечная загрузка.', rating: 5 },
  { user: 'BiniShkoTyan', text: 'Очень милый дизайн, а главное — работает! Теперь смотрю любимых блогеров без проблем.', rating: 5 },
  { user: 'berms_', text: 'Скорость просто пушка. Для работы в айти сейчас мастхэв, все докеры и гитхабы открываются.', rating: 5 },
  { user: 'Sdravstvuite', text: 'Лучший впн для обхода блокировок в 2026 году. Пользуюсь уже месяц, полет нормальный.', rating: 5 },
  { user: 'Sakoitebe', text: 'Беларусь и Россия в списке серверов — это топ. Можно смотреть локальный контент из любой точки.', rating: 5 },
  { user: 'Hitmacr', text: 'Морковное ускорение реально работает. Загрузка файлов моментальная.', rating: 5 },
  { user: 'CellDord', text: 'Наконец-то нашел впн, который не отваливается каждые 5 минут. Стабильность на высоте.', rating: 5 },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRickroll, setShowRickroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRickroll(true);
  };

  return (
    <div className="min-h-screen selection:bg-carrot selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-carrot rounded-xl flex items-center justify-center carrot-glow group-hover:scale-110 transition-transform">
              <Zap className="text-white fill-current" size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Carrot<span className="text-carrot">VPN</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#features" className="hover:text-carrot transition-colors">Преимущества</a>
            <a href="#servers" className="hover:text-carrot transition-colors">Серверы</a>
            <a href="#reviews" className="hover:text-carrot transition-colors">Отзывы</a>
            <a href="#pricing" className="hover:text-carrot transition-colors">Тарифы</a>
            <button 
              onClick={handleDownload}
              className="px-6 py-2.5 bg-white text-black rounded-full font-bold hover:bg-carrot hover:text-white transition-all active:scale-95"
            >
              Скачать
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <a href="#features" onClick={() => setIsMenuOpen(false)}>Преимущества</a>
              <a href="#servers" onClick={() => setIsMenuOpen(false)}>Серверы</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Отзывы</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Тарифы</a>
              <button 
                onClick={handleDownload}
                className="w-full py-4 bg-carrot text-white rounded-2xl"
              >
                Скачать CarrotVPN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-carrot/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-giraffe/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Доступно в РФ без ограничений</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6">
              Твой интернет — <br />
              <span className="gradient-text">Твои правила.</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
              CarrotVPN — это молниеносная скорость морковного ускорения и надежность жирафьего охвата. Забудьте о блокировках YouTube, Instagram и других сервисов навсегда.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                className="px-8 py-4 bg-carrot rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all carrot-glow active:scale-95"
              >
                <Download size={20} />
                Скачать для Windows
              </button>
              <button className="px-8 py-4 glass rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                Узнать больше
              </button>
            </div>
            <div className="mt-12 flex items-center gap-6 text-white/40 grayscale opacity-50">
              <Monitor size={24} />
              <Smartphone size={24} />
              <Cpu size={24} />
              <span className="text-sm font-medium">Поддержка всех платформ</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 animate-float">
              <img 
                src="https://picsum.photos/seed/carrot-vpn/800/600" 
                alt="Interface Preview" 
                className="rounded-[2rem] border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badges */}
              <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl carrot-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Zap className="text-green-500" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 font-bold uppercase">Speed</div>
                    <div className="text-lg font-bold">1.2 Gbps</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-carrot/20 rounded-full flex items-center justify-center">
                    <Shield className="text-carrot" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 font-bold uppercase">Security</div>
                    <div className="text-lg font-bold">AES-256</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Giraffe/Carrot elements could be added here as SVGs or images */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-carrot/20 to-giraffe/20 blur-[100px] rounded-full opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Почему выбирают нас?</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Мы создали VPN, который не просто работает, а делает ваш интернет-серфинг по-настоящему свободным и безопасным.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-carrot" />,
                title: "Морковное ускорение",
                desc: "Собственные протоколы передачи данных обеспечивают минимальный пинг и максимальную скорость загрузки 4K видео."
              },
              {
                icon: <Globe className="text-giraffe" />,
                title: "Жирафий охват",
                desc: "Более 2700 серверов в 27 странах мира. Подключайтесь к любой точке планеты одним кликом."
              },
              {
                icon: <Lock className="text-carrot" />,
                title: "Абсолютная анонимность",
                desc: "Мы не храним логи. Ваша активность в сети — это только ваше дело. Шифрование военного уровня."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[2.5rem] hover:border-carrot/50 transition-colors"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section id="servers" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Интерактивная карта серверов</h2>
              <p className="text-white/60 text-lg mb-10">
                Нажмите на любую точку на карте или выберите страну из списка, чтобы увидеть текущее состояние сервера.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {COUNTRIES.slice(0, 12).map((country) => (
                  <button 
                    key={country.code} 
                    onClick={() => setSelectedCountry(country)}
                    className={`flex items-center gap-3 glass p-3 rounded-xl transition-all hover:border-carrot/50 ${selectedCountry?.code === country.code ? 'border-carrot bg-carrot/10' : ''}`}
                  >
                    <span className="text-xl">{getFlagEmoji(country.code)}</span>
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
                <div className="flex items-center justify-center glass p-3 rounded-xl border-dashed border-white/20">
                  <span className="text-sm font-bold text-carrot">+ еще 15 стран</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedCountry && (
                  <motion.div
                    key={selectedCountry.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass p-6 rounded-3xl border-carrot/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getFlagEmoji(selectedCountry.code)}</span>
                        <h4 className="text-xl font-bold">{selectedCountry.name}</h4>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs font-bold rounded-full uppercase tracking-wider">
                        {selectedCountry.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs text-white/40 font-bold uppercase mb-1">Нагрузка</div>
                        <div className="text-lg font-bold text-carrot">{selectedCountry.load}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 font-bold uppercase mb-1">Задержка</div>
                        <div className="text-lg font-bold text-giraffe">{selectedCountry.latency}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative aspect-square glass rounded-[3rem] overflow-hidden p-8 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Globe size={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
              </div>
              <div className="relative w-full h-full">
                {COUNTRIES.map((c, i) => (
                  <motion.button
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setSelectedCountry(c)}
                    className={`absolute w-4 h-4 rounded-full carrot-glow transition-all z-10 ${selectedCountry?.code === c.code ? 'bg-giraffe scale-150 ring-4 ring-giraffe/20' : 'bg-carrot'}`}
                    style={{ 
                      top: `${(90 - c.lat) * 1.1}%`, 
                      left: `${(c.lng + 180) * 0.27}%` 
                    }}
                  >
                    <span className="sr-only">{c.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Отзывы пользователей</h2>
              <p className="text-white/60 text-lg">
                Посмотрите, что говорят те, кто уже перешел на светлую сторону интернета с CarrotVPN.
              </p>
            </div>
            <button 
              onClick={handleDownload}
              className="px-8 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Оставить отзыв
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2rem] relative group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-carrot to-giraffe flex items-center justify-center font-bold text-black">
                    {review.user[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold">@{review.user}</div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, j) => (
                        <Zap key={j} size={12} className="text-giraffe fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed italic">
                  "{review.text}"
                </p>
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Play size={40} className="rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Простые тарифы</h2>
            <p className="text-white/60 text-lg">Выберите план, который подходит именно вам.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Базовый", price: "0", period: "навсегда", features: ["3 страны", "1 устройство", "Лимит 10 Гб/мес"], active: false },
              { name: "Премиум", price: "299", period: "в месяц", features: ["Все 27 стран", "5 устройств", "Безлимитный трафик", "Приоритетная поддержка"], active: true },
              { name: "Ультра", price: "1990", period: "в год", features: ["Все 27 стран", "10 устройств", "Безлимитный трафик", "Выделенный IP"], active: false },
            ].map((plan, i) => (
              <div key={i} className={`glass p-10 rounded-[3rem] relative flex flex-col ${plan.active ? 'border-carrot carrot-glow scale-105 z-10' : ''}`}>
                {plan.active && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-carrot px-4 py-1 rounded-full text-xs font-bold uppercase">Хит продаж</div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display font-extrabold">{plan.price}</span>
                  <span className="text-white/40">₽/{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/70">
                      <CheckCircle2 size={18} className="text-carrot" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleDownload}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.active ? 'bg-carrot text-white hover:opacity-90' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-carrot rounded-lg flex items-center justify-center">
              <Zap className="text-white fill-current" size={18} />
            </div>
            <span className="text-xl font-display font-bold">CarrotVPN</span>
          </div>
          <div className="flex gap-10 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            <a href="#" className="hover:text-white transition-colors">Поддержка</a>
          </div>
          <p className="text-sm text-white/20">© 2026 CarrotVPN. Все права защищены.</p>
        </div>
      </footer>

      {/* Rickroll Modal */}
      <AnimatePresence>
        {showRickroll && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowRickroll(false)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl aspect-video glass rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <button 
                className="absolute top-6 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                onClick={() => setShowRickroll(false)}
              >
                <X />
              </button>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="mb-6 w-20 h-20 bg-carrot rounded-full flex items-center justify-center animate-bounce">
                  <Play className="text-white fill-current" size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">С 1 АПРЕЛЯ! 🥕🦒</h2>
                <p className="text-xl text-white/60 mb-8">Вы были разыграны CarrotVPN. Но наш сервис реально крутой!</p>
                
                {/* The Rickroll Video */}
                <div className="w-full h-full absolute inset-0">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0" 
                    title="Rick Astley - Never Gonna Give You Up" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
