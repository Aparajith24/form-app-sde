"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhoneInput from "react-phone-input-2";
import { Loader2 } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { useToast } from "@/hooks/use-toast";

export default function App() {
  const [formType, setFormType] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  //Checking if the form is valid
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name should contain only alphabetic characters";
    }
    const cleanPhoneNumber = phoneNumber.replace(/^\d+-/, "");
    console.log("Clean Phone Number:", cleanPhoneNumber);
    if (!cleanPhoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (cleanPhoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number should be at least 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Updating the google sheets with the new data
  const handleExcelSubmission = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/update-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        duration: 5000,
        className: "bg-red-500 text-white",
      });
    }
  };

  //Submitting the form to our server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const cleanPhoneNumber = phoneNumber.replace(/^\d+-/, "");
        const response = await fetch("http://localhost:2000/api/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formType,
            name,
            countryCode,
            phoneNumber: cleanPhoneNumber,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setName("");
          setCountryCode("");
          setPhoneNumber("");
          toast({
            title: "Form submitted successfully and google sheets updated!",
            duration: 1000,
            className: "bg-green-500 text-white",
          });
        } else {
          toast({
            title: "Error submitting form",
            description: data.message || "Please try again.",
            duration: 5000,
            className: "bg-red-500 text-white",
          });
        }
        handleExcelSubmission();
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Network error",
          description: "Please check your connection and try again.",
          duration: 5000,
          className: "bg-red-500 text-white",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <Button onClick={() => setFormType("A")}>Form A</Button>
        <Button onClick={() => setFormType("B")}>Form B</Button>
      </div>
      {formType && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Form {formType}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <PhoneInput
                  country={"us"}
                  value={phoneNumber}
                  placeholder="Enter phone number"
                  enableSearch={true}
                  onChange={(phone: string, country: any) => {
                    const reducedPhone = phone.replace(country.dialCode, "");
                    setPhoneNumber(country.dialCode + "-" + reducedPhone);
                    setCountryCode("+" + country.dialCode);
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "3rem",
                  }}
                  inputClass={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
