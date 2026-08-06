import { LegalLayout, LegalSection } from '../components/LegalLayout';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const CONTACT_EMAIL = '[your-email-here]';

export function PrivacyPolicy() {
  useDocumentTitle('Privacy Policy — Job Assistant');

  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 2026">
      <LegalSection title="The short version">
        <p>
          Job Assistant is a student project built to help people match their CV against real job postings. This
          page explains, in plain language, what information we collect, why we collect it, who else sees it, and
          what you can do about it.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>We collect the information you give us directly, and the information our features generate from it:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your email address and a securely hashed version of your password (we never store your password itself).</li>
          <li>Your full name, if you provide one when creating an account.</li>
          <li>
            The CV file you upload, and the content our AI extracts from it — skills, education, certifications,
            projects, and work experience.
          </li>
          <li>
            Job application tracking data you create or that our discovery feature saves for you — company names,
            job titles, locations, and the status of each application (saved, applied, interview, etc.).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Why we collect it">
        <p>Every piece of data above exists to power a specific feature:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your account details let you log in and keep your data private to you.</li>
          <li>Your CV and its extracted content are what our AI compares against job descriptions to score your fit and generate suggestions.</li>
          <li>Your job tracking data is what populates your dashboard and application pipeline.</li>
        </ul>
        <p>We don't use your data for advertising, and we don't sell it.</p>
      </LegalSection>

      <LegalSection title="Who we share data with">
        <p>We rely on a small number of third-party services to make the app work:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Google Gemini API</strong> — when you upload a CV or request a job-fit analysis, the relevant
            text is sent to Google's Gemini API so it can extract structured information and generate suggestions.
            This is the core of how the AI features work.
          </li>
          <li>
            <strong>The Muse API</strong> — used to discover real job postings for you. No personal or account data
            is sent to The Muse; we only query it for public job listings.
          </li>
        </ul>
        <p>We don't share your data with anyone else, and we don't use it to train external AI models.</p>
      </LegalSection>

      <LegalSection title="How we store your data">
        <p>
          Your account data and application tracking data are stored in an Azure SQL Database. Uploaded CV files
          are stored in Azure Blob Storage, in a private container that isn't publicly accessible.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You're in control of your data. Specifically, you can:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Ask what personal data we hold about you.</li>
          <li>Ask us to delete your account and everything associated with it — your CV, extracted data, and application history.</li>
        </ul>
        <p>
          To make either request, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#7A5C46] font-medium hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          and we'll action it as soon as we reasonably can.
        </p>
      </LegalSection>

      <LegalSection title="A note on security">
        <p>
          This application is built as a student project. We follow reasonable security practices — passwords are
          hashed, CV files are stored privately rather than publicly, and access to your data requires
          authentication. That said, no system, student-built or otherwise, can be guaranteed 100% secure. Please
          don't treat this app as a place to store anything you wouldn't be comfortable losing.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          If anything here is unclear, or you want to raise a concern, reach out at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#7A5C46] font-medium hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
