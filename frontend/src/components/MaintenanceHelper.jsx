import { useState } from "react";
import {
  Wrench,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Plus
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const maintenanceTasks = [
  {
    id: "1",
    title: "Kitchen Faucet Leak",
    category: "plumbing",
    priority: "high",
    status: "scheduled",
    cost: "$150",
    dueDate: "Today",
    contractor: "Mike's Plumbing",
    description: "Fixing dripping kitchen faucet"
  },
  {
    id: "2",
    title: "HVAC Filter Replacement",
    category: "hvac",
    priority: "medium",
    status: "pending",
    cost: "$45",
    dueDate: "This Week",
    description: "Replace air filters in HVAC system"
  },
  {
    id: "3",
    title: "Bathroom Light Fixture",
    category: "electrical",
    priority: "low",
    status: "completed",
    cost: "$85",
    dueDate: "Completed",
    contractor: "Bright Electrical",
    description: "Install new LED light fixture"
  },
  {
    id: "4",
    title: "Appliance Warranty Check",
    category: "appliance",
    priority: "low",
    status: "pending",
    cost: "$0",
    dueDate: "Next Month",
    description: "Check warranty status on refrigerator"
  }
];

const upcomingSchedule = [
  {
    id: "1",
    title: "Plumber Visit",
    time: "2:00 PM Today",
    contractor: "Mike's Plumbing",
    phone: "(555) 123-4567"
  },
  {
    id: "2",
    title: "HVAC Inspection",
    time: "Friday 10:00 AM",
    contractor: "Cool Air Pro",
    phone: "(555) 987-6543"
  }
];

export function MaintenanceHelper() {
  const [activeTab, setActiveTab] = useState("tasks");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-warm-gray-100 text-warm-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in-progress":
        return Clock;
      case "scheduled":
        return Calendar;
      default:
        return AlertTriangle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in-progress":
        return "text-blue-600";
      case "scheduled":
        return "text-teal-600";
      default:
        return "text-orange-600";
    }
  };

  const totalCosts = maintenanceTasks.reduce((sum, task) => {
    return sum + parseInt(task.cost.replace('$', '').replace(',', '') || '0');
  }, 0);

  const completedTasks = maintenanceTasks.filter(task => task.status === "completed").length;
  const progressPercentage = (completedTasks / maintenanceTasks.length) * 100;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-teal-600" />
          Maintenance Helper
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-warm-gray-50 rounded">
            <div className="font-bold text-warm-gray-900">{maintenanceTasks.length}</div>
            <div className="text-xs text-warm-gray-600">Tasks</div>
          </div>
          <div className="text-center p-2 bg-teal-50 rounded">
            <div className="font-bold text-teal-600">${totalCosts}</div>
            <div className="text-xs text-warm-gray-600">Total Cost</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-bold text-green-600">{completedTasks}</div>
            <div className="text-xs text-warm-gray-600">Completed</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-warm-gray-600">Overall Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-warm-gray-900">Maintenance Tasks</span>
              <Button size="sm" variant="outline">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {maintenanceTasks.map((task) => {
                const StatusIcon = getStatusIcon(task.status);

                return (
                  <div key={task.id} className="border border-warm-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-warm-gray-900 text-sm">{task.title}</h4>
                        <p className="text-xs text-warm-gray-600 mt-1">{task.description}</p>
                      </div>
                      <StatusIcon className={`h-4 w-4 ${getStatusColor(task.status)}`} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-warm-gray-500">{task.dueDate}</span>
                      </div>
                      <div className="text-sm font-medium text-teal-600">{task.cost}</div>
                    </div>

                    {task.contractor && (
                      <div className="text-xs text-warm-gray-600 mt-1">
                        Contractor: {task.contractor}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-warm-gray-900">Upcoming Appointments</span>
              <Button size="sm" variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                Book
              </Button>
            </div>

            <div className="space-y-2">
              {upcomingSchedule.map((appointment) => (
                <div key={appointment.id} className="border border-warm-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-warm-gray-900 text-sm">{appointment.title}</h4>
                    <Badge className="bg-teal-100 text-teal-800 text-xs">Scheduled</Badge>
                  </div>

                  <div className="space-y-1 text-xs text-warm-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <div>{appointment.contractor}</div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {appointment.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-900 text-sm">Emergency</span>
          </div>
          <p className="text-xs text-red-700 mb-2">
            For urgent repairs, contact emergency maintenance
          </p>
          <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
            <Phone className="h-3 w-3 mr-1" />
            Call Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
