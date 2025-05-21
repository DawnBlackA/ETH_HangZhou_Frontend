import LoginForm from "@/components/login-form"
import styles from "./login.module.css"

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      {/* 漂浮气泡背景 */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>
      <div className={`${styles.blob} ${styles.blob4}`}></div>
      
      {/* 闪烁小点 */}
      <div className={`${styles.sparkle} ${styles.sparkle1}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle2}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle3}`}></div>
      
      {/* 主要内容 */}
      <div className={styles.content}>
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className={styles.title}>ETH杭州</h1>
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">Beta</div>
          </div>
          <h2 className={styles.subtitle}>欢迎回来</h2>
          <p className="mt-2 text-sm text-gray-600">
            还没有账号？{" "}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              立即注册
            </a>
          </p>
        </div>
        <div className={styles.card}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

