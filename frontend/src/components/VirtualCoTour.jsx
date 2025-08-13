import React, { useState } from "react";
import {
  Video,
  Mic,
  MicOff,
  Users,
  Share2,
  Copy,
  PhoneOff,
  Eye,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Home,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const mockParticipants = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b14c?w=100&h=100&fit=crop&crop=face",
    role: "host",
    isActive: true,
    micEnabled: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "guest",
    isActive: true,
    micEnabled: false,
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "guest",
    isActive: true,
    micEnabled: true,
  },
];

const tourRooms = [
  {
    id: "living",
    name: "Living Room",
    description:
      "Spacious open-concept living area with floor-to-ceiling windows",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    view360: "available",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description:
      "Modern kitchen with stainless steel appliances and granite countertops",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    view360: "available",
  },
  {
    id: "bedroom",
    name: "Master Bedroom",
    description:
      "Large master suite with walk-in closet and en-suite bathroom",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    view360: "available",
  },
];

export function VirtualCoTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [micEnabled, setMicEnabled] = useState(false);
  const [participants] = useState(mockParticipants);
  const [inviteLink] = useState("https://dwellogo.com/tour/abc123");
  const [showChat, setShowChat] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const handleStartTour = () => setIsTourActive(true);
  const handleEndTour = () => {
    setIsTourActive(false);
    setIsOpen(false);
  };
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };
  const toggleMic = () => setMicEnabled((prev) => !prev);
  const nextRoom = () =>
    setCurrentRoom((prev) => (prev + 1) % tourRooms.length);
  const prevRoom = () =>
    setCurrentRoom((prev) => (prev - 1 + tourRooms.length) % tourRooms.length);

  if (isTourActive) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Tour Interface */}
        <div className="relative h-full flex flex-col">
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2" />
                  LIVE TOUR
                </Badge>
                <span className="text-white font-medium">
                  {tourRooms[currentRoom].name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(!showChat)}
                  className="text-white hover:bg-white/20"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMic}
                  className={`text-white hover:bg-white/20 ${
                    micEnabled ? "bg-teal-500/20" : "bg-red-500/20"
                  }`}
                >
                  {micEnabled ? (
                    <Mic className="h-4 w-4" />
                  ) : (
                    <MicOff className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="destructive" size="sm" onClick={handleEndTour}>
                  <PhoneOff className="h-4 w-4 mr-1" />
                  End Tour
                </Button>
              </div>
            </div>
          </div>

          {/* Main Tour View */}
          <div className="flex-1 relative">
            <img
              src={tourRooms[currentRoom].image}
              alt={tourRooms[currentRoom].name}
              className="w-full h-full object-cover"
            />
            {/* 360° View Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button className="bg-white/90 hover:bg-white text-warm-gray-900">
                <Eye className="h-4 w-4 mr-2" />
                360° View
              </Button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={prevRoom}
                  className="text-white hover:bg-white/20"
                  disabled={currentRoom === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-white text-sm">
                  {currentRoom + 1} of {tourRooms.length}
                </span>
                <Button
                  variant="ghost"
                  onClick={nextRoom}
                  className="text-white hover:bg-white/20"
                  disabled={currentRoom === tourRooms.length - 1}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button className="text-white hover:bg-white/20">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button className="text-white hover:bg-white/20">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button className="text-white hover:bg-white/20">
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Participants Panel */}
          <div className="absolute top-20 right-4 w-64">
            <Card className="bg-black/50 backdrop-blur-sm border-warm-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participants ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {participants.map((p) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback className="text-xs">
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white text-sm flex-1">{p.name}</span>
                      {p.role === "host" && (
                        <Badge className="text-xs">Host</Badge>
                      )}
                      {p.micEnabled ? (
                        <Mic className="h-3 w-3 text-green-400" />
                      ) : (
                        <MicOff className="h-3 w-3 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Room List */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Card className="bg-black/50 backdrop-blur-sm border-warm-gray-700 w-48">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tourRooms.map((room, idx) => (
                    <Button
                      key={room.id}
                      onClick={() => setCurrentRoom(idx)}
                      className={`w-full justify-start text-left ${
                        idx === currentRoom
                          ? "bg-teal-500 text-white"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {room.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Video className="h-4 w-4 mr-2" />
          Join Co-Tour
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-teal-600 flex items-center gap-2">
            <Video className="h-5 w-5" />
            Virtual Co-Tour Lobby
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Invite section */}
          <div>
            <h3 className="text-warm-gray-900 font-semibold mb-3">Invite Others</h3>
            <div className="flex gap-2">
              <Input value={inviteLink} readOnly className="bg-warm-gray-50 flex-1" />
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={copyInviteLink}
                  className={showCopyTooltip ? "bg-green-50 border-green-200" : ""}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                {showCopyTooltip && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                    Copied!
                  </div>
                )}
              </div>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator />
          {/* Participants */}
          <div>
            <h3 className="text-warm-gray-900 font-semibold mb-3">
              Participants ({participants.length})
            </h3>
            <div className="space-y-3">
              {participants.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={p.avatar} />
                      <AvatarFallback>
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-warm-gray-900 font-medium">{p.name}</div>
                      <div className="text-sm text-warm-gray-600">
                        {p.role === "host" ? "Tour Host" : "Guest"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.role === "host" && <Badge className="bg-teal-500 text-white">Host</Badge>}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        p.isActive ? "bg-green-500" : "bg-warm-gray-300"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          {/* Tour room previews */}
          <div>
            <h3 className="text-warm-gray-900 font-semibold mb-3">Tour Overview</h3>
            <div className="grid grid-cols-3 gap-3">
              {tourRooms.map((room) => (
                <div key={room.id} className="relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-20 object-cover rounded border border-warm-gray-200"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{room.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mic control */}
          <div className="flex items-center gap-4 p-3 bg-warm-gray-50 rounded-lg">
            <Button
              onClick={toggleMic}
              className={micEnabled ? "bg-teal-500 hover:bg-teal-600" : ""}
              variant={micEnabled ? "default" : "outline"}
              size="sm"
            >
              {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <span className="text-sm text-warm-gray-600">
              Microphone {micEnabled ? "enabled" : "disabled"}
            </span>
          </div>
          {/* Start / Cancel Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleStartTour} className="bg-teal-500 hover:bg-teal-600 text-white flex-1">
              <Video className="h-4 w-4 mr-2" />
              Start Virtual Tour
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
