import { useEffect, useState } from "react";
import {
  Code2,
  Users,
  Trophy,
  Zap,
  Bell,
  LineChart,
  Brain,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Timer,
  GitCompare,
  Terminal,
  Code,
  Binary,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { base } from "framer-motion/client";
import { baseUri } from "../data/constantData";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const pong = () => {
      axios
        .get(`${baseUri}/ping`, { withCredentials: true })
        .then((response) => {
          console.log("API Response Data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching leaderboard data:", error);
        });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section with animated code background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div className="absolute inset-0 opacity-10">
          {/* Matrix-like animated background */}
          <div className="relative h-full w-full">
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-blue-500/20 whitespace-nowrap text-sm animate-matrix"
                  style={{
                    left: `${i * 5}%`,
                    animationDelay: `${i * 0.1}s`,
                    top: "-100%",
                  }}
                >
                  {Array.from({ length: 50 }).map((_, j) => (
                    <div key={j} className="my-2">
                      {Math.random().toString(2).substring(2, 10)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="container mx-auto px-4 py-24">
            <div
              className={`text-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Terminal className="h-8 w-8 text-blue-400" />
                <span className="inline-block bg-blue-500/10 text-blue-400 border-blue-400/20 px-3 py-1 text-sm rounded-md">
                  v1.0 Beta
                </span>
              </div>
              <h1 className="pb-3 text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Track Your Coding Journey Together
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Connect with friends, track progress across platforms, and grow
                together in your coding journey
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/auth">
                  <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link to="#features">
                  <button className="px-6 py-3 text-lg font-semibold text-gray-300 border border-gray-700 backdrop-blur-sm bg-gray-900/50 hover:bg-gray-800/50 transform hover:scale-105 transition-all">
                    Explore Features
                  </button>
                </Link>
              </div>
              <div className="mt-12 flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">3</div>
                  <div className="text-sm text-gray-400">Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    1000+
                  </div>
                  <div className="text-sm text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">10K+</div>
                  <div className="text-sm text-gray-400">Problems</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Features */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-500/10 text-blue-400 border-blue-400/20 px-3 py-1 text-sm rounded-md mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to track your progress
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Code2}
              title="Multi-Platform Integration"
              description="Track your progress across LeetCode, CodeChef, and GeeksforGeeks in one place"
            />
            <FeatureCard
              icon={Users}
              title="Friend System"
              description="Connect with fellow coders and track each other's progress"
            />
            <FeatureCard
              icon={Trophy}
              title="Leaderboard"
              description="Compete with friends and see who's leading in problem-solving"
            />
            <FeatureCard
              icon={LineChart}
              title="Progress Tracking"
              description="Visualize your coding journey with detailed statistics and insights"
            />
            <FeatureCard
              icon={Brain}
              title="Problem Categories"
              description="Organize and filter problems by difficulty and topics"
            />
            <FeatureCard
              icon={GitCompare}
              title="Friend Comparison"
              description="Compare your progress with friends across different platforms"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <Binary className="absolute right-0 top-0 h-64 w-64 text-purple-600/5 transform rotate-90" />
        <Code className="absolute left-0 bottom-0 h-64 w-64 text-blue-600/5 transform -rotate-90" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-500/10 text-purple-400 border-purple-400/20 px-3 py-1 text-sm rounded-md mb-4">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              The Future of Code Tracking
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpcomingFeatureCard
              icon={Bell}
              title="Smart Notifications"
              description="Get notified when friends surpass your progress or solve problems you're stuck on"
              eta="Q1 2024"
            />
            <UpcomingFeatureCard
              icon={Timer}
              title="Contest Reminders"
              description="Never miss a coding contest with timely reminders and notifications"
              eta="Q1 2024"
            />
            <UpcomingFeatureCard
              icon={Rocket}
              title="Browser Extension"
              description="See which friends have solved the problem you're currently viewing"
              eta="Q2 2024"
            />
            <UpcomingFeatureCard
              icon={CheckCircle2}
              title="Solution Sharing"
              description="Share and discuss solutions with friends directly on the platform"
              eta="Q2 2024"
            />
            <UpcomingFeatureCard
              icon={Zap}
              title="Daily Challenges"
              description="Compete with friends in daily coding challenges"
              eta="Q3 2024"
            />
            <UpcomingFeatureCard
              icon={Brain}
              title="AI-Powered Recommendations"
              description="Get personalized problem recommendations based on your progress"
              eta="Q3 2024"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-gradient-xy" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of developers and take your coding skills to the
            next level
          </p>
          <div className="flex justify-center">
            <Link to="/auth">
              <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 p-6 rounded-md transform group-hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

// Upcoming Feature Card Component
function UpcomingFeatureCard({ icon: Icon, title, description, eta }) {
  return (
    <div className="group bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 p-6 rounded-md transform group-hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-purple-600/10 text-purple-400 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="inline-block bg-purple-500/10 text-purple-400 border-purple-400/20 px-3 py-1 text-sm rounded-md mt-1">
            {eta}
          </span>
        </div>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
