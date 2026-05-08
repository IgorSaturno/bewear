import MainLayout from "@/components/layouts/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

interface AuthenticationPageProps {
  searchParams: Promise<{ redirectTo?: string | string[] }>;
}

const Authentication = async ({ searchParams }: AuthenticationPageProps) => {
  const { redirectTo } = await searchParams;
  const normalizedRedirectTo = Array.isArray(redirectTo)
    ? redirectTo[0] || "/"
    : redirectTo || "/";

  return (
    <MainLayout>
      <div className="flex w-full flex-col gap-6 p-5 lg:container lg:mx-auto lg:w-lg">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm redirectTo={normalizedRedirectTo} />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm redirectTo={normalizedRedirectTo} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Authentication;
