"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const userData = [
  {
    username: "user_anna01",
    name: "Anna Thompson",
    accountStatus: "active",
    email: "anna01@example.com",
    role: "user",
  },
  {
    username: "cre8_ricky",
    name: "Ricky Stone",
    accountStatus: "pending",
    email: "ricky.cre8@example.com",
    role: "creator",
  },
  {
    username: "client_rob",
    name: "Robert Nolan",
    accountStatus: "active",
    email: "rob.client@example.com",
    role: "client",
  },
  {
    username: "user_junaid",
    name: "Junaid Ahmed",
    accountStatus: "banned",
    email: "junaid01@example.com",
    role: "user",
  },
  {
    username: "creator_sumi",
    name: "Sumaiya Khatun",
    accountStatus: "active",
    email: "sumi.creative@example.com",
    role: "creator",
  },
  {
    username: "client_saba",
    name: "Saba Rahman",
    accountStatus: "inactive",
    email: "saba.client@example.com",
    role: "client",
  },
];

export default function UserTable() {
  const handleAction = (action, user) => {
    console.log(`Action: ${action} | User: ${user.username}`);
  };

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <Table className="card">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.accountStatus}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction("viewProfile", user)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction("editProfile", user)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleAction("deleteProfile", user)}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleAction("changeRole", user)}
                >
                  Change Role
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
