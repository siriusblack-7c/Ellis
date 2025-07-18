import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";
import { MoreHorizontal, Download, Mail, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminUsers, updateAdminUserStatus, addAdminUserTag } from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";
import Papa from 'papaparse';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function UserManagementTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['adminUsers'],
    queryFn: getAdminUsers,
  });

  const statusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) =>
      updateAdminUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast({
        title: "Success",
        description: "User status updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      });
    },
  });

  const tagMutation = useMutation({
    mutationFn: ({ userId, tag }: { userId: string; tag: string }) =>
      addAdminUserTag(userId, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast({
        title: "Success",
        description: "User tagged successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to tag user.",
        variant: "destructive",
      });
    },
  });

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedUserForDetails, setSelectedUserForDetails] = useState<User | null>(null);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId: string, isSelected: boolean) => {
    setSelectedUsers((prev) =>
      isSelected ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  const handleSelectAllUsers = (isSelected: boolean) => {
    setSelectedUsers(isSelected ? filteredUsers.map((u) => u._id) : []);
  };

  const handleUserAction = (userId: string, action: string) => {
    if (action === 'active' || action === 'blocked') {
      statusMutation.mutate({ userId, status: action });
    } else if (action === 'view') {
      const user = users.find(u => u._id === userId);
      if (user) {
        setSelectedUserForDetails(user);
        setIsDetailsDialogOpen(true);
      }
    } else {
      console.log(`User ${userId} action: ${action}`);
    }
  };

  const handleTagUser = (userId: string, tag: string) => {
    tagMutation.mutate({ userId, tag });
  };

  const onExport = () => {
    if (filteredUsers.length === 0) {
      toast({
        title: "No users to export",
        description: "There are no users matching the current filters.",
        variant: "destructive"
      });
      return;
    }

    const csvData = filteredUsers.map(user => ({
      "ID": user._id,
      "First Name": user.firstName,
      "Last Name": user.lastName,
      "Email": user.email,
      "Phone Number": user.phoneNumber,
      "Role": user.role,
      "Status": user.status,
      "Gender": user.gender,
      "Bio": user.bio,
      "Country": user.country,
      "Address": user.address1,
      "City": user.city,
      "State": user.state,
      "Zip": user.zip,
      "Birth Date": user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'N/A',
      "Joined At": new Date(user.createdAt).toLocaleDateString(),
      "Tags": user.tags?.join(', ')
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onContact = () => {
    console.log("Contacting users");
  };

  const filteredUsers = users
    .filter(
      (user) => filterStatus === "all" || user.status === filterStatus
    )
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const isAsc = sortDirection === 'asc';
      switch (sortBy) {
        case 'name':
          return isAsc
            ? a.firstName.localeCompare(b.firstName)
            : b.firstName.localeCompare(a.firstName);
        case 'date':
          return isAsc
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'type':
          return isAsc
            ? a.role.localeCompare(b.role)
            : b.role.localeCompare(a.role);
        case 'status':
          return isAsc
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        default:
          return 0;
      }
    });

  const isAllSelected =
    filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={onContact}>
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => handleSelectAllUsers(!!checked)}
              />
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('name')}>
                User
                {sortBy === 'name' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status
                {sortBy === 'status' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('type')}>
                Type
                {sortBy === 'type' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('date')}>
                Joined
                {sortBy === 'date' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
              </Button>
            </TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user._id)}
                  onCheckedChange={(checked) =>
                    handleSelectUser(user._id, !!checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "active"
                      ? "default"
                      : "destructive"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {user.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="mr-1">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleUserAction(user._id, "view")}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUserAction(user._id, "active")}
                    >
                      Activate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUserAction(user._id, "blocked")}
                      className="text-red-600"
                    >
                      Block
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTagUser(user._id, "vip")}
                    >
                      Tag as VIP
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Full details for {selectedUserForDetails?.firstName} {selectedUserForDetails?.lastName}.
            </DialogDescription>
          </DialogHeader>
          {selectedUserForDetails && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {Object.entries(selectedUserForDetails).map(([key, value]) => {
                if (key === 'password' || key.startsWith('_')) return null; // Don't show password or internal fields

                const displayValue = Array.isArray(value)
                  ? value.join(', ')
                  : typeof value === 'boolean'
                    ? value ? 'Yes' : 'No'
                    : (key.includes('Date') || key.includes('At')) && typeof value === 'string'
                      ? new Date(value).toLocaleString()
                      : String(value);

                return (
                  <div key={key} className="grid grid-cols-3 gap-2 text-sm">
                    <span className="font-semibold capitalize col-span-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="col-span-2">{displayValue || 'N/A'}</span>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 