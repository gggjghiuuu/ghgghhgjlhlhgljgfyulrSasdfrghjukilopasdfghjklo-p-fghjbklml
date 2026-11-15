import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Clock, Phone, Zap, Layout, Search, Settings, Wrench, ShieldCheck,
  Paintbrush, Wind, Thermometer, Sofa, CheckCircle2, FileText,
  Camera, HardDrive, Send, FolderOpen, ExternalLink
} from 'lucide-react';
import styles from './App.module.css';

// ⚠️ ЗАМЕНИТЕ на ваш URL из Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8zLaeVXd7Awb4exMjZvl2DmXi1tEOPgMP51R1qKbzYN_YCpP3JAo_0Rm6XS8w30QSAg/exec';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const services = [
  {
    id: 1,
    icon: Layout,
    title: 'Планировка и 3D-визуализация',
    subtitle: 'Технологический проект кухни под ключ',
    benefit: 'Снижаем риски дополнительных расходов на монтаж оборудования и доработку инженерных сетей',
    steps: [
      { title: 'Выезд на объект', desc: 'Оцениваем помещение и проводим точные замеры' },
      { title: 'Планировка и 3D-визуализация', desc: 'Схема расстановки оборудования и 3D будущей кухни' },
      { title: 'Спецификация оборудования', desc: 'Подробный перечень с техническими характеристиками' },
      { title: 'Проектирование инженерных сетей', desc: 'Точки подключения к воде, канализации и электрике' },
      { title: 'Подбор оборудования', desc: 'Новое или б/у под задачи и согласованный бюджет' }
    ]
  },
  {
    id: 2,
    icon: Search,
    title: 'Подбор оборудования',
    subtitle: 'Новое и б/у с учётом задач, бюджета и производительности кухни',
    benefit: 'Снижаем риски покупки неподходящего оборудования и незапланированных расходов',
    steps: [
      { title: 'Согласование бюджета', desc: 'Готовим спецификацию на новое или б/у оборудование' },
      { title: 'Подбор оборудования', desc: 'Проверяем габариты, ТТХ и функциональные возможности' },
      { title: 'Доставка на объект', desc: 'Организуем и контролируем доставку на всех этапах' }
    ]
  },
  {
    id: 3,
    icon: Settings,
    title: 'Пусконаладочные работы',
    subtitle: 'Монтаж и подключение ресторанного оборудования',
    benefit: 'Снижение рисков ошибок при подключении и минимизация вероятности сбоев в эксплуатации',
    steps: [
      { title: 'Осмотр объекта', desc: 'Проверка готовности инженерных систем и коммуникаций' },
      { title: 'Распаковка оборудования', desc: 'Фото- и видеофиксация состояния до начала ПНР' },
      { title: 'Монтаж и подключение', desc: 'Установка по проектной планировке и техдокументации' },
      { title: 'Пусконаладочные работы', desc: 'Настройка рабочих режимов и проверка работы' }
    ]
  },
  {
    id: 4,
    icon: Wrench,
    title: 'Диагностика и ремонт',
    subtitle: 'Приём заявки и выезд инженера на объект',
    benefit: 'Сохраняем историю работ, акты, фото и видео на Диске с доступом для заказчика',
    steps: [
      { title: 'Приём заявки', desc: 'Регистрируем обращение, присваиваем номер №RRT' },
      { title: 'Диагностика', desc: 'Выявляем причину, фото/видео фиксация, акт диагностики' },
      { title: 'Согласование стоимости', desc: 'Готовим смету по действующему прайс-листу' },
      { title: 'Ремонт и контрольный запуск', desc: 'Выполняем работы и проверяем оборудование в работе' }
    ]
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: 'Техническое обслуживание',
    subtitle: 'Обслуживание оборудования по согласованному регламенту',
    benefit: 'Своевременное выявление износа узлов для снижения риска внезапной остановки',
    steps: [
      { title: 'Формирование перечня', desc: 'Аудит оборудования, подлежащего обслуживанию' },
      { title: 'Диагностика состояния', desc: 'Осмотр соединений, приводов и защитных элементов' },
      { title: 'Обслуживаем компоненты', desc: 'Очистка и регулировка узлов по регламенту' },
      { title: 'Контрольный запуск', desc: 'Проверка рабочих режимов, фиксация замечаний' }
    ]
  },
  {
    id: 6,
    icon: Paintbrush,
    title: 'Отделочные работы',
    subtitle: 'Ремонт коммерческих помещений',
    benefit: 'Согласованный объём работ, прозрачная стоимость и контроль качества на каждом этапе',
    steps: [
      { title: 'Осмотр и подготовка проекта', desc: 'Оцениваем состояние, замеры, проект под требования' },
      { title: 'Согласование сметы и этапов', desc: 'Утверждаем материалы, объём, стоимость и сроки' },
      { title: 'Выполнение ремонта', desc: 'Работаем по проекту и смете с контролем качества' },
      { title: 'Приёмка выполненных работ', desc: 'Совместная проверка и оформление акта приёмки' }
    ]
  },
  {
    id: 7,
    icon: Wind,
    title: 'Приточно-вытяжная система',
    subtitle: 'Монтаж и обслуживание вентиляции',
    benefit: 'Минимизируем риски сбоев и сложностей при обслуживании системы',
    steps: [
      { title: 'Приём заявки', desc: 'Уточняем задачу: монтаж, ремонт или ТО вентиляции' },
      { title: 'Обследование объекта', desc: 'Осматриваем помещение, замеры, оценка системы' },
      { title: 'Согласование сметы работ', desc: 'Состав работ, оборудование, техрешение и сроки' },
      { title: 'Выполнение работ', desc: 'Монтаж, ремонт или обслуживание по смете' },
      { title: 'Контроль параметров', desc: 'Герметичность, расход воздуха, регулировка, акт' }
    ]
  },
  {
    id: 8,
    icon: Thermometer,
    title: 'Климатическая система',
    subtitle: 'Монтаж и обслуживание систем кондиционирования',
    benefit: 'Минимизируем риски сбоев и сложностей при обслуживании системы',
    steps: [
      { title: 'Приём заявки', desc: 'Уточняем задачу по системе кондиционирования' },
      { title: 'Обследование объекта', desc: 'Осматриваем помещение, замеры, оценка системы' },
      { title: 'Согласование сметы работ', desc: 'Состав работ, оборудование, техрешение и сроки' },
      { title: 'Выполнение работ', desc: 'Монтаж, ремонт или обслуживание по смете' },
      { title: 'Контроль параметров', desc: 'Охлаждение, режимы, отвод конденсата, акт' }
    ]
  },
  {
    id: 9,
    icon: Sofa,
    title: 'Мебель под заказ',
    subtitle: 'Удобство: мебель под заказ для бизнеса и дома',
    benefit: 'Снижаем риск несоответствия размеров и неудобства в эксплуатации',
    steps: [
      { title: 'Приём заявки', desc: 'Уточняем назначение мебели и ваши пожелания' },
      { title: 'Осмотр и замеры', desc: 'Выезжаем на объект, учитываем особенности помещения' },
      { title: 'Согласование проекта', desc: 'Размеры, материалы, цвет, фактура, сроки и стоимость' },
      { title: 'Изготовление и доставка', desc: 'Производство по проекту и контролируемая доставка' },
      { title: 'Монтаж', desc: 'Установка на объекте и проверка качества монтажа' }
    ]
  }
];

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Снижаем риски',
    desc: 'Минимизируем вероятность сбоев, ошибок монтажа и незапланированных расходов на каждом этапе'
  },
  {
    icon: Camera,
    title: 'Фото и видео фиксация',
    desc: 'Фиксируем состояние оборудования до и после работ. Полная прозрачность процесса'
  },
  {
    icon: HardDrive,
    title: 'История на Диске',
    desc: 'Сохраняем акты, фото и видео всех работ. Предоставляем заказчику постоянный доступ'
  },
  {
    icon: FileText,
    title: 'Прозрачная смета',
    desc: 'Работаем по согласованному прайс-листу. Никаких скрытых платежей и доплат'
  },
  {
    icon: Clock,
    title: 'Работаем 24/7',
    desc: 'Экстренный выезд мастера в течение 2 часов в любое время суток и любой день недели'
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия качества',
    desc: 'Контроль на каждом этапе, акт приёмки и постгарантийное обслуживание оборудования'
  }
];

const processSteps = [
  {
    number: '01',
    title: 'Заявка №RRT',
    desc: 'Регистрируем обращение, присваиваем индивидуальный номер и уточняем детали',
    highlight: 'Индивидуальный номер'
  },
  {
    number: '02',
    title: 'Диагностика',
    desc: 'Выезжаем на объект, выявляем причину, фиксируем результаты на фото и видео',
    highlight: 'Фото и видео отчёт'
  },
  {
    number: '03',
    title: 'Смета',
    desc: 'Готовим смету по действующему прайс-листу, согласовываем сроки и стоимость',
    highlight: 'Прозрачный прайс'
  },
  {
    number: '04',
    title: 'Работа и отчёт',
    desc: 'Выполняем работы, проверяем оборудование, передаём акт и доступ к материалам на Диске',
    highlight: 'Доступ к материалам'
  }
];

const documents = [
  {
    icon: FileText,
    title: 'Акты выполненных работ',
    desc: 'Оформляем акт приёмки после каждого этапа. Документальное подтверждение качества'
  },
  {
    icon: Camera,
    title: 'Фото и видео отчёты',
    desc: 'Фиксируем состояние оборудования до и после работ. Полная прозрачность процесса'
  },
  {
    icon: HardDrive,
    title: 'Доступ к материалам',
    desc: 'Предоставляем заказчику доступ к истории работ, актам и медиафайлам на Диске'
  }
];

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <a href="#process" className={styles.navLink}>Как работаем</a>
          <a href="#contacts" className={styles.navLink}>Контакты</a>
        </div>
        <motion.a
          href="tel:+79933430353"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.phoneBtn}
        >
          <Phone size={16} />
          <span>24/7</span>
        </motion.a>
      </motion.nav>

      {/* --- HERO --- */}
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
            <motion.a
              href="#contacts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.btnPrimary}
            >
              Оставить заявку <Send size={20} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.btnSecondary}
            >
              Все услуги
            </motion.a>
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
            <span>• Вентиляция</span>
            <span>• Пароконвектоматы</span>
            <span>• Холодильные камеры</span>
            <span>• Тепловое оборудование</span>
            <span>• Посудомоечные машины</span>
            <span>• Вытяжные зонты</span>
            <span>• Вентиляция</span>
          </div>
        </motion.div>
      </section>

      {/* --- 24/7 BANNER --- */}
      <section className={styles.emergencyBanner}>
        <div className={styles.emergencyContent}>
          <div className={styles.emergencyLeft}>
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
            href="tel:+79933430353"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.emergencyPhone}
          >
            +7 (993) 343-03-53
          </motion.a>
        </div>
      </section>

      {/* --- AUDIENCE --- */}
      <section className={styles.audienceSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.audienceContent}
        >
          <motion.span variants={fadeInUp} className={styles.audienceLabel}>Для кого мы работаем</motion.span>
          <motion.h2 variants={fadeInUp} className={styles.audienceTitle}>
            Для предприятий <br /> <span>общественного питания</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className={styles.audienceDesc}>
            Комплексное оснащение и обслуживание кухонь любого формата — от небольших кафе до крупных ресторанов и сетевых заведений
          </motion.p>
          <motion.div variants={fadeInUp} className={styles.audienceTags}>
            <span className={styles.tag}>Рестораны</span>
            <span className={styles.tag}>Кафе</span>
            <span className={styles.tag}>Столовые</span>
            <span className={styles.tag}>Фуд-корты</span>
            <span className={styles.tag}>Кейтеринг</span>
            <span className={styles.tag}>Пекарни</span>
            <span className={styles.tag}>Кондитерские</span>
            <span className={styles.tag}>Бары</span>
          </motion.div>
        </motion.div>
      </section>

      {/* --- BENEFITS --- */}
      <section className={styles.benefitsSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.sectionHeader}
        >
          <motion.span variants={fadeInUp} className={styles.sectionLabel}>Почему мы</motion.span>
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Преимущества работы <br /> <span>с РЕСТОРЕМТОРГ</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className={styles.benefitsGrid}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={index} variants={fadeInUp} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDesc}>{benefit.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className={styles.servicesSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.sectionHeader}
        >
          <motion.span variants={fadeInUp} className={styles.sectionLabel}>Наши услуги</motion.span>
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            9 направлений для <br /> <span>вашего бизнеса</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className={styles.servicesGrid}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                variants={fadeInUp}
                className={styles.serviceCard}
              >
                <div className={styles.serviceNumber}>0{service.id}</div>
                <div className={styles.serviceIcon}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>

                <div className={styles.serviceBenefit}>
                  <CheckCircle2 size={18} className={styles.serviceBenefitIcon} />
                  <span className={styles.serviceBenefitText}>{service.benefit}</span>
                </div>

                <div className={styles.serviceSteps}>
                  {service.steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                      <div className={styles.stepNumber}>{index + 1}</div>
                      <div className={styles.stepContent}>
                        <div className={styles.stepTitle}>{step.title}</div>
                        <div className={styles.stepDesc}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* --- PROCESS --- */}
      <section id="process" className={styles.processSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.processContent}
        >
          <motion.div variants={fadeInUp} className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Как мы работаем</span>
            <h2 className={styles.sectionTitle}>
              Прозрачный процесс <br /> <span>от заявки до результата</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className={styles.processGrid}
          >
            {processSteps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className={styles.processStep}>
                <div className={styles.processStepNumber}>{step.number}</div>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
                <span className={styles.processHighlight}>{step.highlight}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* --- DOCUMENTS --- */}
      <section className={styles.documentsSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.sectionHeader}
        >
          <motion.span variants={fadeInUp} className={styles.sectionLabel}>Документы и отчётность</motion.span>
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Полная прозрачность <br /> <span>каждого этапа работ</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className={styles.documentsGrid}
        >
          {documents.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <motion.div key={index} variants={fadeInUp} className={styles.documentCard}>
                <div className={styles.documentIcon}>
                  <Icon size={32} />
                </div>
                <h3 className={styles.documentTitle}>{doc.title}</h3>
                <p className={styles.documentDesc}>{doc.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* --- GOOGLE DRIVE --- */}
      <section className={styles.driveSection}>
        <div className={styles.driveContent}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={styles.driveText}
          >
            <motion.span variants={fadeInUp} className={styles.driveLabel}>Архив работ</motion.span>
            <motion.h2 variants={fadeInUp} className={styles.driveTitle}>
              Все работы на <br /> <span>Google Диске</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className={styles.driveDesc}>
              Сохраняем историю работ с вашим оборудованием: акты, фото и видео.
              Предоставляем заказчику постоянный доступ к материалам.
            </motion.p>
            <motion.div variants={fadeInUp} className={styles.driveFeatures}>
              <div className={styles.driveFeature}>
                <div className={styles.driveFeatureIcon}>
                  <CheckCircle2 size={14} />
                </div>
                <span>Акты выполненных работ по каждому объекту</span>
              </div>
              <div className={styles.driveFeature}>
                <div className={styles.driveFeatureIcon}>
                  <CheckCircle2 size={14} />
                </div>
                <span>Фото и видео фиксация до и после ремонта</span>
              </div>
              <div className={styles.driveFeature}>
                <div className={styles.driveFeatureIcon}>
                  <CheckCircle2 size={14} />
                </div>
                <span>История обслуживания вашего оборудования</span>
              </div>
            </motion.div>
            <motion.a
              variants={fadeInUp}
              href="https://drive.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.driveButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Открыть Google Диск
              <ExternalLink size={20} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={styles.driveVisual}
          >
            <div className={styles.driveVisualIcon}>
              <FolderOpen size={56} />
            </div>
            <div className={styles.driveVisualBadge}>
              <div className={styles.driveVisualBadgeIcon}>
                <HardDrive size={18} />
              </div>
              <div className={styles.driveVisualBadgeText}>
                <div className={styles.driveVisualBadgeTitle}>Полный архив работ</div>
                <div className={styles.driveVisualBadgeDesc}>Доступ 24/7 для заказчика</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA / FORM --- */}
      <section id="contacts" className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.ctaContent}
        >
          <h2 className={styles.ctaTitle}>Оставьте заявку</h2>
          <p className={styles.ctaDesc}>
            Получите бесплатную консультацию и расчёт стоимости работ в течение 30 минут
          </p>

          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.formSuccess}
            >
              <CheckCircle2 size={64} color="var(--brand)" />
              <h3 className={styles.formSuccessTitle}>Заявка отправлена!</h3>
              <p className={styles.formSuccessDesc}>
                Мы свяжемся с вами в течение 30 минут
              </p>
            </motion.div>
          ) : (
            <form className={styles.ctaForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                className={styles.ctaInput}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Телефон"
                className={styles.ctaInput}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <textarea
                placeholder="Опишите задачу или проблему"
                rows="3"
                className={styles.ctaInput}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button
                type="submit"
                className={styles.ctaSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
              {formStatus === 'error' && (
                <p className={styles.formError}>
                  Ошибка отправки. Попробуйте ещё раз или позвоните нам.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.logo}>
              РЕСТО<span>РЕМ</span>ТОРГ
            </div>
            <div className={styles.footerContacts}>
              <a href="tel:+79933430353" className={styles.footerContact}>+7 (993) 343-03-53</a>
              <a href="mailto:restoremtorg@mail.ru" className={styles.footerContact}>restoremtorg@mail.ru</a>
            </div>
            <p className={styles.footerCopyright}>© 2026 Все права защищены.</p>
          </div>
          <div className={styles.footerSocials}>
            <a
              href="https://t.me/restoremtorg"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Telegram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </a>
            <a
              href="https://instagram.com/restoremtorg"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}