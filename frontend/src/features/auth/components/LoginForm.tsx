import { ApiError } from "@/api/apiClient";
import { Button } from "@/common/ui/actions/button";
import { Input } from "@/common/ui/fields/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/ui/surfaces/form";
import { sleep } from "@/common/utils/sleep";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { User } from "@/features/user/types";
import { Route } from "@/routes/(auth)/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LoginForm = () => {
  const auth = useAuth();
  const router = useRouter();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const search = Route.useSearch();

  // Create the form
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function redirectToDashboard(user: User) {
    // Determine the redirect based on the user's group
    let redirectPath = "/";
    if (user) {
      switch (user.group) {
        case "parent":
          redirectPath = "/parents";
          break;
        case "kid":
          redirectPath = "/kids";
          break;
        case "admin":
          redirectPath = "/admin";
          break;
        default:
          console.warn("Unknown user group:", user.group);
          redirectPath = "/";
      }
    } else {
      console.error("User is not authenticated");
      redirectPath = "/login";
    }

    // Use the search.redirect if it exists, otherwise use the determined redirectPath
    const finalRedirectPath = search.redirect || redirectPath;
    navigate({ to: finalRedirectPath });
  }

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    setIsLoading(true);
    try {
      const user = await auth.login(data.username, data.password);
      await router.invalidate();
      await sleep(250);
      await redirectToDashboard(user);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          setWrongPassword(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your username and password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              variant="outline"
              type="submit"
              className="w-full"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        {wrongPassword && (
          <p className="mt-4 text-sm text-red-600">
            Invalid username or password. Please try again.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
