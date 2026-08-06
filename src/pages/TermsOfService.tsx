import { LegalLayout, LegalSection } from '../components/LegalLayout';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const CONTACT_EMAIL = 'ntsobokwanec@gmail.com';

export function TermsOfService() {
  useDocumentTitle('Terms of Service | Job Assistant AI');

  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 2026">
      <LegalSection title="What this is">
        <p>
          Job Assistant AI is a personal, student-built project — not a registered company or a commercial product.
          By using it, you're agreeing to the terms below, written as plainly as we can manage.
        </p>
      </LegalSection>

      <LegalSection title="The service is provided as-is">
        <p>
          Job Assistant AI is provided "as-is" and "as-available," with no warranties of any kind. We don't
          guarantee the service will be available at all times, free of bugs, or uninterrupted. We also don't
          guarantee the accuracy of AI-generated content — match scores, extracted CV data, suggestions, and chat
          responses are produced by an AI model and can be wrong, incomplete, or misleading. Always use your own
          judgment before acting on them, especially for something as important as a job application.
        </p>
        <p>The service is not warranted to be fit for any particular purpose beyond what's described on the app itself.</p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, we are not liable for any loss of data, unauthorized access to
          your account, or other damages arising from your use of this service — except in cases of gross
          negligence on our part. This is a project run without the resources of a company, and we can't offer the
          same guarantees a commercial service would.
        </p>
      </LegalSection>

      <LegalSection title="Your responsibilities">
        <p>
          Please don't upload sensitive personal information beyond what a normal CV would contain (e.g. avoid
          including ID numbers, banking details, or other sensitive data your CV doesn't need). You're responsible
          for keeping your account credentials secure, and for the accuracy of the information you provide.
        </p>
      </LegalSection>

      <LegalSection title="About this project">
        <p>
          Job Assistant AI is built and maintained as a personal/student project, not by a registered business
          entity. It may change, be paused, or be discontinued at any time without notice.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          If you have questions about these terms, reach out at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#7A5C46] font-medium hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
