import type { Metadata } from 'next';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Sunshine Developers mobile application. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted text-sm mb-12">
              Effective Date: July 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <div>
                <p className="text-muted leading-relaxed">
                  Sunshine Developers (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) values your privacy. This Privacy Policy explains how the Sunshine Developers mobile application collects, uses, and protects your information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
                <p className="text-muted leading-relaxed mb-3">
                  The app may collect the following information:
                </p>
                <ul className="list-disc pl-6 text-muted space-y-1.5">
                  <li>Name</li>
                  <li>Mobile Number</li>
                  <li>Profile Photo (if uploaded)</li>
                  <li>User Role (Agent, Employee, Guest)</li>
                  <li>Device Information</li>
                  <li>Firebase Device Token (for notifications)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted leading-relaxed mb-3">
                  We use the collected information to:
                </p>
                <ul className="list-disc pl-6 text-muted space-y-1.5">
                  <li>Authenticate users</li>
                  <li>Display your profile</li>
                  <li>Provide venture and layout information</li>
                  <li>Send push notifications</li>
                  <li>Improve application performance</li>
                  <li>Maintain application security</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Data Storage</h2>
                <p className="text-muted leading-relaxed">
                  Your information is securely stored using Google Firebase services, including:
                </p>
                <ul className="list-disc pl-6 text-muted space-y-1.5 mt-3">
                  <li>Firebase Authentication</li>
                  <li>Cloud Firestore</li>
                  <li>Firebase Storage</li>
                  <li>Firebase Cloud Messaging</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Data Security</h2>
                <p className="text-muted leading-relaxed">
                  We take reasonable measures to protect your information against unauthorized access, disclosure, or modification.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-muted leading-relaxed">
                  This application uses Google Firebase services which may collect certain technical information according to Google{'\''}s Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Children{'\''}s Privacy</h2>
                <p className="text-muted leading-relaxed">
                  This application is not intended for children under 13 years of age.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Changes to this Privacy Policy</h2>
                <p className="text-muted leading-relaxed">
                  We may update this Privacy Policy from time to time. Any updates will be reflected on this page.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted leading-relaxed mb-3">Sunshine Developers</p>
                <p className="text-muted leading-relaxed">
                  Plot No 14, Opp: MRO Office, Nandyal
                </p>
                <p className="text-muted leading-relaxed">
                  Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}