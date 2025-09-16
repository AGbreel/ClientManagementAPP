import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import style from './NotFound.module.css';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={style.notFoundContainer}
    >
      <div className={style.contentWrapper}>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -20, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className={style.iconWrapper}
        >
          <AlertTriangle size={80} className={style.warningIcon} />
        </motion.div>

        <h1 className={style.title}>404</h1>
        <h2 className={style.subtitle}>الصفحة غير موجودة</h2>
        <p className={style.message}>
          عذراً، يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أنها غير متاحة مؤقتاً
        </p>

        <div className={style.buttonsContainer}>
          <Link to="/" className={style.homeButton}>
            <Home size={18} className={style.buttonIcon} />
            Home Page
          </Link>

          <button
            onClick={() => window.history.back()}
            className={style.backButton}
          >
            <ArrowLeft size={18} className={style.buttonIcon} />
            Back to previous page
          </button>
        </div>
      </div>

      <div className={style.decorativeElements}>
        <div className={style.circle}></div>
        <div className={style.triangle}></div>
        <div className={style.square}></div>
      </div>
    </motion.div>
  );
}