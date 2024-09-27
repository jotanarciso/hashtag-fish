"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(5, { message: "Phone number must be at least 5 characters." }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters." }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent",
          description: "We will get back to you soon.",
        });
        reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
        <p className="text-xl mb-8 text-center">
          If you think your farm can benefit from our experience, get in touch for a consultation
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input {...register("name")} placeholder="Name" />
              {errors.name && typeof errors.name.message === "string" && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input {...register("email")} placeholder="Email *" required />
              {errors.email && typeof errors.email.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Input {...register("phone")} placeholder="Phone number" />
            {errors.phone && typeof errors.phone.message === "string" && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Textarea {...register("comment")} placeholder="Comment" rows={5} />
            {errors.comment && typeof errors.comment.message === "string" && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
