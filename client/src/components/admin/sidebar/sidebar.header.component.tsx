import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop } from "lucide-react";
import React from "react";

export default function SidebarHeaderComponent() {
  return (
    <Card className="bg-[#4D44B5] shadow-none h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl text-white font-semibold">
          <Laptop className="mr-2 inline-block" />
          TNO ADMIN
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
