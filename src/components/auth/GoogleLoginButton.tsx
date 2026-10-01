"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function GoogleLoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Google login failed");
      }
      
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      toast.success("Login successful");
      router.push("/profile"); // Default redirect, can be adjusted
    } catch (error: any) {
      console.error("Google login error", error);
      toast.error(error.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-10 border rounded-md flex items-center justify-center bg-background text-muted-foreground text-sm font-medium">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Signing in...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center [&>div]:w-full [&>div>div]:!w-full [&_iframe]:!w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google Login failed")}
        shape="rectangular"
        size="large"
        theme="outline"
        width="100%"
        text="signin_with"
      />
    </div>
  );
}
