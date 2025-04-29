import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import OtpVerifyForm from "../../components/auth/OtpVerifyForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <OtpVerifyForm />
      </AuthLayout>
    </>
  );
}
