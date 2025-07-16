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
import { MoreHorizontal, Download, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserManagementTabProps = {
  users: User[];
  selectedUsers: string[];
  onSelectUser: (userId: string, isSelected: boolean) => void;
  onSelectAllUsers: (isSelected: boolean) => void;
  onUserAction: (userId: string, action: string) => void;
  onTagUser: (userId: string, tag: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  onExport: () => void;
  onContact: () => void;
  isLoading: boolean;
};

export function UserManagementTab({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAllUsers,
  onUserAction,
  onTagUser,
  searchTerm,
  onSearchTermChange,
  filterStatus,
  onFilterStatusChange,
  sortBy,
  onSortByChange,
  onExport,
  onContact,
  isLoading,
}: UserManagementTabProps) {
  const isAllSelected =
    users.length > 0 && selectedUsers.length === users.length;

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-64"
          />
          <Select value={filterStatus} onValueChange={onFilterStatusChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Join Date</SelectItem>
              <SelectItem value="type">User Type</SelectItem>
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
                onCheckedChange={(checked) => onSelectAllUsers(!!checked)}
              />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user._id)}
                  onCheckedChange={(checked) =>
                    onSelectUser(user._id, !!checked)
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
                <div className="flex gap-1">
                  {/* Tags will need to be implemented */}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => onUserAction(user._id, "view")}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUserAction(user._id, "active")}
                    >
                      Activate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUserAction(user._id, "blocked")}
                      className="text-red-600"
                    >
                      Block
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onTagUser(user._id, "VIP")}
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
    </div>
  );
} 