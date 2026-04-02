import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-24 max-w-[980px] w-full">
          {/* Left side - Logo & tagline */}
          <div className="text-center lg:text-left lg:pt-10 lg:flex-1 max-w-[500px]">
            <h1 className="text-primary text-5xl lg:text-6xl font-bold -ml-1 tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              facebook
            </h1>
            <p className="text-2xl font-normal text-foreground mt-4 leading-8">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-[396px]">
            <div className="bg-card rounded-lg shadow-lg p-4 pb-6">
              <input
                type="text"
                placeholder="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] px-4 text-[17px] border border-border rounded-md bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] px-4 text-[17px] border border-border rounded-md bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-3"
              />
              <button className="w-full h-[48px] bg-primary text-primary-foreground text-xl font-bold rounded-md mt-3 hover:brightness-95 transition-all">
                Log in
              </button>
              <div className="text-center mt-4">
                <a href="#" className="text-fb-link text-sm hover:underline">
                  Forgotten password?
                </a>
              </div>
              <div className="border-t border-border mt-5 pt-5 flex justify-center">
                <button className="h-[48px] px-4 bg-secondary text-secondary-foreground text-[17px] font-bold rounded-md hover:brightness-95 transition-all">
                  Create new account
                </button>
              </div>
            </div>
            <p className="text-sm text-center mt-7 text-foreground">
              <a href="#" className="font-bold hover:underline">Create a Page</a>{" "}
              for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 px-4">
        <div className="max-w-[980px] mx-auto">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
            {["English (US)", "Español", "Français (France)", "Português (Brasil)", "Deutsch", "Italiano", "العربية", "हिन्दी", "中文(简体)", "日本語", "한국어"].map((lang, i) => (
              <a key={i} href="#" className={i === 0 ? "text-muted-foreground" : "text-fb-link hover:underline"}>
                {lang}
              </a>
            ))}
            <button className="border border-border bg-muted px-2 text-xs rounded-sm text-muted-foreground">+</button>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-fb-link">
              {["Sign Up", "Log in", "Messenger", "Facebook Lite", "Video", "Places", "Games", "Marketplace", "Meta Pay", "Meta Store", "Meta Quest", "Ray-Ban Meta", "Meta AI", "Instagram", "Threads", "Fundraisers", "Services", "Voting Information Centre", "Privacy Policy", "Privacy Centre", "Groups", "About", "Create ad", "Create Page", "Developers", "Careers", "Cookies", "AdChoices", "Terms", "Help", "Contact uploading & non-users", "Settings"].map((link, i) => (
                <a key={i} href="#" className="hover:underline">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Meta © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
