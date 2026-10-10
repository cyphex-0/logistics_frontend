
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/alwaysuse171311@gmail.com", {
        method: "POST",
        headers: { 
          "Accept": "application/json"
        },
        body: formData
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-900 min-h-[400px]">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Your email is sent</h3>
        <p className="text-muted-foreground mb-6">Thank you for getting in touch. We will get back to you shortly.</p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Anti-spam honeypot */}
      <input type="text" name="_honey" style={{ display: "none" }} />
      {/* Disable captcha */}
      <input type="hidden" name="_captcha" value="false" />
      {/* Setup subject */}
      <input type="hidden" name="_subject" value="New Contact Form Submission!" />
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="First Name" placeholder="John" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="Last Name" placeholder="Doe" required disabled={isSubmitting} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="john@company.com" required disabled={isSubmitting} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="Subject" placeholder="How can we help?" required disabled={isSubmitting} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          name="Message"
          placeholder="Provide as much detail as possible..." 
          className="min-h-[150px]"
          required
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Message"
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground mt-4">
        By submitting this form, you agree to our Privacy Policy and Terms of Service.
      </p>
    </form>
  );
}

