import { useState } from "react";
import fbCollage from "@/assets/fb-collage.jpg";

const FacebookLogo = () => (
  <svg viewBox="0 0 36 36" className="w-12 h-12" fill="hsl(214 89% 52%)">
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34v-9H9v-5h5v-3.5C14 12.252 16.763 9 21.5 9c1.754 0 3.5.5 3.5.5v4h-2c-1.93 0-3 1.07-3 3v3h5l-1 5h-4v11.27z" />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 250 50" className="h-6" fill="hsl(214 89% 52%)">
    <text x="30" y="38" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="400" fill="hsl(0 0% 46%)">
      Meta
    </text>
    <path d="M12 25c0-7 3-13 7-13s5 4 7 9c2-5 4-9 7-9s7 6 7 13-3 13-7 13-5-4-7-9c-2 5-4 9-7 9s-7-6-7-13z" fill="none" stroke="hsl(214 89% 52%)" strokeWidth="3"/>
  </svg>
);

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 max-w-[1100px] w-full">
          {/* Left side */}
          <div className="flex-1 max-w-[580px] relative">
            <div className="absolute top-4 left-4 z-10">
              <FacebookLogo />
            </div>
            <img
              src={fbCollage}
              alt="Social media collage"
              width={896}
              height={960}
              className="w-full max-w-[500px] mx-auto"
            />
            <div className="mt-2 lg:-mt-4">
              <h1 className="text-[42px] lg:text-[56px] font-extrabold leading-[1.05] tracking-tight text-foreground">
                Explore<br />the things<br /><span className="text-primary">you love.</span>
              </h1>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-[396px] lg:border-l lg:border-border lg:pl-12">
            <div className="py-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Log into Facebook</h2>
              <input
                type="text"
                placeholder="Email or mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] px-4 text-base border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] px-4 text-base border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-3"
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
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
          {["English (US)", "नेपाली", "हिन्दी", "Español", "Português (Brasil)", "日本語", "Français (France)"].map((lang, i) => (
            <a key={i} href="#" className={i === 0 ? "text-muted-foreground" : "text-muted-foreground hover:underline"}>
              {lang}
            </a>
          ))}
          <a href="#" className="text-muted-foreground hover:underline">More languages...</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
