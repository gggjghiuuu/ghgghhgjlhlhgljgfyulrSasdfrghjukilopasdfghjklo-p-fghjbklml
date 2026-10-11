import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Phone, ShieldCheck, Wrench, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import styles from './App.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="app-wrapper">
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={styles.navbar}
      >
        <div className={styles.logo}>
          РЕСТО<span>РЕМ</span>ТОРГ
        </div>
        <div className={styles.navLinks}>
          <a href="#services" className={styles.navLink}>Услуги</a>
          <a href="#blog" className={styles.navLink}>База знаний</a>
          <a href="#cases" className={styles.navLink}>Кейсы</a>
        </div>
        <motion.a 
          href="tel:+78000000000"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.phoneBtn}
        >
          <Phone size={16} />
          <span>24/7</span>
        </motion.a>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroGlow} />
        
        <motion.div style={{ y: yText, opacity: opacityText }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.badge}
          >
            <Zap size={16} />
            Экстренный ремонт оборудования 24/7
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={styles.title}
          >
            ТОРГОВО-СЕРВИСНАЯ<br />
            <span className={styles.gradientText}>ПЛОЩАДКА</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={styles.subtitle}
          >
            Профессиональное обслуживание и поставка ресторанного оборудования. 
            Мы не даем вашей кухне простаивать.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={styles.heroButtons}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.btnPrimary}
            >
              Вызвать мастера <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.btnSecondary}
            >
              Каталог оборудования
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Бегущая строка */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className={styles.marqueeWrapper}
        >
          <div className={`${styles.marqueeContent} animate-marquee`}>
            <span>• Пароконвектоматы</span>
            <span>• Холодильные камеры</span>
            <span>• Тепловое оборудование</span>
            <span>• Посудомоечные машины</span>
            <span>• Вытяжные зонты</span>
            <span>• Пароконвектоматы</span>
            <span>• Холодильные камеры</span>
            <span>• Тепловое оборудование</span>
          </div>
        </motion.div>
      </section>

      {/* --- 24/7 EMERGENCY BANNER --- */}
      <section className={styles.emergencyBanner}>
        <div className={styles.emergencyContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className={styles.emergencyIcon}
            >
              <Clock size={32} color="white" />
            </motion.div>
            <div className={styles.emergencyText}>
              <h2>РАБОТАЕМ 24/7</h2>
              <p>Экстренный выезд мастера в течение 2 часов в любое время суток</p>
            </div>
          </div>
          <motion.a 
            href="tel:+78000000000"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.emergencyPhone}
          >
            +7 (800) 000-00-00
          </motion.a>
        </div>
      </section>

      {/* --- БЛОГ / БАЗА ЗНАНИЙ --- */}
      <section id="blog" className={styles.blogSection}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.sectionHeader}
        >
          <motion.span variants={fadeInUp} className={styles.sectionLabel}>База знаний</motion.span>
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Пишем о том, что <br /> <span>важно для вашей кухни</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className={styles.cardsGrid}
        >
          {/* Card 1 */}
          <motion.article variants={fadeInUp} className={styles.card}>
            <div className={styles.cardIcon}>
              <ShieldCheck size={28} />
            </div>
            <h3 className={styles.cardTitle}>Как избежать поломок</h3>
            <p className={styles.cardDesc}>
              Чек-листы ежедневного обслуживания пароконвектоматов и холодильных установок. Экономим до 30% на ремонтах.
            </p>
            <div className={styles.cardLink}>
              Читать статью <ArrowRight size={16} />
            </div>
          </motion.article>

          {/* Card 2 */}
          <motion.article variants={fadeInUp} className={styles.card}>
            <div className={styles.cardIcon}>
              <Wrench size={28} />
            </div>
            <h3 className={styles.cardTitle}>Реальные кейсы ремонтов</h3>
            <p className={styles.cardDesc}>
              Разбор сложных ситуаций: от замены компрессора до восстановления электроники посудомоечных машин Rational.
            </p>
            <div className={styles.cardLink}>
              Смотреть кейсы <ArrowRight size={16} />
            </div>
          </motion.article>

          {/* Card 3 */}
          <motion.article variants={fadeInUp} className={styles.card}>
            <div className={styles.cardIcon}>
              <AlertTriangle size={28} />
            </div>
            <h3 className={styles.cardTitle}>Ошибки кухни</h3>
            <p className={styles.cardDesc}>
              Топ-5 действий поваров, которые убивают оборудование быстрее всего. И как научить персонал правильной эксплуатации.
            </p>
            <div className={styles.cardLink}>
              Узнать подробнее <ArrowRight size={16} />
            </div>
          </motion.article>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.logo}>
              РЕСТО<span>РЕМ</span>ТОРГ
            </div>
            <p className={styles.footerCopyright}>© 2026 Все права защищены. Торгово-сервисная площадка.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Политика конфиденциальности</a>
            <a href="#" className={styles.footerLink}>Договор оферты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}