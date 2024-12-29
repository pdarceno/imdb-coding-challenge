import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Discover from "./discover";
import Favorites from "./favorites";
import { useState } from "react";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    // Get saved tab from localStorage or default to "discover"
    return localStorage.getItem("selectedTab") || "discover";
  });

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    localStorage.setItem("selectedTab", value);
  };

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className="p-4 w-full mx-auto md:max-w-xl"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="discover">Discover</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>
      <TabsContent value="discover">
        <Discover />
      </TabsContent>
      <TabsContent value="favorites">
        <Favorites />
      </TabsContent>
    </Tabs>
  );
};

export default Home;
