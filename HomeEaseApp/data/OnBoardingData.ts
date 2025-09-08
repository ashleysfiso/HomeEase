export interface OnboardingSlideData {
  id: string;
  image: any;
  title: string;
  description: string;
}

export const onboardingSlides: OnboardingSlideData[] = [
  {
    id: "1",
    image: require("../assets/images/onboarding1.png"),
    title: "Home Services at Your Fingertips",
    description:
      "Book cleaning, plumbing, repairs, and more — all from one app, right when you need it.",
  },
  {
    id: "2",
    image: require("../assets/images/onboarding2.png"),
    title: "Trusted Professionals, Always",
    description:
      "We connect you with verified, skilled service providers you can count on.",
  },
  {
    id: "3",
    image: require("../assets/images/onboarding3.png"),
    title: "Instant Booking. Fast Response.",
    description:
      "Need help now? HomeEase makes it quick and simple to get assistance at your doorstep.",
  },
];
