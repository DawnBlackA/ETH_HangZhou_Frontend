"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Twitter, Mail, Lock } from "lucide-react"
import Link from "next/link"
import styles from "./login-form.module.css"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        setError("登录失败，请检查您的凭据。")
      }
    } catch (error) {
      console.error("Login failed", error)
      setError("登录过程中发生错误。请稍后再试。")
    } finally {
      setIsLoading(false)
    }
  }

  const handleXLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signIn("twitter", {
        redirect: true,
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error("X login failed", error)
      setError("X 登录失败。请稍后再试或使用其他登录方式。")
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginFormContainer}>
      {/* 头部 */}
      <div className={styles.formHeader}>
        <div className={styles.logoContainer}>
          <Lock className={styles.lockIcon} />
        </div>
        <h2 className={styles.formTitle}>用户登录</h2>
        <p className={styles.formSubtitle}>使用您的账号访问平台</p>
      </div>

      {/* 内容 */}
      <div className={styles.formContent}>
        {error && (
          <div className={styles.errorAlert}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.alertIcon}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button 
          className={styles.twitterButton} 
          onClick={handleXLogin} 
          disabled={isLoading}
        >
          <Twitter className={styles.twitterIcon} />
          <span>使用 X 登录</span>
        </button>

        <div className={styles.debugLinks}>
          <Link href="/twitter-login" className={styles.debugLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.bugIcon}>
              <path d="M8 2h8"></path>
              <path d="M12 14v7"></path>
              <path d="M12 14a5 5 0 0 0 5-5c0-2-2-3-3-3s-2 1-2 1"></path>
              <path d="M11 6s.9-1 2-1 3 1 3 3a5 5 0 0 1-5 5"></path>
            </svg>
            尝试替代登录
          </Link>

          <Link href="/debug-oauth" className={styles.debugLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.bugIcon}>
              <path d="M8 2h8"></path>
              <path d="M12 14v7"></path>
              <path d="M12 14a5 5 0 0 0 5-5c0-2-2-3-3-3s-2 1-2 1"></path>
              <path d="M11 6s.9-1 2-1 3 1 3 3a5 5 0 0 1-5 5"></path>
            </svg>
            调试连接
          </Link>
        </div>

        <div className={styles.separator}>
          <span>或使用邮箱登录</span>
        </div>

        <form onSubmit={handleEmailLogin} className={styles.emailForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              <Mail className={styles.inputIcon} />
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password" className={styles.formLabel}>
                <Lock className={styles.inputIcon} />
                密码
              </label>
              <a href="#" className={styles.forgotPassword}>
                忘记密码?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={styles.rememberMe}>
            <div className={styles.checkmark}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span>保持登录状态（7天）</span>
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "登录中..." : "登录"}
          </button>

          <div className={styles.testAccount}>
            <p>测试账号: <span>user@example.com</span> / <span>password</span></p>
          </div>
        </form>
      </div>

      {/* 底部 */}
      <div className={styles.formFooter}>
        <p>
          登录即表示您同意我们的{" "}
          <a href="#" className={styles.footerLink}>
            服务条款
          </a>{" "}
          和{" "}
          <a href="#" className={styles.footerLink}>
            隐私政策
          </a>
          。
        </p>
      </div>
    </div>
  )
}

