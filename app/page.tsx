"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import { Label } from "@/components/ui/label";
import "react-phone-input-2/lib/bootstrap.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [formType, setFormType] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name should contain only alphabetic characters";
    }
    if (!/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number should contain only numeric characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
            <form className="space-y-4">
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
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                placeholder="Enter phone number"
                enableSearch={true}
                onChange={(phone: string, country: any) => {
                  const reducedPhone = phone.replace(country.dialCode, "");
                  setPhoneNumber(country.dialCode + "-" + reducedPhone);
                  setCountryCode(country.dialCode);
                  console.log(countryCode, phoneNumber);
                }}
                inputStyle={{
                  width: "100%",
                  height: "3rem",
                }}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
