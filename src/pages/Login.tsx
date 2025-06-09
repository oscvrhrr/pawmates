import { LoginForm } from "@/components/custom/LoginForm";
import { PawPrint } from "lucide-react";

const LoginPage = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <PawPrint className="size-4" />
              </div>
              Pawmates
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rC3rWV0BBk06c5omv/videoblocks-v1-0066_20231011-as-garelin-couple-at-home-2-studio00000000_rrowqn_8a__4e5ad1c92f509cd7baf51980ec3a70e7__P360.mp4"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
