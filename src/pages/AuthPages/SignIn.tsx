import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="AgroTech – Smart Farming Tools, Crop Management & Agriculture Tips"
        description="Explore expert farming techniques, crop management tools, and the latest agricultural innovations. Boost yields with sustainable practices, weather insights, and farm equipment guides."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
