import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Eye, User, Calendar, Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample audit log data
const auditLogs = [
  {
    id: 1,
    action: "User Loggin",
    performedBy: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    performedAt: "2025-07-17T10:50:17.2145269",
    tableName: "Users",
    recordId: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    details: "Login successful",
  },
  {
    id: 2,
    action: "User logout",
    performedBy: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    performedAt: "2025-07-17T11:05:16.5727977",
    tableName: "Users",
    recordId: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    details: "Logout successful",
  },
  {
    id: 3,
    action: "User Loggin",
    performedBy: "fcc13629-e1a4-490c-9a75-90ea97431a89",
    performedAt: "2025-07-17T11:05:55.0403127",
    tableName: "Users",
    recordId: "fcc13629-e1a4-490c-9a75-90ea97431a89",
    details: "Login successful",
  },
  {
    id: 4,
    action: "User Loggin",
    performedBy: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    performedAt: "2025-07-17T11:07:03.1049008",
    tableName: "Users",
    recordId: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    details: "Login successful",
  },
];

const mockUsers = {
  "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7": {
    id: "c3c76fd5-0ce8-4182-9fed-d348a7fdcfc7",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    department: "IT",
    lastLogin: "2025-07-17T11:07:03.1049008",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "fcc13629-e1a4-490c-9a75-90ea97431a89": {
    id: "fcc13629-e1a4-490c-9a75-90ea97431a89",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    department: "Marketing",
    lastLogin: "2025-07-17T11:05:55.0403127",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
};

function getActionBadgeVariant(action) {
  switch (action.toLowerCase()) {
    case "user loggin":
      return "default";
    case "user logout":
      return "secondary";
    default:
      return "outline";
  }
}

function UserInfoDialog({ userId }) {
  const user = mockUsers;

  if (!user) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Not Found</DialogTitle>
          <DialogDescription>
            No user information available for ID: {userId}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Information
        </DialogTitle>
        <DialogDescription>Details for user {user.name}</DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Role
            </label>
            <p className="text-sm">{user.role}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Department
            </label>
            <p className="text-sm">{user.department}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Status
            </label>
            <Badge variant={user.status === "Active" ? "default" : "secondary"}>
              {user.status}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              User ID
            </label>
            <p className="text-xs font-mono text-muted-foreground">{user.id}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Last Login
          </label>
          <p className="text-sm flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(user.lastLogin), "PPp")}
          </p>
        </div>
      </div>
    </DialogContent>
  );
}

export default function AuditLogPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground">
            Track and monitor user activities and system events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">
            {auditLogs.length} entries
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            A comprehensive log of all user activities and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">#{log.id}</TableCell>
                  <TableCell>
                    <Badge variant={getActionBadgeVariant(log.action)}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">U</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {mockUsers?.name || "Unknown User"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(log.performedAt), "MMM dd, yyyy")}
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(log.performedAt), "HH:mm:ss")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.tableName}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {log.details}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View User
                        </Button>
                      </DialogTrigger>
                      <UserInfoDialog userId={log.performedBy} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
