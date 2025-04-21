"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThemeToggle } from "@/components/theme-toggle";

interface FoodEntry {
  id: string;
  date: string;
  time: string;
  location: string;
  food: string;
  notes: string;
}

export default function App() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [location, setLocation] = useState("");
  const [food, setFood] = useState("");
  const [notes, setNotes] = useState("");
  const [locations, setLocations] = useState<string[]>([
    "Home",
    "School",
    "Workplace",
    "Restaurant",
  ]);
  const [foods, setFoods] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [newFood, setNewFood] = useState("");
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [foodDialogOpen, setFoodDialogOpen] = useState(false);
  const [entryDialogOpen, setEntryDialogOpen] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem("foodEntries");
    const savedLocations = localStorage.getItem("foodLocations");
    const savedFoods = localStorage.getItem("foodItems");

    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedLocations) setLocations(JSON.parse(savedLocations));
    if (savedFoods) setFoods(JSON.parse(savedFoods));
  }, []);

  useEffect(() => {
    localStorage.setItem("foodEntries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem("foodLocations", JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foods));
  }, [foods]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      date: formattedDate,
      time,
      location,
      food,
      notes,
    };

    setEntries([newEntry, ...entries]);

    setLocation("");
    setFood("");
    setNotes("");
    setEntryDialogOpen(false);
  };

  const addNewLocation = () => {
    if (newLocation && !locations.includes(newLocation)) {
      setLocations([...locations, newLocation]);
      setNewLocation("");
      setLocationDialogOpen(false);
    }
  };

  const addNewFood = () => {
    if (newFood && !foods.includes(newFood)) {
      setFoods([...foods, newFood]);
      setNewFood("");
      setFoodDialogOpen(false);
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const resetForm = () => {
    setDate(format(new Date(), "yyyy-MM-dd"));
    setTime(format(new Date(), "HH:mm"));
    setLocation("");
    setFood("");
    setNotes("");
  };

  return (
    <main className="container mx-auto p-8 min-h-dvh flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">Khao's Food Journal</h1>
      <p className="mb-8 text-center text-muted-foreground">
        A simple food journal app to help you track your food intake.
      </p>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Food Journal Entries</CardTitle>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Manage Locations</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Locations</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <Input
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Add new location"
                      />
                      <Button
                        onClick={() => {
                          if (newLocation && !locations.includes(newLocation)) {
                            setLocations([...locations, newLocation]);
                            setNewLocation("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-auto">
                    {locations.map((loc) => (
                      <div
                        key={loc}
                        className="flex items-center justify-between border rounded-md p-2"
                      >
                        <span>{loc}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setLocations(locations.filter((l) => l !== loc))
                          }
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Manage Foods</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Foods</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <Input
                        value={newFood}
                        onChange={(e) => setNewFood(e.target.value)}
                        placeholder="Add new food"
                      />
                      <Button
                        onClick={() => {
                          if (newFood && !foods.includes(newFood)) {
                            setFoods([...foods, newFood]);
                            setNewFood("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-auto">
                    {foods.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between border rounded-md p-2"
                      >
                        <span>{item}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setFoods(foods.filter((f) => f !== item))
                          }
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={entryDialogOpen}
              onOpenChange={(open) => {
                setEntryDialogOpen(open);
                if (open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button>Add Entry</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Food Entry</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date (DD/MM/YYYY)</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Select
                        value={location}
                        onValueChange={setLocation}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Dialog
                        open={locationDialogOpen}
                        onOpenChange={setLocationDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Location</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="new-location">
                                Location Name
                              </Label>
                              <Input
                                id="new-location"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                placeholder="Enter new location"
                              />
                            </div>
                            <Button onClick={addNewLocation}>
                              Add Location
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="food">Food</Label>
                    <div className="flex gap-2">
                      <Select value={food} onValueChange={setFood} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select food" />
                        </SelectTrigger>
                        <SelectContent>
                          {foods.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Dialog
                        open={foodDialogOpen}
                        onOpenChange={setFoodDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Food</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="new-food">Food Name</Label>
                              <Input
                                id="new-food"
                                value={newFood}
                                onChange={(e) => setNewFood(e.target.value)}
                                placeholder="Enter new food"
                              />
                            </div>
                            <Button onClick={addNewFood}>Add Food</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Enter any additional notes"
                      className="min-h-[100px]"
                    />
                  </div>

                  <DialogFooter className="pt-4">
                    <Button type="submit">Save Entry</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Food</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.time}</TableCell>
                      <TableCell>{entry.location}</TableCell>
                      <TableCell>{entry.food}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {entry.notes}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No entries yet. Click "Add Entry" to get started!
            </div>
          )}
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground/80">
        <a
          href="https://github.com/KhaoDoesDev/food-journal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-muted-foreground duration-200"
        >
          View on GitHub
        </a>
        <span className="mx-2">•</span>
        <a
          href="https://www.khaodoes.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-muted-foreground duration-200"
        >
          Made with ❤️ by Khao
        </a>
      </footer>
    </main>
  );
}
