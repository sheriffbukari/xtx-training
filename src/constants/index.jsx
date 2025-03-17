import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Learn", href: "/learn" },
];

export const testimonials = [
  {
    user: "sheriff",
    company: "Microsoft",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "sheriff",
    company: "NVIDIA Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "sheriff",
    company: "Apple Inc.",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "sheriff",
    company: "SpaceX",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "sheriff",
    company: "Tesla",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "sheriff",
    company: "Google",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Drag-and-Drop Interface",
    description:
      "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Compatibility",
    description:
      "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
  },
  {
    icon: <ShieldHalf />,
    text: "Built-in Templates",
    description:
      "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const resourcesLinks = [
  { href: "/home", text: "Getting Started", description: "Brief overview of the XTX Train learning platform concept" },
  { href: "/docs", text: "Documentation", description: "Comprehensive documentation for programming languages and frameworks" },
  { href: "/login", text: "Tutorials", description: "Sign in to access our interactive coding tutorials" },
  { href: "https://developer.mozilla.org/en-US/docs/Web/API", text: "API Reference", description: "Learn how to use APIs in your projects" },
  { href: "#", text: "Community Forums", description: "Connect with other developers in our community" },
];

export const platformLinks = [
  { href: "#", text: "Features", description: "Explore the features of our learning platform" },
  { href: "#", text: "Supported Devices", description: "Devices compatible with coding and development" },
  { href: "#", text: "System Requirements", description: "Optimal PC specifications for efficient coding" },
  { href: "https://code.visualstudio.com/download", text: "Downloads", description: "Download recommended code editors" },
  { href: "#", text: "Release Notes", description: "Latest updates on programming languages" },
];

export const communityLinks = [
  { href: "#", text: "Events", description: "Upcoming coding events and hackathons" },
  { href: "#", text: "Meetups", description: "Connect with local developer groups" },
  { href: "#", text: "Conferences", description: "Major tech conferences and speaking opportunities" },
  { href: "#", text: "Hackathons", description: "Competitive coding events to test your skills" },
  { href: "#", text: "Jobs", description: "Career opportunities in software development" },
];
