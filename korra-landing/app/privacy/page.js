import PrivacyPolicyClient from '../../components/landing/PrivacyPolicyClient';

export const metadata = {
  title: 'Privacy Policy · Korra',
  description: 'How KorraHQ Byte Ltd collects, uses, and protects your data across the Korra Customer and Korra Business apps.',
  alternates: { canonical: 'https://korra.com.ng/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyPolicyClient />;
}
