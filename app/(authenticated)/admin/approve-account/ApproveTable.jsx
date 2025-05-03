"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import axios from "axios";

const initialUserData = [
  {
    username: "user_anna01",
    name: "Anna Thompson",
    accountStatus: "active",
    email: "anna01@example.com",
    role: "user",
    portfolio: "",
  },
  {
    username: "cre8_ricky",
    name: "Ricky Stone",
    accountStatus: "pending",
    email: "ricky.cre8@example.com",
    role: "creator",
    portfolio: "https://portfolio-ricky.vercel.app",
  },
  {
    username: "creator_sumi",
    name: "Sumaiya Khatun",
    accountStatus: "active",
    email: "sumi.creative@example.com",
    role: "creator",
    portfolio: "https://sumi-designs.vercel.app",
  },
  {
    username: "user_junaid",
    name: "Junaid Ahmed",
    accountStatus: "banned",
    email: "junaid01@example.com",
    role: "user",
    portfolio: "",
  },
];

export default function UserTable({ data }) {
  const [users, setUsers] = useState(data);

  //   useEffect(() => {
  //     const getAllApprovals = async () => {
  //       try {
  //         const res = await axios.get(`/api/admin/account-approval`);

  //         console.groupEnd(res);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getAllApprovals();
  //   }, []);

  const handleAction = (action, user) => {
    console.log(`Action: ${action} | User: ${user.username}`);

    if (action === "approve") {
      updateUserStatus(user.userId.username, "active");
    } else if (action === "reject") {
      updateUserStatus(user.userId.username, "rejected");
    } else if (action === "view") {
      if (user.portfolio) {
        window.open(user.portfolio, "_blank");
      } else {
        alert("No portfolio provided.");
      }
    }
  };

  const updateUserStatus = (username, status) => {
    const updatedUsers = users.map((u) =>
      u.username === username ? { ...u, accountStatus: status } : u
    );
    setUsers(updatedUsers);
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
            <TableHead>Portfolio</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId.username}>
              <TableCell>{user.userId.username}</TableCell>
              <TableCell>
                {user.userId.firstname + " " + user.userId.lastname}
              </TableCell>
              <TableCell>{user.userId.status}</TableCell>
              <TableCell>{user.userId.email}</TableCell>
              <TableCell>{user.userId.role}</TableCell>
              <TableCell>
                {user.portfolio ? (
                  <a
                    href={user.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction("view", user)}
                >
                  View
                </Button>
                {user.userId.role === "creator" &&
                  user.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleAction("approve", user)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction("reject", user)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
