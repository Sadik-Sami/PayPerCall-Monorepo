import { HeroSection } from "@/components/blocks/hero-1";

export default function PayPerCallPage() {
  return (
    <HeroSection
      title="Pay Per Call"
      subtitle="Pay Per Call is a marketing service that allows you to pay for each call you receive. It is a great way to get more leads and sales."
      callToAction={{
        text: "Get a Free Consultation",
        href: "/contact",
      }}
      backgroundImage="https://plus.unsplash.com/premium_photo-1687362298502-1881385c786f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      contactInfo={{
        website: "https://corecloser.com",
        phone: "+1 (855) 330-2777",
        address: "20555 US-19 N, Clearwater, FL 33763",
      }}
    />
  )
}