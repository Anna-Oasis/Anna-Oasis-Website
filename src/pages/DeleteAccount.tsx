

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

const DeleteAccountPage = () => {
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the email and roll number to your backend to trigger the email
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Data Deletion Request</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-700 text-center mb-2">
              If you would like to request deletion of data associated with your account, please contact us at:
            </p>
            <div className="flex items-center justify-center mb-2">
              <span className="text-lg mr-2">📧</span>
              <a href="mailto:annaoasishostel@gmail.com" className="text-blue-700 underline">annaoasishostel@gmail.com</a>
            </div>
            <p className="text-xs text-gray-500 text-center">We will process your request within 7 days.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="roll">Roll Number</Label>
              <Input
                id="roll"
                type="text"
                placeholder="Enter your roll number"
                value={roll}
                onChange={e => setRoll(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitted}>
              {submitted ? "Request Sent" : "Request Data Deletion"}
            </Button>
          </form>
          {submitted && (
            <Alert className="mt-4">
              <AlertTitle>Request Sent</AlertTitle>
              <AlertDescription>
                Your request has been submitted. We will process your request within 7 days.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAccountPage;
