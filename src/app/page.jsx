// app/page.js - Página principal de autenticação
"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";
import styles from "./page.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>
              <span className={styles.gameText}>Game</span>
              <span className={styles.retroText}>Retrô</span>
            </h1>
            <div className={styles.arcade}></div>
          </div>

          <p className={styles.slogan}>
            {isLogin
              ? "Entre para acessar seus recordes de games clássicos!"
              : "Junte-se à comunidade de gamers retrô!"}
          </p>
        </div>

        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastro
          </button>
        </div>

        <div className={styles.formWrapper}>
          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm onSuccess={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.pixelOverlay}></div>
      </div>
    </div>
  );
}
