import { useState, useMemo, useRef } from "react";

const FacebookLogo = () => (
  <svg viewBox="0 0 36 36" className="w-12 h-12" fill="hsl(var(--fb-blue))">
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34v-9H9v-5h5v-3.5C14 12.252 16.763 9 21.5 9c1.754 0 3.5.5 3.5.5v4h-2c-1.93 0-3 1.07-3 3v3h5l-1 5h-4v11.27z" />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 120 28" className="h-6" fill="none">
    <path d="M7.3 23.3c-2.6 0-4.6-1-6-2.7C.4 19.3 0 17.3 0 14.8c0-3 .8-5.8 2.4-8.2C4.4 3.6 7 2 9.8 2c1.8 0 3.2.7 4.2 2 .3.4.6.9.9 1.5.3-.6.6-1.1.9-1.5C16.8 2.7 18.2 2 20 2c2.8 0 5.4 1.6 7.4 4.6 1.6 2.4 2.4 5.2 2.4 8.2 0 2.5-.5 4.5-1.3 5.8-1.4 1.7-3.4 2.7-6 2.7-1.5 0-2.8-.4-4-1.3-1-.7-1.8-1.7-2.6-3-.8 1.3-1.6 2.3-2.6 3-1.2.9-2.5 1.3-4 1.3zm3-6c1.3 2.3 2.7 3.4 4 3.4 1.7 0 3-.6 3.7-1.7.5-.8.8-2.2.8-4.2 0-2.5-.6-4.8-1.8-6.8-1.3-2.1-2.8-3.2-4.5-3.2-1.2 0-2.2.7-3 2-.4.7-.8 1.6-1.2 2.8l1.4 3.8.6 1.5zm-2.6-7l-1.2-3.2c-.4-1-.8-1.8-1.2-2.4-.7-1-1.5-1.5-2.5-1.5-1.7 0-3.2 1.1-4.5 3.2C3.1 8.4 2.5 10.7 2.5 13.2v1.6c0 2 .3 3.4.8 4.2.7 1.1 2 1.7 3.7 1.7 1.4 0 2.8-1.2 4.2-3.6l-1-2.6-2.5-6.3z" fill="hsl(var(--fb-blue))"/>
    <text x="35" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="400" fill="hsl(0 0% 46%)">Meta</text>
  </svg>
);

const ImageCollage = () => {
  // Generate random seed on mount so images change per refresh
  const seeds = useMemo(() => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000));
  }, []);

  return (
    <div className="relative w-full max-w-[500px] mx-auto h-[420px] lg:h-[480px]">
      {/* Main large image */}
      <div className="absolute top-[40px] left-[80px] w-[300px] h-[340px] rounded-2xl overflow-hidden shadow-xl z-10">
        <img
          src={`https://picsum.photos/seed/${seeds[0]}/600/680`}
          alt="Random lifestyle"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small left image */}
      <div className="absolute top-[80px] left-0 w-[130px] h-[160px] rounded-xl overflow-hidden shadow-lg z-20">
        <img
          src={`https://picsum.photos/seed/${seeds[1]}/260/320`}
          alt="Random photo"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Phone mockup right */}
      <div className="absolute top-[60px] right-0 w-[140px] h-[240px] rounded-2xl overflow-hidden shadow-lg border-4 border-card z-20 bg-card">
        <img
          src={`https://picsum.photos/seed/${seeds[2]}/280/480`}
          alt="Random phone photo"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom circle avatar */}
      <div className="absolute bottom-[0px] left-[120px] w-[100px] h-[100px] rounded-full overflow-hidden shadow-lg border-4 border-primary z-30">
        <img
          src={`https://picsum.photos/seed/${seeds[3]}/200/200`}
          alt="Random avatar"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Emoji / reaction bubbles */}
      <div className="absolute top-[20px] left-[60px] text-3xl z-30 drop-shadow-md">😂</div>
      <div className="absolute top-[180px] right-[20px] z-30 w-10 h-10 rounded-full bg-destructive/70 flex items-center justify-center shadow-md">
        <span className="text-lg">❤️</span>
      </div>

      {/* Time badge */}
      <div className="absolute top-[30px] right-[40px] z-30 bg-primary/80 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
        🕐 {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}
      </div>

      {/* Small card overlay bottom-right */}
      <div className="absolute bottom-[30px] right-[10px] w-[120px] h-[90px] rounded-xl overflow-hidden shadow-lg z-20 bg-card">
        <img
          src={`https://picsum.photos/seed/${seeds[4]}/240/180`}
          alt="Random thumbnail"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-card">
          <div className="flex gap-1 px-2 pt-1">
            <div className="w-8 h-1.5 rounded-full bg-muted" />
            <div className="w-5 h-1.5 rounded-full bg-muted" />
          </div>
        </div>
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
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full h-[52px] px-4 pt-5 pb-1 text-base border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
    </div>
  );
};


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 max-w-[1100px] w-full">
          {/* Left side */}
          <div className="flex-1 max-w-[580px] relative">
            <div className="mb-4">
              <FacebookLogo />
            </div>
            <ImageCollage />
            <div className="mt-4">
              <h1 className="text-[42px] lg:text-[56px] font-extrabold leading-[1.05] tracking-tight text-foreground">
                Explore<br />the things<br /><span className="text-primary">you love.</span>
              </h1>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-[396px] lg:border-l lg:border-border lg:pl-12">
            <div className="py-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Log into Facebook</h2>
              <FloatingInput
                type="text"
                label="Email or mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FloatingInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-3"
              />
              />
              <button className="w-full h-[48px] bg-primary text-primary-foreground text-base font-semibold rounded-full mt-4 hover:brightness-95 transition-all">
                Log in
              </button>
              <div className="text-center mt-4">
                <a href="#" className="text-foreground text-sm font-medium hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="border-t border-border mt-6 pt-6 flex justify-center">
                <button className="w-full h-[48px] border border-primary text-primary text-base font-semibold rounded-full hover:bg-primary/5 transition-all">
                  Create new account
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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground mb-2">
            {["English (US)", "नेपाली", "हिन्दी", "Español", "Português (Brasil)", "日本語", "Français (France)"].map((lang, i) => (
              <a key={i} href="#" className="text-muted-foreground hover:underline">
                {lang}
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
